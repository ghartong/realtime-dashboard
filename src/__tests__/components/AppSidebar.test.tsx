import { render, screen, fireEvent } from '@testing-library/react'
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar'

describe('AppSidebar', () => {
  it('calls onMetricChange on selection', () => {
    const mockOnChange = vi.fn()

    render(
      <SidebarProvider>
        <AppSidebar metric='cpu' onMetricChange={mockOnChange} />
      </SidebarProvider>
    )

    const dropdown = screen.getByRole('combobox')
    fireEvent.change(dropdown, { target: { value: 'memory' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })
})