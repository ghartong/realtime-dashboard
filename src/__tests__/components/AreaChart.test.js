var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { AreaChartComponent } from '@/components/AreaChart';
import { useDataStore } from '@/store/useDataStore';
import { generateMockData } from '@/lib/mockData';
// 1. Mock getBoundingClientRect
beforeEach(function () {
    window.HTMLElement.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        width: 650,
        height: 300,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    });
});
describe('AreaChartComponent', function () {
    it('renders AreaChart with data', function () {
        generateMockData('cpu', 5).forEach(function (point) {
            useDataStore.setState(function (state) { return ({
                data: __spreadArray(__spreadArray([], state.data, true), [point], false),
            }); });
        });
        render(_jsx(AreaChartComponent, { metric: "cpu" }));
        // 2. Check if the chart container is present
        var chart = screen.getByTestId('area-chart-container');
        expect(chart).toBeInTheDocument();
    });
});
