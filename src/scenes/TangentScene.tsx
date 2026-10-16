import React from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';
import { GraphPaper } from '../components/GraphPaper';
import { CURVE_PRESETS } from '../math/curve';

interface TangentSceneProps {
  currentX: number;
  onPointChange: (x: number) => void;
  progress: number;
}

export const TangentScene: React.FC<TangentSceneProps> = ({
  currentX,
  onPointChange,
  progress,
}) => {
  const curve = CURVE_PRESETS.parabola;

  const subtitles = [
    'عند كل نقطة على المنحنى، يظهر خط مستقيم فريد يلامس المنحنى دون أن يقطعه.',
    'هذا هو "خط المماس" (Tangent Line)... إنه بوصلة الاتجاه في تلك اللحظة بالضبط.',
    'انتبه: المنحنى مسار، والنقطة موقع، والمماس هو الاتجاه اللحظي!',
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
        huge="خط المماس"
        medium="البوصلة اللحظية: كيف يلامس الخط المستقيم منحنى الدالة؟"
        subtitles={subtitles}
        currentSubtitleIndex={subIndex}
        small="حرّك النقطة وشاهد كيف يدور المماس متجاوباً مع انحناء الطريق"
      />

      <RetroWindow
        title="C:\MATH\TANGENT_VECTOR.SYS"
        icon="🧭"
        statusBarText={`TANGENT_SLOPE: ${(2 * currentX).toFixed(2)} • CONTACT_PT: (${currentX.toFixed(2)}, ${(currentX * currentX).toFixed(2)})`}
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

        {/* Intuition Triad Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginTop: '16px',
            textAlign: 'center',
          }}
        >
          <div
            className="retro-box"
            style={{ padding: '10px', backgroundColor: 'var(--bg-cream)' }}
          >
            <div style={{ fontSize: '20px' }}>🛣️</div>
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--ink-dark)' }}>
              المنحنى = المسار الكلي
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--olive-muted)' }}>
              الطريق الذي تسير عليه الدالة
            </span>
          </div>

          <div
            className="retro-box"
            style={{ padding: '10px', backgroundColor: 'var(--bg-cream)' }}
          >
            <div style={{ fontSize: '20px' }}>📍</div>
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--accent-orange)' }}>
              النقطة = الموقع اللحظي
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--olive-muted)' }}>
              أين نتواجد في هذه اللحظة بالضبط
            </span>
          </div>

          <div
            className="retro-box"
            style={{ padding: '10px', backgroundColor: 'var(--bg-cream)', border: '2px solid var(--accent-orange)' }}
          >
            <div style={{ fontSize: '20px' }}>🧭</div>
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--accent-orange)' }}>
              المماس = الاتجاه اللحظي
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--olive-muted)' }}>
              إلى أين نتوجه لو انطلقنا بخط مستقيم
            </span>
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

