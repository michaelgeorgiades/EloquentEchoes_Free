import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Calendar, MapPin, ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Speaker, SpeechWithDetails } from "@shared/schema";
import lincolnImg from "@assets/generated_images/Abraham_Lincoln_portrait_a94bebb5.png";
import churchillImg from "@assets/generated_images/Winston_Churchill_portrait_11b08254.png";
import kingImg from "@assets/generated_images/Martin_Luther_King_Jr_portrait_2f76e848.png";
import elizabethImg from "@assets/generated_images/Queen_Elizabeth_I_portrait_3a1ba861.png";
import gandhiImg from "@assets/generated_images/Mahatma_Gandhi_portrait_4c29b8fe.png";
import mandelaImg from "@assets/generated_images/Nelson_Mandela_portrait_c6b8c0e6.png";
import hitlerImg from "@assets/generated_images/Adolf_Hitler_portrait_a072d976.png";
import wattsImg from "@assets/generated_images/Alan_Watts_portrait_81227d38.png";
import fdrImg from "@assets/generated_images/Franklin_D_Roosevelt_portrait_a6db030b.png";
import jfkImg from "@assets/generated_images/John_F_Kennedy_portrait_4e6219ad.png";
import napoleonImg from "@assets/generated_images/Napoleon_Bonaparte_portrait_651b5f58.png";
import malcolmxImg from "@assets/generated_images/Malcolm_X_portrait_6ac5cb31.png";

const speakerImages: Record<string, string> = {
  lincoln: lincolnImg,
  churchill: churchillImg,
  king: kingImg,
  elizabeth: elizabethImg,
  gandhi: gandhiImg,
  mandela: mandelaImg,
  hitler: hitlerImg,
  watts: wattsImg,
  fdr: fdrImg,
  jfk: jfkImg,
  napoleon: napoleonImg,
  malcolmx: malcolmxImg
};

export default function SpeakerProfile() {
  const [, params] = useRoute("/speaker/:id");
  const speakerId = params?.id;

  const { data: speaker, isLoading: speakerLoading } = useQuery<Speaker>({
    queryKey: ["/api/speakers", speakerId],
    enabled: !!speakerId,
  });

  const { data: allSpeeches } = useQuery<SpeechWithDetails[]>({
    queryKey: ["/api/speeches"],
  });

  const speakerSpeeches = allSpeeches?.filter(s => s.speakerId === speakerId) || [];

  if (speakerLoading) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Card className="h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!speaker) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Speaker Not Found</h1>
          <Button asChild>
            <Link href="/browse">Browse Collection</Link>
          </Button>
        </div>
      </div>
    );
  }

  const speakerImageKey = speaker.imageUrl.split('/').pop() || '';
  const speakerImage = speakerImages[speakerImageKey];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card py-12 px-6 border-b">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" asChild className="mb-8" data-testid="button-back">
            <Link href="/browse">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collection
            </Link>
          </Button>

          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            {/* Portrait */}
            <div>
              <Card className="overflow-hidden">
                <Avatar className="h-full w-full rounded-none aspect-[3/4]">
                  <AvatarImage src={speakerImage} alt={speaker.name} className="object-cover" />
                  <AvatarFallback className="rounded-none text-6xl">
                    {speaker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Card>
            </div>

            {/* Bio Header */}
            <div>
              <h1 className="font-display text-5xl font-bold mb-4">{speaker.name}</h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {speaker.birthYear && speaker.deathYear && (
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {speaker.birthYear} - {speaker.deathYear}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-base px-4 py-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {speaker.location}
                </Badge>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {speaker.period}
                </Badge>
              </div>

              <p className="font-serif text-xl leading-relaxed">{speaker.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline (if available) */}
      {speaker.birthYear && speaker.deathYear && (
        <div className="py-12 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl font-semibold mb-6">Timeline</h2>
            <Card className="p-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="font-display text-xl font-semibold w-24 flex-shrink-0">{speaker.birthYear}</div>
                  <div className="flex-1">
                    <p className="font-serif text-lg">Born in {speaker.location}</p>
                  </div>
                </div>
                <Separator />
                {speakerSpeeches.map((speech) => (
                  <div key={speech.id}>
                    <div className="flex gap-4">
                      <div className="font-display text-xl font-semibold w-24 flex-shrink-0">
                        {speech.date.split(',').pop()?.trim() || speech.date}
                      </div>
                      <div className="flex-1">
                        <Link href={`/speech/${speech.id}`}>
                          <p className="font-serif text-lg hover:text-primary transition-colors cursor-pointer">
                            {speech.title}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
                <div className="flex gap-4">
                  <div className="font-display text-xl font-semibold w-24 flex-shrink-0">{speaker.deathYear}</div>
                  <div className="flex-1">
                    <p className="font-serif text-lg">Passed away</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Complete Works */}
      <div className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-3xl font-semibold">
              Complete Works ({speakerSpeeches.length})
            </h2>
          </div>

          {speakerSpeeches.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="font-serif text-xl text-muted-foreground">
                No speeches or letters available for this speaker yet.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {speakerSpeeches.map((speech) => (
                <Link key={speech.id} href={`/speech/${speech.id}`}>
                  <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-speech-${speech.id}`}>
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
                      <p className="font-serif text-sm leading-relaxed line-clamp-3 mb-4 text-muted-foreground">
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
    </div>
  );
}
