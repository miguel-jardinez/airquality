import { Box, Heading, Text } from '@chakra-ui/react';
import { LottieAnimation } from '@quality/components';
import { Link } from '@chakra-ui/next-js';

export const EmptyDataAirQualityDetails = () => (
  <Box display="flex" justifyContent="center">
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Box
          w={['100%', '50%']}
          aspectRatio={1}
        >
          <LottieAnimation
            src="https://lottie.host/8e432ccc-47e9-436a-bdec-e07029c0d06f/fIEgOwbWih.json"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <Heading textAlign="center">Ohh, we do not have sensors in this area</Heading>
      <Text
        mb={2}
        align="center"
        my={4}
      >
        Do not worry, you can search other area near from you using our map.
      </Text>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Link
          color="white"
          paddingY={3}
          w="80%"
          display="block"
          textAlign="center"
          paddingX={5}
          borderRadius={5}
          background="green.400"
          href="/map"
        >
          Visit our map
        </Link>
      </Box>
    </Box>
  </Box>
);
