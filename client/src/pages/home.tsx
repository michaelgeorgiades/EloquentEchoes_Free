import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search, Clock, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { SpeechWithDetails, Category } from "@shared/schema";
import heroImage from "@assets/generated_images/Historical_library_hero_image_dfad7487.png";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: speeches, isLoading: speechesLoading } = useQuery<SpeechWithDetails[]>({
    queryKey: ["/api/speeches"],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const featuredSpeeches = speeches?.slice(0, 3) || [];
  const recentSpeeches = speeches?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Voices of History
          </h1>
          <p className="font-serif text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Explore influential speeches and letters from throughout history. 
            Experience the power of words that shaped our world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="default" 
              size="lg" 
              className="min-h-12 px-8 text-lg"
              asChild
              data-testid="button-browse-collection"
            >
              <Link href="/browse">Browse Collection</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="min-h-12 px-8 text-lg bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
              asChild
              data-testid="button-view-subscriptions"
            >
              <Link href="/subscribe">View Subscriptions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search speeches, letters, speakers, or topics..."
              className="pl-12 h-14 text-lg font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>
      </section>

      {/* Featured Speeches Carousel */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-semibold mb-8">Featured Speeches</h2>
          {speechesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredSpeeches.map((speech) => (
                <Link key={speech.id} href={`/speech/${speech.id}`}>
                  <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer h-full" data-testid={`card-speech-${speech.id}`}>
                    <div className="aspect-[4/3] bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground" />
                      </div>
                      {speech.isPremium && (
                        <Badge className="absolute top-4 right-4 bg-[#FFD700] text-[#2F4F4F] border-[#DAA520]">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-semibold mb-2 line-clamp-2">
                        {speech.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <User className="h-4 w-4" />
                        <span className="font-sans">{speech.speaker.name}</span>
                      </div>
                      <p className="font-serif text-base leading-relaxed line-clamp-3 mb-4">
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
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-semibold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category) => (
              <Link key={category.id} href={`/browse?category=${category.id}`}>
                <Card className="p-6 hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-category-${category.id}`}>
                  <h3 className="font-display text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{category.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Additions */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-4xl font-semibold">Recent Additions</h2>
            <Button variant="ghost" asChild data-testid="button-view-all">
              <Link href="/browse">View All →</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSpeeches.map((speech) => (
              <Link key={speech.id} href={`/speech/${speech.id}`}>
                <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-recent-${speech.id}`}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary" className="font-sans text-xs">
                        {speech.category.name}
                      </Badge>
                      {speech.isPremium && (
                        <Badge className="bg-[#FFD700] text-[#2F4F4F] border-[#DAA520] text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 line-clamp-2">
                      {speech.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <User className="h-4 w-4" />
                      <span className="font-sans">{speech.speaker.name}</span>
                    </div>
                    <p className="font-serif text-sm leading-relaxed line-clamp-2 text-muted-foreground">
                      {speech.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Unlock History's Greatest Voices
          </h2>
          <p className="font-serif text-xl mb-8 leading-relaxed">
            Get unlimited access to our complete collection of speeches and letters 
            with a premium subscription.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="min-h-12 px-8 text-lg"
            asChild
            data-testid="button-explore-plans"
          >
            <Link href="/subscribe">Explore Plans</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
