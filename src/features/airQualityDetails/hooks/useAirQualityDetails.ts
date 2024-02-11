import { useEffect, useState } from 'react';
import axios from 'axios';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';
import dayjs from 'dayjs';
import { LocationDetailsMeasuredResponse, LocationDetailsMeasuredResult } from '@quality/types/LocationDetailsMeasured';
import { LocationDetails, LocationDetailsResponse, Sensor } from '@quality/types/LocationDetails';
import { useLocationProvider } from '@quality/providers/LocationProvider/useLocationProvider';
import { optionsDates } from '@quality/utils/dates';

interface useAirQualityDetailsProps {
  id: string;
}

export const useAirQualityDetails = ({ id }: useAirQualityDetailsProps) => {
  const { coords } = useLocationProvider();
  const [sensors, setSensors] = useState<Resources<Sensor[]>>({ status: ResourcesStatus.LOADING });
  const [location, setLocation] = useState<Resources<LocationDetails>>({
    status: ResourcesStatus.LOADING,
  });
  const [sensorSelected, setSensorSelected] = useState<string | null>(null);
  const [measure, setMeasure] = useState<Resources<LocationDetailsMeasuredResult[]>>(
    {
      status: ResourcesStatus.LOADING,
    },
  );

  const [dateSelected, setDateSelected] = useState<string>(optionsDates[0].value);

  useEffect(() => {
    if (location.status === ResourcesStatus.SUCCESS) {
      axios.get<LocationDetailsMeasuredResponse>(`/api/measure/${location.data.results[0].id}`, {
        params: {
          period_name: 'hour',
          limit: 1000,
          parameters_id: sensorSelected,
          date_from: dateSelected,
          date_to: dayjs().toISOString(),
        },
      })
        .then((data) => {
          setMeasure({ status: ResourcesStatus.SUCCESS, data: data.data.data.results });
        })
        .catch((e) => {
          setSensors({ status: ResourcesStatus.ERROR, message: e.message });
          setMeasure({ status: ResourcesStatus.ERROR, message: e.message });
        });
    }
  }, [dateSelected, id, location, sensorSelected, sensors]);

  useEffect(() => {
    if (!id) return;
    axios.get<LocationDetailsResponse>(`/api/locations/${id}`)
      .then((data) => {
        const { sensors } = data.data.data.results[0];

        setSensors({ status: ResourcesStatus.SUCCESS, data: sensors });
        setLocation({ status: ResourcesStatus.SUCCESS, data: data.data.data });
        setSensorSelected(sensors[0].parameter.id.toString());
      })
      .catch((e) => {
        setSensors({ status: ResourcesStatus.ERROR, message: e.message });
        setSensorSelected(null);
      });
  }, [id]);

  useEffect(() => {
    if (id) return;

    if (coords.status === ResourcesStatus.SUCCESS) {
      const coordinates = coords.data;
      axios.get<LocationDetailsResponse>(`/api/locations?coords=${coordinates.latitude},${coordinates.longitude}`)
        .then((data) => {
          const { sensors } = data.data.data.results[0];

          setSensors({ status: ResourcesStatus.SUCCESS, data: sensors });
          setLocation({ status: ResourcesStatus.SUCCESS, data: data.data.data });
          setSensorSelected(sensors[0].parameter.id.toString());
        })
        .catch((e) => {
          setSensors({ status: ResourcesStatus.ERROR, message: e.message });
          setSensorSelected(null);
        });
    }

    if (coords.status === ResourcesStatus.ERROR) {
      setSensors({ status: ResourcesStatus.ERROR, message: 'Error to get Sensors' });
    }
  }, [coords, id]);

  return {
    sensors,
    measure,
    setDateSelected,
    setSensorSelected,
    location,
    sensorSelected,
  };
};
