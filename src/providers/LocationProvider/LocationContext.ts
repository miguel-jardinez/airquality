'use client';

import { createContext, Dispatch, SetStateAction } from 'react';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';

interface LocationInitialValue {
  coords: Resources<GeolocationCoordinates>,
  setCoords: Dispatch<SetStateAction<Resources<GeolocationCoordinates>>>
}

const initialValue: LocationInitialValue = {
  coords: { status: ResourcesStatus.LOADING },
  setCoords: () => null,
};

export const LocationContext = createContext<LocationInitialValue>(initialValue);
