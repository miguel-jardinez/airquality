import {
  useEffect, useState,
} from 'react';
import { useMap } from 'react-map-gl';
import { useLocationProvider } from '@quality/providers/LocationProvider/useLocationProvider';
import { Coordinates, LocationsResponse } from '@quality/types/LocationModel';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';
import axios from 'axios';

export const useMapControl = () => {
  const { mainMap } = useMap();
  const [coordinates, setCoordinates] = useState<Coordinates | null>();
  const [location, setLocations] = useState<Resources<LocationsResponse>>(
    {
      status: ResourcesStatus.LOADING,
    },
  );

  const { coords } = useLocationProvider();

  useEffect(() => {
    if (coords.status === ResourcesStatus.SUCCESS) {
      setCoordinates({ longitude: coords.data.longitude, latitude: coords.data.latitude });
    }
  }, [coords, coords.status]);

  useEffect(() => {
    if (!coordinates) return;

    axios
      .get(`/api/locations?coords=${coordinates.latitude},${coordinates.longitude}`)
      .then((response) => setLocations({ status: ResourcesStatus.SUCCESS, data: response.data }));
  }, [coordinates]);

  useEffect(() => {
    if (!mainMap) return;

    mainMap.on('moveend', (data) => {
      setCoordinates({
        longitude: data.viewState.longitude.toFixed(7),
        latitude: data.viewState.latitude.toFixed(7),
      });
    });
  }, [mainMap]);

  return {
    coordinates,
    location,
    setCoordinates,
  };
};
