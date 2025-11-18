import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const TOUR_DATA = {
  title: 'Усадьба "Сельские истории"',
  location: 'д. Красное, Тверская область',
  organizer: 'Ферма "Зелёный край"',
  rating: 4.8,
  reviewsCount: 127,
  price: 4500,
  duration: '2 дня / 1 ночь',
  season: 'Круглый год',
  images: [
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
    'https://cdn.poehali.dev/projects/6b7c7e81-1760-444c-9bc4-61eb0658d395/files/c9f0911b-697d-4684-a886-391fe40a6d69.jpg',
    'https://cdn.poehali.dev/projects/6b7c7e81-1760-444c-9bc4-61eb0658d395/files/c9b553ef-be3c-432a-9949-a089dc5ce1af.jpg',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800'
  ],
  description: 'Погрузитесь в аутентичную сельскую жизнь, попробуйте свежие фермерские продукты и насладитесь тишиной природы. Идеально для семей с детьми и городских жителей, мечтающих о перезагрузке.',
  mapCoords: { lat: 56.8587, lng: 35.9176 }
};

const PROGRAM = [
  {
    day: 'День 1',
    time: '10:00 - 18:00',
    title: 'Прибытие и знакомство с фермой',
    activities: ['Встреча гостей и размещение в гостевом доме', 'Экскурсия по ферме с дегустацией молочных продуктов', 'Мастер-класс по приготовлению сыра', 'Ужин из фермерских продуктов у костра']
  },
  {
    day: 'День 2',
    time: '08:00 - 16:00',
    title: 'Активный день на природе',
    activities: ['Завтрак с видом на озеро', 'Сбор ягод и грибов в лесу (по сезону)', 'Рыбалка на пруду или катание на лошадях', 'Обед на свежем воздухе', 'Отъезд с корзиной фермерских продуктов']
  }
];

const INCLUDED = [
  { icon: 'Home', text: 'Проживание в гостевом доме' },
  { icon: 'UtensilsCrossed', text: 'Трёхразовое питание' },
  { icon: 'Grape', text: 'Все экскурсии и мастер-классы' },
  { icon: 'ShieldCheck', text: 'Страхование на территории' }
];

const NOT_INCLUDED = [
  { icon: 'Car', text: 'Трансфер из города' },
  { icon: 'Wine', text: 'Алкогольные напитки' },
  { icon: 'Bike', text: 'Прокат велосипедов' }
];

const EXTRA_SERVICES = [
  { name: 'Катание на квадроциклах', price: 1500 },
  { name: 'Конная прогулка (1 час)', price: 1200 },
  { name: 'Баня на дровах', price: 2000 },
  { name: 'Рыболовные снасти', price: 500 }
];

const ACCOMMODATION = {
  type: 'Гостевой дом',
  capacity: '2-4 человека',
  amenities: ['Отдельный санузел', 'Кухня', 'Wi-Fi', 'Камин', 'Терраса'],
  photo: 'https://cdn.poehali.dev/projects/6b7c7e81-1760-444c-9bc4-61eb0658d395/files/c9f0911b-697d-4684-a886-391fe40a6d69.jpg'
};

const REVIEWS = [
  { id: 1, name: 'Мария К.', date: '15 октября 2024', rating: 5, text: 'Потрясающий отдых! Дети в восторге от животных, а мы с мужем наконец выспались. Сыр собственного изготовления увезли домой.' },
  { id: 2, name: 'Александр П.', date: '8 сентября 2024', rating: 5, text: 'Очень душевное место. Хозяева приветливые, еда невероятно вкусная. Вернёмся обязательно!' },
  { id: 3, name: 'Ольга В.', date: '22 августа 2024', rating: 4, text: 'Красивая природа, чистый воздух. Единственный минус – не очень удобно добираться на общественном транспорте.' }
];

const FAQ_ITEMS = [
  { question: 'Можно ли приехать с детьми?', answer: 'Да, тур подходит для детей от 3 лет. На территории есть детская площадка и безопасные зоны для игр.' },
  { question: 'Как добраться без машины?', answer: 'Из Твери ходят автобусы до деревни (2 раза в день). Также можем организовать трансфер за дополнительную плату.' },
  { question: 'Можно ли привезти собаку?', answer: 'К сожалению, размещение с домашними животными не предусмотрено.' },
  { question: 'Что взять с собой?', answer: 'Удобную одежду и обувь для прогулок, средства от комаров летом, тёплые вещи для вечера.' }
];

export default function Index() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState<Date>();

  const totalPrice = TOUR_DATA.price * adults + (TOUR_DATA.price * 0.7 * children);

  return (
    <div className="min-h-screen bg-background">
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

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-12">
          <section>
            <p className="text-lg leading-relaxed text-muted-foreground">{TOUR_DATA.description}</p>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <Icon name="User" size={18} />
              <span>Организатор: <a href="#" className="text-primary hover:underline font-medium">{TOUR_DATA.organizer}</a></span>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Calendar" size={28} />
              Программа тура
            </h2>
            <div className="space-y-4">
              {PROGRAM.map((day, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{day.day}</h3>
                        <Badge variant="outline">{day.time}</Badge>
                      </div>
                      <p className="font-medium text-muted-foreground mb-3">{day.title}</p>
                      <ul className="space-y-2">
                        {day.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full md:w-auto">
              <Icon name="Download" size={18} className="mr-2" />
              Скачать программу PDF
            </Button>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="CheckCircle2" size={22} className="text-green-600" />
                Включено в стоимость
              </h3>
              <ul className="space-y-3">
                {INCLUDED.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Icon name={item.icon as any} size={20} className="text-primary" />
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="XCircle" size={22} className="text-orange-600" />
                Не включено
              </h3>
              <ul className="space-y-3">
                {NOT_INCLUDED.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Icon name={item.icon as any} size={20} className="text-muted-foreground" />
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">Доп. услуги на месте</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {EXTRA_SERVICES.map((service, idx) => (
                <Card key={idx} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                  <span className="text-sm font-medium">{service.name}</span>
                  <span className="text-primary font-semibold">{service.price} ₽</span>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="BedDouble" size={28} />
              Размещение
            </h2>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <img 
                  src={ACCOMMODATION.photo}
                  alt="Номер"
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{ACCOMMODATION.type}</h3>
                  <p className="text-muted-foreground mb-4">Вместимость: {ACCOMMODATION.capacity}</p>
                  <ul className="space-y-2">
                    {ACCOMMODATION.amenities.map((amenity, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="MapPin" size={28} />
              Как добраться
            </h2>
            <Card className="overflow-hidden">
              <div className="h-64 bg-muted relative">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200"
                  alt="Карта"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="shadow-xl">
                    <Icon name="Navigation" size={20} className="mr-2" />
                    Построить маршрут
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-3">Варианты транспорта:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Car" size={18} className="mt-0.5 flex-shrink-0" />
                    <span><strong>На машине:</strong> 180 км от Москвы по Ленинградскому шоссе (2.5 часа)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Train" size={18} className="mt-0.5 flex-shrink-0" />
                    <span><strong>На поезде:</strong> Электричка Москва - Тверь, далее автобус до деревни</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Идея для вас:</strong> Вы можете добраться поездом и самолётом. Бронируйте билеты в разделе "Авиабилеты" и "Ж/Д"
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Забронируйте билеты и отели</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon name="Plane" size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Авиабилеты</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Найдите выгодные рейсы в Тверь</p>
                <Button className="w-full" variant="outline">Найти билеты</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon name="Train" size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold">Ж/Д билеты</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Комфортная дорога на поезде</p>
                <Button className="w-full" variant="outline">Найти билеты</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Icon name="Hotel" size={24} className="text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Отели</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Дополнительное жильё в Твери</p>
                <Button className="w-full" variant="outline">Найти отели</Button>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="MessageSquare" size={28} />
              Отзывы ({TOUR_DATA.reviewsCount})
            </h2>
            <div className="space-y-4">
              {REVIEWS.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{review.text}</p>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full md:w-auto">
              Показать все отзывы
            </Button>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Частые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQ_ITEMS.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Похожие туры</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400`}
                    alt=""
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Тур #{i}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">2 дня</span>
                      <span className="font-bold text-primary">от 3900 ₽</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="md:col-span-1">
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
        </div>
      </div>
    </div>
  );
}
