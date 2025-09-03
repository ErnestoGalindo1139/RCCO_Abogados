import React from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';
import { FileSearch, ShieldCheck, Landmark, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Pillar = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Props = {
  id?: string;
  logoSrc?: string; // ej. "/img/360.png"
  onCTAClick?: () => void;
  heading?: string;
  subheading?: string;
  className?: string;
  bgIntensity?: number;
  /** Namespace i18n (por si no es "home") */
  ns?: string;
};

export const ConstruccionJuridica: React.FC<Props> = ({
  id = 'metodologia',
  logoSrc = '/img/360.png',
  onCTAClick,
  // Estos sirven como fallback si la traducción no existe:
  heading = 'Construcción Jurídica 360°',
  subheading = 'Una metodología integral para blindar el crecimiento de tu empresa.',
  className = '',
  bgIntensity = 0.22,
  ns = 'home',
}) => {
  const { t } = useTranslation(ns);

  // ✅ Tipado correcto para evitar error con Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number = 1) => {
      const tr: Transition = {
        duration: 0.5,
        delay: 0.08 * i,
        ease: 'easeOut',
      };
      return { opacity: 1, y: 0, transition: tr };
    },
  };

  // IDs de pilares para ligar iconos y claves i18n
  const PILLAR_IDS = [
    'analisis',
    'riesgos',
    'estrategia',
    'resultados',
  ] as const;

  // Mapeo de iconos por id (no cambia)
  const ICON_BY_ID: Record<(typeof PILLAR_IDS)[number], React.ReactNode> = {
    analisis: <FileSearch className="h-6 w-6" aria-hidden />,
    riesgos: <ShieldCheck className="h-6 w-6" aria-hidden />,
    estrategia: <Landmark className="h-6 w-6" aria-hidden />,
    resultados: <TrendingUp className="h-6 w-6" aria-hidden />,
  };

  // Texto introductorio (párrafo largo bajo el subheading)
  const intro =
    t('metodologia360.intro', '') ||
    'Analizamos la empresa para identificar fortalezas, oportunidades, debilidades y amenazas bajo el marco legal aplicable. Con base en ese diagnóstico, cuantificamos riesgos y diseñamos una estructura legal estratégica con instrumentos adecuados que brinden certeza jurídica, prevengan y subsanen contingencias y potencien el crecimiento del negocio.';

  // Construimos los pilares desde i18n con fallback a los textos actuales
  const pillars: Pillar[] = PILLAR_IDS.map((id) => {
    const title =
      t(`metodologia360.pillars.${id}.title`, '') ||
      (id === 'analisis'
        ? 'Análisis Organizacional'
        : id === 'riesgos'
          ? 'Identificación de Riesgos'
          : id === 'estrategia'
            ? 'Planeación Legal Estratégica'
            : 'Prevención y Fortalecimiento');

    const description =
      t(`metodologia360.pillars.${id}.description`, '') ||
      (id === 'analisis'
        ? 'Estudiamos la estructura de la empresa o grupo para comprender cómo está organizada y cómo opera.'
        : id === 'riesgos'
          ? 'Determinamos amenazas y cuantificamos el costo potencial del problema para el crecimiento futuro.'
          : id === 'estrategia'
            ? 'Diseñamos soluciones integrales y específicas con instrumentos adecuados al marco legal aplicable.'
            : 'Brindamos certeza jurídica, prevenimos y subsanamos contingencias y potenciamos fortalezas.');

    return { id, title, description, icon: ICON_BY_ID[id] };
  });

  // Heading/Subheading desde i18n con fallback a props
  const i18nHeading = t('metodologia360.heading', '') || heading;
  const i18nSubheading = t('metodologia360.subheading', '') || subheading;

  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-neutral-950 ${className}`}
      aria-labelledby="cj360-heading"
    >
      {/* Fondos y degradados */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(37,99,235,${bgIntensity}) 0%, rgba(37,99,235,${
            bgIntensity * 0.55
          }) 35%, rgba(0,0,0,0) 65%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[34%] h-72 w-[1400px] -translate-x-1/2 rounded-[48px] blur-2xl"
        style={{
          background:
            'linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.14) 40%, rgba(37,99,235,0.14) 60%, rgba(37,99,235,0) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-blue-950/30 via-transparent to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        {/* Logo */}
        <motion.div
          className="mx-auto mb-8 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img
            src={logoSrc}
            alt={t('metodologia360.logoAlt', 'Construcción Jurídica 360')}
            className="w-full max-w-[360px] select-none drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
            style={{ filter: 'invert(1) brightness(1.25) contrast(1.1)' }}
          />
        </motion.div>

        {/* Encabezados */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            id="cj360-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
            custom={1}
          >
            {i18nHeading}
          </motion.h2>

          <motion.p
            className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-neutral-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
            custom={2}
          >
            {i18nSubheading}
          </motion.p>

          <motion.p
            className="mx-auto mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
            custom={3}
          >
            {intro}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, idx) => (
            <motion.article
              key={p.id}
              className="group relative h-full rounded-2xl border border-blue-500/20 bg-neutral-900/60 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              custom={idx + 4}
            >
              {/* Línea superior mejorada */}
              <span
                aria-hidden
                className="absolute inset-x-1 top-0 h-[3px] rounded-t-lg 
                           bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400
                           shadow-[0_0_6px_rgba(37,99,235,0.6),0_0_12px_rgba(37,99,235,0.35)]"
              />
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                  {p.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-100">
                  {p.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                {p.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* CTA opcional (si pasas handler) */}
        {onCTAClick && (
          <motion.div
            className="mt-12 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={9}
          >
            <button
              type="button"
              onClick={onCTAClick}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                       px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-blue-500/60 active:translate-y-px"
            >
              {t(
                'metodologia360.cta',
                'Conoce cómo aplicamos la Metodología 360 a tu empresa'
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
