import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ResourcesStatus } from '@quality/utils/Resources';
import { Link } from '@chakra-ui/next-js';
import { QaLoading } from '@quality/components';
import { dateFromNow } from '@quality/utils/dates';
import { useGetLocation } from '@quality/hooks/useGetLocation';

interface QaDrawerLocationProps {
  currentLocation: number;
  isOpen: boolean;
  onClose: () => void;
}

export const QaDrawerLocation: React.FC<QaDrawerLocationProps> = (
  {
    currentLocation,
    onClose,
    isOpen,
  },
) => {
  const { location: response } = useGetLocation({ id: currentLocation.toString() });
  // const { response } = useGetMeasuredByLocation({ id: currentLocation });

  if (response.status === ResourcesStatus.LOADING) {
    return <QaLoading />;
  }

  if (response.status !== ResourcesStatus.SUCCESS) return;

  const location = response.data.results[0];
  const date = dateFromNow(location.datetimeLast.local);

  return (
    <Drawer
      placement="left"
      size="sm"
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {location.name} | {location?.locality}
        </DrawerHeader>
        <DrawerBody>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            <HStack width="100%" justifyContent="start" alignItems="start">
              <Text width="50%" align="left">Measures:</Text>
              <VStack width="50%" justifyContent="start" align="start">
                {
                    location.sensors.map((sensor) => (
                      <Text align="left">{sensor.parameter.name} ({sensor.parameter.units})</Text>
                    ))
                  }
              </VStack>
            </HStack>

            <HStack width="100%" justifyContent="start" alignItems="start">
              <Text width="50%" align="left">Sensor</Text>
              <VStack width="50%" justifyContent="start" align="start">
                {
                  location.instruments.map((instrument) => (
                    <Text>{instrument.name}</Text>
                  ))
                }
              </VStack>
            </HStack>

            <HStack width="100%" justifyContent="start" alignItems="start">
              <Text width="50%" align="left">Provider:</Text>
              <VStack width="50%" justifyContent="start" align="start">
                <Text>{location.provider.name}</Text>
              </VStack>
            </HStack>

            <HStack width="100%" justifyContent="start" alignItems="start">
              <Text width="50%" align="left">Last Reporting:</Text>
              <VStack width="50%" justifyContent="start" align="start">
                <Text>{date}</Text>
              </VStack>
            </HStack>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Link
            color="white"
            paddingY={3}
            paddingX={5}
            borderRadius={5}
            background="green.400"
            href={`/location/${location.id}`}
          >
            More details
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
