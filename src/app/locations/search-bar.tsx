'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Globe2, Tag, X } from 'lucide-react';

export function LocationSearchBar({
  defaultName = '',
  defaultType = '',
  defaultDimension = '',
}: {
  defaultName?: string;
  defaultType?: string;
  defaultDimension?: string;
}) {
  const [name, setName] = useState(defaultName);
  const [type, setType] = useState(defaultType);
  const [dimension, setDimension] = useState(defaultDimension);
  const [advanced, setAdvanced] = useState(!!(defaultType || defaultDimension));
  const router = useRouter();

  function submit() {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (type) params.set('type', type);
    if (dimension) params.set('dimension', dimension);
    router.push(`/locations?${params.toString()}`);
  }

  function clearAll() {
    setName('');
    setType('');
    setDimension('');
    router.push('/locations');
  }

  const hasAnyFilter = useMemo(
    () => !!(name || type || dimension),
    [name, type, dimension]
  );

  return (
    <Card className="p-4 md:p-5 rounded-2xl border bg-background/60 backdrop-blur">
      <div className="flex flex-col gap-4">
        {/* Top row: search + actions */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations by name…"
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
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Type (e.g., Planet, Space station)"
                value={type}
                onChange={(e) => setType(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Dimension (e.g., Dimension C-137)"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="pl-9"
              />
            </div>
          </div>
        )}

        {/* Active filters summary */}
        {(type || dimension) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Active:</span>
            {type && (
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" /> {type}
                <button aria-label="Clear type" onClick={() => setType('')}>
                  <X className="ml-1 h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
            {dimension && (
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Globe2 className="h-3.5 w-3.5" /> {dimension}
                <button aria-label="Clear dimension" onClick={() => setDimension('')}>
                  <X className="ml-1 h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
