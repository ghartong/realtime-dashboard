import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AreaChartComponent } from '@/components/AreaChart';
import { useRealtimeSimulation } from '@/hooks/useRealtimeSimulation';
import { useDataStore } from '@/store/useDataStore';
import { generateMockData } from '@/lib/mockData';
import './App.css';
function App() {
    var _a = useState('cpu'), metric = _a[0], setMetric = _a[1];
    // Start the real-time simulation
    useRealtimeSimulation(metric);
    var handleMetricChange = function (newMetric) {
        useDataStore.setState({ data: generateMockData(newMetric, 20) });
        setMetric(newMetric);
    };
    return (_jsxs(SidebarProvider, { children: [_jsx(AppSidebar, { metric: metric, onMetricChange: handleMetricChange }), _jsx(SidebarTrigger, { children: "Toggle Chart" }), _jsxs("section", { id: "mainContent", className: 'w-full', children: [_jsx("h2", { children: "Area chart (Recharts)" }), _jsx("div", { children: _jsx(AreaChartComponent, { metric: metric }) }), _jsx("div", { id: "bottomBar", className: "w-full mt-auto border-t bg-background p-4", children: "Raw data table here" })] })] }));
}
export default App;
