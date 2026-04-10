var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// this gets inital data on app start 
// and also defines the store for the app, which is used to hold the data points for the charts.
import { create } from 'zustand';
import { generateMockData } from '@/lib/mockData';
export var useDataStore = create(function (set) { return ({
    data: generateMockData('cpu', 20), // start with some initial data
    addDataPoint: function (point) {
        return set(function (state) { return ({
            data: __spreadArray(__spreadArray([], state.data.slice(-19), true), [point], false), // keep only the latest 20 points
        }); });
    },
    clearData: function () { return set({ data: [] }); },
}); });
