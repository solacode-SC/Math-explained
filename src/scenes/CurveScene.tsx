import React from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';
import { GraphPaper } from '../components/GraphPaper';
import { CURVE_PRESETS } from '../math/curve';

interface CurveSceneProps {
  currentX: number;
  onPointChange: (x: number) => void;
  progress: number;
}

export const CurveScene: React.FC<CurveSceneProps> = ({
  currentX,
  onPointChange,
  progress,
}) => {
  const curve = CURVE_PRESETS.parabola;

  const subtitles = [
    'هذه هي الدالة الرياضية: مسار سلس ومنتظم يربط كل مدخل بنتيجة.',
    'والنقطة تتحرك عليها... ترصد كل موقع ومحطة على هذا المنحنى.',
    'راقب كيف تتغيّر الإحداثيات بسلاسة مع كل خطوة على المسار.',
  ];

  const subIndex = progress < 0.4 ? 0 : progress < 0.75 ? 1 : 2;

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
        huge="المنحنى والدالة"
        medium="الأساس الهندسي: كيف ترسم المعادلة مساراً في الفضاء؟"
        subtitles={subtitles}
        currentSubtitleIndex={subIndex}
        small="اسحب النقطة البرتقالية يميناً ويساراً لمشاهدة تغيّر الإحداثيات الحية"
      />

      <RetroWindow
        title="C:\MATH\CURVE_PARABOLA.DAT"
        icon="📈"
        statusBarText={`POINT_POS: (${currentX.toFixed(2)}, ${(currentX * currentX).toFixed(2)}) • RENDERING: 60FPS`}
      >
        <GraphPaper
          f={curve.f}
          df={curve.df}
          xRange={curve.xRange}
          yRange={curve.yRange}
          currentX={currentX}
          onPointChange={onPointChange}
          isDraggable={true}
          showTangent={false}
          showSecant={false}
          showDerivativeHUD={true}
          showGrid={true}
        />

        {/* Live Coordinate Callout */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
          }}
        >
          <div className="retro-badge" style={{ fontSize: '13px', padding: '6px 14px' }}>
            <span>الموقع السيني:</span>
            <strong style={{ color: 'var(--accent-orange)' }}>
              x = {currentX.toFixed(2)}
            </strong>
          </div>
          <div className="retro-badge" style={{ fontSize: '13px', padding: '6px 14px' }}>
            <span>الموقع الصادي:</span>
            <strong style={{ color: 'var(--olive-muted)' }}>
              y = f(x) = {(currentX * currentX).toFixed(2)}
            </strong>
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

