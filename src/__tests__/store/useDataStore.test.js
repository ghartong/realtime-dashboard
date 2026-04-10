import { act, renderHook } from '@testing-library/react';
import { useDataStore } from '@/store/useDataStore';
describe('useDataStore', function () {
    beforeEach(function () {
        var result = renderHook(function () { return useDataStore(); }).result;
        act(function () {
            result.current.clearData();
        });
    });
    it('adds a data point and keeps last 20', function () {
        var result = renderHook(function () { return useDataStore(); }).result;
        var addDataPoint = result.current.addDataPoint;
        var points = Array.from({ length: 25 }, function (_, i) { return ({
            timestamp: Date.now() * 1 + i * 1000,
            value: i,
            metric: 'cpu'
        }); });
        points.forEach(function (point) {
            act(function () { return addDataPoint(point); });
        });
        expect(result.current.data).toHaveLength(20);
        expect(result.current.data[19].value).toBe(24);
    });
    it('resets data', function () {
        var result = renderHook(function () { return useDataStore(); }).result;
        act(function () { return result.current.addDataPoint({ timestamp: Date.now(), value: 1, metric: 'cpu' }); });
        act(function () { return result.current.clearData(); });
        expect(result.current.data).toHaveLength(0);
    });
});
