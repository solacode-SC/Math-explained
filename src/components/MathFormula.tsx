import React from 'react';

interface MathFormulaProps {
  label?: string;
  formula: React.ReactNode;
  subtitle?: string;
  highlight?: boolean;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  label,
  formula,
  subtitle,
  highlight = false,
}) => {
  return (
    <div
      style={{
        background: highlight ? '#FFFDF5' : 'var(--bg-cream-dark)',
        border: highlight ? '2px solid var(--accent-orange)' : '1.5px solid var(--olive-light)',
        borderRadius: '10px',
        padding: '12px 18px',
        margin: '12px 0',
        boxShadow: highlight ? '2px 4px 0px rgba(217, 120, 40, 0.25)' : '1px 2px 0px rgba(37, 39, 31, 0.1)',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        direction: 'ltr', // formulas are LTR
        userSelect: 'none',
      }}
    >
      {label && (
        <span
          style={{
            direction: 'rtl',
            fontFamily: 'var(--font-arabic-primary)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--olive-muted)',
            alignSelf: 'flex-start',
          }}
        >
          {label}
        </span>
      )}
      <div
        style={{
          fontFamily: "'Courier Prime', 'Consolas', 'Cambria Math', monospace",
          fontSize: '19px',
          fontWeight: 700,
          color: 'var(--ink-dark)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {formula}
      </div>
      {subtitle && (
        <span
          style={{
            direction: 'rtl',
            fontFamily: 'var(--font-arabic-primary)',
            fontSize: '12px',
            color: 'var(--ink-dark)',
            opacity: 0.85,
            marginTop: '2px',
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};

