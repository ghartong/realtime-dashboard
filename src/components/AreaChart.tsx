import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useMemo } from 'react'
import { useDataStore } from '@/store/useDataStore'
import type { DataPoint } from '@/lib/mockData'

type LineChartComponentProps = {
  metric: DataPoint['metric']
}

export function AreaChartComponent({ metric }: LineChartComponentProps) {
  const allData = useDataStore((s) => s.data).map((point) => ({
    ...point,
    timestamp: new Date(point.timestamp).toLocaleTimeString(),
    value: Number(point.value.toFixed(2)),
  }))

  const series = useMemo(
    () => allData.filter((point) => point.metric === metric),
    [allData, metric],
  )

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <AreaChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }} data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}