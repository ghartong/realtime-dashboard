import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, } from "@/components/ui/sidebar";
import { MetricSelector } from "./MetricSelector";
export function AppSidebar(_a) {
    var metric = _a.metric, onMetricChange = _a.onMetricChange;
    return (_jsxs(Sidebar, { children: [_jsx(SidebarHeader, {}), _jsxs(SidebarContent, { children: [_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Metrics" }), _jsx(MetricSelector, { value: metric, onChange: onMetricChange })] }), _jsx(SidebarGroup, {})] }), _jsx(SidebarFooter, {})] }));
}
