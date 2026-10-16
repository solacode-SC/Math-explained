import { Point2D } from './curve';

export interface ViewportTransform {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/**
 * Transforms math coordinate (x, y) to SVG screen coordinate (sx, sy).
 */
export function mathToScreen(
  pt: Point2D,
  view: ViewportTransform
): { x: number; y: number } {
  const plotW = view.width - view.padding.left - view.padding.right;
  const plotH = view.height - view.padding.top - view.padding.bottom;

  const sx =
    view.padding.left +
    ((pt.x - view.xMin) / (view.xMax - view.xMin)) * plotW;
  const sy =
    view.height -
    view.padding.bottom -
    ((pt.y - view.yMin) / (view.yMax - view.yMin)) * plotH;

  return { x: sx, y: sy };
}

/**
 * Transforms SVG screen coordinate (sx, sy) back to math coordinate (x, y).
 */
export function screenToMath(
  screenPt: { x: number; y: number },
  view: ViewportTransform
): Point2D {
  const plotW = view.width - view.padding.left - view.padding.right;
  const plotH = view.height - view.padding.top - view.padding.bottom;

  const x =
    view.xMin +
    ((screenPt.x - view.padding.left) / plotW) * (view.xMax - view.xMin);
  const y =
    view.yMin +
    ((view.height - view.padding.bottom - screenPt.y) / plotH) *
      (view.yMax - view.yMin);

  return { x, y };
}

/**
 * Generates an SVG path string from an array of math points
 */
export function pointsToSvgPath(
  points: Point2D[],
  view: ViewportTransform
): string {
  if (points.length === 0) return '';
  const first = mathToScreen(points[0], view);
  let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const pt = mathToScreen(points[i], view);
    d += ` L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
  }
  return d;
}

/**
 * Computes the tangent line segment centered at (x0, y0) with given length in math units.
 */
export function getTangentSegment(
  x0: number,
  y0: number,
  slope: number,
  length: number = 2.5
): { pStart: Point2D; pEnd: Point2D } {
  const angle = Math.atan(slope);
  const dx = (length / 2) * Math.cos(angle);
  const dy = (length / 2) * Math.sin(angle);

  return {
    pStart: { x: x0 - dx, y: y0 - dy },
    pEnd: { x: x0 + dx, y: y0 + dy },
  };
}

