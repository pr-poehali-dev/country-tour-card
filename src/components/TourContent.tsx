import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { TOUR_DATA, PROGRAM, INCLUDED, NOT_INCLUDED, EXTRA_SERVICES, ACCOMMODATION, REVIEWS, FAQ_ITEMS } from '@/data/tour-data';

export function TourContent() {
  return (
    <div className="space-y-12">
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
  );
}
