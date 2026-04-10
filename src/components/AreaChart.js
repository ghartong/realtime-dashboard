var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useMemo } from 'react';
import { useDataStore } from '@/store/useDataStore';
export function AreaChartComponent(_a) {
    var metric = _a.metric;
    var allData = useDataStore(function (s) { return s.data; }).map(function (point) { return (__assign(__assign({}, point), { timestamp: new Date(point.timestamp).toLocaleTimeString(), value: Number(point.value.toFixed(2)) })); });
    var series = useMemo(function () { return allData.filter(function (point) { return point.metric === metric; }); }, [allData, metric]);
    return (_jsx("div", { style: { width: '100%', height: 300 }, "data-testid": "area-chart-container", children: _jsx(ResponsiveContainer, { children: _jsxs(AreaChart, { margin: { top: 10, right: 30, left: 0, bottom: 0 }, data: series, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "timestamp" }), _jsx(YAxis, { dataKey: "value" }), _jsx(Tooltip, {}), _jsx(Area, { type: "monotone", dataKey: "value", stroke: "#8884d8", fill: "#8884d8" })] }) }) }));
}
