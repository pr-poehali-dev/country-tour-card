import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { TOUR_DATA } from '@/data/tour-data';

interface TourHeroProps {
  currentImage: number;
  setCurrentImage: (index: number) => void;
  isGalleryOpen: boolean;
  setIsGalleryOpen: (open: boolean) => void;
}

export function TourHero({ currentImage, setCurrentImage, isGalleryOpen, setIsGalleryOpen }: TourHeroProps) {
  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={TOUR_DATA.images[currentImage]} 
          alt={TOUR_DATA.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
              {TOUR_DATA.duration}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
              {TOUR_DATA.season}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{TOUR_DATA.title}</h1>
          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              <span>{TOUR_DATA.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
              <span>{TOUR_DATA.rating} ({TOUR_DATA.reviewsCount} отзывов)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex gap-2">
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
              <Icon name="Images" size={18} className="mr-2" />
              Все фото
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl h-[90vh] p-0">
            <div className="relative h-full">
              <img 
                src={TOUR_DATA.images[currentImage]}
                alt=""
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {TOUR_DATA.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      idx === currentImage ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : TOUR_DATA.images.length - 1))}
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                onClick={() => setCurrentImage((prev) => (prev < TOUR_DATA.images.length - 1 ? prev + 1 : 0))}
              >
                <Icon name="ChevronRight" size={24} />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="absolute bottom-6 right-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-2xl hidden md:block cursor-pointer hover-scale">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400"
          alt="Карта"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
          <Icon name="MapPin" size={32} className="text-white drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
}
