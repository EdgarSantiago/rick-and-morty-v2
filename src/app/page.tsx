import { Hero } from '@/components/hero';
import { Suspense } from 'react';
import { CharactersList } from '@/components/characters-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LocationsList } from '@/components/locations-list';
import { EpisodesList } from '@/components/episodes-list';
import { CharactersGridSkeleton, LocationsGridSkeleton, EpisodesGridSkeleton } from '@/components/skeletons';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto p-6 space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Characters</h2>
        <Suspense fallback={<CharactersGridSkeleton count={12} />}>
          {/* Reuse the server list, hide pagination on home */}
          <CharactersList page={1} name="" showPagination={false} />
        </Suspense>
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/characters">See more</Link>
          </Button>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Episodes</h2>
        <Suspense fallback={<EpisodesGridSkeleton count={6} />}>
          <EpisodesList page={1} name="" showPagination={false} />
        </Suspense>
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/episodes">See more</Link>
          </Button>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Locations</h2>
        <Suspense fallback={<LocationsGridSkeleton count={6} />}>
          <LocationsList page={1} name="" showPagination={false} />
        </Suspense>
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/locations">See more</Link>
          </Button>
        </div>
      </section>
      </div>
    </>
  );
}
