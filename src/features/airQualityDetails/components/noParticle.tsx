import { Box, Heading, Text } from '@chakra-ui/react';
import { LottieAnimation } from '@quality/components';
import { airPollutantList } from '@quality/utils/qaCalculator';

export const NoParticle = () => (
  <Box display="flex" justifyContent="center">
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
      <Heading textAlign="center">We do not have data for this particle</Heading>
      <Text
        mb={2}
        align="center"
      >
        We only have support for this particles {airPollutantList.join(', ')}.
      </Text>
      <Text align="center">The sensors do not have data from this resents days</Text>
    </Box>
  </Box>
);
