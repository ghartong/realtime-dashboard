import type { ChangeEvent } from 'react'
import type { DataPoint } from '@/lib/mockData'

type MetricSelectorProps = {
  value: DataPoint['metric']
  onChange: (metric: DataPoint['metric']) => void
}

export function MetricSelector({ value, onChange }: MetricSelectorProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as DataPoint['metric'])
  }

  return (
    <label className="flex flex-col gap-2 text-sm">
      <select value={value} onChange={handleChange} className="rounded border px-2 py-1">
        <option value="cpu">cpu</option>
        <option value="memory">memory</option>
        <option value="requests">requests</option>
      </select>
    </label>
  )
}