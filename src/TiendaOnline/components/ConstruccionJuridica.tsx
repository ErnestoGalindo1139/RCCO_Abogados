import React from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';
import { FileSearch, ShieldCheck, Landmark, TrendingUp } from 'lucide-react';

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

  /** Cómo mostrar el logo sobre fondo oscuro */
  logoStyle?: 'auto' | 'light' | 'original';
};

export const ConstruccionJuridica: React.FC<Props> = ({
  id = 'metodologia',
  logoSrc = '/img/360.png',
  onCTAClick,
  heading = 'Construcción Jurídica 360°',
  subheading = 'Una metodología integral para blindar el crecimiento de tu empresa.',
  className = '',
  logoStyle = 'auto',
}) => {
  const pillars: Pillar[] = [
    {
      id: 'analisis',
      title: 'Análisis Organizacional',
      description:
        'Estudiamos la estructura de la empresa o grupo para comprender cómo está organizada y cómo opera.',
      icon: <FileSearch className="h-6 w-6" aria-hidden />,
    },
    {
      id: 'riesgos',
      title: 'Identificación de Riesgos',
      description:
        'Determinamos amenazas y cuantificamos el costo potencial del problema para el crecimiento futuro.',
      icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
    },
    {
      id: 'estrategia',
      title: 'Planeación Legal Estratégica',
      description:
        'Diseñamos soluciones integrales y específicas con instrumentos adecuados al marco legal aplicable.',
      icon: <Landmark className="h-6 w-6" aria-hidden />,
    },
    {
      id: 'resultados',
      title: 'Prevención y Fortalecimiento',
      description:
        'Brindamos certeza jurídica, prevenimos y subsanamos contingencias y potenciamos fortalezas.',
      icon: <TrendingUp className="h-6 w-6" aria-hidden />,
    },
  ];

  // ✅ Arreglo de tipos
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number = 1) => {
      const t: Transition = { duration: 0.5, delay: 0.08 * i, ease: 'easeOut' };
      return {
        opacity: 1,
        y: 0,
        transition: t,
      };
    },
  };

  /** Filtro opcional (si tu logo es negro sobre fondo oscuro) */
  const logoFilterStyle: React.CSSProperties =
    logoStyle === 'original'
      ? {}
      : logoStyle === 'light'
        ? { filter: 'invert(1) brightness(1.25) contrast(1.05)' }
        : {
            filter:
              'invert(1) brightness(1.15) contrast(1.05) saturate(1.3) hue-rotate(210deg)',
          };

  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-gradient-to-b from-neutral-950 via-blue-950/80 to-neutral-950 ${className}`}
      aria-labelledby="cj360-heading"
    >
      {/* Overlay radial para resaltar el centro */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        {/* LOGO protagonista */}
        <motion.div
          className="mx-auto mb-8 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img
            src={logoSrc}
            alt="Construcción Jurídica 360"
            className="w-full max-w-[360px] select-none drop-shadow-2xl"
            style={logoFilterStyle}
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
            {heading}
          </motion.h2>

          <motion.p
            className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-neutral-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
            custom={2}
          >
            {subheading}
          </motion.p>

          <motion.p
            className="mx-auto mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
            custom={3}
          >
            Analizamos la empresa para identificar fortalezas, oportunidades,
            debilidades y amenazas bajo el marco legal aplicable. Con base en
            ese diagnóstico, cuantificamos riesgos y diseñamos una estructura
            legal estratégica con instrumentos adecuados que brinden certeza
            jurídica, prevengan y subsanen contingencias y potencien el
            crecimiento del negocio.
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
              <span
                aria-hidden
                className="absolute inset-x-0 -top-px h-[3px] rounded-t-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
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
      </div>
    </section>
  );
};
