'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/characters', label: 'Characters' },
  { href: '/locations', label: 'Locations' },
  { href: '/episodes', label: 'Episodes' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[min(100%-1rem,1100px)]">
      <div
        className="rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/60"
      >
        <nav className="flex items-center gap-2 px-4 py-2 relative">
          <Link href="/" className="flex items-center gap-2 px-2 py-1 rounded-md hover:opacity-90">
            <div className="relative h-8 w-36">
              <Image
                src="https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/ab553cdc-e15d-4597-b65f-bec9201fd2dd/63cf6c90-3837-11f0-8dd2-0affeb02d451?host=wbd-images.prod-vod.h264.io&partner=beamcom&w=4320"
                alt="Rick and Morty logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="sr-only">R&M Explorer</span>
          </Link>
          {/* Desktop links */}
          <div className="ml-auto hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Button
                  key={l.href}
                  asChild
                  variant={active ? 'secondary' : 'ghost'}
                  className="rounded-full focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Link href={l.href}>{l.label}</Link>
                </Button>
              );
            })}
          </div>
          {/* Mobile toggle */}
          <div className="ml-auto md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-full"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          {/* Mobile menu panel */}
          {open && (
            <div className="absolute left-2 right-2 top-[calc(100%+0.5rem)] md:hidden rounded-2xl border border-white/10 bg-background/90 backdrop-blur-xl p-2">
              <div className="flex flex-col">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Button
                      key={l.href}
                      asChild
                      variant={active ? 'secondary' : 'ghost'}
                      className="justify-start rounded-xl"
                      onClick={() => setOpen(false)}
                    >
                      <Link href={l.href}>{l.label}</Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
