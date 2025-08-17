'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Clapperboard, X } from 'lucide-react';

export function EpisodeSearchBar({
  defaultName = '',
  defaultEpisode = '',
}: {
  defaultName?: string;
  defaultEpisode?: string;
}) {
  const [name, setName] = useState(defaultName);
  const [episode, setEpisode] = useState(defaultEpisode);
  const [advanced, setAdvanced] = useState(!!defaultEpisode);
  const router = useRouter();

  function submit() {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (episode) params.set('episode', episode);
    router.push(`/episodes?${params.toString()}`);
  }

  function clearAll() {
    setName('');
    setEpisode('');
    router.push('/episodes');
  }

  const hasAnyFilter = useMemo(() => !!(name || episode), [name, episode]);

  return (
    <Card className="p-4 md:p-5 rounded-2xl border bg-background/60 backdrop-blur">
      <div className="flex flex-col gap-4">
        {/* Top row: search + actions */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search episodes by name…"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" type="button" onClick={() => setAdvanced((v) => !v)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {advanced ? 'Hide filters' : 'More filters'}
            </Button>
            <Button onClick={submit}>Apply</Button>
            {hasAnyFilter && (
              <Button variant="ghost" type="button" onClick={clearAll}>
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Advanced fields */}
        {advanced && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <Clapperboard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Episode code (e.g., S01E01)"
                value={episode}
                onChange={(e) => setEpisode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="pl-9"
              />
            </div>
          </div>
        )}

        {/* Active filters summary */}
        {episode && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Active:</span>
            <Badge variant="secondary" className="inline-flex items-center gap-1">
              <Clapperboard className="h-3.5 w-3.5" /> {episode}
              <button aria-label="Clear episode" onClick={() => setEpisode('')}>
                <X className="ml-1 h-3.5 w-3.5" />
              </button>
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
