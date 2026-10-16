import React from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { AnimatedText } from '../components/AnimatedText';

interface IntroSceneProps {
  progress: number; // 0 to 1
  onStart: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ progress, onStart }) => {
  const subtitles = [
    'تخيّل أنك تتحرك على طريق متعرج لا ينتهي...',
    'السؤال في الرياضيات ليس فقط: أين موقعك الآن؟',
    'بل السؤال الأعمق: كيف يتغيّر اتجاهك في هذه اللحظة بالذات؟',
  ];

  const currentSubIndex = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <RetroWindow
        title="C:\MATH\DERIVATIVES\INTRO.EXE"
        icon="⚡"
        maxWidth="740px"
        statusBarText="MEMORY: 640KB OK • RETRO_MATH_OS 1994"
      >
        <div style={{ padding: '24px 10px' }}>
          {/* Retro Title Header */}
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--accent-yellow)',
              border: '2px solid var(--ink-dark)',
              borderRadius: '6px',
              padding: '4px 14px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '12px',
              color: 'var(--ink-dark)',
              marginBottom: '14px',
              boxShadow: '2px 2px 0px var(--ink-dark)',
            }}
          >
            الدرس السينمائي 01
          </div>

          <AnimatedText
            huge="المُشْتَق"
            medium="لغة الرياضيات لوصف كيف تتغيّر كل الأشياء في الكون"
            subtitles={subtitles}
            currentSubtitleIndex={currentSubIndex}
            small="شاهد كيف يتحول المفهوم الجاف إلى حركة بصرية نابضة بالحياة"
          />

          {/* Retro Graphic Element */}
          <div
            style={{
              margin: '24px auto',
              width: '180px',
              height: '80px',
              position: 'relative',
              border: '1.5px dashed var(--olive-muted)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="160" height="60" viewBox="0 0 160 60">
              {/* Curve */}
              <path
                d="M 10 50 Q 80 50 150 10"
                fill="none"
                stroke="var(--ink-dark)"
                strokeWidth="2.5"
              />
              {/* Tangent line */}
              <line
                x1="40"
                y1="55"
                x2="130"
                y2="5"
                stroke="var(--accent-orange)"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              {/* Touching point */}
              <circle cx="85" cy="30" r="5" fill="var(--accent-orange)" />
            </svg>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={onStart}
              className="retro-button primary"
              style={{
                fontSize: '16px',
                padding: '10px 28px',
                backgroundColor: 'var(--accent-orange)',
                color: '#FFFFFF',
              }}
            >
              <span>▶ ابدأ الرحلة السينمائية</span>
            </button>
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

