import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"

import type { DataPoint } from '@/lib/mockData'
import { MetricSelector } from "./MetricSelector"

type AppSidebarProps = {
    metric: DataPoint['metric']
  onMetricChange: (metric: DataPoint['metric']) => void
}

export function AppSidebar({ metric, onMetricChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Metrics</SidebarGroupLabel>
            <MetricSelector 
                value={metric}
                onChange={onMetricChange} 
            />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}