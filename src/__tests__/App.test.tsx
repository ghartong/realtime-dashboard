import { render, screen, fireEvent } from '@testing-library/react';

import App from '@/App';

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
    })
});

describe('App', () => {
  it('renders sidebar and chart', () => {
    render(<App />);
    expect(screen.getByText(/Metrics/i)).toBeInTheDocument(); // Adjust based on actual text
    const chart = screen.getByTestId('area-chart-container');
    expect(chart).toBeInTheDocument();
  });

  it('changes metric on selector change', () => {
    render(<App />);
    const selector = screen.getByRole('combobox'); // Assuming MetricSelector is a select
    fireEvent.change(selector, { target: { value: 'memory' } });
    // Verify metric state or chart update (may need to mock store)
  });
});