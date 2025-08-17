import { Skeleton } from '@/components/ui/skeleton';
import { EpisodesGridSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Top section with image + meta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Episodes section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <EpisodesGridSkeleton count={6} />
      </div>
    </div>
  );
}
