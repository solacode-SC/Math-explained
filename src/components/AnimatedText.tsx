import React from 'react';

interface AnimatedTextProps {
  huge?: string;
  medium?: string;
  small?: string;
  subtitles?: string[];
  currentSubtitleIndex?: number;
  highlightWords?: string[];
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  huge,
  medium,
  small,
  subtitles = [],
  currentSubtitleIndex = 0,
}) => {
  return (
    <div
      style={{
        textAlign: 'center',
        margin: '16px auto',
        maxWidth: '780px',
        direction: 'rtl',
      }}
    >
      {huge && (
        <h1
          style={{
            fontFamily: 'var(--font-arabic-primary)',
            fontSize: 'clamp(36px, 5vw, 54px)',
            fontWeight: 900,
            color: 'var(--ink-dark)',
            margin: '0 0 8px 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {huge}
        </h1>
      )}

      {medium && (
        <h2
          style={{
            fontFamily: 'var(--font-arabic-primary)',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 700,
            color: 'var(--olive-muted)',
            margin: '0 0 12px 0',
            lineHeight: 1.4,
          }}
        >
          {medium}
        </h2>
      )}

      {/* Documentary Subtitle Ribbon */}
      {subtitles.length > 0 && (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(245, 240, 223, 0.95)',
            border: '2px solid var(--ink-dark)',
            borderRadius: '10px',
            padding: '10px 22px',
            margin: '10px 0',
            boxShadow: 'var(--shadow-retro)',
            maxWidth: '90%',
          }}
        >
          <p
            key={currentSubtitleIndex}
            className="anim-subtitle"
            style={{
              fontFamily: 'var(--font-arabic-primary)',
              fontSize: 'clamp(16px, 2.2vw, 20px)',
              fontWeight: 700,
              color: 'var(--ink-dark)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {subtitles[currentSubtitleIndex] || subtitles[0]}
          </p>
        </div>
      )}

      {small && (
        <p
          style={{
            fontFamily: 'var(--font-arabic-primary)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--olive-muted)',
            marginTop: '8px',
          }}
        >
          {small}
        </p>
      )}
    </div>
  );
};

