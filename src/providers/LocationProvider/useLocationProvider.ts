'use client';

import { useContext, useEffect } from 'react';
import { LocationContext } from '@quality/providers/LocationProvider/LocationContext';
import { ResourcesStatus } from '@quality/utils/Resources';

export const useLocationProvider = () => {
  const { coords, setCoords } = useContext(LocationContext);

  useEffect(() => {
    const successLocation = (position: GeolocationPosition) => {
      setCoords({
        status: ResourcesStatus.SUCCESS,
        data: {
          ...position.coords,
          longitude: Number(position.coords.longitude.toFixed(7)),
          latitude: Number(position.coords.latitude.toFixed(7)),
        },
      });
    };

    const errorLocation = (positionError: GeolocationPositionError) => {
      setCoords({
        status: ResourcesStatus.ERROR,
        message: positionError.message,
      });
    };

    if (typeof window === 'undefined') return;

    window.navigator.geolocation.getCurrentPosition(
      successLocation,
      errorLocation,
      {
        enableHighAccuracy: true,
      },
    );
  }, [setCoords]);

  return {
    coords,
  };
};
