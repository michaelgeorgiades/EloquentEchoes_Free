import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Check, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Subscription } from "@shared/schema";
import { useState } from "react";

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { data: subscriptions, isLoading } = useQuery<Subscription[]>({
    queryKey: ["/api/subscriptions"],
  });

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // In a real implementation, this would trigger PayPal checkout
    console.log("Selected plan:", planId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Choose Your Plan
          </h1>
          <p className="font-serif text-xl md:text-2xl leading-relaxed">
            Unlock unlimited access to history's greatest voices and messages
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-[600px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subscriptions?.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden ${
                    plan.isPopular ? 'border-primary border-2' : ''
                  }`}
                  data-testid={`card-plan-${plan.type}`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground py-2 text-center">
                      <Badge className="bg-[#FFD700] text-[#2F4F4F] border-[#DAA520]">
                        <Crown className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className={`p-8 ${plan.isPopular ? 'pt-16' : ''}`}>
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="font-display text-5xl font-bold">
                          ${(plan.price / 100).toFixed(0)}
                        </span>
                        {plan.type !== 'per-speech' && (
                          <span className="font-sans text-muted-foreground">
                            /{plan.type === 'monthly' ? 'month' : 'year'}
                          </span>
                        )}
                      </div>
                      {plan.type === 'annual' && (
                        <p className="font-sans text-sm text-muted-foreground mt-2">
                          Save 17% vs monthly
                        </p>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className="w-full min-h-12"
                      variant={plan.isPopular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan.id)}
                      data-testid={`button-select-${plan.type}`}
                    >
                      {plan.type === 'per-speech' ? 'Browse Speeches' : 'Get Started'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-semibold mb-12 text-center">
            What's Included
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-md">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Premium Audio Playback
                  </h3>
                  <p className="font-serif text-muted-foreground">
                    Listen to professionally narrated speeches and letters with high-quality audio
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-md">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Full Transcripts
                  </h3>
                  <p className="font-serif text-muted-foreground">
                    Read complete transcripts with synchronized highlighting during playback
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-md">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Historical Context
                  </h3>
                  <p className="font-serif text-muted-foreground">
                    Deep dive into the historical background and significance of each piece
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-md">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Multi-Language Support
                  </h3>
                  <p className="font-serif text-muted-foreground">
                    Access content in multiple languages with seamless translation
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-semibold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2">
                Can I cancel anytime?
              </h3>
              <p className="font-serif text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="font-serif text-muted-foreground">
                We accept all major payment methods through PayPal, including credit cards, debit cards, and PayPal balance.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2">
                Can I purchase individual speeches?
              </h3>
              <p className="font-serif text-muted-foreground">
                Yes! Select premium speeches can be purchased individually for lifetime access. Look for the "Per Speech" pricing on individual speech pages.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2">
                Is there a free trial?
              </h3>
              <p className="font-serif text-muted-foreground">
                We offer a selection of free speeches to preview the platform. Subscribe to unlock the complete collection.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="font-serif text-xl mb-8 leading-relaxed">
            Join thousands of history enthusiasts exploring the voices that shaped our world
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="min-h-12 px-8 text-lg"
            asChild
            data-testid="button-start-free"
          >
            <Link href="/browse">Start Exploring Free Speeches</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
