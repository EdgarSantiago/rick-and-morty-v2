import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clapperboard } from 'lucide-react';

export function EpisodeCard({
  id,
  name,
  code,
  airDate,
}: {
  id: string;
  name?: string | null;
  code?: string | null;
  airDate?: string | null;
}) {
  return (
    <Link
      href={`/episodes/${id}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <Card className="p-4 space-y-2 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold tracking-tight group-hover:underline underline-offset-4">
            {name}
          </h3>
          {code && (
            <Badge variant="secondary" className="inline-flex items-center gap-1">
              <Clapperboard className="h-3.5 w-3.5" />
              {code}
            </Badge>
          )}
        </div>
        {airDate && (
          <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {airDate}
          </p>
        )}
      </Card>
    </Link>
  );
}

