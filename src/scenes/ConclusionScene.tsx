import React from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';
import { MathFormula } from '../components/MathFormula';
import { DesktopIcon } from '../components/DesktopIcon';

interface ConclusionSceneProps {
  onRestart: () => void;
}

export const ConclusionScene: React.FC<ConclusionSceneProps> = ({ onRestart }) => {
  const subtitles = [
    'المشتق ليس مجرد معادلة جافة تُحفظ في الكتب...',
    'إنه طريقة بصرية عميقة لرؤية نبض التغيّر في الكون.',
    'منحنى واحد... لكن في كل نقطة منه، قصة فريدة عن كيفية تحوّله.',
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 16px',
        maxWidth: '840px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <RetroWindow
        title="C:\MATH\CONCLUSION.TXT"
        icon="📜"
        statusBarText="END_OF_LESSON • ARCHIVE: STORED • SUCCESS"
      >
        <AnimatedText
          huge="نهاية الرحلة: فلسفة التغيّر"
          medium="كيف أعاد التفاضل تشكيل نظرتنا للعالم؟"
          subtitles={subtitles}
          currentSubtitleIndex={1}
        />

        {/* Core Mathematical Duality */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: '20px 0',
            flexWrap: 'wrap',
          }}
        >
          <MathFormula
            label="الكل والمجموع"
            formula={<span>f(x) = x²</span>}
            subtitle="مسار الدالة الكامل"
          />

          <div style={{ fontSize: '24px', color: 'var(--accent-orange)' }}>➔</div>

          <MathFormula
            label="اللحظة والمعدل"
            formula={<span>f'(x) = 2x</span>}
            subtitle="سرعة التغيّر وميل المماس"
            highlight={true}
          />
        </div>

        {/* Narrative Reflection Box */}
        <div
          style={{
            background: 'var(--bg-cream)',
            border: '2px solid var(--ink-dark)',
            borderRadius: '10px',
            padding: '16px 22px',
            margin: '20px auto',
            maxWidth: '620px',
            lineHeight: 1.8,
            fontFamily: 'var(--font-arabic-primary)',
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--ink-dark)',
          }}
        >
          <p style={{ margin: 0 }}>
            "منحنى واحد... لكن في كل نقطة عليه، قصة مختلفة عن كيفية تغيّره. لم نعد نحفظ
            المشتق، بل رأينا بأعيننا خط المماس وهو يرقص على انحناءات الدالة."
          </p>
        </div>

        {/* Retro Desktop Return & Next Lesson */}
        <div
          style={{
            marginTop: '28px',
            borderTop: '1.5px dashed var(--olive-light)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="Integrals%20%E2%80%94%20The%20Film.html"
            style={{ textDecoration: 'none' }}
          >
            <DesktopIcon
              icon="📁"
              label="المفهوم التالي"
              sublabel="INTEGRAL.EXE"
              active={true}
            />
          </a>

          <DesktopIcon
            icon="↻"
            label="إعادة المشاهدة"
            sublabel="REPLAY"
            onClick={onRestart}
          />

          <a href="index.html" style={{ textDecoration: 'none' }}>
            <DesktopIcon
              icon="🏠"
              label="مكتبة الأفلام"
              sublabel="ROOT"
            />
          </a>
        </div>
      </RetroWindow>
    </div>
  );
};

