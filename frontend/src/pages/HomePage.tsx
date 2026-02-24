import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sparkles, Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import PortfolioGallery from '../components/PortfolioGallery';
import TeamMemberProfile from '../components/TeamMemberProfile';

const portfolioImages = [
  '/assets/IMG-20260222-WA0000.jpg',
  '/assets/IMG-20260222-WA0001.jpg',
  '/assets/IMG-20260222-WA0002.jpg',
  '/assets/IMG-20260222-WA0003.jpg',
  '/assets/IMG-20260222-WA0004.jpg',
  '/assets/IMG-20260222-WA0005.jpg',
  '/assets/IMG-20260222-WA0006.jpg',
  '/assets/IMG-20260222-WA0007.jpg',
  '/assets/IMG-20260222-WA0008.jpg',
  '/assets/IMG-20260222-WA0009.jpg',
  '/assets/IMG-20260222-WA0010.jpg',
  '/assets/IMG-20260222-WA0011.jpg',
  '/assets/IMG-20260222-WA0013.jpg',
  '/assets/IMG-20260222-WA0014.jpg',
  '/assets/IMG-20260222-WA0015.jpg',
  '/assets/IMG-20260222-WA0016.jpg',
  '/assets/IMG-20260222-WA0017.jpg',
  '/assets/IMG-20260222-WA0000-1.jpg',
  '/assets/IMG-20260222-WA0002-1.jpg',
  '/assets/IMG-20260222-WA0003-1.jpg',
  '/assets/IMG-20260222-WA0004-1.jpg',
  '/assets/IMG-20260222-WA0005-1.jpg',
  '/assets/IMG-20260222-WA0006-1.jpg',
  '/assets/IMG-20260222-WA0007-1.jpg',
  '/assets/IMG-20260222-WA0008-1.jpg',
  '/assets/IMG-20260222-WA0009-1.jpg',
  '/assets/IMG-20260222-WA0010-1.jpg',
  '/assets/IMG-20260222-WA0011-1.jpg',
  '/assets/Screenshot_20260222_151727.jpg',
  '/assets/Screenshot_20260222_171357.jpg',
  '/assets/Screenshot_20260222_181307.jpg',
  '/assets/Screenshot_20260222_185228.jpg',
  '/assets/Screenshot_20260222_193742.jpg',
  '/assets/Screenshot_20260222_193742-1.jpg',
  '/assets/Screenshot_20260222_193742-2.jpg',
  '/assets/Screenshot_20260222_151727-1.jpg',
];

const teamPortfolioImages = [
  '/assets/IMG-20260222-WA0000.jpg',
  '/assets/IMG-20260222-WA0003.jpg',
  '/assets/IMG-20260222-WA0007.jpg',
  '/assets/IMG-20260222-WA0011.jpg',
];

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Expert Artistry',
    description: 'Years of experience in bridal, party, and traditional makeup looks.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Premium Products',
    description: 'Only the finest makeup brands for long-lasting, flawless results.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Punctual & Professional',
    description: 'We respect your time and deliver perfection on schedule.',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Home Service',
    description: 'We come to you — serving Hyderabad, Secunderabad, and outskirts.',
  },
];

const servicesPreviews = [
  {
    name: 'Bridal Makeup',
    image: '/assets/generated/bridal-makeup.dim_400x300.png',
    path: '/services',
  },
  {
    name: 'Party Makeup',
    image: '/assets/generated/party-makeup.dim_400x300.png',
    path: '/services',
  },
  {
    name: 'Hairstyles',
    image: '/assets/generated/hairstyles.dim_400x300.png',
    path: '/services',
  },
  {
    name: 'Elegant Looks',
    image: '/assets/generated/elegant-looks.dim_400x300.png',
    path: '/services',
  },
  {
    name: 'Traditional Looks',
    image: '/assets/generated/traditional-looks.dim_400x300.png',
    path: '/services',
  },
  {
    name: 'Saree Draping',
    image: '/assets/generated/saree-draping.dim_400x300.png',
    path: '/services',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-makeup.dim_1920x1080.png"
            alt="Naaz Studio Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-white font-medium">Professional Makeup Artist</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Look Your
              <span className="text-primary block">Best Always</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Expert bridal, party, and traditional makeup artistry. We bring the salon to your doorstep across Hyderabad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/booking' })}
                className="text-base px-8 py-6 rounded-full shadow-lg"
              >
                Book Appointment
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/services' })}
                className="text-base px-8 py-6 rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Why Choose Naaz Studio?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine artistry, premium products, and personalized service to make you shine.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Our Services
              </h2>
              <p className="text-muted-foreground">Explore our range of professional makeup services</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/services' })}
              className="hidden md:flex gap-2"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {servicesPreviews.map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate({ to: '/services' })}
              >
                <div className="aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex md:hidden justify-center">
            <Button variant="outline" onClick={() => navigate({ to: '/services' })} className="gap-2">
              View All Services
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Meet Your Artist
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Passionate about beauty, dedicated to making you look and feel your best.
            </p>
          </div>
          <TeamMemberProfile
            name="Naziya"
            role="Lead Makeup Artist"
            bio="With years of experience in bridal and party makeup, Naziya brings artistry and passion to every look. Specializing in traditional and contemporary styles, she ensures every client feels beautiful and confident on their special day."
            portfolioImages={teamPortfolioImages}
          />
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Our Portfolio
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A glimpse of the beautiful transformations we've created for our clients.
            </p>
          </div>
          <PortfolioGallery images={portfolioImages} columns={4} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Ready to Look Stunning?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Book your appointment today and let us create the perfect look for your special occasion.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate({ to: '/booking' })}
            className="text-base px-10 py-6 rounded-full shadow-lg"
          >
            Book Your Appointment
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  );
}
