import { Skeleton } from '@/components/ui/skeleton';
import { EpisodesGridSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <EpisodesGridSkeleton count={9} />
    </div>
  );
}
