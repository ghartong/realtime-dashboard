// this gets inital data on app start 
// and also defines the store for the app, which is used to hold the data points for the charts.
import { create } from 'zustand';
import { generateMockData, type DataPoint } from '@/lib/mockData'

interface DataStore {
  data: DataPoint[];
  addDataPoint: (point: DataPoint) => void;
  clearData: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: generateMockData('cpu', 20), // start with some initial data
  addDataPoint: (point) =>
    set((state) => ({
      data: [...state.data.slice(-19), point], // keep only the latest 20 points
    })),
  clearData: () => set({ data: [] }),
}));