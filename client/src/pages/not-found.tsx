import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="max-w-2xl w-full p-12 text-center">
        <h1 className="font-display text-8xl font-bold mb-4 text-primary">404</h1>
        <h2 className="font-display text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="font-serif text-xl text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for seems to have been lost to history. 
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" data-testid="button-home">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" data-testid="button-browse">
            <Link href="/browse">
              <Search className="h-5 w-5 mr-2" />
              Browse Collection
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
