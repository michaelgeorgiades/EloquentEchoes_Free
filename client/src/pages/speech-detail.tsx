import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Calendar, MapPin, Clock, User, ArrowLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";
import type { SpeechWithDetails } from "@shared/schema";
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

export default function SpeechDetail() {
  const [, params] = useRoute("/speech/:id");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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
        <>
          <audio ref={audioRef} src={speech.audioUrl} preload="metadata" />
          <div className="sticky top-0 z-40 bg-primary text-primary-foreground py-4 px-6 shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <Button
                size="icon"
                variant="secondary"
                onClick={togglePlayPause}
                data-testid="button-play-pause"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden cursor-pointer"
                     onClick={(e) => {
                       if (!audioRef.current) return;
                       const rect = e.currentTarget.getBoundingClientRect();
                       const percent = (e.clientX - rect.left) / rect.width;
                       audioRef.current.currentTime = percent * duration;
                     }}>
                  <div 
                    className="h-full bg-primary-foreground rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <span className="font-sans text-sm">
                {formatTime(currentTime)} / {formatTime(duration || speech.duration || 0)}
              </span>
            </div>
          </div>
        </>
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
            <div className="font-serif text-lg leading-relaxed space-y-4">
              {speech.transcript.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
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
