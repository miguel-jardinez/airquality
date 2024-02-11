import {useCallback, useEffect, useState} from 'react';
import { axiosAqiClient } from '@quality/utils/axiosAqiClient';
import { AQIResponse } from '@quality/types/aqi/AqiResponse';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';

interface useGetAqiValueProps {
  coords: GeolocationCoordinates | null
}

export const useGetAqiValue = ({ coords }: useGetAqiValueProps) => {
  const [aqi, setAqi] = useState<Resources<AQIResponse>>(
    { status: ResourcesStatus.LOADING },
  );

  const getAirPollution = useCallback(() => {
    if (!coords) return;
    axiosAqiClient.get<AQIResponse>('air_pollution', {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        appid: process.env.NEXT_PUBLIC_API_KEY_AQI,
      },
    })
      .then((data) => {
        setAqi({ status: ResourcesStatus.SUCCESS, data: data.data });
      })
      .catch(() => {
        setAqi({ status: ResourcesStatus.ERROR, message: 'Error to fetch weather response' });
      });
  }, [coords]);

  useEffect(() => {
    getAirPollution();
  }, [getAirPollution]);

  return {
    aqi,
  };
};
