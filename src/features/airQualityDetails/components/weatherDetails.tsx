import { useGetWeather } from '@quality/hooks/useGetWeather';
import { useLocationProvider } from '@quality/providers/LocationProvider/useLocationProvider';
import { ResourcesStatus } from '@quality/utils/Resources';
import { Box, Card, Heading } from '@chakra-ui/react';

export const WeatherDetails = () => {
  const { coords } = useLocationProvider();
  const { weather } = useGetWeather({
    coords: coords.status === ResourcesStatus.SUCCESS ? coords.data : null,
  });

  if (weather.status === ResourcesStatus.ERROR) {
    return (
      <Box>
        <Heading color="red.300" as="h3" size="md">
          Sorry we do not fetch the air quality index value
          please try Again
        </Heading>
      </Box>
    );
  }

  if (weather.status !== ResourcesStatus.SUCCESS) return;

  const hasWeather = weather.data.weather.length > 0;

  return (
    <Card p={6} my={4}>
      <Heading mb={5} as="h3" size="lg">Weather for {weather.data.name}:</Heading>
      {
        hasWeather && weather.data.weather.map((weather) => (
          <Box>
            <Heading color="green.500" as="h4" size="xl">{ weather.description }</Heading>
          </Box>
        ))
      }
    </Card>
  );
};
