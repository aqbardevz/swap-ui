import { buildSparklinePath } from "@/shared/lib/sparkline";

export function Sparkline({ values, positive }: { values: number[]; positive: boolean }) {
  const width = 96;
  const height = 32;
  const path = buildSparklinePath(values, width, height);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path
        d={path}
        stroke={positive ? "var(--success)" : "var(--danger)"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
