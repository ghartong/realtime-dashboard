import { renderHook, act } from '@testing-library/react';
import { useNow } from '../../hooks/useNow';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useNow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the current timestamp on mount', () => {
    const { result } = renderHook(() => useNow());
    expect(result.current).toBe(Date.now());
  });

  it('updates the timestamp at the specified interval', () => {
    const { result } = renderHook(() => useNow(1000));
    expect(result.current).toBe(Date.now());

    // Advance time by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(Date.now());

    // Advance another second
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(Date.now());
  });

  it('clears the interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const { unmount } = renderHook(() => useNow(500));

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });

  it('resets the interval when updateIntervalMs changes', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const { rerender } = renderHook(
      ({ interval }) => useNow(interval),
      { initialProps: { interval: 1000 } }
    );

    // Change interval
    rerender({ interval: 2000 });
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('uses default interval of 1000ms when no argument provided', () => {
    const { result } = renderHook(() => useNow());
    expect(result.current).toBe(Date.now());

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(Date.now());
  });
});