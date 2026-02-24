import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { Phone, MapPin, Clock } from 'lucide-react';
import LoginButton from './LoginButton';
import ProfileSetupModal from './ProfileSetupModal';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Book Now', path: '/booking' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate({ to: '/' })}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-display">N</span>
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground tracking-wide">
                  Naaz Studio
                </h1>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-muted-foreground">Available 24/7</span>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate({ to: link.path })}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? 'text-primary border-b-2 border-primary pb-0.5'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LoginButton />
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="flex md:hidden items-center gap-4 mt-2 pt-2 border-t border-border/50">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary border-b-2 border-primary pb-0.5'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold font-display">N</span>
                </div>
                <span className="font-display text-lg font-bold text-foreground">Naaz Studio</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional makeup artistry for your most special moments. Bridal, party, and traditional looks crafted with expertise.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Contact</h3>
              <div className="space-y-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +91 98765 43210
                </a>
                <a
                  href="tel:+919876543211"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +91 98765 43211
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Available 24/7
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Service Area</h3>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Serving Hyderabad, Secunderabad, and outskirts</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Naaz Studio. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'naaz-studio')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {showProfileSetup && <ProfileSetupModal />}
    </div>
  );
}
