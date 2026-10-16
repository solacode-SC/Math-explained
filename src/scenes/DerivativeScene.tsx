import React from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';
import { GraphPaper } from '../components/GraphPaper';
import { MathFormula } from '../components/MathFormula';
import { CURVE_PRESETS } from '../math/curve';
import { slopeToAngleDeg } from '../math/derivative';

interface DerivativeSceneProps {
  currentX: number;
  onPointChange: (x: number) => void;
  progress: number;
}

export const DerivativeScene: React.FC<DerivativeSceneProps> = ({
  currentX,
  onPointChange,
  progress,
}) => {
  const curve = CURVE_PRESETS.parabola;
  const currentSlope = 2 * currentX;
  const currentAngle = slopeToAngleDeg(currentSlope);

  const landmarks = [
    { x: -2, slope: -4, angle: -76, desc: 'انحدار شديد للأسفل' },
    { x: -1, slope: -2, angle: -63, desc: 'هبوط معتدل' },
    { x: 0, slope: 0, angle: 0, desc: 'أفقي تماماً (قاع المنحنى)' },
    { x: 1, slope: 2, angle: 63, desc: 'صعود معتدل' },
    { x: 2, slope: 4, angle: 76, desc: 'صعود حاد للأعلى' },
  ];

  const subtitles = [
    'المشتق ليس مجرد رقم غامض... إنه الدالة التي تمنحك ميل المماس عند أي نقطة!',
    'إذا كانت الدالة f(x) = x²، فإن مشتقتها هي f\'(x) = 2x.',
    'عند x = 0 يكون الميل 0 (المماس أفقي)، وعلى اليمين يصعد (+)، وعلى اليسار يهبط (-).',
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
        huge="المُشتق: آلة قياس الميل"
        medium="الرابط السحري بين الزاوية الهندسية والمعادلة الجبرية"
        subtitles={subtitles}
        currentSubtitleIndex={subIndex}
        small="اضغط على النقاط النموذجية أدناه وشاهد دوران المماس وتغيّر قيم المشتق"
      />

      <RetroWindow
        title="C:\MATH\DERIVATIVE_MAP.EXE"
        icon="⚡"
        statusBarText={`X: ${currentX.toFixed(2)} • f'(x)=2x: ${currentSlope.toFixed(2)} • TANGENT_ANGLE: ${currentAngle.toFixed(1)}°`}
      >
        <GraphPaper
          f={curve.f}
          df={curve.df}
          xRange={curve.xRange}
          yRange={curve.yRange}
          currentX={currentX}
          onPointChange={onPointChange}
          isDraggable={true}
          showTangent={true}
          showSecant={false}
          showDerivativeHUD={true}
          showGrid={true}
        />

        {/* Formulas Box */}
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
            label="الدالة الأصلية"
            formula={<span>f(x) = x²</span>}
            subtitle="ترسم مسار القطع المكافئ"
          />

          <MathFormula
            label="دالة المشتق"
            formula={
              <span>
                f'(x) = 2x = <strong style={{ color: 'var(--accent-orange)' }}>{currentSlope.toFixed(2)}</strong>
              </span>
            }
            subtitle="تحسب ميل المماس وزاويته فورياً"
            highlight={true}
          />
        </div>

        {/* Landmark Points Interactive Selector */}
        <div
          style={{
            marginTop: '16px',
            background: 'var(--bg-cream)',
            border: '1.5px solid var(--olive-light)',
            borderRadius: '10px',
            padding: '12px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-arabic-primary)',
              fontSize: '12px',
              fontWeight: 800,
              color: 'var(--olive-muted)',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            اختر نقطة نموذجية لمراقبة سلوك المماس:
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '8px',
            }}
          >
            {landmarks.map((item) => {
              const isSelected = Math.abs(currentX - item.x) < 0.15;
              return (
                <button
                  key={item.x}
                  onClick={() => onPointChange(item.x)}
                  className={`retro-button ${isSelected ? 'active' : ''}`}
                  style={{
                    padding: '6px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    fontSize: '11px',
                  }}
                >
                  <strong style={{ fontSize: '13px', direction: 'ltr' }}>x = {item.x}</strong>
                  <span style={{ color: isSelected ? 'var(--accent-yellow)' : 'var(--olive-muted)' }}>
                    الميل = {item.slope}
                  </span>
                  <span style={{ fontSize: '10px', opacity: 0.85 }}>{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

