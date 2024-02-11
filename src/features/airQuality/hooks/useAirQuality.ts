'use client';

import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

export const useAirQuality = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentLocation, setCurrentLocation] = useState<number | null>(null);

  const handleOpenLocation = (id: number) => {
    setCurrentLocation(id);
    onOpen();
  };

  return {
    currentLocation,
    isOpen,
    handleOpenLocation,
    onClose,
  };
};
