export interface Point2D {
  x: number;
  y: number;
}

export interface CurveFunction {
  id: string;
  nameArabic: string;
  formulaLatex: string;
  derivativeLatex: string;
  f: (x: number) => number;
  df: (x: number) => number;
  xRange: [number, number];
  yRange: [number, number];
}

export const CURVE_PRESETS: Record<string, CurveFunction> = {
  parabola: {
    id: 'parabola',
    nameArabic: 'القطع المكافئ: f(x) = x²',
    formulaLatex: 'f(x) = x^2',
    derivativeLatex: "f'(x) = 2x",
    f: (x: number) => x * x,
    df: (x: number) => 2 * x,
    xRange: [-2.6, 2.6],
    yRange: [-0.5, 6.5],
  },
  cubic: {
    id: 'cubic',
    nameArabic: 'دالة تكعيبية: f(x) = ⅓x³ - x',
    formulaLatex: 'f(x) = \\frac{1}{3}x^3 - x',
    derivativeLatex: "f'(x) = x^2 - 1",
    f: (x: number) => (x * x * x) / 3 - x,
    df: (x: number) => x * x - 1,
    xRange: [-2.8, 2.8],
    yRange: [-3, 3],
  },
  sine: {
    id: 'sine',
    nameArabic: 'دالة الجيب: f(x) = 2 sin(x)',
    formulaLatex: 'f(x) = 2\\sin(x)',
    derivativeLatex: "f'(x) = 2\\cos(x)",
    f: (x: number) => 2 * Math.sin(x),
    df: (x: number) => 2 * Math.cos(x),
    xRange: [-3.5, 3.5],
    yRange: [-2.8, 2.8],
  },
  motion: {
    id: 'motion',
    nameArabic: 'مسار السيارة: s(t) = t²',
    formulaLatex: 's(t) = t^2',
    derivativeLatex: "s'(t) = 2t",
    f: (t: number) => t * t,
    df: (t: number) => 2 * t,
    xRange: [0, 4.2],
    yRange: [0, 17],
  },
};

/**
 * Sample a mathematical curve across a domain into a path string or points.
 */
export function sampleCurve(
  func: (x: number) => number,
  xMin: number,
  xMax: number,
  steps: number = 120
): Point2D[] {
  const points: Point2D[] = [];
  const dx = (xMax - xMin) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    points.push({ x, y: func(x) });
  }
  return points;
}

