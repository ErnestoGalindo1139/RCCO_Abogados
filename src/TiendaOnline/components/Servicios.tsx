import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  BriefcaseBusiness,
  Building2,
  Home,
  ClipboardCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Copyright,
  FileSearch,
  Landmark,
  FileSignature,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

// ──────────────────────────────────────────────────────────────────────────────
// Tipos y datos
// ──────────────────────────────────────────────────────────────────────────────
type Servicio = {
  id: string;
  titulo: string;
  icon: React.ReactNode;
  resumen: string;
  bullets: string[];
};

const ICONS: Record<string, React.ReactNode> = {
  laboral: <Scale className="w-7 h-7" />,
  mercantil: <BriefcaseBusiness className="w-7 h-7" />,
  societario: <Building2 className="w-7 h-7" />,
  civil: <Home className="w-7 h-7" />, // ← icono para 'civil'
  planeacion: <ClipboardCheck className="w-7 h-7" />,
  propiedad_industrial: <Copyright className="w-7 h-7" />,
  fideicomisos: <TrendingUp className="w-7 h-7" />,
  pld: <ShieldCheck className="w-7 h-7" />,
  due_diligence: <FileSearch className="w-7 h-7" />,
  sociedades_financieras: <Landmark className="w-7 h-7" />,
  contratos_financieros: <FileSignature className="w-7 h-7" />,
  cumplimiento_regulatorio: <ClipboardCheck className="w-7 h-7" />,
};

const IDS: string[] = [
  'societario',
  'mercantil',
  'civil',
  'planeacion',
  'laboral',
  'propiedad_industrial',
  'fideicomisos',
  'pld',
  'due_diligence',
  'sociedades_financieras',
  'contratos_financieros',
  'cumplimiento_regulatorio',
];

const buildServicios = (t: TFunction<'home'>): Servicio[] =>
  IDS.map(
    (id): Servicio => ({
      id,
      titulo: t(`servicios.items.${id}.title`),
      icon: ICONS[id],
      resumen: t(`servicios.items.${id}.summary`),
      bullets: t(`servicios.items.${id}.bullets`, {
        returnObjects: true,
      }) as string[],
    })
  );

// Duplicamos en slides (no en data)
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  arr.reduce<T[][]>(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );

/** Hook: 6 (>=1024px) → 4 (>=640px) → 2 (<640px)  */
const useResponsiveChunk = (): number => {
  const [size, setSize] = useState(6);
  useEffect(() => {
    const compute = (): void => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
      setSize(w >= 1024 ? 6 : w >= 640 ? 4 : 2);
    };
    compute();
    window.addEventListener('resize', compute);
    return (): void => window.removeEventListener('resize', compute);
  }, []);
  return size;
};

// ──────────────────────────────────────────────────────────────────────────────
export const Servicios: React.FC = () => {
  const { t, i18n } = useTranslation('home');

  // Construye los 12 servicios desde i18n
  const DATA = useMemo(() => buildServicios(t), [t]);
  // ✅ Usar solo los 12 (sin duplicar)
  const servicios = useMemo(() => DATA, [DATA]);

  const chunkSize = useResponsiveChunk();
  const slides = useMemo(
    () => chunkArray(servicios, chunkSize),
    [servicios, chunkSize]
  );

  // ✅ Loop solo si hay más que el tamaño de un slide
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: servicios.length > chunkSize,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Activo
  const [activoId, setActivoId] = useState<string | null>(null);
  const activo = useMemo(
    () => (activoId ? (DATA.find((d) => d.id === activoId) ?? null) : null),
    [DATA, activoId]
  );

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit?.();
    emblaApi.scrollTo(0);
    setSelectedIndex(0);
  }, [slides.length, emblaApi]);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent): boolean | void =>
      e.key === 'Escape' && setActivoId(null);
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = (i: number): void => emblaApi?.scrollTo(i);
  const prev = (): void => emblaApi?.scrollPrev();
  const next = (): void => emblaApi?.scrollNext();

  return (
    <section
      id="servicios"
      className="relative w-full overflow-hidden py-[4rem] px-4"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, #0A1931 0%, #0E2A73 50%, #081630 100%),
          radial-gradient(600px at 75% 60%, rgba(59,130,246,0.25), transparent 70%)
        `,
        backgroundBlendMode: 'overlay, normal',
      }}
    >
      <div className="max-w-[80%] mx-auto">
        <h2 className="text-center text-white text-3xl md:text-5xl font-bold mb-[6rem] lg:mb-8">
          {t('servicios.title')}
        </h2>

        {/* Layout 2 columnas */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-[6rem] lg:gap-6 items-start">
          {/* Columna izquierda: Panel */}
          <div className="relative min-h-[320px] lg:min-h-[180px] hidden lg:block">
            <AnimatePresence mode="wait">
              {activo ? (
                <motion.aside
                  key={`${activo.id}-${i18n.language}`}
                  initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  className="rounded-3xl bg-white/10 text-white/90 ring-1 ring-white/15 shadow-2xl p-6 lg:p-4"
                >
                  <div className="flex items-start gap-4 lg:gap-3">
                    <div className="bg-white/10 p-3 lg:p-2 rounded-2xl ring-1 ring-white/20">
                      <div className="text-[#8BC6FF]">{activo.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-xl font-semibold">
                        {activo.titulo}
                      </h3>
                      <p className="mt-2 text-white/80 leading-relaxed text-base lg:text-sm">
                        {activo.resumen}
                      </p>
                    </div>
                    <button
                      onClick={() => setActivoId(null)}
                      className="shrink-0 rounded-full p-2 hover:bg-white/10 transition"
                      aria-label={t('servicios.aria.close')}
                      title={t('servicios.aria.close') as string}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ul className="mt-6 lg:mt-4 space-y-2 lg:space-y-1.5 text-white/90 text-base lg:text-sm">
                    {activo.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.aside>
              ) : (
                <motion.div
                  key={`placeholder-${i18n.language}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-8 lg:p-5 text-white/70"

                >
                  <p className="text-lg lg:text-base">
                    {t('servicios.placeholder')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Columna derecha: Grid/carrusel */}
          <div>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((grupo, idx) => (
                  <div key={idx} className="flex-[0_0_100%] px-2">
                    {/* En lg forzamos filas de altura exacta y que cada card llene la fila */}
                    <div
                      className="
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch
                        gap-x-[2rem] gap-y-10
                        lg:gap-x-6 lg:gap-y-6
                        py-2
                        lg:auto-rows-[150px]
                      "
                    >
                      {grupo.map((s, i) => (
                        <button
                          key={`${s.id}-${idx}-${i}`}
                          onClick={() => setActivoId(s.id)}
                          className="
                            h-full md:aspect-[4/4]
                            lg:aspect-auto lg:h-auto
                            xl:aspect-[4/4] 2xl:aspect-[5/4]
                            group rounded-2xl px-6 py-10 lg:px-4 lg:py-6 text-white
                            bg-[#0b3ea6] hover:bg-[#0840b0]
                            ring-1 ring-white/10
                            drop-shadow-lg hover:drop-shadow-2xl
                            transition-all duration-300
                            motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.015]
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                            focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a58ca]
                            active:scale-[0.995]
                            flex flex-col justify-center
                          "
                        >
                          <div className="flex flex-col items-center gap-4 lg:gap-3">
                            <div
                              className="
                                bg-white/10 p-4 lg:p-3 rounded-xl backdrop-blur-sm
                                ring-1 ring-white/10 group-hover:ring-white/20
                                transition-transform group-hover:scale-110
                              "
                            >
                              <div className="text-[#8BC6FF]">{s.icon}</div>
                            </div>
                            <span className="text-lg md:text-xl lg:text-base font-semibold text-center line-clamp-2">
                              {s.titulo}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles */}
            <div className="mt-8 lg:mt-6 flex items-center justify-center gap-8 lg:gap-6">
              <button
                onClick={prev}
                className="rounded-full p-2 hover:bg-white/10 text-white/90 disabled:opacity-40 transition"
                disabled={slides.length <= 1}
                aria-label={t('servicios.aria.prev')}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-3 lg:gap-2.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={
                      t('servicios.aria.goto', { n: i + 1 }) as string
                    }
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      i === selectedIndex
                        ? 'bg-white'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="rounded-full p-2 hover:bg-white/10 text-white/90 disabled:opacity-40 transition"
                disabled={slides.length <= 1}
                aria-label={t('servicios.aria.next')}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal móvil */}
      <AnimatePresence>
        {activo && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            key={`${activo.id}-modal-${i18n.language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setActivoId(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              className="absolute bottom-0 inset-x-0 rounded-t-3xl bg-[#0b3ea6] text-white ring-1 ring-white/15 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-2xl ring-1 ring-white/20">
                  <div className="text-[#8BC6FF]">{activo.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{activo.titulo}</h3>
                  <p className="mt-2 text-white/80 leading-relaxed">
                    {activo.resumen}
                  </p>
                </div>
                <button
                  onClick={() => setActivoId(null)}
                  className="rounded-full p-2 hover:bg-white/10 transition"
                  aria-label={t('servicios.aria.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="mt-5 space-y-2">
                {activo.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
