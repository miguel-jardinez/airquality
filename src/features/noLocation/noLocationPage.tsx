import {
  Box, Heading, Text, VStack,
} from '@chakra-ui/react';
import { LottieAnimation } from '@quality/components';

export const NoLocationPage = () => (
  <Box display="flex" alignItems="center" justifyContent="center" width="100vw" height="100vh">
    <VStack>
      <Box>
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
      </Box>
      <Box padding={4}>
        <Heading textAlign="center">Something wrong</Heading>
        <Text align="center">Please refresh the page and try again</Text>
        <Text align="center">We need access to your location, please allowed and refresh the page</Text>
      </Box>
    </VStack>
  </Box>
);
