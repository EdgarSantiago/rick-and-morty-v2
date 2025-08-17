'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, HeartPulse, Skull, HelpCircle, Users, X } from 'lucide-react';

export function SearchBar({
  defaultName = '',
  defaultStatus = '',
  defaultSpecies = '',
  defaultType = '',
  defaultGender = '',
}: {
  defaultName?: string;
  defaultStatus?: string;
  defaultSpecies?: string;
  defaultType?: string;
  defaultGender?: string;
}) {
  const [name, setName] = useState(defaultName);
  const [status, setStatus] = useState(defaultStatus);
  const [species, setSpecies] = useState(defaultSpecies);
  const [type, setType] = useState(defaultType);
  const [gender, setGender] = useState(defaultGender);
  const [advanced, setAdvanced] = useState(!!(defaultSpecies || defaultType));
  const router = useRouter();

  function submit() {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (status) params.set('status', status);
    if (species) params.set('species', species);
    if (type) params.set('type', type);
    if (gender) params.set('gender', gender);
    router.push(`/characters?${params.toString()}`);
  }

  function clearAll() {
    setName('');
    setStatus('');
    setSpecies('');
    setType('');
    setGender('');
    router.push('/characters');
  }

  const hasAnyFilter = useMemo(
    () => !!(name || status || species || type || gender),
    [name, status, species, type, gender]
  );

  return (
    <Card className="p-4 md:p-5 rounded-2xl border bg-background/60 backdrop-blur">
      <div className="flex flex-col gap-4">
        {/* Top row: search + primary actions */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search characters by name…"
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

        {/* Quick filters: status + gender */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-muted-foreground">Status:</span>
            <Button type="button" size="sm" variant={status === '' ? 'secondary' : 'ghost'} onClick={() => setStatus('')}>Any</Button>
            <Button type="button" size="sm" variant={status === 'alive' ? 'secondary' : 'outline'} onClick={() => setStatus('alive')}>
              <HeartPulse className="mr-1 h-3.5 w-3.5" /> Alive
            </Button>
            <Button type="button" size="sm" variant={status === 'dead' ? 'secondary' : 'outline'} onClick={() => setStatus('dead')}>
              <Skull className="mr-1 h-3.5 w-3.5" /> Dead
            </Button>
            <Button type="button" size="sm" variant={status === 'unknown' ? 'secondary' : 'outline'} onClick={() => setStatus('unknown')}>
              <HelpCircle className="mr-1 h-3.5 w-3.5" /> Unknown
            </Button>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-muted-foreground">Gender:</span>
            <Button type="button" size="sm" variant={gender === '' ? 'secondary' : 'ghost'} onClick={() => setGender('')}>Any</Button>
            <Button type="button" size="sm" variant={gender === 'female' ? 'secondary' : 'outline'} onClick={() => setGender('female')}>Female</Button>
            <Button type="button" size="sm" variant={gender === 'male' ? 'secondary' : 'outline'} onClick={() => setGender('male')}>Male</Button>
            <Button type="button" size="sm" variant={gender === 'genderless' ? 'secondary' : 'outline'} onClick={() => setGender('genderless')}>Genderless</Button>
            <Button type="button" size="sm" variant={gender === 'unknown' ? 'secondary' : 'outline'} onClick={() => setGender('unknown')}>Unknown</Button>
          </div>
        </div>

        {/* Advanced (collapsible) */}
        {advanced && (
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Species (e.g., Human, Alien)"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
            <Input
              placeholder="Type (e.g., Robot, Clone)"
              value={type}
              onChange={(e) => setType(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>
        )}

        {/* Active filters summary */}
        {(status || gender || species || type) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Active:</span>
            {status && (
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                {status}
                <button aria-label="Clear status" onClick={() => setStatus('')}>
                  <X className="ml-1 h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
            {gender && (
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {gender}
                <button aria-label="Clear gender" onClick={() => setGender('')}>
                  <X className="ml-1 h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
            {species && (
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                {species}
                <button aria-label="Clear species" onClick={() => setSpecies('')}>
                  <X className="ml-1 h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
            {type && (
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                {type}
                <button aria-label="Clear type" onClick={() => setType('')}>
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
