import { act, renderHook } from '@testing-library/react';
import { useRealtimeSimulation } from '@/hooks/useRealtimeSimulation';
import { useDataStore } from '@/store/useDataStore';
describe('useRealtimeSimulation', function () {
    beforeEach(function () {
        vi.useFakeTimers();
        useDataStore.getState().clearData();
    });
    afterEach(function () {
        vi.restoreAllMocks();
    });
    it('updates data every 5 seconds', function () {
        renderHook(function () { return useRealtimeSimulation('cpu'); });
        expect(useDataStore.getState().data.length).toBe(0);
        act(function () { return vi.advanceTimersByTime(5000); });
        expect(useDataStore.getState().data.length).toBe(1);
    });
});
