// src/lib/mockData.ts
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

// For real-time: every 5 seconds, add a new point and drop oldest