import { useEffect, useState } from 'react';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';
import axios from 'axios';
import { LocationDetailsMeasuredResponse, LocationDetailsMeasuredResult } from '@quality/types/LocationDetailsMeasured';
import dayjs from 'dayjs';
import { LocationDetails } from '@quality/types/LocationDetails';

interface useGetMeasureProps {
  location: LocationDetails | null,
  sensorSelected: string,
  dateSelected: string
}

export const useGetMeasure = ({ location, sensorSelected, dateSelected }: useGetMeasureProps) => {
  const [measure, setMeasure] = useState<Resources<LocationDetailsMeasuredResult[]>>(
    {
      status: ResourcesStatus.LOADING,
    },
  );

  useEffect(() => {
    if (!location) return;

    if (location.results.length === 0) {
      setMeasure({ status: ResourcesStatus.SUCCESS, data: [] });
    } else {
      axios.get<LocationDetailsMeasuredResponse>(`/api/measure/${location.results[0].id}`, {
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
          setMeasure({ status: ResourcesStatus.ERROR, message: e.message });
        });
    }
  }, [dateSelected, location, sensorSelected]);

  return {
    measure,
  };
};
