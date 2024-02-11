'use client';

import { LocationContext } from '@quality/providers/LocationProvider/LocationContext';
import { useState } from 'react';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';

interface LocationProviderProps {
  children: React.ReactNode
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [coords, setCoords] = useState<Resources<GeolocationCoordinates>>(
    {
      status: ResourcesStatus.LOADING,
    },
  );

  return (
    <LocationContext.Provider value={{ coords, setCoords }}>
      {children}
    </LocationContext.Provider>
  );
};
