import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, MapPin } from 'lucide-react';

interface ServiceCategoryCardProps {
  name: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  onBook: () => void;
  location?: string;
}

export default function ServiceCategoryCard({
  name,
  description,
  duration,
  price,
  image,
  onBook,
  location,
}: ServiceCategoryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/30 group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-display font-bold text-white mb-1">
            {name}
          </h3>
          <div className="flex items-center gap-3 text-white/90 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-lg font-bold">${price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <CardHeader>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
        {location && (
          <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/50">
            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground leading-relaxed">
              {location}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onBook}>
          Book This Service
        </Button>
      </CardContent>
    </Card>
  );
}
