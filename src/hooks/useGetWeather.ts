import { useCallback, useEffect, useState } from 'react';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';
import { WeatherResponse } from '@quality/types/aqi/Weather';
import { axiosAqiClient } from '@quality/utils/axiosAqiClient';

interface useGetWeatherProps {
  coords: GeolocationCoordinates | null
}

export const useGetWeather = ({ coords }: useGetWeatherProps) => {
  const [weather, setWeather] = useState<Resources<WeatherResponse>>({
    status: ResourcesStatus.LOADING,
  });

  const getWeather = useCallback(() => {
    if (!coords) return;
    axiosAqiClient.get<WeatherResponse>('weather', {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        appid: process.env.NEXT_PUBLIC_API_KEY_AQI,
      },
    }).then((data) => {
      setWeather({ status: ResourcesStatus.SUCCESS, data: data.data });
    })
      .catch(() => {
        setWeather({ status: ResourcesStatus.ERROR, message: 'Error to fetch aqi index' });
      });
  }, [coords]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return {
    weather,
  };
};
