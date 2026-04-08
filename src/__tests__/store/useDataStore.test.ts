import { act, renderHook } from '@testing-library/react'
import { useDataStore } from '@/store/useDataStore'
import type { DataPoint } from '@/lib/mockData'

describe('useDataStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useDataStore())
    act(() => {
      result.current.clearData()
    })
  })

  it('adds a data point and keeps last 20', () => {
    const { result } = renderHook(() => useDataStore())
    const addDataPoint = result.current.addDataPoint

    const points: DataPoint[] = Array.from({ length: 25 }, (_, i) => ({
      timestamp: Date.now() * 1 + i * 1000,
      value: i,
      metric: 'cpu' as const
    }))

    points.forEach(point => {
      act(() => addDataPoint(point))
    })

    expect(result.current.data).toHaveLength(20)
    expect(result.current.data[19].value).toBe(24)
  })

  it('resets data', () => {
    const { result } = renderHook(() => useDataStore())
    act(() => result.current.addDataPoint({ timestamp: Date.now(), value: 1, metric: 'cpu' }))
    act(() => result.current.clearData())
    expect(result.current.data).toHaveLength(0)
  })
})