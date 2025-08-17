import { getCharacters } from '@/lib/data';
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Skull,
  HelpCircle,
  Orbit,
  Bot,
  User as UserIcon,
  PawPrint,
} from 'lucide-react';

function StatusIcon({ status }: { status?: string | null }) {
  const s = (status || '').toLowerCase();
  if (s === 'alive') return <HeartPulse className="h-4 w-4 text-emerald-500" />;
  if (s === 'dead') return <Skull className="h-4 w-4 text-red-500" />;
  return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
}

function SpeciesIcon({ species }: { species?: string | null }) {
  const sp = (species || '').toLowerCase();
  if (sp === 'human') return <UserIcon className="h-4 w-4" />;
  if (sp === 'alien') return <Orbit className="h-4 w-4" />;
  if (sp === 'robot' || sp === 'cyborg') return <Bot className="h-4 w-4" />;
  return <PawPrint className="h-4 w-4" />;
}

export async function CharactersList({ page, name, status, species, type, gender, showPagination = true }: {
  page: number;
  name: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  showPagination?: boolean;
}) {
  const data = await getCharacters({
    page,
    name: name || undefined,
    status: status || undefined,
    species: species || undefined,
    type: type || undefined,
    gender: gender || undefined,
  });

  if (!data?.results?.length) {
    return <p className="text-muted-foreground">No characters found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {data.results!.map((c) => (
          <Link
            key={c!.id}
            href={`/characters/${c!.id}`}
            aria-label={c?.name ? `View details for ${c.name}` : 'View character'}
            className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Card className="flex h-full flex-col p-4 space-y-3 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
              <div className="relative h-40 sm:h-36 md:h-40 w-full overflow-hidden rounded-xl bg-muted">
                {c?.image && (
                  <Image
                    src={c.image}
                    alt={c?.name ?? 'Character'}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                )}
                {c?.status && (
                  <div className="absolute top-2 left-2">
                    <Badge variant={c.status === 'Alive' ? 'success' : c.status === 'Dead' ? 'destructive' : 'muted'}>
                      {c.status}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold tracking-tight group-hover:underline underline-offset-4 line-clamp-2">
                  {c?.name}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><SpeciesIcon species={c?.species ?? undefined} />{c?.species}</span>
                  <span className="inline-flex items-center gap-1"><StatusIcon status={c?.status ?? undefined} />{c?.status}</span>
                </p>
                <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Origin: {c?.origin?.name}</span>
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {showPagination && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <PageLink disabled={!data.info?.prev} page={data.info?.prev} name={name} status={status} species={species} type={type} gender={gender}>Prev</PageLink>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.info?.pages ?? '?'}
          </span>
          <PageLink disabled={!data.info?.next} page={data.info?.next} name={name} status={status} species={species} type={type} gender={gender}>Next</PageLink>
        </div>
      )}
    </>
  );
}

function PageLink({
  disabled,
  page,
  name,
  status,
  species,
  type,
  gender,
  children,
}: {
  disabled?: boolean;
  page?: number | null;
  name: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  children: React.ReactNode;
}) {
  const params = new URLSearchParams();
  if (page) params.set('page', String(page));
  if (name) params.set('name', name);
  if (status) params.set('status', status);
  if (species) params.set('species', species);
  if (type) params.set('type', type);
  if (gender) params.set('gender', gender);
  const href = page ? `/characters?${params.toString()}` : '#';
  return disabled ? (
    <Button variant="outline" disabled className="rounded-full">
      {children}
    </Button>
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
