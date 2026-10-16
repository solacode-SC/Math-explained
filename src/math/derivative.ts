import { Point2D } from './curve';

/**
 * Calculates instantaneous derivative f'(x) using central difference
 * (or uses analytical derivative if provided).
 */
export function numericalDerivative(
  f: (x: number) => number,
  x: number,
  h: number = 1e-5
): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

/**
 * Calculates secant slope between x and x + dx:
 * m = (f(x + dx) - f(x)) / dx
 */
export function secantSlope(
  f: (x: number) => number,
  x: number,
  dx: number
): {
  p1: Point2D;
  p2: Point2D;
  deltaX: number;
  deltaY: number;
  slope: number;
} {
  const y1 = f(x);
  const x2 = x + dx;
  const y2 = f(x2);
  const deltaX = dx;
  const deltaY = y2 - y1;
  const slope = dx !== 0 ? deltaY / deltaX : numericalDerivative(f, x);
  return {
    p1: { x, y: y1 },
    p2: { x: x2, y: y2 },
    deltaX,
    deltaY,
    slope,
  };
}

/**
 * Returns derivative angle in degrees (-90 to +90)
 */
export function slopeToAngleDeg(slope: number): number {
  return (Math.atan(slope) * 180) / Math.PI;
}

/**
 * Formats a number cleanly with sign: e.g. "+2.40" or "-1.50"
 */
export function formatSigned(val: number, decimals: number = 2): string {
  const rounded = val.toFixed(decimals);
  if (val > 0) return `+${rounded}`;
  if (Math.abs(val) < 1e-4) return (0).toFixed(decimals);
  return rounded;
}

