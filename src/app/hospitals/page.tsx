// src/app/hospitals/page.tsx
'use client'
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/language-context';
import { List, MapPin, Phone, Search } from 'lucide-react';

const hospitals = [
    {
        name: "Rainbow Children's Hospital",
        address: "Banjara Hills, Hyderabad",
        phone: "040 4466 5555"
    },
    {
        name: "Fernandez Hospital",
        address: "Hyderguda, Hyderabad",
        phone: "040 4052 8888"
    },
    {
        name: "Apollo Cradle",
        address: "Jubilee Hills, Hyderabad",
        phone: "040 4424 4424"
    },
    {
        name: "Lotus Children's Hospital",
        address: "Lakdikapul, Hyderabad",
        phone: "040 4040 4040"
    }
]

export default function HospitalsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('hospitals_title')}</h1>
        <p className="text-muted-foreground">{t('hospitals_subtitle')}</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t('hospitals_search_button')}</CardTitle>
                    <CardDescription>{t('hospitals_search_placeholder')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full items-center space-x-2">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input type="text" placeholder={t('hospitals_search_placeholder')} className="pl-10" />
                        </div>
                        <Button type="submit">{t('hospitals_search_button')}</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('hospitals_sample_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {hospitals.map(hospital => (
                            <div key={hospital.name} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                                <div className="bg-secondary p-3 rounded-lg mt-1">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                                    <p className="text-sm text-muted-foreground">{hospital.address}</p>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                        <Phone className="w-4 h-4"/>
                                        <a href={`tel:${hospital.phone}`} className="hover:text-primary">{hospital.phone}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card className="overflow-hidden lg:sticky lg:top-24 h-[500px] lg:h-auto">
          <Image
            src="https://placehold.co/600x800"
            data-ai-hint="map city"
            alt="Map of hospitals"
            width={600}
            height={800}
            className="w-full h-full object-cover"
          />
        </Card>
      </div>
    </div>
  );
}
