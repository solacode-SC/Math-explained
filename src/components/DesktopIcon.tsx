import React from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  sublabel?: string;
  onClick?: () => void;
  active?: boolean;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  sublabel,
  onClick,
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--olive-light)' : 'transparent',
        border: active ? '1.5px dashed var(--ink-dark)' : '1.5px solid transparent',
        borderRadius: '8px',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        width: '84px',
        textAlign: 'center',
        transition: 'all 0.15s ease',
        userSelect: 'none',
      }}
      className="desktop-icon-btn"
    >
      <div
        style={{
          fontSize: '32px',
          lineHeight: '1',
          filter: 'drop-shadow(1px 2px 0px rgba(37,39,31,0.25))',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-arabic-primary)',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--ink-dark)',
          lineHeight: 1.2,
          padding: '2px 4px',
          background: active ? 'var(--ink-dark)' : 'transparent',
          color: active ? 'var(--bg-paper-light)' : 'var(--ink-dark)',
          borderRadius: '3px',
        }}
      >
        {label}
      </span>
      {sublabel && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--olive-muted)',
          }}
        >
          {sublabel}
        </span>
      )}
    </button>
  );
};

