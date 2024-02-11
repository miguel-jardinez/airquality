import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { airQualityIndex, QAAirQualityLabels } from '@quality/utils/qaCalculator';
import { AQIResponse } from '@quality/types/aqi/AqiResponse';
import { Resources, ResourcesStatus } from '@quality/utils/Resources';

interface AirQualityInfoProps {
  aqiList: Resources<AQIResponse>,
}

export const AirQualityInfo: React.FC<AirQualityInfoProps> = ({
  aqiList,
}) => {
  if (aqiList.status === ResourcesStatus.ERROR) {
    return (
      <Box>
        <Heading color="red.300" as="h3" size="md">
          Sorry we do not fetch the air quality index value
          please try Again
        </Heading>
      </Box>
    );
  }

  if (aqiList.status !== ResourcesStatus.SUCCESS) return;

  return (
    <>
      {
        aqiList.data.list.map((aqi) => {
          const airQualityLabel = airQualityIndex[aqi.main.aqi as QAAirQualityLabels];

          return (
            <Box>
              <Text my={4}>
                Besides basic Air Quality Index, data includes information
                on polluting gases like Carbon monoxide (CO), Nitrogen monoxide (NO),
                Nitrogen dioxide (NO2), Ozone (O3), Sulphur dioxide (SO2), Ammonia (NH3),
                and particulates (PM2.5 and PM10). Air pollution forecast extends to 4
                days with hourly granularity, while historical data is accessible
                from November 27th, 2020.
              </Text>
              <Box display="flex" justifyContent="center">
                <Box w="80%" aspectRatio={1} borderRadius="50%" bg={airQualityLabel?.color ?? ''} display="flex" justifyContent="center" alignItems="center">
                  <Box>
                    <Heading textAlign="center">{aqi.main.aqi}</Heading>
                    <Heading textAlign="center">{airQualityLabel?.label}</Heading>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })
      }
    </>
  );
};
