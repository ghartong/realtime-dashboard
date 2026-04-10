import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
describe('AppSidebar', function () {
    it('calls onMetricChange on selection', function () {
        var mockOnChange = vi.fn();
        render(_jsx(SidebarProvider, { children: _jsx(AppSidebar, { metric: 'cpu', onMetricChange: mockOnChange }) }));
        var dropdown = screen.getByRole('combobox');
        fireEvent.change(dropdown, { target: { value: 'memory' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});
