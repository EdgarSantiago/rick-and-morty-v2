import { Suspense } from 'react';
import { EpisodesList } from '@/components/episodes-list';
import { EpisodesGridSkeleton } from '@/components/skeletons';
import { EpisodeSearchBar } from './search-bar';

export const metadata = { title: 'Episodes' };
export const revalidate = 3600; // seconds

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string; episode?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const name = sp.name ?? '';
  const episode = sp.episode ?? '';

  return (
    <div className="container mx-auto p-6 space-y-6">
      <EpisodeSearchBar defaultName={name} defaultEpisode={episode} />
      <Suspense key={`${page}-${name}-${episode}`} fallback={<EpisodesGridSkeleton count={9} />}>
        <EpisodesList page={page} name={name} episode={episode} />
      </Suspense>
    </div>
  );
}
