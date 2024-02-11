import { Box, Heading } from '@chakra-ui/react';

export const QaLoading = () => (
  <Box
    position="absolute"
    top={0}
    bottom={0}
    right={0}
    left={0}
    height="100vh"
    width="100vw"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Heading>Loading ...</Heading>
  </Box>
);
