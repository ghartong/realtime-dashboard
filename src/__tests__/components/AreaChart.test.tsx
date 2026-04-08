import { render, screen } from '@testing-library/react';
import { AreaChartComponent } from '@/components/AreaChart';
import { useDataStore } from '@/store/useDataStore';
import { generateMockData } from '@/lib/mockData';

// 1. Mock getBoundingClientRect
beforeEach(() => {
  window.HTMLElement.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    width: 650,
    height: 300,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
});

describe('AreaChartComponent', () => {
  it('renders AreaChart with data', () => {
    generateMockData('cpu', 5).forEach((point) => {
      useDataStore.setState((state) => ({
        data: [...state.data, point],
      }));
    });
    
    render(<AreaChartComponent metric="cpu" />);
    
    // 2. Check if the chart container is present
    const chart = screen.getByTestId('area-chart-container');
    expect(chart).toBeInTheDocument();
  });

});
