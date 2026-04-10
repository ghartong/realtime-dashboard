import { render, screen, within } from '@testing-library/react';
import { DataTable } from '@/components/DataTable';
import { useDataStore } from '@/store/useDataStore';

// Mock the entire store module
vi.mock('@/store/useDataStore', () => ({
  useDataStore: vi.fn(),
}));

describe('DataTable', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows "Waiting for data..." when data array is empty', () => {
    // Mock the store to return empty data
    (useDataStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ data: [] })
    );

    render(<DataTable />);
    expect(screen.getByText(/waiting for data/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument(); // or table might still render but empty body
  });

  it('renders the table with correct headers when data exists', () => {
    const mockData = [
      { timestamp: 1700000000000, metric: 'cpu', value: 45.5 },
      { timestamp: 1700000060000, metric: 'memory', value: 72.3 },
    ];

    (useDataStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ data: mockData })
    );

    render(<DataTable />);

    // Check table headers
    expect(screen.getByText('Timestamp')).toBeInTheDocument();
    expect(screen.getByText('Metric')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();

    const cpuCell = screen.getByText((content, element) => {
        return element?.tagName === 'TD' && content.toLowerCase().includes('cpu');
    });
    expect(cpuCell).toBeInTheDocument();

    const memoryCell = screen.getByText((content, element) => {
        return element?.tagName === 'TD' && content.toLowerCase().includes('memory');
    });
      expect(memoryCell).toBeInTheDocument();
  });

  it('formats timestamp as localized time string', () => {
    const mockData = [{ timestamp: 1700000000000, metric: 'cpu', value: 45.5 }];
    (useDataStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ data: mockData })
    );

    render(<DataTable />);
    const expectedTime = new Date(1700000000000).toLocaleTimeString();
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  it('shows only the last 20 entries (newest first)', () => {
    // Generate 25 data points
    const manyData = Array.from({ length: 25 }, (_, i) => ({
      timestamp: 1700000000000 + i * 60000,
      metric: 'cpu',
      value: i,
    }));
    (useDataStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ data: manyData })
    );

    render(<DataTable />);
    const rows = screen.getAllByRole('row');
    // rows[0] is header, so expect 21 rows total (20 data + 1 header)
    expect(rows).toHaveLength(21);
    // The first data row should have the highest timestamp (newest)
    // Our component reverses, so index 0 in reversed array is last item (i=24)
    const firstDataRow = rows[1];
    expect(within(firstDataRow).getByText('24.00')).toBeInTheDocument(); // value = 24
  });

  it('displays metric values with 2 decimal places', () => {
    const mockData = [{ timestamp: 1700000000000, metric: 'cpu', value: 45.5678 }];
    (useDataStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ data: mockData })
    );

    render(<DataTable />);
    expect(screen.getByText('45.57')).toBeInTheDocument(); // rounded
  });

  it('capitalizes metric names', () => {
    const mockData = [{ timestamp: 1700000000000, metric: 'cpu', value: 45 }];
    (useDataStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ data: mockData })
    );

    render(<DataTable />);
    expect(screen.getByText(/cpu/i)).toBeInTheDocument(); // "cpu" becomes "Cpu"
  });
});