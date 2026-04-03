// src/lib/mockData.ts
// This generates historical mock data for the charts so they don't start empty, 
// and also defines the DataPoint type.
export interface DataPoint {
  timestamp: number;
  value: number;
  metric: 'cpu' | 'memory' | 'requests';
}

export function generateMockData(metric: DataPoint['metric'], count = 20): DataPoint[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    timestamp: now - (count - i) * 60000, // one minute intervals
    value: Math.random() * 100,
    metric,
  }));
}
