import { getLocations } from '@/lib/data';
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe2, Tag, Users, ChevronLeft, ChevronRight, Building2, HelpCircle } from 'lucide-react';

function TypeIcon({ type }: { type?: string | null }) {
  const t = (type || '').toLowerCase();
  if (t.includes('planet')) return <Globe2 className="h-3.5 w-3.5" />;
  if (t.includes('space') || t.includes('station')) return <Building2 className="h-3.5 w-3.5" />;
  if (t.includes('unknown')) return <HelpCircle className="h-3.5 w-3.5" />;
  return <Tag className="h-3.5 w-3.5" />;
}

export async function LocationsList({ page, name, type, dimension, showPagination = true }: {
  page: number;
  name: string;
  type?: string;
  dimension?: string;
  showPagination?: boolean;
}) {
  const data = await getLocations({ page, name: name || undefined, type: type || undefined, dimension: dimension || undefined });

  if (!data?.results?.length) {
    return <p className="text-muted-foreground">No locations found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {data.results!.map((l) => (
          <Link key={l!.id} href={`/locations/${l!.id}`} className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <Card className="p-4 h-full space-y-2 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
              <h3 className="font-semibold tracking-tight group-hover:underline underline-offset-4">{l?.name}</h3>
              <div className="flex flex-wrap gap-2">
                {l?.type && (
                  <Badge variant="secondary" className="inline-flex items-center gap-1">
                    <TypeIcon type={l.type} />{l.type}
                  </Badge>
                )}
                {l?.dimension && <Badge variant="outline" className="text-muted-foreground inline-flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" />{l.dimension}</Badge>}
              </div>
              <p className="text-xs text-muted-foreground inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Residents: {l?.residents?.length ?? 0}</p>
            </Card>
          </Link>
        ))}
      </div>

      {showPagination && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <PageLink disabled={!data.info?.prev} page={data.info?.prev} name={name} type={type} dimension={dimension}>Prev</PageLink>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.info?.pages ?? '?'}
          </span>
          <PageLink disabled={!data.info?.next} page={data.info?.next} name={name} type={type} dimension={dimension}>Next</PageLink>
        </div>
      )}
    </>
  );
}

function PageLink({
  disabled,
  page,
  name,
  type,
  dimension,
  children,
}: {
  disabled?: boolean;
  page?: number | null;
  name: string;
  type?: string;
  dimension?: string;
  children: React.ReactNode;
}) {
  const params = new URLSearchParams();
  if (page) params.set('page', String(page));
  if (name) params.set('name', name);
  if (type) params.set('type', type);
  if (dimension) params.set('dimension', dimension);
  const href = page ? `/locations?${params.toString()}` : '#';
  return disabled ? (
    <Button variant="outline" disabled className="rounded-full">{children}</Button>
  ) : (
    <Button variant="outline" asChild className="rounded-full">
      <Link href={href}>
        {children}
        {children === 'Next' ? <ChevronRight className="ml-1 h-4 w-4" /> : null}
        {children === 'Prev' ? <ChevronLeft className="mr-1 h-4 w-4" /> : null}
      </Link>
    </Button>
  );
}
