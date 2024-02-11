import { useEffect, useState } from 'react';
import axios from 'axios';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';
import { LocationDetails, LocationDetailsResponse } from '@quality/types/LocationDetails';

interface useGetMeasuredByLocationProps {
  id: number
}

export const useGetMeasuredByLocation = ({ id }: useGetMeasuredByLocationProps) => {
  const [response, setResponse] = useState<Resources<LocationDetails>>(
    { status: ResourcesStatus.LOADING },
  );

  useEffect(() => {
    setResponse({ status: ResourcesStatus.LOADING });

    axios.get<LocationDetailsResponse>(`/api/locations/${id}`)
      .then((data) => setResponse({ status: ResourcesStatus.SUCCESS, data: data.data.data }))
      .catch((e) => setResponse({ status: ResourcesStatus.ERROR, message: e.message }));
  }, [id]);

  return {
    response,
  };
};
