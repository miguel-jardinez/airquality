import { useEffect, useState } from 'react';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';
import axios from 'axios';
import {
  LocationDetails,
  LocationDetailsResponse,
  Sensor,
} from '@quality/types/LocationDetails';

interface useGetLocationByCoordsProps {
  coords?: GeolocationCoordinates | null
  id?: string
}

export const useGetLocation = ({ coords, id }: useGetLocationByCoordsProps) => {
  const [sensors, setSensors] = useState<Resources<Sensor[]>>({ status: ResourcesStatus.LOADING });
  const [location, setLocation] = useState<Resources<LocationDetails>>({
    status: ResourcesStatus.LOADING,
  });
  const [sensorSelected, setSensorSelected] = useState<string | null>(null);

  const setDataState = (data: LocationDetails) => {
    if (data.results.length > 0) {
      const { sensors } = data.results[0];

      setSensors({ status: ResourcesStatus.SUCCESS, data: sensors });
      setLocation({ status: ResourcesStatus.SUCCESS, data });
      setSensorSelected(sensors[0].parameter.id.toString());
    } else {
      setSensors({ status: ResourcesStatus.SUCCESS, data: [] });
      setLocation({ status: ResourcesStatus.SUCCESS, data });
      setSensorSelected('');
    }
  };

  useEffect(() => {
    if (!id) return;
    axios.get<LocationDetailsResponse>(`/api/locations/${id}`)
      .then((data) => {
        setDataState(data.data.data);
      })
      .catch((e) => {
        setSensors({ status: ResourcesStatus.ERROR, message: e.message });
        setLocation({ status: ResourcesStatus.ERROR, message: e.message });
        setSensorSelected(null);
      });
  }, [id]);

  useEffect(() => {
    if (!coords || id) return;
    axios.get<LocationDetailsResponse>(`/api/locations?coords=${coords.latitude},${coords.longitude}`)
      .then((data) => {
        setDataState(data.data.data);
      })
      .catch((e) => {
        setSensors({ status: ResourcesStatus.ERROR, message: e.message });
        setSensorSelected(null);
      });
  }, [coords, id]);

  return {
    location,
    sensors,
    sensorSelected,
    setSensorSelected,
  };
};
