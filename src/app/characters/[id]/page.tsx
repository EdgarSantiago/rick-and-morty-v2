import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCharacter } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, HeartPulse, Skull, HelpCircle, User as UserIcon, Orbit, Bot, PawPrint } from 'lucide-react';
import { EpisodeCard } from '@/components/episode-card';

export const revalidate = 3600;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) return notFound();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" className="rounded-full" aria-label="Back to characters">
          <Link href="/characters"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
          {character.image && (
            <Image src={character.image} alt={character.name ?? 'Character'} fill className="object-cover" />
          )}
          {character.status && (
            <div className="absolute top-3 left-3">
              <Badge variant={character.status === 'Alive' ? 'success' : character.status === 'Dead' ? 'destructive' : 'muted'}>
                {character.status}
              </Badge>
            </div>
          )}
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{character.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              {character.species && (
                <Badge variant="secondary" className="inline-flex items-center gap-1">
                  {(character.species.toLowerCase() === 'human') ? <UserIcon className="h-3.5 w-3.5" /> : character.species.toLowerCase() === 'alien' ? <Orbit className="h-3.5 w-3.5" /> : (character.species.toLowerCase() === 'robot' || character.species.toLowerCase() === 'cyborg') ? <Bot className="h-3.5 w-3.5" /> : <PawPrint className="h-3.5 w-3.5" />}
                  {character.species}
                </Badge>
              )}
              {character.type && <Badge variant="outline" className="text-muted-foreground">{character.type}</Badge>}
              {character.gender && <Badge variant="outline" className="text-muted-foreground">{character.gender}</Badge>}
            </div>
            <div className="text-sm text-muted-foreground flex flex-col gap-1">
              <div className="inline-flex items-center gap-2">
                {character.status?.toLowerCase() === 'alive' ? <HeartPulse className="h-4 w-4 text-emerald-500" /> : character.status?.toLowerCase() === 'dead' ? <Skull className="h-4 w-4 text-red-500" /> : <HelpCircle className="h-4 w-4" />}
                <span>Status: {character.status}</span>
              </div>
              {character.origin?.id && (
                <Link href={`/locations/${character.origin.id}`} className="inline-flex items-center gap-2 hover:underline">
                  <MapPin className="h-4 w-4" /> Origin: {character.origin.name}
                </Link>
              )}
              {character.location?.id && (
                <Link href={`/locations/${character.location.id}`} className="inline-flex items-center gap-2 hover:underline">
                  <MapPin className="h-4 w-4" /> Last known: {character.location.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {!!character.episode?.length && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {character.episode!.map((e) => (
              <EpisodeCard key={e!.id} id={String(e!.id)} name={e?.name ?? ''} code={e?.episode ?? ''} airDate={e?.air_date ?? ''} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
