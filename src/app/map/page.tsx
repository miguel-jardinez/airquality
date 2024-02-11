'use client';

import { useLocationProvider } from '@quality/providers/LocationProvider/useLocationProvider';
import { ResourcesStatus } from '@quality/utils/Resources';
import { Text } from '@chakra-ui/react';
import { AirQualityPage } from '@quality/features/airQuality/airQualityPage';
import { NoLocationPage } from '@quality/features/noLocation/noLocationPage';
import { QaLoading } from '@quality/components';

export default function Map() {
  const { coords } = useLocationProvider();

  switch (coords.status) {
    case ResourcesStatus.LOADING:
      return <QaLoading />;
    case ResourcesStatus.SUCCESS:
      return <AirQualityPage />;
    case ResourcesStatus.ERROR:
      return <NoLocationPage />;
    default:
      return <Text>Loading</Text>;
  }
}
