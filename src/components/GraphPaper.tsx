import React, { useRef, useEffect } from 'react';
import { Point2D, sampleCurve } from '../math/curve';
import {
  ViewportTransform,
  mathToScreen,
  screenToMath,
  pointsToSvgPath,
  getTangentSegment,
} from '../math/geometry';
import { secantSlope, slopeToAngleDeg, formatSigned } from '../math/derivative';

interface GraphPaperProps {
  f: (x: number) => number;
  df?: (x: number) => number;
  xRange?: [number, number];
  yRange?: [number, number];
  currentX: number;
  onPointChange?: (newX: number) => void;
  isDraggable?: boolean;
  showTangent?: boolean;
  showSecant?: boolean;
  secantDeltaX?: number; // delta x for secant line
  showDerivativeHUD?: boolean;
  showGrid?: boolean;
  showCar?: boolean;
  curveColor?: string;
  tangentColor?: string;
  secantColor?: string;
  width?: number;
  height?: number;
}

export const GraphPaper: React.FC<GraphPaperProps> = ({
  f,
  df,
  xRange = [-3, 3],
  yRange = [-1, 7],
  currentX,
  onPointChange,
  isDraggable = true,
  showTangent = true,
  showSecant = false,
  secantDeltaX = 1.0,
  showDerivativeHUD = true,
  showGrid = true,
  showCar = false,
  curveColor = '#25271F',
  tangentColor = '#D97828',
  secantColor = '#557A91',
  width = 720,
  height = 420,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDraggingRef = useRef(false);

  const view: ViewportTransform = {
    width,
    height,
    padding: { top: 30, right: 35, bottom: 40, left: 45 },
    xMin: xRange[0],
    xMax: xRange[1],
    yMin: yRange[0],
    yMax: yRange[1],
  };

  const currentY = f(currentX);
  const slope = df ? df(currentX) : (f(currentX + 1e-4) - f(currentX - 1e-4)) / 2e-4;
  const angleDeg = slopeToAngleDeg(slope);

  // Sample the curve points
  const points = sampleCurve(f, xRange[0], xRange[1], 150);
  const curvePathD = pointsToSvgPath(points, view);

  // Tangent segment
  const tangent = getTangentSegment(currentX, currentY, slope, 3.8);
  const tStart = mathToScreen(tangent.pStart, view);
  const tEnd = mathToScreen(tangent.pEnd, view);

  // Point P on screen
  const pScreen = mathToScreen({ x: currentX, y: currentY }, view);

  // Secant calculations if enabled
  const secantInfo = showSecant ? secantSlope(f, currentX, secantDeltaX) : null;
  const qScreen = secantInfo ? mathToScreen(secantInfo.p2, view) : null;

  // Dragging logic
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isDraggable || !onPointChange) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    isDraggingRef.current = true;
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !onPointChange || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const scaleX = width / rect.width;
    const svgX = clientX * scaleX;

    const mathPt = screenToMath({ x: svgX, y: 0 }, view);
    const clampedX = Math.max(xRange[0] + 0.1, Math.min(xRange[1] - 0.1, mathPt.x));
    onPointChange(Number(clampedX.toFixed(3)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // Generate grid ticks
  const xTicks: number[] = [];
  for (let x = Math.ceil(xRange[0]); x <= Math.floor(xRange[1]); x++) {
    if (x !== 0) xTicks.push(x);
  }
  const yTicks: number[] = [];
  for (let y = Math.ceil(yRange[0]); y <= Math.floor(yRange[1]); y++) {
    if (y !== 0) yTicks.push(y);
  }

  const originScreen = mathToScreen({ x: 0, y: 0 }, view);

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          backgroundColor: '#FAF6EC',
          border: '2px solid var(--ink-dark)',
          borderRadius: '10px',
          boxShadow: 'inset 0 0 10px rgba(109, 118, 82, 0.08)',
          cursor: isDraggable ? 'grab' : 'default',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <defs>
          {/* Subtle paper grid pattern */}
          <pattern id="graph-small-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M 16 0 L 0 0 0 16"
              fill="none"
              stroke="rgba(109, 118, 82, 0.14)"
              strokeWidth="0.8"
            />
          </pattern>
          {/* Tangent line arrow marker */}
          <marker
            id="tangent-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 7 3.5, 0 7" fill={tangentColor} />
          </marker>
        </defs>

        {/* Graph Paper Grid */}
        {showGrid && (
          <rect
            x={view.padding.left}
            y={view.padding.top}
            width={width - view.padding.left - view.padding.right}
            height={height - view.padding.top - view.padding.bottom}
            fill="url(#graph-small-grid)"
          />
        )}

        {/* Coordinate Axes */}
        {/* X Axis */}
        <line
          x1={view.padding.left}
          y1={originScreen.y}
          x2={width - view.padding.right}
          y2={originScreen.y}
          stroke="var(--ink-dark)"
          strokeWidth="1.8"
        />
        {/* Y Axis */}
        <line
          x1={originScreen.x}
          y1={height - view.padding.bottom}
          x2={originScreen.x}
          y2={view.padding.top}
          stroke="var(--ink-dark)"
          strokeWidth="1.8"
        />

        {/* Ticks and Numbers on X Axis */}
        {xTicks.map((xVal) => {
          const pt = mathToScreen({ x: xVal, y: 0 }, view);
          return (
            <g key={`xtick-${xVal}`}>
              <line
                x1={pt.x}
                y1={originScreen.y - 4}
                x2={pt.x}
                y2={originScreen.y + 4}
                stroke="var(--ink-dark)"
                strokeWidth="1.2"
              />
              <text
                x={pt.x}
                y={originScreen.y + 16}
                fill="var(--ink-dark)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fontWeight="700"
                textAnchor="middle"
              >
                {xVal}
              </text>
            </g>
          );
        })}

        {/* Ticks and Numbers on Y Axis */}
        {yTicks.map((yVal) => {
          const pt = mathToScreen({ x: 0, y: yVal }, view);
          return (
            <g key={`ytick-${yVal}`}>
              <line
                x1={originScreen.x - 4}
                y1={pt.y}
                x2={originScreen.x + 4}
                y2={pt.y}
                stroke="var(--ink-dark)"
                strokeWidth="1.2"
              />
              <text
                x={originScreen.x - 10}
                y={pt.y + 4}
                fill="var(--ink-dark)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fontWeight="700"
                textAnchor="end"
              >
                {yVal}
              </text>
            </g>
          );
        })}

        {/* Origin Label (0,0) */}
        <text
          x={originScreen.x - 8}
          y={originScreen.y + 15}
          fill="var(--olive-muted)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
          textAnchor="end"
        >
          0
        </text>

        {/* The Mathematical Function Curve f(x) */}
        <path
          d={curvePathD}
          fill="none"
          stroke={curveColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secant Elements (Scene 4) */}
        {showSecant && secantInfo && qScreen && (
          <g>
            {/* Secant Delta Triangle */}
            {/* Horizontal leg: Delta X */}
            <line
              x1={pScreen.x}
              y1={pScreen.y}
              x2={qScreen.x}
              y2={pScreen.y}
              stroke="var(--accent-blue)"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            {/* Vertical leg: Delta Y */}
            <line
              x1={qScreen.x}
              y1={pScreen.y}
              x2={qScreen.x}
              y2={qScreen.y}
              stroke="var(--accent-pink)"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            {/* Secant Line extended */}
            <line
              x1={pScreen.x - (qScreen.x - pScreen.x) * 0.7}
              y1={pScreen.y - (qScreen.y - pScreen.y) * 0.7}
              x2={qScreen.x + (qScreen.x - pScreen.x) * 0.7}
              y2={qScreen.y + (qScreen.y - pScreen.y) * 0.7}
              stroke="var(--accent-yellow)"
              strokeWidth="2.5"
            />
            {/* Point Q */}
            <circle
              cx={qScreen.x}
              cy={qScreen.y}
              r="6.5"
              fill="var(--accent-blue)"
              stroke="var(--ink-dark)"
              strokeWidth="2"
            />
            <text
              x={qScreen.x + 10}
              y={qScreen.y - 10}
              fill="var(--accent-blue)"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
              fontSize="12"
            >
              Q(x+Δx)
            </text>
            {/* Labels Delta x and Delta y */}
            <text
              x={(pScreen.x + qScreen.x) / 2}
              y={pScreen.y + 14}
              fill="var(--accent-blue)"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
              fontSize="11"
              textAnchor="middle"
            >
              Δx = {secantInfo.deltaX.toFixed(2)}
            </text>
            <text
              x={qScreen.x + 8}
              y={(pScreen.y + qScreen.y) / 2}
              fill="var(--accent-pink)"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
              fontSize="11"
            >
              Δy = {secantInfo.deltaY.toFixed(2)}
            </text>
          </g>
        )}

        {/* Tangent Line (Scene 3, 5, 7) */}
        {showTangent && (
          <g>
            <line
              x1={tStart.x}
              y1={tStart.y}
              x2={tEnd.x}
              y2={tEnd.y}
              stroke={tangentColor}
              strokeWidth="3.2"
              strokeLinecap="round"
              markerEnd="url(#tangent-arrow)"
            />
            {/* Tangent slope angle arc or indicator */}
            <line
              x1={pScreen.x}
              y1={pScreen.y}
              x2={pScreen.x + 40}
              y2={pScreen.y}
              stroke="rgba(109, 118, 82, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
          </g>
        )}

        {/* Point P (Hero moving point) */}
        <g>
          {/* Subtle glow / shadow */}
          <circle
            cx={pScreen.x}
            cy={pScreen.y}
            r="12"
            fill="rgba(217, 120, 40, 0.22)"
          />
          {/* Main Point P Circle */}
          <circle
            cx={pScreen.x}
            cy={pScreen.y}
            r="7"
            fill="var(--accent-orange)"
            stroke="var(--ink-dark)"
            strokeWidth="2.5"
            style={{ cursor: isDraggable ? 'grab' : 'default' }}
          />
        </g>

        {/* Optional Car Graphic (Scene 6) */}
        {showCar && (
          <g
            transform={`translate(${pScreen.x}, ${pScreen.y}) rotate(${-angleDeg})`}
          >
            {/* Retro Pixel Car Body */}
            <rect
              x="-18"
              y="-10"
              width="36"
              height="20"
              rx="4"
              fill="var(--accent-orange)"
              stroke="var(--ink-dark)"
              strokeWidth="2"
            />
            <rect
              x="-8"
              y="-7"
              width="16"
              height="14"
              rx="2"
              fill="var(--bg-paper-light)"
              stroke="var(--ink-dark)"
              strokeWidth="1.5"
            />
            {/* Wheels */}
            <circle cx="-11" cy="9" r="3.5" fill="var(--ink-dark)" />
            <circle cx="11" cy="9" r="3.5" fill="var(--ink-dark)" />
            <circle cx="-11" cy="-9" r="3.5" fill="var(--ink-dark)" />
            <circle cx="11" cy="-9" r="3.5" fill="var(--ink-dark)" />
            {/* Velocity Arrow */}
            <line
              x1="18"
              y1="0"
              x2={18 + Math.min(50, Math.max(10, Math.abs(slope) * 12))}
              y2="0"
              stroke="var(--accent-yellow)"
              strokeWidth="3"
            />
          </g>
        )}
      </svg>

      {/* Floating Retro HUD (Telemetry Overlay) */}
      {showDerivativeHUD && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(250, 246, 236, 0.94)',
            border: '2px solid var(--ink-dark)',
            borderRadius: '8px',
            padding: '8px 14px',
            boxShadow: 'var(--shadow-retro)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            direction: 'ltr',
          }}
        >
          <div style={{ color: 'var(--ink-dark)', fontWeight: 'bold' }}>
            x = <span style={{ color: 'var(--olive-muted)' }}>{formatSigned(currentX)}</span>
          </div>
          <div style={{ color: 'var(--ink-dark)', fontWeight: 'bold' }}>
            y = <span style={{ color: 'var(--olive-muted)' }}>{formatSigned(currentY)}</span>
          </div>
          <div
            style={{
              color: 'var(--accent-orange)',
              fontWeight: 800,
              borderTop: '1px solid var(--olive-light)',
              paddingTop: '2px',
            }}
          >
            f'(x) = {formatSigned(slope)}
          </div>
          <div style={{ color: 'var(--olive-muted)', fontSize: '11px' }}>
            θ = {formatSigned(angleDeg, 1)}°
          </div>
        </div>
      )}
    </div>
  );
};

