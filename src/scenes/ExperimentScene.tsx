import React, { useState, useEffect } from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';
import { GraphPaper } from '../components/GraphPaper';
import { CURVE_PRESETS, CurveFunction } from '../math/curve';
import { slopeToAngleDeg, formatSigned } from '../math/derivative';

export const ExperimentScene: React.FC = () => {
  const [selectedCurveKey, setSelectedCurveKey] = useState<string>('parabola');
  const [currentX, setCurrentX] = useState<number>(1.2);
  const [showTangent, setShowTangent] = useState<boolean>(true);
  const [showSecant, setShowSecant] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isAutoScanning, setIsAutoScanning] = useState<boolean>(false);
  const [scanSpeed, setScanSpeed] = useState<number>(0.02);

  const curve: CurveFunction = CURVE_PRESETS[selectedCurveKey] || CURVE_PRESETS.parabola;
  const currentY = curve.f(currentX);
  const currentSlope = curve.df(currentX);
  const currentAngle = slopeToAngleDeg(currentSlope);

  // Auto scan animation loop
  useEffect(() => {
    let animId: number;
    let direction = 1;
    if (isAutoScanning) {
      const step = () => {
        setCurrentX((prev) => {
          let next = prev + direction * scanSpeed;
          if (next >= curve.xRange[1] - 0.2) direction = -1;
          if (next <= curve.xRange[0] + 0.2) direction = 1;
          return Number(next.toFixed(3));
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoScanning, scanSpeed, curve]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 16px',
        maxWidth: '920px',
        margin: '0 auto',
      }}
    >
      <AnimatedText
        huge="المختبر التفاعلي"
        medium="جرّب بنفسك: انغمس في الرياضيات واكتشف سلوك المماس في مختلف المنحنيات"
        small="اسحب النقطة بالماوس أو اللمس، اختر دوالاً مختلفة، وتحكّم في طبقات العرض"
      />

      <RetroWindow
        title="C:\MATH\PLAYGROUND_LAB.EXE"
        icon="🧪"
        statusBarText={`INTERACTIVE_MODE: ACTIVE • DRAG: ENABLED • REALTIME_TELEMETRY`}
        headerAction={
          <div style={{ display: 'flex', gap: '6px' }}>
            {Object.keys(CURVE_PRESETS).filter(k => k !== 'motion').map((k) => (
              <button
                key={k}
                onClick={() => {
                  setSelectedCurveKey(k);
                  setCurrentX(0.8);
                }}
                className={`retro-button ${selectedCurveKey === k ? 'primary' : ''}`}
                style={{ padding: '2px 8px', fontSize: '11px' }}
              >
                {k === 'parabola' ? 'x²' : k === 'cubic' ? '⅓x³-x' : 'sin(x)'}
              </button>
            ))}
          </div>
        }
      >
        <GraphPaper
          f={curve.f}
          df={curve.df}
          xRange={curve.xRange}
          yRange={curve.yRange}
          currentX={currentX}
          onPointChange={setCurrentX}
          isDraggable={true}
          showTangent={showTangent}
          showSecant={showSecant}
          secantDeltaX={0.6}
          showDerivativeHUD={false}
          showGrid={showGrid}
        />

        {/* Real-time Telemetry Dashboard */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            marginTop: '16px',
          }}
        >
          <div className="retro-box" style={{ padding: '8px 12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--olive-muted)', fontWeight: 700 }}>
              الموقع السيني (x)
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '17px',
                fontWeight: 900,
                color: 'var(--ink-dark)',
                direction: 'ltr',
              }}
            >
              {formatSigned(currentX)}
            </div>
          </div>

          <div className="retro-box" style={{ padding: '8px 12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--olive-muted)', fontWeight: 700 }}>
              قيمة الدالة f(x)
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '17px',
                fontWeight: 900,
                color: 'var(--olive-muted)',
                direction: 'ltr',
              }}
            >
              {formatSigned(currentY)}
            </div>
          </div>

          <div
            className="retro-box"
            style={{ padding: '8px 12px', textAlign: 'center', border: '2px solid var(--accent-orange)' }}
          >
            <span style={{ fontSize: '11px', color: 'var(--accent-orange)', fontWeight: 800 }}>
              قيمة المشتق f'(x)
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '17px',
                fontWeight: 900,
                color: 'var(--accent-orange)',
                direction: 'ltr',
              }}
            >
              {formatSigned(currentSlope)}
            </div>
          </div>

          <div className="retro-box" style={{ padding: '8px 12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--olive-muted)', fontWeight: 700 }}>
              زاوية المماس (θ)
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '17px',
                fontWeight: 900,
                color: 'var(--ink-dark)',
                direction: 'ltr',
              }}
            >
              {formatSigned(currentAngle, 1)}°
            </div>
          </div>
        </div>

        {/* Interactive Control Toggles */}
        <div
          style={{
            marginTop: '16px',
            background: 'var(--bg-cream)',
            border: '1.5px solid var(--olive-light)',
            borderRadius: '10px',
            padding: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Slider for point X */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700 }}>تحريك النقطة:</span>
            <input
              type="range"
              min={curve.xRange[0] + 0.1}
              max={curve.xRange[1] - 0.1}
              step="0.02"
              value={currentX}
              onChange={(e) => {
                setIsAutoScanning(false);
                setCurrentX(parseFloat(e.target.value));
              }}
              style={{ accentColor: 'var(--accent-orange)', cursor: 'pointer', width: '120px' }}
            />
          </div>

          {/* Toggle buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => setShowTangent(!showTangent)}
              className={`retro-button ${showTangent ? 'active' : ''}`}
              style={{ padding: '5px 10px', fontSize: '12px' }}
            >
              <span>{showTangent ? '✓ المماس مفعل' : 'إظهار المماس'}</span>
            </button>

            <button
              onClick={() => setShowSecant(!showSecant)}
              className={`retro-button ${showSecant ? 'active' : ''}`}
              style={{ padding: '5px 10px', fontSize: '12px' }}
            >
              <span>{showSecant ? '✓ القاطع مفعل' : 'إظهار القاطع'}</span>
            </button>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`retro-button ${showGrid ? 'active' : ''}`}
              style={{ padding: '5px 10px', fontSize: '12px' }}
            >
              <span>{showGrid ? '✓ الشبكة' : 'إخفاء الشبكة'}</span>
            </button>

            <button
              onClick={() => setIsAutoScanning(!isAutoScanning)}
              className="retro-button"
              style={{
                padding: '5px 12px',
                fontSize: '12px',
                backgroundColor: isAutoScanning ? 'var(--accent-yellow)' : 'var(--bg-cream-dark)',
              }}
            >
              <span>{isAutoScanning ? '⏸ إيقاف المسح' : '▶ مسح تلقائي'}</span>
            </button>
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

