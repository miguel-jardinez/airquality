import React, { useMemo } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { airQualityLabels, QAAirQualityLabels } from '@quality/utils/qaCalculator';
import { NoParticle } from '@quality/features/airQualityDetails/components/noParticle';
import { LocationDetailsMeasuredResult } from '@quality/types/LocationDetailsMeasured';
import { Sensor } from '@quality/types/LocationDetails';

interface AirQualityInfoProps {
  quality: string | null,
  pollutant: Sensor | undefined;
  measure: LocationDetailsMeasuredResult[];
}

const AirQualityInfo: React.FC<AirQualityInfoProps> = ({ quality, pollutant, measure }) => {
  const airQualityInfo = useMemo(() => {
    if (!quality || measure.length === 0) {
      return <NoParticle />;
    }

    const latestValue = measure.at(-1)?.value ?? 0;
    const airQualityLabel = airQualityLabels[quality as QAAirQualityLabels];

    return (
      <Box>
        <Text mb={5}>
          Based on the current {pollutant?.name} particle values,
          the air quality in this area is considered:
        </Text>
        <Box display="flex" justifyContent="center">
          <Box w="80%" aspectRatio={1} borderRadius="50%" bg={airQualityLabel?.color ?? ''} display="flex" justifyContent="center" alignItems="center">
            <Box>
              <Heading textAlign="center">{latestValue}</Heading>
              <Heading textAlign="center">{airQualityLabel?.label}</Heading>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }, [quality, pollutant, measure]);

  return airQualityInfo;
};

export default React.memo(AirQualityInfo);
