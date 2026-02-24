import { IndianRupee, Clock, MapPin } from 'lucide-react';

interface ServiceCategoryCardProps {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price?: number;
  duration?: number;
  location?: string;
  onClick?: () => void;
}

export default function ServiceCategoryCard({
  name,
  imageUrl,
  price,
  duration,
  location,
  onClick,
}: ServiceCategoryCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-display text-lg font-bold mb-1">{name}</h3>
        <div className="flex items-center gap-3 text-sm text-white/90">
          {price !== undefined && (
            <span className="flex items-center gap-0.5">
              <IndianRupee className="w-3.5 h-3.5" />
              {price.toLocaleString('en-IN')}
            </span>
          )}
          {duration !== undefined && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration} min
            </span>
          )}
        </div>
        {location && (
          <div className="flex items-center gap-1 text-xs text-white/80 mt-1">
            <MapPin className="w-3 h-3" />
            {location}
          </div>
        )}
      </div>
    </div>
  );
}
