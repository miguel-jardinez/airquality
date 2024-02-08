import { act, renderHook } from '@testing-library/react';

import { useTestHook } from './useTestHook';

describe('useCounter', () => {
  it('should increment count', () => {
    const { result } = renderHook(() => useTestHook());

    act(() => {
      result.current.addCounter();
    });

    expect(result.current.counter).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useTestHook());

    act(() => {
      result.current.deleteCounter();
    });

    expect(result.current.counter).toBe(-1);
  });
});
