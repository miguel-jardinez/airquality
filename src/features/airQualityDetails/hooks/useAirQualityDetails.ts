import { useState } from 'react';
import { ResourcesStatus } from '@quality/utils/Resources';
import { useLocationProvider } from '@quality/providers/LocationProvider/useLocationProvider';
import { optionsDates } from '@quality/utils/dates';
import { useGetLocation } from '@quality/hooks/useGetLocation';
import { useGetMeasure } from '@quality/hooks/useGetMeasure';
import { useGetAqiValue } from '@quality/hooks/useGetAqiValue';

interface useAirQualityDetailsProps {
  id: string;
}

export const useAirQualityDetails = ({ id }: useAirQualityDetailsProps) => {
  const [dateSelected, setDateSelected] = useState<string>(optionsDates[0].value);
  const { coords } = useLocationProvider();

  const {
    sensors,
    sensorSelected,
    location,
    setSensorSelected,
  } = useGetLocation({
    coords: coords.status === ResourcesStatus.SUCCESS ? coords.data : undefined,
    id,
  });

  const { aqi } = useGetAqiValue({
    coords: coords.status === ResourcesStatus.SUCCESS ? coords.data : null,
  });

  const { measure } = useGetMeasure({
    location: location.status === ResourcesStatus.SUCCESS ? location.data : null,
    sensorSelected: sensorSelected ?? '',
    dateSelected,
  });

  return {
    sensors,
    measure,
    setDateSelected,
    setSensorSelected,
    location,
    sensorSelected,
    aqi,
  };
};
