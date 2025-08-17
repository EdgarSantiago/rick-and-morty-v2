import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative overflow-hidden -mt-16">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/ab553cdc-e15d-4597-b65f-bec9201fd2dd/7d2e523d-84c1-4bdc-9d2b-d7755d2daeb1?host=wbd-images.prod-vod.h264.io&partner=beamcom&w=2000"
          alt="Rick and Morty background"
          fill
          className="object-cover"
          priority
        />
        {/* Black linear gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
      </div>

      <div className="container mx-auto px-6 py-20 text-center space-y-6 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Rick & Morty Explorer
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          Browse the multiverse. Search characters, view details, and paginate —
          all server-rendered with typed GraphQL and shadcn/ui.
        </p>
        <div className="relative mx-auto h-28 sm:h-36 w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-white/10">
          <Image
            src="https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/ab553cdc-e15d-4597-b65f-bec9201fd2dd/63cf6c90-3837-11f0-8dd2-0affeb02d451?host=wbd-images.prod-vod.h264.io&partner=beamcom&w=4320"
            alt="Rick and Morty logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button asChild className="bg-white text-black hover:bg-white/90">
            <Link href="/characters">Explore Characters</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
