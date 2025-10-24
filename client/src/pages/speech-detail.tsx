import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Calendar, MapPin, Clock, User, ArrowLeft, Play, Pause, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import type { SpeechWithDetails } from "@shared/schema";
import lincolnImg from "@assets/generated_images/Abraham_Lincoln_portrait_a94bebb5.png";
import churchillImg from "@assets/generated_images/Winston_Churchill_portrait_11b08254.png";
import kingImg from "@assets/generated_images/Martin_Luther_King_Jr_portrait_2f76e848.png";
import elizabethImg from "@assets/generated_images/Queen_Elizabeth_I_portrait_3a1ba861.png";
import gandhiImg from "@assets/generated_images/Mahatma_Gandhi_portrait_4c29b8fe.png";

const speakerImages: Record<string, string> = {
  lincoln: lincolnImg,
  churchill: churchillImg,
  king: kingImg,
  elizabeth: elizabethImg,
  gandhi: gandhiImg
};

export default function SpeechDetail() {
  const [, params] = useRoute("/speech/:id");
  const [isPlaying, setIsPlaying] = useState(false);
  const speechId = params?.id;

  const { data: speech, isLoading } = useQuery<SpeechWithDetails>({
    queryKey: ["/api/speeches", speechId],
    enabled: !!speechId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!speech) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Speech Not Found</h1>
          <Button asChild>
            <Link href="/browse">Browse Collection</Link>
          </Button>
        </div>
      </div>
    );
  }

  const speakerImageKey = speech.speaker.imageUrl.split('/').pop() || '';
  const speakerImage = speakerImages[speakerImageKey];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-card py-8 px-6 border-b">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6" data-testid="button-back">
            <Link href="/browse">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collection
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24 rounded-md">
              <AvatarImage src={speakerImage} alt={speech.speaker.name} />
              <AvatarFallback className="rounded-md text-2xl">
                {speech.speaker.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{speech.category.name}</Badge>
                <Badge variant="secondary">{speech.type === 'speech' ? 'Speech' : 'Letter'}</Badge>
                {speech.isPremium && (
                  <Badge className="bg-[#FFD700] text-[#2F4F4F] border-[#DAA520]">
                    Premium
                  </Badge>
                )}
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {speech.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground font-sans">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <Link href={`/speaker/${speech.speakerId}`}>
                    <span className="hover:text-foreground transition-colors cursor-pointer">
                      {speech.speaker.name}
                    </span>
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{speech.date}</span>
                </div>
                {speech.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{speech.location}</span>
                  </div>
                )}
                {speech.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(speech.duration / 60)} min</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {speech.audioUrl && (
        <div className="sticky top-0 z-40 bg-primary text-primary-foreground py-4 px-6 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setIsPlaying(!isPlaying)}
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <div className="flex-1">
              <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary-foreground w-1/3 rounded-full"></div>
              </div>
            </div>
            <span className="font-sans text-sm">
              {speech.duration ? `${Math.floor(speech.duration / 60)}:00` : '0:00'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Historical Context */}
        <section className="mb-12">
          <h2 className="font-display text-3xl font-semibold mb-4">Historical Context</h2>
          <Card className="p-6">
            <p className="font-serif text-lg leading-relaxed">{speech.context}</p>
          </Card>
        </section>

        {/* Transcript */}
        <section className="mb-12">
          <h2 className="font-display text-3xl font-semibold mb-4">
            {speech.type === 'speech' ? 'Transcript' : 'Full Text'}
          </h2>
          <Card className="p-8">
            {speech.isPremium && !speech.audioUrl ? (
              <div className="text-center py-12">
                <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-2xl font-semibold mb-2">Premium Content</h3>
                <p className="font-serif text-lg text-muted-foreground mb-6">
                  Subscribe or purchase this {speech.type} to access the full content
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild data-testid="button-subscribe">
                    <Link href="/subscribe">Subscribe Now</Link>
                  </Button>
                  {speech.price && (
                    <Button variant="outline" asChild data-testid="button-purchase">
                      <Link href={`/purchase/${speech.id}`}>
                        Purchase for ${(speech.price / 100).toFixed(2)}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="font-serif text-lg leading-relaxed space-y-4">
                {speech.transcript.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Speaker Info */}
        <section>
          <h2 className="font-display text-3xl font-semibold mb-6">About the Speaker</h2>
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32 rounded-md">
                <AvatarImage src={speakerImage} alt={speech.speaker.name} />
                <AvatarFallback className="rounded-md text-3xl">
                  {speech.speaker.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold mb-2">{speech.speaker.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {speech.speaker.birthYear && speech.speaker.deathYear && (
                    <Badge variant="secondary">
                      {speech.speaker.birthYear} - {speech.speaker.deathYear}
                    </Badge>
                  )}
                  <Badge variant="secondary">{speech.speaker.location}</Badge>
                  <Badge variant="secondary">{speech.speaker.period}</Badge>
                </div>
                <p className="font-serif text-base leading-relaxed mb-4">{speech.speaker.bio}</p>
                <Button variant="outline" asChild data-testid="button-view-speaker">
                  <Link href={`/speaker/${speech.speakerId}`}>
                    View Full Profile →
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
