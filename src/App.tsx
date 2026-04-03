import { useState } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AreaChartComponent } from '@/components/AreaChart';

import { useRealtimeSimulation } from '@/hooks/useRealtimeSimulation';
import { useDataStore } from '@/store/useDataStore';
import { generateMockData, type DataPoint } from '@/lib/mockData';

import './App.css'

function App() {
  const [metric, setMetric] = useState<DataPoint['metric']>('cpu');

  // Start the real-time simulation
  useRealtimeSimulation(metric);

  const handleMetricChange = (newMetric: DataPoint['metric']) => {
    useDataStore.setState({ data: generateMockData(newMetric, 20) });
    setMetric(newMetric);
  };

  return (
    <SidebarProvider>
      <AppSidebar metric={metric} onMetricChange={handleMetricChange}  />
      <SidebarTrigger>Toggle Chart</SidebarTrigger>

      <section id="mainContent" className='w-full'>
        <h2>Area chart (Recharts)</h2>
        <div>
          <AreaChartComponent metric={metric} />
        </div>
        <div id="bottomBar" className="w-full mt-auto border-t bg-background p-4">
          Raw data table here
        </div>
      </section>
      
    </SidebarProvider>
  )
}

export default App
