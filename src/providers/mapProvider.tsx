'use client';

import { MapProvider } from 'react-map-gl';

export function QAMapProvider({ children }: { children: React.ReactNode }) {
  return <MapProvider>{children}</MapProvider>;
}
