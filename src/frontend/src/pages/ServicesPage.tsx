import { useGetAllServices } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import ServiceCategoryCard from '@/components/ServiceCategoryCard';

export default function ServicesPage() {
  const { data: services, isLoading } = useGetAllServices();
  const navigate = useNavigate();

  // Map service names to portfolio images
  const getServiceImage = (serviceName: string): string => {
    const name = serviceName.toLowerCase();
    
    if (name.includes('bridal')) {
      return '/assets/IMG-20260222-WA0005.jpg';
    } else if (name.includes('party')) {
      return '/assets/IMG-20260222-WA0004.jpg';
    } else if (name.includes('traditional')) {
      return '/assets/IMG-20260222-WA0003.jpg';
    } else if (name.includes('engagement')) {
      return '/assets/IMG-20260222-WA0002.jpg';
    } else if (name.includes('hair')) {
      return '/assets/IMG-20260222-WA0010.jpg';
    } else {
      return '/assets/IMG-20260222-WA0008.jpg';
    }
  };

  // Get location for specific services
  const getServiceLocation = (serviceName: string): string | undefined => {
    const name = serviceName.toLowerCase();
    
    if (name.includes('massage') || name.includes('body')) {
      return 'Naaz Studio, 123 Beauty Lane, Downtown District';
    }
    
    return undefined;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Our Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our range of professional makeup services tailored to enhance your natural beauty
        </p>
      </div>

      {services && services.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCategoryCard
              key={service.id.toString()}
              name={service.name}
              description={service.description}
              duration={Number(service.duration)}
              price={service.price}
              image={getServiceImage(service.name)}
              onBook={() => navigate({ to: '/book' })}
              location={getServiceLocation(service.name)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No services available at the moment.</p>
        </div>
      )}
    </div>
  );
}
