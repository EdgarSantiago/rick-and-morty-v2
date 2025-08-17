import { Suspense } from 'react';
import { CharactersList } from '@/components/characters-list';
import { CharactersGridSkeleton } from '@/components/skeletons';
import { SearchBar } from './search-bar';

export const metadata = { title: 'Rick & Morty Characters' };
export const revalidate = 3600; // seconds

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; name?: string; status?: string; species?: string; type?: string; gender?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const name = sp.name ?? sp.q ?? '';
  const status = sp.status ?? '';
  const species = sp.species ?? '';
  const type = sp.type ?? '';
  const gender = sp.gender ?? '';

  return (
    <div className="container mx-auto p-6 space-y-6">
      <SearchBar defaultName={name} defaultStatus={status} defaultSpecies={species} defaultType={type} defaultGender={gender} />
      <Suspense key={`${page}-${name}-${status}-${species}-${type}-${gender}`} fallback={<CharactersGridSkeleton count={12} />}>
        {/* Server Component */}
        <CharactersList page={page} name={name} status={status} species={species} type={type} gender={gender} />
      </Suspense>
    </div>
  );
}
