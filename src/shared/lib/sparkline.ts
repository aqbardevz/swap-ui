export function downsample<T>(values: T[], targetPoints: number): T[] {
  if (values.length <= targetPoints) return values;

  const step = values.length / targetPoints;
  return Array.from({ length: targetPoints }, (_, index) => values[Math.floor(index * step)]);
}

export function buildSparklinePath(values: number[], width: number, height: number): string {
  if (values.length === 0) return "";

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1 || 1);

  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function buildAreaPath(values: number[], width: number, height: number): string {
  const line = buildSparklinePath(values, width, height);
  if (!line) return "";
  return `${line} L${width},${height} L0,${height} Z`;
}
