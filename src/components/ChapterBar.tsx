import React from 'react';

interface ChapterBarProps {
  currentScene: number;
  totalScenes: number;
  sceneTitle: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const ChapterBar: React.FC<ChapterBarProps> = ({
  currentScene,
  totalScenes,
  sceneTitle,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onReset,
  soundEnabled,
  onToggleSound,
}) => {
  const currentFormatted = String(currentScene + 1).padStart(2, '0');
  const totalFormatted = String(totalScenes).padStart(2, '0');

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'var(--olive-muted)',
        borderTop: '2.5px solid var(--ink-dark)',
        boxShadow: '0 -4px 16px rgba(37, 39, 31, 0.18)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'var(--bg-paper-light)',
        fontFamily: 'var(--font-arabic-primary)',
      }}
    >
      {/* Right side in RTL: Scene Counter and Scene Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div
          style={{
            background: 'var(--ink-dark)',
            color: 'var(--accent-yellow)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 800,
            border: '1px solid var(--accent-yellow)',
            direction: 'ltr',
          }}
        >
          SCENE {currentFormatted} / {totalFormatted}
        </div>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.02em',
            maxWidth: '300px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {sceneTitle}
        </div>
      </div>

      {/* Center: Video Playback Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={onPrev}
          disabled={currentScene === 0}
          title="المشهد السابق"
          className="retro-button"
          style={{
            padding: '6px 12px',
            fontSize: '13px',
            opacity: currentScene === 0 ? 0.45 : 1,
          }}
        >
          <span>◀</span>
          <span>السابق</span>
        </button>

        <button
          onClick={onTogglePlay}
          title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيلم'}
          className="retro-button"
          style={{
            padding: '6px 18px',
            fontSize: '14px',
            backgroundColor: isPlaying ? 'var(--accent-orange)' : 'var(--accent-yellow)',
            color: 'var(--ink-dark)',
            fontWeight: 800,
          }}
        >
          <span>{isPlaying ? '⏸' : '▶'}</span>
          <span>{isPlaying ? 'إيقاف' : 'تشغيل الفيلم'}</span>
        </button>

        <button
          onClick={onNext}
          disabled={currentScene >= totalScenes - 1}
          title="المشهد التالي"
          className="retro-button"
          style={{
            padding: '6px 12px',
            fontSize: '13px',
            opacity: currentScene >= totalScenes - 1 ? 0.45 : 1,
          }}
        >
          <span>التالي</span>
          <span>▶</span>
        </button>

        <button
          onClick={onReset}
          title="إعادة من البداية"
          className="retro-button"
          style={{
            padding: '6px 10px',
            fontSize: '13px',
          }}
        >
          <span>↻</span>
          <span>إعادة</span>
        </button>
      </div>

      {/* Left side in RTL: Audio Toggle & Quick Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'كتم الصوت' : 'تفعيل المؤثرات الصوتية'}
          className="retro-button"
          style={{
            padding: '6px 10px',
            fontSize: '12px',
          }}
        >
          <span>{soundEnabled ? '🔊 صوت الرجعية' : '🔇 صامت'}</span>
        </button>
      </div>
    </div>
  );
};

