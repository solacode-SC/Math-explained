import React from 'react';

interface RetroWindowProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  width?: string | number;
  maxWidth?: string | number;
  className?: string;
  statusBarText?: string;
  headerAction?: React.ReactNode;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  icon = '📁',
  children,
  width = '100%',
  maxWidth = '920px',
  className = '',
  statusBarText = 'SYSTEM_READY • COPROCESSOR: ACTIVE • 60 FPS',
  headerAction,
}) => {
  return (
    <div
      className={`retro-box anim-window ${className}`}
      style={{
        width,
        maxWidth,
        margin: '0 auto',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Retro Window Header */}
      <div
        style={{
          background: 'var(--olive-muted)',
          color: 'var(--bg-paper-light)',
          borderBottom: 'var(--border-thick)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
      >
        {/* Left: Window title and icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          <span>{icon}</span>
          <span style={{ direction: 'ltr' }}>{title}</span>
        </div>

        {/* Mac-style Grooved Lines in Center */}
        <div
          style={{
            flex: 1,
            height: '10px',
            margin: '0 16px',
            backgroundImage:
              'repeating-linear-gradient(to bottom, var(--olive-light) 0, var(--olive-light) 1.5px, transparent 1.5px, transparent 3px)',
            opacity: 0.7,
            borderRadius: '2px',
          }}
        />

        {/* Right: Window Controls & Optional actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {headerAction}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            <span
              title="تصغير"
              style={{
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-yellow)',
                border: '1.5px solid var(--ink-dark)',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            />
            <span
              title="إغلاق"
              style={{
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-pink)',
                border: '1.5px solid var(--ink-dark)',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </div>

      {/* Window Body */}
      <div
        style={{
          padding: '20px',
          flex: 1,
          position: 'relative',
          backgroundColor: 'var(--bg-paper-light)',
        }}
      >
        {children}
      </div>

      {/* Retro Status Footer */}
      <div
        style={{
          background: 'var(--bg-cream-dark)',
          borderTop: '1.5px solid var(--olive-light)',
          padding: '4px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--ink-dark)',
          direction: 'ltr',
        }}
      >
        <span>{statusBarText}</span>
        <span style={{ direction: 'rtl', fontFamily: 'var(--font-arabic-primary)', fontWeight: 600 }}>
          مختبر الرياضيات الكلاسيكي v2.4
        </span>
      </div>
    </div>
  );
};

