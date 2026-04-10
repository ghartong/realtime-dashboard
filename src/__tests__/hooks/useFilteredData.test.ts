/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';
import { useFilteredData } from '@/hooks/useFilteredData';
import { useDataStore } from '@/store/useDataStore';
import { useDurationStore } from '@/store/useDurationStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@/store/useDataStore');
vi.mock('@/store/useDurationStore');

describe('useFilteredData', () => {
  const now = 1_700_000_000_000;

  // Sample data (using only valid metric types)
  const mockData = [
    { timestamp: now - 30 * 60 * 1000, metric: 'cpu', value: 50 },
    { timestamp: now - 2 * 60 * 60 * 1000, metric: 'memory', value: 60 },
    { timestamp: now - 10 * 60 * 60 * 1000, metric: 'cpu', value: 70 },
    { timestamp: now - 25 * 60 * 60 * 1000, metric: 'memory', value: 80 },
  ];

  beforeEach(() => {
    vi.resetAllMocks();

    // Default mock: return the full store object when called without selector
    // But our hook uses a selector, so we need to handle both cases.
    (useDataStore as any).mockImplementation((selector?: any) => {
      const store = {
        data: mockData,
        addDataPoint: vi.fn(),
        clearData: vi.fn(),
      };
      return selector ? selector(store) : store;
    });

    (useDurationStore as any).mockImplementation((selector?: any) => {
      const store = {
        duration: '1h',
        setDuration: vi.fn(),
      };
      return selector ? selector(store) : store;
    });
  });

  it('filters data to last 1 hour when duration is 1h', () => {
    (useDurationStore as any).mockImplementation((selector?: any) => {
      const store = { duration: '1h', setDuration: vi.fn() };
      return selector ? selector(store) : store;
    });

    const { result } = renderHook(() => useFilteredData(now));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].value).toBe(50);
  });

  it('filters data to last 6 hours when duration is 6h', () => {
    (useDurationStore as any).mockImplementation((selector?: any) => {
      const store = { duration: '6h', setDuration: vi.fn() };
      return selector ? selector(store) : store;
    });

    const { result } = renderHook(() => useFilteredData(now));
    expect(result.current).toHaveLength(2);
    expect(result.current.map(d => d.value)).toEqual([50, 60]);
  });

  it('filters data to last 24 hours when duration is 24h', () => {
    (useDurationStore as any).mockImplementation((selector?: any) => {
      const store = { duration: '24h', setDuration: vi.fn() };
      return selector ? selector(store) : store;
    });

    const { result } = renderHook(() => useFilteredData(now));
    expect(result.current).toHaveLength(3);
    expect(result.current.map(d => d.value)).toEqual([50, 60, 70]);
  });

  it('returns empty array when no data fits the duration', () => {
    const oldNow = now + 2 * 60 * 60 * 1000;
    const { result } = renderHook(() => useFilteredData(oldNow));
    expect(result.current).toHaveLength(0);
  });

  it('recalculates when duration changes', () => {
    let currentDuration: any = '1h';
    (useDurationStore as any).mockImplementation((selector?: any) => {
      const store = { duration: currentDuration, setDuration: vi.fn() };
      return selector ? selector(store) : store;
    });

    const { result, rerender } = renderHook(() => useFilteredData(now));
    expect(result.current).toHaveLength(1);

    currentDuration = '6h';
    rerender();
    expect(result.current).toHaveLength(2);
  });
});