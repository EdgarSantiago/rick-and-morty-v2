import { Skeleton } from '@/components/ui/skeleton';
import { CharacterCardSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CharacterCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
