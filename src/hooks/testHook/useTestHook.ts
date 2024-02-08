import { useState } from 'react';

export const useTestHook = () => {
  const [counter, setCounter] = useState(0);

  const addCounter = () => {
    setCounter(counter + 1);
  };

  const deleteCounter = () => {
    setCounter(counter - 1);
  };

  return {
    counter,
    deleteCounter,
    addCounter,
  };
};
