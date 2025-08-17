import { Skeleton } from '@/components/ui/skeleton';

export function CharacterCardSkeleton() {
  return (
    <div className="flex h-full flex-col p-4 rounded-2xl border">
      <div className="relative h-36 sm:h-40 w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-2 left-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function CharactersGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function LocationCardSkeleton() {
  return (
    <div className="p-4 rounded-2xl border space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-28 rounded-full" />
      </div>
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function LocationsGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LocationCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function EpisodeCardSkeleton() {
  return (
    <div className="p-4 rounded-2xl border space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function EpisodesGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <EpisodeCardSkeleton key={i} />
      ))}
    </div>
  );
}
