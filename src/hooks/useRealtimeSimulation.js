// src/hooks/useRealtimeSimulation.ts
// this simulates real-time data updates by adding a new random data point every 5 seconds
import { useEffect } from 'react';
import { useDataStore } from '@/store/useDataStore';
export function useRealtimeSimulation(metric) {
    var addDataPoint = useDataStore(function (s) { return s.addDataPoint; });
    useEffect(function () {
        var interval = setInterval(function () {
            var newPoint = {
                timestamp: Date.now(),
                value: Math.random() * 100,
                metric: metric,
            };
            addDataPoint(newPoint);
        }, 5000);
        return function () { return clearInterval(interval); };
    }, [metric, addDataPoint]);
}
