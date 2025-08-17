import { getEpisodes } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { EpisodeCard } from '@/components/episode-card';

export async function EpisodesList({ page, name, episode, showPagination = true }: {
  page: number;
  name: string;
  episode?: string;
  showPagination?: boolean;
}) {
  const data = await getEpisodes({ page, name: name || undefined, episode: episode || undefined });

  if (!data?.results?.length) {
    return <p className="text-muted-foreground">No episodes found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {data.results!.map((e) => (
          <div key={e!.id} className="space-y-1 h-full">
            <EpisodeCard id={String(e!.id)} name={e?.name ?? ''} code={e?.episode ?? ''} airDate={e?.air_date ?? ''} />
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Characters: {e?.characters?.length ?? 0}</p>
          </div>
        ))}
      </div>

      {showPagination && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <PageLink disabled={!data.info?.prev} page={data.info?.prev} name={name} episode={episode}>Prev</PageLink>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.info?.pages ?? '?'}
          </span>
          <PageLink disabled={!data.info?.next} page={data.info?.next} name={name} episode={episode}>Next</PageLink>
        </div>
      )}
    </>
  );
}

function PageLink({
  disabled,
  page,
  name,
  episode,
  children,
}: {
  disabled?: boolean;
  page?: number | null;
  name: string;
  episode?: string;
  children: React.ReactNode;
}) {
  const params = new URLSearchParams();
  if (page) params.set('page', String(page));
  if (name) params.set('name', name);
  if (episode) params.set('episode', episode);
  const href = page ? `/episodes?${params.toString()}` : '#';
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
