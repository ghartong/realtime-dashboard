/**
 * Displays the last 20 data points in reverse chronological order.
 * Used for debugging and transparency. Data updates in real-time via Zustand store.
 * @tested src/__tests__/components/DataTable.test.tsx
 */
import { useNow } from "@/hooks/useNow";
// import { useDataStore } from '@/store/useDataStore';
import { useFilteredData } from "@/hooks/useFilteredData";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"; // optional, install with: npx shadcn@latest add scroll-area

export function DataTable() {
  // const data = useDataStore((state) => state.data);
  const now = useNow();
  const filteredData = useFilteredData(now);

  // Show last 20 entries only, most recent first
  const recentData = [...filteredData]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 20);

  if (filteredData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Raw Data Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Waiting for data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raw Data Feed</CardTitle>
        <p className="text-sm text-muted-foreground">
          Last {recentData.length} of {filteredData.length} entries (newest
          first)
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentData.map((point, idx) => (
                <TableRow key={`${point.timestamp}-${idx}`}>
                  <TableCell className="font-mono text-xs">
                    {new Date(point.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="capitalize">{point.metric}</TableCell>
                  <TableCell className="text-right font-mono">
                    {point.value.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
