'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAirQualityDetails } from '@quality/features/airQualityDetails/hooks/useAirQualityDetails';
import { SearchIcon } from '@chakra-ui/icons';
import { ResourcesStatus } from '@quality/utils/Resources';
import {
  Box,
  Card,
  Container,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Button, Stack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
  Map,
} from 'react-map-gl';
import { dateDefaultFormat, dateFromNow } from '@quality/utils/dates';
import {
  getAirQualityLevel,
  QAPollutant,
} from '@quality/utils/qaCalculator';
import { NoLocationPage } from '@quality/features/noLocation/noLocationPage';
import { LineChart } from '@quality/features/airQualityDetails/components/lineChart';
import AirQualityInfo from '@quality/features/airQualityDetails/components/airQualityInfo';
import { QaLoading } from '@quality/components';

export const AirQualityDetailsPage = () => {
  const router = useRouter();
  const useSearch = useParams<{id: string }>();

  const {
    location,
    sensors,
    measure,
    setDateSelected,
    setSensorSelected,
    sensorSelected,
  } = useAirQualityDetails({ id: useSearch.id ?? '' });

  // Error if the request fails or location permission is not allowed
  if (
    sensors.status === ResourcesStatus.LOADING
  ) return <QaLoading />;

  // Error if the request fails or location permission is not allowed
  if (
    sensors.status === ResourcesStatus.ERROR
    || measure.status === ResourcesStatus.ERROR
    || location.status === ResourcesStatus.ERROR
  ) return <NoLocationPage />;

  // Show component if the request and permission were allowed
  if (
    sensors.status !== ResourcesStatus.SUCCESS
    || measure.status !== ResourcesStatus.SUCCESS
    || location.status !== ResourcesStatus.SUCCESS
  ) return;

  const locationData = location.data.results[0];

  // Pollutant and quality air
  const pollutant = sensors
    .data
    .find((data) => (sensorSelected && data.parameter.id.toString() === sensorSelected));
  const pollutantId = pollutant?.parameter?.name as QAPollutant;
  const pollutantValue = measure.data.at(-1)?.value ?? 0;
  const quality = getAirQualityLevel(pollutantId, pollutantValue);

  // Chart Configuration
  const labels = measure.data.map((measure) => {
    const date = dayjs(measure.coverage.datetimeFrom.local);

    return date.get('hour') > 0 ? date.format('HH:mm') : date.format('MMM DD');
  });
  const chartData = labels.map((_, index) => measure.data[index].value);

  return (
    <Container maxW="container.xl" padding={4}>
      <Card mb={4}>
        <Box>
          <Box bg="blue.50" padding={6}>
            <Stack direction={['column', 'row']} justifyContent="space-between">
              <VStack alignItems="flex-start">
                <Text>{locationData.country.name} / {locationData.locality}</Text>
                <Heading>{locationData.name}</Heading>
              </VStack>
              <Button
                onClick={() => router.push('/map')}
                colorScheme="teal"
                rightIcon={<SearchIcon />}
                variant="outline"
              >
                Open Maps
              </Button>
            </Stack>
          </Box>
          <Stack direction={['column-reverse', 'row']} padding={2}>
            <VStack spacing={4} alignItems="flex-start" w={['100%', '50%']} padding={4}>
              <Text>CHARACTERISTICS:</Text>
              <SimpleGrid columns={2} spacing={[0, 5]}>
                <Text>Measures:</Text>
                <Text>{ locationData.sensors.map((sensor) => `${sensor.parameter.name} (${sensor.parameter.units}) `)}</Text>

                <Text>Name:</Text>
                <Text>{locationData.name}</Text>

                <Text>Reporting:</Text>
                <Box>
                  <Text>{dateFromNow(locationData.datetimeLast.local)}</Text>
                  <Text>Since {dateDefaultFormat(locationData.datetimeLast.local)}</Text>
                </Box>

                <Text>Provider:</Text>
                <Text>{locationData.provider.name}</Text>
              </SimpleGrid>
            </VStack>
            <VStack w={['100%', '50%']} padding={4}>
              <Map
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                  latitude: locationData.coordinates.latitude,
                  longitude: locationData.coordinates.longitude,
                  zoom: 10,
                }}
                maxZoom={10}
                minZoom={3}
                attributionControl={false}
                style={{ width: '100%', aspectRatio: 1 }}
              />

            </VStack>
          </Stack>
        </Box>
      </Card>

      <Stack direction={['column-reverse', 'row']}>
        <Card width={['100%', '50%']} padding={6}>
          <Heading mb={8}>Latest Readings</Heading>
          <LineChart
            labels={labels}
            data={chartData}
            sensors={sensors.data}
            setSensorSelected={setSensorSelected}
            setDateSelected={setDateSelected}
          />
        </Card>

        <Card width={['100%', '50%']} p={6}>
          <Heading>Air Quality</Heading>
          <AirQualityInfo
            quality={quality}
            measure={measure.data}
            pollutant={pollutant}
          />
        </Card>
      </Stack>

    </Container>
  );
};
