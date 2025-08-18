import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
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
} from 'lucide-react';

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

const DATA: Servicio[] = [
  {
    id: 'laboral',
    titulo: 'Materia Laboral',
    icon: <Scale className="w-7 h-7" />,
    resumen:
      'Asesoría integral para relaciones laborales individuales y colectivas.',
    bullets: [
      'Contratos y cumplimiento',
      'Litigio y conciliación',
      'Auditorías laborales',
    ],
  },
  {
    id: 'mercantil',
    titulo: 'Materia Mercantil',
    icon: <BriefcaseBusiness className="w-7 h-7" />,
    resumen:
      'Operaciones comerciales, contratos y resolución de controversias.',
    bullets: ['Contratos mercantiles', 'Cobranza judicial', 'Arbitraje'],
  },
  {
    id: 'societario',
    titulo: 'Derecho Societario',
    icon: <Building2 className="w-7 h-7" />,
    resumen: 'Gobierno corporativo y cumplimiento regulatorio.',
    bullets: [
      'Constitución y fusiones',
      'Actas y libros',
      'Secretaría corporativa',
    ],
  },
  {
    id: 'inmobiliario',
    titulo: 'Derecho Inmobiliario',
    icon: <Home className="w-7 h-7" />,
    resumen: 'Transacciones y regularización de inmuebles.',
    bullets: [
      'Compraventas y arrendamientos',
      'Debida diligencia',
      'Fideicomisos',
    ],
  },
  {
    id: 'planeacion',
    titulo: 'Planeación Patrimonial',
    icon: <ClipboardCheck className="w-7 h-7" />,
    resumen: 'Protección y transmisión ordenada del patrimonio.',
    bullets: [
      'Testamentos',
      'Protocolos familiares',
      'Fideicomisos patrimoniales',
    ],
  },
  {
    id: 'financiero',
    titulo: 'Derecho Financiero',
    icon: <TrendingUp className="w-7 h-7" />,
    resumen: 'Instrumentos y regulación del sistema financiero.',
    bullets: ['Regulación y cumplimiento', 'Estructuras de crédito', 'Fintech'],
  },
];

// Duplicamos para el carrusel
const servicios = [...DATA, ...DATA];

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  arr.reduce<T[][]>(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );

/** Hook: 6 (>=1024px) → 4 (>=640px) → 2 (<640px)  */
const useResponsiveChunk = () => {
  const [size, setSize] = useState(6);
  useEffect(() => {
    const compute = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
      setSize(w >= 1024 ? 6 : w >= 640 ? 4 : 2);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  return size;
};

// ──────────────────────────────────────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────────────────────────────────────
export const Servicios: React.FC = () => {
  const chunkSize = useResponsiveChunk();
  const slides = useMemo(() => chunkArray(servicios, chunkSize), [chunkSize]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [activo, setActivo] = useState<Servicio | null>(null);

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
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActivo(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = (i: number) => emblaApi?.scrollTo(i);
  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();

  return (
    <section
      id="servicios"
      className="w-full bg-gradient-to-br from-[#0b4db0] via-[#0a58ca] to-[#0b63d3] py-16 px-4"
    >
      <div className="max-w-[80%] mx-auto">
        <h2 className="text-center text-white text-3xl md:text-5xl font-bold">
          Servicios Legales
        </h2>

        {/* Layout 2 columnas */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-[6rem] items-start">
          {/* Columna izquierda: Panel */}
          <div className="relative min-h-[320px] hidden lg:block">
            <AnimatePresence mode="wait">
              {activo ? (
                <motion.aside
                  key={activo.id}
                  initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  className="rounded-3xl bg-white/10 text-white/90 ring-1 ring-white/15 shadow-2xl p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl ring-1 ring-white/20">
                      <div className="text-[#8BC6FF]">{activo.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold">
                        {activo.titulo}
                      </h3>
                      <p className="mt-2 text-white/80 leading-relaxed">
                        {activo.resumen}
                      </p>
                    </div>
                    <button
                      onClick={() => setActivo(null)}
                      className="shrink-0 rounded-full p-2 hover:bg-white/10 transition"
                      aria-label="Cerrar"
                      title="Cerrar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ul className="mt-6 space-y-2 text-white/90">
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
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-8 text-white/70"
                >
                  <p className="text-lg">
                    Selecciona un servicio a la derecha para ver los detalles
                    aquí.
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-x-[2rem] gap-y-10 py-2">
                      {grupo.map((s, i) => (
                        <button
                          key={`${s.id}-${idx}-${i}`}
                          onClick={() =>
                            setActivo(
                              DATA.find(
                                (d) => d.id === s.id.replace(/-\d+$/, '')
                              ) || DATA[0]
                            )
                          }
                          className="
                            h-full aspect-[5/4]  /* <- mismo tamaño */
                            group rounded-2xl px-6 py-10 text-white
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
                          <div className="flex flex-col items-center gap-4">
                            <div
                              className="
                                bg-white/10 p-4 rounded-xl backdrop-blur-sm
                                ring-1 ring-white/10 group-hover:ring-white/20
                                transition-transform group-hover:scale-110
                              "
                            >
                              <div className="text-[#8BC6FF]">{s.icon}</div>
                            </div>
                            <span className="text-lg md:text-xl font-semibold text-center line-clamp-2">
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
            <div className="mt-8 flex items-center justify-center gap-8">
              <button
                onClick={prev}
                className="rounded-full p-2 hover:bg-white/10 text-white/90 disabled:opacity-40 transition"
                disabled={slides.length <= 1}
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Ir a la página ${i + 1}`}
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
                aria-label="Página siguiente"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setActivo(null)}
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
                  onClick={() => setActivo(null)}
                  className="rounded-full p-2 hover:bg-white/10 transition"
                  aria-label="Cerrar"
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
