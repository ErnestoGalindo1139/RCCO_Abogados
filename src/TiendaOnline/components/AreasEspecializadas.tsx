import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexTile } from './HexTile';
import { DetallePanel } from './DetallePanel';
import { DetalleInlineMobile } from './DetalleInlineMobile';
import type { Sector } from '../types/types';
import { SECTORES } from '../data/sectores';
import { useTranslation } from 'react-i18next';

export const AreasEspecializadas: React.FC = () => {
  const { t } = useTranslation('home');
  const [seleccion, setSeleccion] = useState<Sector | null>(null);

  // Desktop: tamaño y posiciones del anillo
  const { sizeRem, radiusRem } = useMemo(
    () => ({ sizeRem: 11, radiusRem: 15.1 }),
    []
  );
  const posiciones = useMemo(() => {
    const n = SECTORES.length;
    const step = (2 * Math.PI) / n;
    const start = -Math.PI / 2;
    return SECTORES.map((s, i) => {
      const angle = start + i * step;
      return {
        id: s.id,
        x: Math.cos(angle) * radiusRem,
        y: Math.sin(angle) * radiusRem,
      };
    });
  }, [radiusRem]);

  return (
    <section className="min-h-[90vh] w-full grid place-items-center bg-gradient-to-b from-[#0B2A6F] via-[#0D2F7F] to-[#0B2A6F] text-white py-10 px-4">
      {/* ===== Encabezado profesional mejorado ===== */}
      <motion.header
        className="w-full max-w-7xl mb-4 sm:mb-6 px-1 lg:px-0 lg:pl-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="text-center lg:text-left">
          <p className="mb-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60">
            Servicios
          </p>

          <h2 className="mb-[1rem] leading-[1.08] font-bold tracking-[-0.01em] text-[1.7rem] sm:text-[2rem] md:text-[2.2rem] text-white">
            <span className="block">Áreas especializadas</span>
            <span className="relative inline-block mt-1">
              <span className="bg-gradient-to-r from-sky-200 to-cyan-200 bg-clip-text text-transparent">
                para giros empresariales
              </span>
              <span
                aria-hidden
                className="absolute left-0 -bottom-[6px] h-[2px] w-[98%] rounded-full
                           bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300
                           blur-[0.2px]"
              />
            </span>
          </h2>
        </div>
      </motion.header>
      {/* ===== /Encabezado profesional mejorado ===== */}

      <div className="w-full max-w-7xl grid gap-10 lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,520px] items-center">
        {/* Anillo con hexágonos (solo desktop) */}
        <div
          className="relative mx-auto hidden lg:block"
          style={{ width: `min(90vw, 42rem)`, height: `min(90vw, 42rem)` }}
        >
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12rem] h-[12rem] rounded-[3rem] grid place-items-center text-center shadow-2xl"
            style={{
              background:
                'radial-gradient(100% 100% at 50% 0%, #2563EB, #0EA5E9)',
            }}
          >
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                {t('areas.center.title1')}
              </h2>
              <p className="text-sm -mt-0.5 opacity-90">
                {t('areas.center.title2')}
              </p>
            </div>
          </div>

          {SECTORES.map((s, i) => {
            const pos = posiciones[i];
            return (
              <div
                key={s.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(${pos.x}rem - 50%), calc(${pos.y}rem - 50%))`,
                }}
              >
                <HexTile sector={s} sizeRem={sizeRem} onClick={setSeleccion} />
              </div>
            );
          })}
        </div>

        {/* Panel de detalle (solo desktop) */}
        <div className="lg:pl-2 hidden lg:block">
          <div className="relative lg:w-[28rem] xl:w-[32rem] min-h-[22rem]">
            <AnimatePresence mode="wait" initial={false}>
              {seleccion ? (
                <motion.div
                  key="panel"
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 32,
                    mass: 0.9,
                  }}
                >
                  <DetallePanel
                    sector={seleccion}
                    onClose={() => setSeleccion(null)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="absolute inset-0 text-white/80 max-w-lg"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 32,
                    mass: 0.9,
                  }}
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {t('areas.placeholder.title')}
                  </h3>
                  <p>{t('areas.placeholder.text')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MÓVIL: lista + acordeón inline */}
      <div className="mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
        {SECTORES.map((s) => {
          const Icon = s.icon;
          const isOpen = seleccion?.id === s.id;
          return (
            <div
              key={s.id}
              className="rounded-2xl bg-white/5 border border-white/10"
            >
              <button
                onClick={() => setSeleccion(isOpen ? null : s)}
                className="w-full text-left px-4 py-3 hover:bg-white/10 transition flex items-center gap-3 rounded-2xl"
                aria-expanded={isOpen}
                aria-controls={`detalle-${s.id}`}
              >
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${s.colorA}, ${s.colorB})`,
                  }}
                >
                  <Icon size={20} />
                </div>
                <span className="font-medium">
                  {t(`areas.items.${s.id}.title`)}
                </span>
                <motion.span
                  className="ml-auto text-white/70"
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <div id={`detalle-${s.id}`} className="px-4 pb-3">
                    <DetalleInlineMobile
                      sector={s}
                      onClose={() => setSeleccion(null)}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
