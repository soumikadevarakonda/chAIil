// src/app/hospitals/page.tsx
'use client'
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/language-context';
import { List, MapPin, Phone, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type Hospital = {
    id: number;
    lat: number;
    lon: number;
    tags: {
        name: string;
        "addr:street"?: string;
        "addr:city"?: string;
        "addr:postcode"?: string;
        phone?: string;
    }
}

export default function HospitalsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('Vijayawada');
  const [displayQuery, setDisplayQuery] = useState('Vijayawada');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [mapUrl, setMapUrl] = useState("https://placehold.co/600x800");

  const searchHospitals = async (query: string) => {
    if (!query) return;
    
    setLoading(true);
    setDisplayQuery(query);
    setHospitals([]);
    setMapUrl("https://placehold.co/600x800");

    try {
        // 1. Geocode the search query to get lat/lon
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
        const geoData = await geoResponse.json();

        if (!geoData || geoData.length === 0) {
            toast({
                title: "Location not found",
                description: "Please try a different city or pincode.",
                variant: "destructive"
            });
            setLoading(false);
            return;
        }

        const { lat, lon } = geoData[0];

        // 2. Use Overpass API to find hospitals nearby
        const overpassQuery = `
            [out:json];
            (
              node["amenity"="hospital"](around:10000, ${lat}, ${lon});
              way["amenity"="hospital"](around:10000, ${lat}, ${lon});
              relation["amenity"="hospital"](around:10000, ${lat}, ${lon});
            );
            out center;
        `;
        const overpassResponse = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
        const hospitalData = await overpassResponse.json();
        
        const foundHospitals = hospitalData.elements.filter((h: any) => h.tags?.name);
        setHospitals(foundHospitals);

        if (foundHospitals.length > 0) {
            const firstHospital = foundHospitals[0];
            setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${firstHospital.lon-0.05}%2C${firstHospital.lat-0.05}%2C${firstHospital.lon+0.05}%2C${firstHospital.lat+0.05}&layer=mapnik&marker=${firstHospital.lat}%2C${firstHospital.lon}`);
        } else {
             toast({
                title: "No hospitals found",
                description: "No hospitals were found near the specified location.",
            });
        }

    } catch (error) {
        console.error("Error fetching hospital data:", error);
        toast({
            title: "Search failed",
            description: "Could not fetch hospital data. Please try again later.",
            variant: "destructive"
        });
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    searchHospitals('Vijayawada');
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    searchHospitals(searchQuery);
  }
  
  const getAddress = (tags: Hospital['tags']) => {
      return [tags['addr:street'], tags['addr:city'], tags['addr:postcode']].filter(Boolean).join(', ');
  }

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
                    <form onSubmit={handleSearchSubmit} className="flex w-full items-center space-x-2">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                type="text" 
                                placeholder={t('hospitals_search_placeholder')} 
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('hospitals_search_button')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('hospitals_sample_title')} {displayQuery}</CardTitle>
                </CardHeader>
                <CardContent>
                   {loading ? (
                     <div className="flex items-center justify-center p-8">
                         <Loader2 className="h-8 w-8 animate-spin text-primary" />
                     </div>
                   ) : (
                    <div className="flex flex-col gap-4">
                        {hospitals.length > 0 ? (
                            hospitals.map(hospital => (
                                <div key={hospital.id} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                                    <div className="bg-secondary p-3 rounded-lg mt-1">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{hospital.tags.name}</h3>
                                        <p className="text-sm text-muted-foreground">{getAddress(hospital.tags) || 'Address not available'}</p>
                                        {hospital.tags.phone && (
                                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                                <Phone className="w-4 h-4"/>
                                                <a href={`tel:${hospital.tags.phone}`} className="hover:text-primary">{hospital.tags.phone}</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                           <p className="text-center text-muted-foreground py-4">No hospitals found for this location.</p> 
                        )}
                    </div>
                   )}
                </CardContent>
            </Card>
        </div>

        <Card className="overflow-hidden lg:sticky lg:top-24 h-[500px] lg:h-auto">
             {mapUrl.startsWith('https') && mapUrl.includes('openstreetmap.org') ? (
                 <iframe
                    width="100%"
                    height="100%"
                    className="border-0"
                    loading="lazy"
                    allowFullScreen
                    src={mapUrl}
                ></iframe>
             ) : (
                <Image
                    src={mapUrl}
                    data-ai-hint="map city"
                    alt="Map of hospitals"
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                />
             )}
        </Card>
      </div>
    </div>
  );
}
