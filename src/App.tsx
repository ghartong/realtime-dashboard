import { useState } from 'react';

import './App.css'
import MetricSelector from './components/MetricSelector';
import LineChartComponent from './components/LineChart'

function App() {
  const [metric, setMetric] = useState('cpu');

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMetric(e.target.value);
  };

  return (
    <>
      <section id="center">
        Metric selector (CPU/Memory/Requests), time range (1h/6h/24h)
        <MetricSelector onSelect={handleMetricChange} />
      </section>

      <section id="sidePanel">Side Panel AI anomaly summary (placeholder for Day 2)</section>

      <section id="mainContent">
        <h2>Main Content Line chart (Recharts)</h2>
        <div>
          <LineChartComponent metric={'metric'} />
        </div>
      </section>
      
      <section id="bottomBar">Footer Raw data table (optional, shows senior attention to detail)</section>
    </>
  )
}

export default App
