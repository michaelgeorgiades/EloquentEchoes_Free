import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, Clock, User, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import type { SpeechWithDetails, Category, Speaker } from "@shared/schema";

export default function Browse() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const { data: speeches, isLoading } = useQuery<SpeechWithDetails[]>({
    queryKey: ["/api/speeches"],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: speakers } = useQuery<Speaker[]>({
    queryKey: ["/api/speakers"],
  });

  const filteredSpeeches = useMemo(() => {
    if (!speeches) return [];

    return speeches.filter(speech => {
      const matchesSearch = searchQuery === "" || 
        speech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speech.speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speech.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || speech.categoryId === selectedCategory;
      const matchesSpeaker = selectedSpeaker === "all" || speech.speakerId === selectedSpeaker;
      const matchesType = selectedType === "all" || speech.type === selectedType;
      const matchesPeriod = selectedPeriod === "all" || speech.speaker.period === selectedPeriod;

      return matchesSearch && matchesCategory && matchesSpeaker && matchesType && matchesPeriod;
    });
  }, [speeches, searchQuery, selectedCategory, selectedSpeaker, selectedType, selectedPeriod]);

  const hasActiveFilters = selectedCategory !== "all" || selectedSpeaker !== "all" || 
    selectedType !== "all" || selectedPeriod !== "all";

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSpeaker("all");
    setSelectedType("all");
    setSelectedPeriod("all");
  };

  const periods = useMemo(() => {
    if (!speakers) return [];
    return Array.from(new Set(speakers.map(s => s.period))).sort();
  }, [speakers]);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-5xl font-bold mb-4">Browse Collection</h1>
          <p className="font-serif text-xl text-muted-foreground leading-relaxed">
            Explore our curated collection of historical speeches and letters
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, speaker, or content..."
              className="pl-12 h-12 font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-browse"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 bg-card rounded-md">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h3 className="font-display text-xl font-semibold">Filters</h3>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="ml-auto"
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-sans font-medium mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium mb-2">Speaker</label>
              <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                <SelectTrigger data-testid="select-speaker">
                  <SelectValue placeholder="All Speakers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Speakers</SelectItem>
                  {speakers?.map(speaker => (
                    <SelectItem key={speaker.id} value={speaker.id}>{speaker.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium mb-2">Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger data-testid="select-type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="speech">Speeches</SelectItem>
                  <SelectItem value="letter">Letters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium mb-2">Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger data-testid="select-period">
                  <SelectValue placeholder="All Periods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  {periods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-sans text-muted-foreground">
            Showing {filteredSpeeches.length} {filteredSpeeches.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredSpeeches.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="font-serif text-xl text-muted-foreground">
              No speeches found matching your criteria. Try adjusting your filters.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpeeches.map((speech) => (
              <Link key={speech.id} href={`/speech/${speech.id}`}>
                <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer h-full" data-testid={`card-speech-${speech.id}`}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary" className="font-sans text-xs">
                        {speech.category.name}
                      </Badge>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 line-clamp-2">
                      {speech.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <User className="h-4 w-4" />
                      <span className="font-sans">{speech.speaker.name}</span>
                    </div>
                    <p className="font-serif text-sm leading-relaxed line-clamp-3 mb-4">
                      {speech.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-sans text-muted-foreground">{speech.date}</span>
                      {speech.duration && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="font-sans">{Math.floor(speech.duration / 60)} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
