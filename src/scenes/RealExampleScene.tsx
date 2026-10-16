import React, { useState, useEffect } from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';
import { GraphPaper } from '../components/GraphPaper';
import { MathFormula } from '../components/MathFormula';
import { CURVE_PRESETS } from '../math/curve';

interface RealExampleSceneProps {
  progress: number;
}

export const RealExampleScene: React.FC<RealExampleSceneProps> = ({ progress }) => {
  const curve = CURVE_PRESETS.motion;
  const [timeT, setTimeT] = useState<number>(2.5);
  const [isPlayingMotion, setIsPlayingMotion] = useState<boolean>(true);

  // Position and velocity
  const positionS = timeT * timeT;
  const velocityV = 2 * timeT;

  useEffect(() => {
    let animId: number;
    let forward = true;
    if (isPlayingMotion) {
      const step = () => {
        setTimeT((prev) => {
          let next = forward ? prev + 0.025 : prev - 0.025;
          if (next >= 3.8) forward = false;
          if (next <= 0.4) forward = true;
          return next;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlayingMotion]);

  const subtitles = [
    'في الفيزياء الواقعية: الدالة ترصد المسافة المقطوعة s(t) عبر الزمن.',
    'الموقع يخبرك أين وصلت السيارة على الطريق.',
    'أما المشتق s\'(t) فيخبرك بمعدل التغيّر اللحظي: أي السرعة الحالية (Speedometer)!',
  ];

  const subIndex = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2;

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
        huge="مثال واقعي: حركة السيارة"
        medium="من الدالة إلى السرعة: كيف يشرح المشتق فيزياء الحركة اللحظية؟"
        subtitles={subtitles}
        currentSubtitleIndex={subIndex}
        small="راقب مؤشر السرعة كيف يتصاعد مع ازدياد انحدار مماس المسار"
      />

      <RetroWindow
        title="C:\SIMULATION\CAR_TELEMETRY.EXE"
        icon="🚗"
        statusBarText={`TIME: ${timeT.toFixed(2)}s • POSITION: ${positionS.toFixed(2)}m • VELOCITY: ${velocityV.toFixed(2)}m/s`}
        headerAction={
          <button
            onClick={() => setIsPlayingMotion(!isPlayingMotion)}
            className="retro-button"
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            {isPlayingMotion ? '⏸ إيقاف' : '▶ تشغيل'}
          </button>
        }
      >
        <GraphPaper
          f={curve.f}
          df={curve.df}
          xRange={curve.xRange}
          yRange={curve.yRange}
          currentX={timeT}
          onPointChange={setTimeT}
          isDraggable={true}
          showTangent={true}
          showSecant={false}
          showDerivativeHUD={false}
          showGrid={true}
          showCar={true}
        />

        {/* Dashboard Gauges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginTop: '16px',
          }}
        >
          {/* Speedometer Analog Dial Widget */}
          <div
            className="retro-box"
            style={{
              padding: '12px',
              backgroundColor: 'var(--bg-cream)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {/* Speed Gauge Dial */}
            <div style={{ position: 'relative', width: '64px', height: '64px' }}>
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="var(--olive-light)"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="var(--accent-orange)"
                  strokeWidth="4"
                  strokeDasharray={`${(velocityV / 8) * 175} 175`}
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 900,
                  color: 'var(--ink-dark)',
                }}
              >
                {velocityV.toFixed(1)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: 'var(--olive-muted)', fontWeight: 700 }}>
                عداد السرعة اللحظية
              </div>
              <strong style={{ fontSize: '14px', color: 'var(--accent-orange)' }}>
                v(t) = {velocityV.toFixed(2)} m/s
              </strong>
              <div style={{ fontSize: '10px', color: 'var(--ink-dark)' }}>
                المشتق = ميل مماس المسار
              </div>
            </div>
          </div>

          {/* Conceptual Mapping Box */}
          <div
            className="retro-box"
            style={{
              padding: '12px',
              backgroundColor: 'var(--bg-cream)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>📍 الموقع s(t):</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{positionS.toFixed(1)} متر</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>⏱ الزمن t:</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{timeT.toFixed(2)} ثانية</strong>
            </div>
            <div
              style={{
                borderTop: '1px dashed var(--olive-light)',
                paddingTop: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--accent-orange)',
                fontWeight: 700,
              }}
            >
              <span>⚡ السرعة اللحظية s'(t):</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{velocityV.toFixed(1)} م/ث</span>
            </div>
          </div>
        </div>

        {/* Formulas Connection */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '14px',
          }}
        >
          <MathFormula
            label="معادلة الحركة (الموقع)"
            formula={<span>s(t) = t²</span>}
            subtitle="تخبرنا أين تقع السيارة"
          />

          <MathFormula
            label="معادلة السرعة (المشتق)"
            formula={
              <span>
                v(t) = s'(t) = 2t ={' '}
                <strong style={{ color: 'var(--accent-orange)' }}>{velocityV.toFixed(2)}</strong>
              </span>
            }
            subtitle="تخبرنا بسرعة تغيّر الموقع في اللحظة t"
            highlight={true}
          />
        </div>
      </RetroWindow>
    </div>
  );
};

