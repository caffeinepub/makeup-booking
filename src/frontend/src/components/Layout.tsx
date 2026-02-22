import { Link, useNavigate } from '@tanstack/react-router';
import { Sparkles, Phone, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LoginButton from './LoginButton';
import ProfileSetupModal from './ProfileSetupModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'makeup-booking';

  return (
    <div className="min-h-screen flex flex-col">
      <ProfileSetupModal />
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="/assets/generated/lipstick-icon.dim_128x128.png" 
                alt="Logo" 
                className="h-10 w-10 transition-transform group-hover:scale-110"
              />
              <span className="text-2xl font-display font-semibold text-foreground">
                Naaz Studio
              </span>
            </Link>
            
            <div className="flex items-center gap-4 md:gap-6">
              {/* 24/7 Availability Badge */}
              <Badge 
                variant="outline" 
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border-primary/30 text-primary bg-primary/5"
              >
                <Clock className="h-3.5 w-3.5" />
                <span>24/7</span>
              </Badge>

              <Link 
                to="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <button
                onClick={() => navigate({ to: '/book' })}
                className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-soft"
              >
                Book Now
              </button>
              <LoginButton />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-card/30 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-6">
            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a 
                  href="tel:+919392570180" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  +91 93925 70180
                </a>
              </div>
              <div className="hidden sm:block text-muted-foreground">•</div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a 
                  href="tel:+919550935579" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  +91 95509 35579
                </a>
              </div>
            </div>

            {/* Service Area Information */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Serving Hyderabad, Secunderabad, and outskirts</span>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>© {currentYear} Naaz Studio. All rights reserved.</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Built with</span>
                <Sparkles className="h-4 w-4 text-primary" />
                <span>using</span>
                <a 
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  caffeine.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
