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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <BookingWidget 
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            date={date}
            setDate={setDate}
          />
        </div>
        
        <TourContent />
      </div>
    </div>
  );
}