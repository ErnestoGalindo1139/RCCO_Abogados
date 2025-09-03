/* eslint-disable no-empty */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WaitScreen } from './WaitScreen';

/* === Banderas SVG (inline, livianas) === */
const FlagUS: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 7410 3900" {...props} aria-hidden>
    <rect width="7410" height="3900" fill="#b22234" />
    <g fill="#fff">
      <path d="M0 450h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0" />
    </g>
    <rect width="2964" height="2100" fill="#3c3b6e" />
    <g fill="#fff">
      {Array.from({ length: 9 }).map((_, r) =>
        Array.from({ length: r % 2 ? 5 : 6 }).map((_, c) => {
          const x = 247 + c * 494 + (r % 2 ? 247 : 0);
          const y = 210 + r * 210;
          return (
            <polygon
              key={`${r}-${c}`}
              points={`${x},${y - 70} ${x + 20},${y - 10} ${x + 80},${y - 10} ${x + 32},${y + 20} ${x + 50},${y + 80} ${x},${y + 45} ${x - 50},${y + 80} ${x - 32},${y + 20} ${x - 80},${y - 10} ${x - 20},${y - 10}`}
            />
          );
        })
      )}
    </g>
  </svg>
);

const FlagMX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 3 2" {...props} aria-hidden>
    <rect width="3" height="2" fill="#006847" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ce1126" />
    {/* Simplificación: círculo central para emblema */}
    <circle cx="1.5" cy="1" r="0.22" fill="#996515" />
  </svg>
);

/* === Switcher === */
export const LanguageFlagSwitch: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 22, className = '' }) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const lang = (i18n.resolvedLanguage || i18n.language || 'es').toLowerCase();
  const isEs = lang.startsWith('es');
  const next = isEs ? 'en' : 'es';

  const Flag = next === 'en' ? FlagUS : FlagMX;
  const label = next === 'en' ? 'Switch to English' : 'Cambiar a español';

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    await i18n.changeLanguage(next);

    try {
      localStorage.setItem('lng', next);
    } catch {}

    if (typeof document !== 'undefined') document.documentElement.lang = next;

    setTimeout(() => setLoading(false), 700); // simulamos transición
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title={label}
        aria-label={label}
        className={`inline-flex items-center justify-center rounded-full ring-1 ring-white/20 hover:ring-white/50 bg-white/10 hover:bg-white/20 p-1 transition ${className}`}
      >
        <Flag width={size} height={size} />
      </button>

      {/* ahora SI cubre toda la pantalla */}
      <WaitScreen show={loading} />
    </>
  );
};
