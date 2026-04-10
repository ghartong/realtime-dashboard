import { useMemo } from 'react';
import { useDataStore } from '@/store/useDataStore';
import { useDurationStore } from '@/store/useDurationStore';
import type { Duration } from '@/components/DurationSelector';

const durationToMs: Record<Duration, number> = {
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
};

export function useFilteredData(now: number) {
  const allData = useDataStore((state) => state.data);
  const { duration } = useDurationStore();

  return useMemo(() => {
    const cutoff = now - durationToMs[duration];
    return allData.filter((point) => point.timestamp >= cutoff);
  }, [allData, duration, now]);
}