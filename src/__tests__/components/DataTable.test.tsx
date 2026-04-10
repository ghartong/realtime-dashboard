import { render, screen } from '@testing-library/react';
import { DataTable } from '@/components/DataTable';
import { useDataStore } from '@/store/useDataStore';
import { useDurationStore } from '@/store/useDurationStore';
import { useFilteredData } from '@/hooks/useFilteredData';
import { useNow } from '@/hooks/useNow';

// Mock all dependencies
vi.mock('@/store/useDataStore');
vi.mock('@/store/useDurationStore');
vi.mock('@/hooks/useFilteredData');
vi.mock('@/hooks/useNow');

describe('DataTable', () => {
  const fixedNow = 1_700_000_000_000;
  const mockData = [
    { timestamp: fixedNow - 1000, metric: 'cpu', value: 45.5 },
    { timestamp: fixedNow - 2000, metric: 'memory', value: 72.3 },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    // Mock useNow to return a fixed timestamp
    (useNow as unknown as ReturnType<typeof vi.fn>).mockReturnValue(fixedNow);
    // Mock useFilteredData to return the data directly (already filtered by duration)
    (useFilteredData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockData);
    // Mock stores just enough to avoid errors (they are not directly used if useFilteredData is mocked)
    (useDataStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ data: [] })
    );
    (useDurationStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ duration: '1h' })
    );
  });

  it('shows "Waiting for data..." when filtered data is empty', () => {
    (useFilteredData as unknown as ReturnType<typeof vi.fn>).mockReturnValue([]);
    render(<DataTable />);
    expect(screen.getByText(/waiting for data/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders the table with correct headers when data exists', () => {
    render(<DataTable />);

    // Headers
    expect(screen.getByText('Timestamp')).toBeInTheDocument();
    expect(screen.getByText('Metric')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();

    // Check that data rows are rendered (use flexible matcher for case-insensitive)
    expect(screen.getByText(/cpu/i)).toBeInTheDocument();
    expect(screen.getByText(/memory/i)).toBeInTheDocument();
    expect(screen.getByText('45.50')).toBeInTheDocument(); // toFixed(2) formatting
    expect(screen.getByText('72.30')).toBeInTheDocument();
  });

  it('formats timestamp as localized time string', () => {
    render(<DataTable />);
    const expectedTime = new Date(fixedNow - 1000).toLocaleTimeString();
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

it('shows only the last 20 entries (newest first)', () => {
  // Generate 25 data points, oldest first (simulating real store)
  const manyData = Array.from({ length: 25 }, (_, i) => ({
    timestamp: fixedNow - (24 - i) * 60000, // i=0 oldest, i=24 newest
    metric: 'cpu',
    value: i, // oldest value 0, newest value 24
  }));
  (useFilteredData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(manyData);

  render(<DataTable />);
  const rows = screen.getAllByRole('row');
  // Header + 20 data rows
  expect(rows).toHaveLength(21);
  
  // Newest (value 24) should be present
  expect(screen.getByText('24.00')).toBeInTheDocument();
  // Oldest (value 0) should NOT be present
  expect(screen.queryByText('0.00')).not.toBeInTheDocument();
});

  it('displays metric values with 2 decimal places', () => {
    const preciseData = [{ timestamp: fixedNow, metric: 'cpu', value: 45.5678 }];
    (useFilteredData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(preciseData);
    render(<DataTable />);
    expect(screen.getByText('45.57')).toBeInTheDocument();
  });

  it('capitalizes metric names', () => {
    render(<DataTable />);

    expect(screen.getByText('cpu')).toBeInTheDocument();
    expect(screen.getByText('memory')).toBeInTheDocument();
  });
});