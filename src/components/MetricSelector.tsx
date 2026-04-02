const MetricSelector: React.FC<{ onSelect: (metric: string) => void }> = ({ onSelect }) => {
  return (
    <div>
      <label htmlFor="metric">Select Metric: </label>
      <select id="metric" onChange={(e) => onSelect(e.target.value)}>
        <option value="cpu">CPU Usage</option>
        <option value="memory">Memory Usage</option>
        <option value="requests">Request Count</option>
      </select>
    </div>
  );
};

export default MetricSelector;
