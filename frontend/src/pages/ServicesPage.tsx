import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import ServiceCategoryCard from '../components/ServiceCategoryCard';
import LeadCaptureModal from '../components/LeadCaptureModal';

const serviceCategories = [
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    image: '/assets/generated/bridal-makeup.dim_400x300.png',
    price: 5000,
    duration: 120,
  },
  {
    id: 'party-makeup',
    name: 'Party Makeup',
    image: '/assets/generated/party-makeup.dim_400x300.png',
    price: 2000,
    duration: 60,
  },
  {
    id: 'hairstyles',
    name: 'Hairstyles',
    image: '/assets/generated/hairstyles.dim_400x300.png',
    price: 1500,
    duration: 60,
  },
  {
    id: 'elegant-looks',
    name: 'Elegant Looks',
    image: '/assets/generated/elegant-looks.dim_400x300.png',
    price: 2500,
    duration: 90,
  },
  {
    id: 'traditional-looks',
    name: 'Traditional Looks',
    image: '/assets/generated/traditional-looks.dim_400x300.png',
    price: 3000,
    duration: 90,
  },
  {
    id: 'saree-draping',
    name: 'Saree Draping',
    image: '/assets/generated/saree-draping.dim_400x300.png',
    price: 1000,
    duration: 30,
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleCategoryClick = (category: { id: string; name: string }) => {
    setSelectedCategory(category);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-card py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            From bridal glamour to everyday elegance — we offer a full range of professional makeup and styling services.
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/booking' })}
            className="rounded-full px-8"
          >
            Book an Appointment
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <ServiceCategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                imageUrl={category.image}
                price={category.price}
                duration={category.duration}
                onClick={() => handleCategoryClick({ id: category.id, name: category.name })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Ready to Book?
          </h2>
          <p className="text-muted-foreground mb-8">
            Schedule your appointment and let us create the perfect look for your occasion.
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/booking' })}
            className="rounded-full px-10"
          >
            Book Now
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {selectedCategory && (
        <LeadCaptureModal
          isOpen={isLeadModalOpen}
          onClose={() => {
            setIsLeadModalOpen(false);
            setSelectedCategory(null);
          }}
          serviceCategory={selectedCategory.id}
          serviceName={selectedCategory.name}
        />
      )}
    </div>
  );
}
