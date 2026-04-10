import { useEffect, useState } from 'react';

export function useNow(updateIntervalMs: number = 1000) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, updateIntervalMs);
    return () => clearInterval(interval);
  }, [updateIntervalMs]);

  return now;
}