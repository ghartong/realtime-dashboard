import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Duration } from '@/components/DurationSelector';

interface DurationState {
  duration: Duration;
  setDuration: (duration: Duration) => void;
}

export const useDurationStore = create<DurationState>()(
  persist(
    (set) => ({
      duration: '1h',
      setDuration: (duration) => set({ duration }),
    }),
    { name: 'dashboard-duration' } // persists in localStorage
  )
);