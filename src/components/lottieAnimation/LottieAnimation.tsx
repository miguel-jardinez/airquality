import { Player } from '@lottiefiles/react-lottie-player';
import { Box } from '@chakra-ui/react';

interface LottieAnimationProps {
  src: string;
  width: number | string,
  height: number | string
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  width = '250px',
  height = '250px',
}) => (
  <Box width={width} height={height}>
    <Player
      src={src}
      loop
      autoplay
    />
  </Box>
);
