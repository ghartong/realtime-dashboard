import { create } from 'zustand';
import { DataPoint } from '../lib/mockData';

interface DataStore {
  data: DataPoint[];
  addDataPoint: (point: DataPoint) => void;
  clearData: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  addDataPoint: (point) =>
    set((state) => ({
      data: [...state.data.slice(-19), point], // keep only the latest 20 points
    })),
  clearData: () => set({ data: [] }),
}));