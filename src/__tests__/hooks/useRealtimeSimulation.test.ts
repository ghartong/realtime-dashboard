import { act, renderHook } from '@testing-library/react'
import { useRealtimeSimulation } from '@/hooks/useRealtimeSimulation'
import { useDataStore } from '@/store/useDataStore'

describe('useRealtimeSimulation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useDataStore.getState().clearData()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('updates data every 5 seconds', () => {
    renderHook(() => useRealtimeSimulation('cpu'))

    expect(useDataStore.getState().data.length).toBe(0)

    act(() => vi.advanceTimersByTime(5000))

    expect(useDataStore.getState().data.length).toBe(1)
  })
})