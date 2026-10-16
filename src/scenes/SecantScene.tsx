import React, { useState, useEffect } from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';
import { GraphPaper } from '../components/GraphPaper';
import { MathFormula } from '../components/MathFormula';
import { CURVE_PRESETS } from '../math/curve';

interface SecantSceneProps {
  currentX: number;
  onPointChange: (x: number) => void;
  progress: number;
}

export const SecantScene: React.FC<SecantSceneProps> = ({
  currentX,
  onPointChange,
  progress,
}) => {
  const curve = CURVE_PRESETS.parabola;
  const [deltaX, setDeltaX] = useState<number>(1.5);
  const [isApproaching, setIsApproaching] = useState<boolean>(false);

  // Compute secant slope
  const y1 = curve.f(currentX);
  const y2 = curve.f(currentX + deltaX);
  const deltaY = y2 - y1;
  const secantSlopeVal = deltaX !== 0 ? deltaY / deltaX : 2 * currentX;
  const exactTangentSlope = 2 * currentX;

  // Approach animation effect
  useEffect(() => {
    let animId: number;
    if (isApproaching) {
      const step = () => {
        setDeltaX((prev) => {
          if (prev <= 0.05) {
            setIsApproaching(false);
            return 0.02;
          }
          return prev * 0.94;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isApproaching]);

  const subtitles = [
    'لنعرف ميل المماس بدقة، نبدأ بخط واصل بين نقطتين: "خط قاطع" (Secant Line).',
    'الميل بين النقطتين هو التغيّر الرأسي Δy مقسوماً على التغيّر الأفقي Δx.',
    'حين نجعل المسافة Δx تقترب من الصفر... يتحول القاطع إلى مماس كامل!',
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
        huge="من القاطع إلى المماس"
        medium="السر الرياضي: كيف تنبثق النهاية (Limit) حين نقرّب النقطتين؟"
        subtitles={subtitles}
        currentSubtitleIndex={subIndex}
        small="اضغط على زر تقريب النقطتين لمشاهدة التحوّل السحري"
      />

      <RetroWindow
        title="C:\MATH\SECANT_LIMIT.EXE"
        icon="📐"
        statusBarText={`Δx: ${deltaX.toFixed(2)} • SECANT_SLOPE: ${secantSlopeVal.toFixed(2)} • EXACT_TANGENT: ${exactTangentSlope.toFixed(2)}`}
      >
        <GraphPaper
          f={curve.f}
          df={curve.df}
          xRange={curve.xRange}
          yRange={curve.yRange}
          currentX={currentX}
          onPointChange={onPointChange}
          isDraggable={true}
          showTangent={deltaX < 0.15}
          showSecant={true}
          secantDeltaX={deltaX}
          showDerivativeHUD={true}
          showGrid={true}
        />

        {/* Controls for Delta X */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginTop: '16px',
            padding: '12px',
            background: 'var(--bg-cream)',
            border: '1.5px solid var(--olive-light)',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700 }}>
              المسافة الأفقيّة (Δx):
            </span>
            <input
              type="range"
              min="0.02"
              max="2.0"
              step="0.02"
              value={deltaX}
              onChange={(e) => {
                setIsApproaching(false);
                setDeltaX(parseFloat(e.target.value));
              }}
              style={{ accentColor: 'var(--accent-orange)', cursor: 'pointer', width: '130px' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: 'var(--accent-blue)',
                width: '45px',
              }}
            >
              {deltaX.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              setDeltaX(1.8);
              setTimeout(() => setIsApproaching(true), 100);
            }}
            className="retro-button primary"
            style={{ fontSize: '13px', padding: '6px 14px' }}
          >
            <span>✨ قرّب Δx نحو الصفر (Δx → 0)</span>
          </button>
        </div>

        {/* Mathematical Formula Construction Reveal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '16px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            <MathFormula
              label="الميل المتوسط (القاطع)"
              formula={
                <span>
                  الميل = <span style={{ color: 'var(--accent-pink)' }}>Δy</span> /{' '}
                  <span style={{ color: 'var(--accent-blue)' }}>Δx</span> = {secantSlopeVal.toFixed(2)}
                </span>
              }
              subtitle="تغيّر المسافة مقسوماً على فارق الزمن"
            />

            <MathFormula
              label="تعريف المشتق عبر النهاية"
              formula={
                <span>
                  f'(x) = lim<sub>Δx→0</sub> [ f(x+Δx) - f(x) ] / Δx
                </span>
              }
              subtitle={deltaX < 0.15 ? '🎯 لقد تلاشت المسافة وأصبح القاطع مماساً تماماً!' : 'اقترب أكثر لرؤية المماس'}
              highlight={deltaX < 0.15}
            />
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

