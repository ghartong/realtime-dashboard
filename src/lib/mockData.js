export function generateMockData(metric, count) {
    if (count === void 0) { count = 20; }
    var now = Date.now();
    return Array.from({ length: count }, function (_, i) { return ({
        timestamp: now - (count - i) * 60000, // one minute intervals
        value: Math.random() * 100,
        metric: metric,
    }); });
}
