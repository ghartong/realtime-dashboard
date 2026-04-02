// src/hooks/useRealtimeSimulation.ts
import { useEffect } from 'react';
import { useDataStore } from '../store/useDataStore';
import { generateMockData, type DataPoint } from '../lib/mockData';

export function useRealtimeSimulation(metric: string) {
  const addDataPoint = useDataStore((s) => s.addDataPoint);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        timestamp: Date.now(),
        value: Math.random() * 100,
        metric: metric as DataPoint['metric'],
      };
      addDataPoint(newPoint);
    }, 5000);
    return () => clearInterval(interval);
  }, [metric, addDataPoint]);
}