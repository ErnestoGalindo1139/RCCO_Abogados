import React, { useState } from 'react';
import { LuShield, LuTarget } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

// ————————————————————————————————————————————————
// Card con glow azul en el borde + sensación de sobresalir
// ————————————————————————————————————————————————
const GlowCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = '',
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMove}
      className={`group relative rounded-2xl bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white shadow-lg ring-1 ring-black/5 transition duration-300 hover:shadow-2xl hover:-translate-y-1 mt-[2rem] ${className}`}
    >
      {/* Glow solo en el borde */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          border: `2px solid transparent`,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(37,99,235,0.6), transparent 70%) border-box`,
          WebkitMask:
            'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative p-6 sm:p-8">{children}</div>
    </div>
  );
};

// ————————————————————————————————————————————————
// Sección principal
// ————————————————————————————————————————————————
export const Nosotros: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <section id="nosotros" className="relative py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <GlowCard className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
            {t('nosotros.title')}
          </h2>

          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>{t('nosotros.p1')}</p>
            <p>{t('nosotros.p2')}</p>
          </div>
        </GlowCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <GlowCard>
            <div className="flex items-start gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full p-2">
                    <LuShield className="h-full w-full" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-700">
                    {t('nosotros.mission.title')}
                  </h3>
                </div>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  {t('nosotros.mission.text')}
                </p>
              </div>
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-start gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full p-2">
                    <LuTarget className="h-full w-full" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-700">
                    {t('nosotros.vision.title')}
                  </h3>
                </div>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  {t('nosotros.vision.text')}
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};
