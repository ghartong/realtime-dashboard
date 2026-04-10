import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import App from '@/App';
beforeEach(function () {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(function (query) { return ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }); }),
    });
});
describe('App', function () {
    it('renders sidebar and chart', function () {
        render(_jsx(App, {}));
        expect(screen.getByText(/Metrics/i)).toBeInTheDocument(); // Adjust based on actual text
        var chart = screen.getByTestId('area-chart-container');
        expect(chart).toBeInTheDocument();
    });
    it('changes metric on selector change', function () {
        render(_jsx(App, {}));
        var selector = screen.getByRole('combobox'); // Assuming MetricSelector is a select
        fireEvent.change(selector, { target: { value: 'memory' } });
        // Verify metric state or chart update (may need to mock store)
    });
});
