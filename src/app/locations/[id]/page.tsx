import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocation } from '@/lib/data';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe2, Tag } from 'lucide-react';

export const revalidate = 3600;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const location = await getLocation(id);
  if (!location) return notFound();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" className="rounded-full" aria-label="Back to locations">
          <Link href="/locations"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{location.name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {location.type && <Badge variant="secondary" className="inline-flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{location.type}</Badge>}
          {location.dimension && <Badge variant="outline" className="text-muted-foreground inline-flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" />{location.dimension}</Badge>}
        </div>
      </div>

      {!!location.residents?.length && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Residents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {location.residents!.map((r) => (
              <Link key={r!.id} href={`/characters/${r!.id}`} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                <Card className="p-4 space-y-2 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                    {r?.image && (
                      <Image src={r.image} alt={r?.name ?? 'Character'} fill className="object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
                    )}
                  </div>
                  <h3 className="font-semibold tracking-tight group-hover:underline underline-offset-4">{r?.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
