import { useState } from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface PortfolioGalleryProps {
  images: string[];
  title?: string;
  description?: string;
}

export default function PortfolioGallery({ images, title, description }: PortfolioGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
            <X className="h-6 w-6 text-white" />
          </DialogClose>
          {selectedImage && (
            <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
              <img
                src={selectedImage}
                alt="Portfolio detail"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
