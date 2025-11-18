import { useState } from 'react';
import { TourHero } from '@/components/TourHero';
import { TourContent } from '@/components/TourContent';
import { BookingWidget } from '@/components/BookingWidget';

export default function Index() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState<Date>();

  return (
    <div className="min-h-screen bg-background">
      <TourHero 
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        isGalleryOpen={isGalleryOpen}
        setIsGalleryOpen={setIsGalleryOpen}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <TourContent />
        </div>

        <div className="md:col-span-1">
          <BookingWidget 
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
    </div>
  );
}
