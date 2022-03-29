export type GraphData = {
  points: Point[];
  end: number;
  start: number;
  maxValue: number;
  minValue: number;
  firstValidPointIndex: number;
};

export type PeriodMapKey = "1h" | "24h" | "1w" | "1m" | "1y" | "all";

export type Point = { x: number; y: number | null };
