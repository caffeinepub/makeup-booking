import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioGalleryProps {
  images: string[];
  columns?: 2 | 3 | 4;
}

export default function PortfolioGallery({ images, columns = 3 }: PortfolioGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns];

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  return (
    <>
      <div className={`grid ${colClass} gap-3`}>
        {images.map((src, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
            onClick={() => setSelectedIndex(i)}
          >
            <img
              src={src}
              alt={`Portfolio ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-5 h-5" />
          </Button>
          {selectedIndex !== null && (
            <div className="relative flex items-center justify-center min-h-[60vh]">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 text-white hover:bg-white/20 z-10"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <img
                src={images[selectedIndex]}
                alt={`Portfolio ${selectedIndex + 1}`}
                className="max-h-[85vh] max-w-full object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 text-white hover:bg-white/20 z-10"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
