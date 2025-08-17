import { Suspense } from 'react';
import { LocationsList } from '@/components/locations-list';
import { LocationsGridSkeleton } from '@/components/skeletons';
import { LocationSearchBar } from './search-bar';

export const metadata = { title: 'Locations' };
export const revalidate = 3600; // seconds

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string; type?: string; dimension?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const name = sp.name ?? '';
  const type = sp.type ?? '';
  const dimension = sp.dimension ?? '';

  return (
    <div className="container mx-auto p-6 space-y-6">
      <LocationSearchBar defaultName={name} defaultType={type} defaultDimension={dimension} />
      <Suspense key={`${page}-${name}-${type}-${dimension}`} fallback={<LocationsGridSkeleton count={9} />}>
        <LocationsList page={page} name={name} type={type} dimension={dimension} />
      </Suspense>
    </div>
  );
}
