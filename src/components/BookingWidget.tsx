import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TOUR_DATA } from '@/data/tour-data';

interface BookingWidgetProps {
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function BookingWidget({ adults, setAdults, children, setChildren, date, setDate }: BookingWidgetProps) {
  const totalPrice = TOUR_DATA.price * adults + (TOUR_DATA.price * 0.7 * children);

  return (
    <Card className="p-6 sticky top-6 shadow-xl">
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
        </div>
        <p className="text-sm text-muted-foreground">за {adults + children} {adults + children === 1 ? 'человека' : 'человек'}</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Дата заезда</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <Icon name="Calendar" size={18} className="mr-2" />
                {date ? format(date, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ru}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Взрослые</label>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setAdults(Math.max(1, adults - 1))}
            >
              <Icon name="Minus" size={18} />
            </Button>
            <span className="flex-1 text-center font-semibold">{adults}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setAdults(adults + 1)}
            >
              <Icon name="Plus" size={18} />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Дети (до 12 лет)</label>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setChildren(Math.max(0, children - 1))}
            >
              <Icon name="Minus" size={18} />
            </Button>
            <span className="flex-1 text-center font-semibold">{children}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setChildren(children + 1)}
            >
              <Icon name="Plus" size={18} />
            </Button>
          </div>
          {children > 0 && (
            <p className="text-xs text-muted-foreground mt-2">Скидка 30% на детей</p>
          )}
        </div>
      </div>

      <Button className="w-full mt-6" size="lg">
        <Icon name="Calendar" size={20} className="mr-2" />
        Забронировать
      </Button>

      <Separator className="my-6" />

      <div className="space-y-3">
        <Button variant="outline" className="w-full">
          <Icon name="Plane" size={18} className="mr-2" />
          Найти билеты
        </Button>
        <Button variant="outline" className="w-full">
          <Icon name="Hotel" size={18} className="mr-2" />
          Найти отели
        </Button>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground">
          <Icon name="ShieldCheck" size={14} className="inline mr-1" />
          Бесплатная отмена за 7 дней до заезда
        </p>
      </div>
    </Card>
  );
}
