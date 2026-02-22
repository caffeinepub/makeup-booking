import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Sparkles, Star, Phone, Clock3, MapPin } from 'lucide-react';
import PortfolioGallery from '@/components/PortfolioGallery';
import TeamMemberProfile from '@/components/TeamMemberProfile';

export default function HomePage() {
  const navigate = useNavigate();

  const portfolioImages = [
    '/assets/IMG-20260222-WA0010.jpg',
    '/assets/IMG-20260222-WA0009.jpg',
    '/assets/IMG-20260222-WA0008.jpg',
    '/assets/IMG-20260222-WA0007.jpg',
    '/assets/IMG-20260222-WA0006.jpg',
    '/assets/IMG-20260222-WA0005.jpg',
    '/assets/IMG-20260222-WA0004.jpg',
    '/assets/IMG-20260222-WA0003.jpg',
    '/assets/IMG-20260222-WA0002.jpg',
    '/assets/IMG-20260222-WA0001.jpg',
    '/assets/IMG-20260222-WA0000.jpg',
  ];

  const naziyaPortfolioImages = [
    '/assets/IMG-20260222-WA0005.jpg',
    '/assets/IMG-20260222-WA0002.jpg',
    '/assets/IMG-20260222-WA0003.jpg',
    '/assets/IMG-20260222-WA0004.jpg',
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/assets/generated/hero-makeup.dim_1920x1080.png)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center md:text-left max-w-2xl">
          {/* 24/7 Availability Badge */}
          <div className="flex justify-center md:justify-start mb-6">
            <Badge 
              variant="default" 
              className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground shadow-elegant animate-in fade-in slide-in-from-top-2 duration-500"
            >
              <Clock3 className="h-4 w-4 mr-2" />
              Available 24/7 for Bookings
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Elevate Your Beauty
            <span className="block text-primary mt-2">With Expert Care</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Professional makeup artistry for every occasion. Book your appointment today and experience the art of transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              size="lg" 
              onClick={() => navigate({ to: '/book' })}
              className="text-lg px-8 py-6 shadow-elegant"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate({ to: '/services' })}
              className="text-lg px-8 py-6"
            >
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Serving Your Area
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Proudly serving <span className="text-primary font-semibold">Hyderabad</span>, <span className="text-primary font-semibold">Secunderabad</span>, and <span className="text-primary font-semibold">outskirts</span>
            </p>
            <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
              We bring professional makeup artistry to your location with convenient service across the twin cities and surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <PortfolioGallery
            images={portfolioImages}
            title="Our Portfolio"
            description="Explore our stunning collection of bridal, traditional, and party makeup transformations"
          />
        </div>
      </section>

      {/* Team Member Profile Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <TeamMemberProfile
              name="Naziya"
              title="Lead Makeup Artist & Founder"
              bio="With years of experience in bridal and traditional makeup artistry, Naziya brings passion and precision to every look. Specializing in creating timeless beauty that enhances your natural features, she has transformed countless brides and clients for their most special moments. Her expertise spans from classic bridal elegance to contemporary party makeup, ensuring every client feels confident and radiant."
              portfolioImages={naziyaPortfolioImages}
            />
          </div>
        </div>
      </section>

      {/* Contact Section with 24/7 Availability */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-elegant overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Book Your Appointment
                  </h2>
                  
                  {/* 24/7 Availability and Service Area */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                    <Badge 
                      variant="outline" 
                      className="px-4 py-2 text-base font-semibold border-primary/30 text-primary bg-primary/5"
                    >
                      <Clock3 className="h-4 w-4 mr-2" />
                      We're Available 24/7
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="px-4 py-2 text-base font-semibold border-primary/30 text-primary bg-primary/5"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Hyderabad, Secunderabad & Outskirts
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                    Call us anytime to schedule your beauty transformation. Our team is ready to help you look and feel your best, day or night.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
                    <a 
                      href="tel:+919392570180"
                      className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-soft hover:shadow-elegant"
                    >
                      <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      <span>+91 93925 70180</span>
                    </a>
                    
                    <a 
                      href="tel:+919550935579"
                      className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-soft hover:shadow-elegant"
                    >
                      <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      <span>+91 95509 35579</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Available 24/7 for your convenience</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose Naaz Studio
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience luxury beauty services with our professional team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors shadow-soft">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Artists</h3>
                <p className="text-muted-foreground">
                  Certified professionals with years of experience in makeup artistry
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors shadow-soft">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground">
                  Easy online booking with available time slots that fit your schedule
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors shadow-soft">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
                <p className="text-muted-foreground">
                  High-quality cosmetics and tools for flawless results
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <img 
              src="/assets/generated/makeup-brushes-icon.dim_256x256.png" 
              alt="Makeup Brushes" 
              className="h-20 w-20 mx-auto mb-6 opacity-80"
            />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              From everyday elegance to special occasion glamour, we offer a range of professional makeup services
            </p>
            <Button 
              size="lg"
              onClick={() => navigate({ to: '/services' })}
              className="shadow-soft"
            >
              Explore All Services
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Book your appointment now and let our experts bring out your natural beauty
          </p>
          <Button 
            size="lg"
            onClick={() => navigate({ to: '/book' })}
            className="text-lg px-10 py-6 shadow-elegant"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Your Appointment
          </Button>
        </div>
      </section>
    </div>
  );
}
