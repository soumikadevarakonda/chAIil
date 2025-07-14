'use client'
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/language-context';
import { List, MapPin, Phone } from 'lucide-react';

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

      <Card>
        <CardContent className="pt-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder={t('hospitals_search_placeholder')} />
                <Button type="submit">{t('hospitals_search_button')}</Button>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>{t('hospitals_sample_title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {hospitals.map(hospital => (
                        <div key={hospital.name} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="bg-secondary p-3 rounded-md">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{hospital.name}</h3>
                                <p className="text-sm text-muted-foreground">{hospital.address}</p>
                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                    <Phone className="w-3 h-3"/>
                                    <span>{hospital.phone}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <Image
            src="https://placehold.co/600x400"
            data-ai-hint="map city"
            alt="Map of hospitals"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </Card>
      </div>
    </div>
  );
}
