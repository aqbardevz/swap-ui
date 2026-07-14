"use client";

import { useId, useMemo, useRef, useState, type MouseEvent } from "react";
import type { PricePoint } from "@/entities/token";
import { buildAreaPath, buildSparklinePath } from "@/shared/lib/sparkline";
import { formatUsd } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import styles from "./PriceChart.module.css";

const RANGES = ["1D", "7D", "1M", "1Y"] as const;
type Range = (typeof RANGES)[number];

interface PriceChartProps {
  chart1d: PricePoint[];
  chart7d: PricePoint[];
  chart30d: PricePoint[];
  chart1y: PricePoint[];
  positive: boolean;
}

const WIDTH = 640;
const HEIGHT = 220;

function formatHoverTime(time: number, range: Range): string {
  const date = new Date(time);
  if (range === "1D") {
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
  }
  if (range === "1Y") {
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export function PriceChart({ chart1d, chart7d, chart30d, chart1y, positive }: PriceChartProps) {
  const [range, setRange] = useState<Range>("7D");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId();

  const points = { "1D": chart1d, "7D": chart7d, "1M": chart30d, "1Y": chart1y }[range];
  const prices = useMemo(() => points.map((point) => point.price), [points]);
  const linePath = buildSparklinePath(prices, WIDTH, HEIGHT);
  const areaPath = buildAreaPath(prices, WIDTH, HEIGHT);
  const color = positive ? "var(--success)" : "var(--danger)";

  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  const priceRange = max - min || 1;

  function handleMove(event: MouseEvent<SVGSVGElement>) {
    if (!svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const index = Math.min(points.length - 1, Math.max(0, Math.round(ratio * (points.length - 1))));
    setHoverIndex(index);
  }

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;
  const hoverX = hoverIndex !== null && points.length > 1 ? (hoverIndex / (points.length - 1)) * 100 : null;
  const hoverY = hovered !== null ? HEIGHT - ((hovered.price - min) / priceRange) * HEIGHT : null;
  const tooltipLeft = hoverX !== null ? Math.min(92, Math.max(8, hoverX)) : null;

  return (
    <div className={styles.wrap}>
      <div className={styles.toggle}>
        {RANGES.map((option) => (
          <button
            key={option}
            type="button"
            className={cn(styles.toggleButton, range === option && styles.toggleButtonActive)}
            onClick={() => {
              setRange(option);
              setHoverIndex(null);
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {prices.length > 1 ? (
        <div className={styles.chartArea}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className={styles.svg}
            preserveAspectRatio="none"
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {hoverX !== null && hoverY !== null && (
              <g>
                <line
                  x1={(hoverX / 100) * WIDTH}
                  y1={0}
                  x2={(hoverX / 100) * WIDTH}
                  y2={HEIGHT}
                  stroke="var(--border-strong)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={(hoverX / 100) * WIDTH}
                  cy={hoverY}
                  r={4}
                  fill={color}
                  stroke="var(--surface)"
                  strokeWidth={2}
                />
              </g>
            )}
          </svg>

          {hovered && tooltipLeft !== null && (
            <div className={styles.tooltip} style={{ left: `${tooltipLeft}%` }}>
              <span className={styles.tooltipPrice}>{formatUsd(hovered.price)}</span>
              <span className={styles.tooltipTime}>{formatHoverTime(hovered.time, range)}</span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.empty}>Chart unavailable</div>
      )}
    </div>
  );
}
