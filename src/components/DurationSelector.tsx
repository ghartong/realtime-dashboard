import { useDurationStore } from '@/store/useDurationStore';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent } from '@/components/ui/card';

export type Duration = '1h' | '6h' | '24h';

export function DurationSelector() {
  const { duration, setDuration } = useDurationStore();

  return (
    <Card className="w-fit">
      <CardContent className="p-2">
        <ToggleGroup
          type="single"
          value={duration}
          onValueChange={(value) => value && setDuration(value as Duration)}
          aria-label="Select time range"
        >
          <ToggleGroupItem value="1h" aria-label="Last hour">
            1h
          </ToggleGroupItem>
          <ToggleGroupItem value="6h" aria-label="Last 6 hours">
            6h
          </ToggleGroupItem>
          <ToggleGroupItem value="24h" aria-label="Last 24 hours">
            24h
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
}