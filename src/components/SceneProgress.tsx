import React from 'react';

export interface SceneMeta {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
}

interface SceneProgressProps {
  scenes: SceneMeta[];
  currentScene: number;
  onSelectScene: (index: number) => void;
  progressPercent: number; // 0 to 100 within current scene or total
}

export const SceneProgress: React.FC<SceneProgressProps> = ({
  scenes,
  currentScene,
  onSelectScene,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        backgroundColor: 'rgba(245, 240, 223, 0.94)',
        border: '2px solid var(--ink-dark)',
        borderRadius: '30px',
        padding: '6px 18px',
        boxShadow: 'var(--shadow-retro)',
        backdropFilter: 'blur(6px)',
        maxWidth: '92vw',
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
        }}
      >
        {scenes.map((scene, idx) => {
          const isCurrent = idx === currentScene;
          const isPassed = idx < currentScene;

          return (
            <React.Fragment key={scene.id}>
              <button
                onClick={() => onSelectScene(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                  borderRadius: '16px',
                  backgroundColor: isCurrent ? 'var(--olive-muted)' : 'transparent',
                  color: isCurrent ? 'var(--bg-paper-light)' : 'var(--ink-dark)',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-arabic-primary)',
                  fontSize: '12px',
                  fontWeight: isCurrent ? 800 : 600,
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: isCurrent
                      ? 'var(--accent-orange)'
                      : isPassed
                      ? 'var(--olive-muted)'
                      : 'var(--bg-cream-dark)',
                    border: '1.5px solid var(--ink-dark)',
                    display: 'inline-block',
                    boxShadow: isCurrent ? '0 0 6px var(--accent-orange)' : 'none',
                  }}
                />
                <span style={{ display: isCurrent ? 'inline' : 'none' }}>
                  {scene.shortTitle}
                </span>
              </button>

              {idx < scenes.length - 1 && (
                <div
                  style={{
                    width: '16px',
                    height: '2px',
                    backgroundColor: isPassed ? 'var(--olive-muted)' : 'var(--olive-light)',
                    opacity: 0.7,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

