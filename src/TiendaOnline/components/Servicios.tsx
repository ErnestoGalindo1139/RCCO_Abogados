import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import {
  Scale,
  BriefcaseBusiness,
  Building2,
  Home,
  ClipboardCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type Servicio = {
  id: string;
  titulo: string;
  icon: React.ReactNode;
};

const servicios: Servicio[] = [
  { id: 'laboral-1', titulo: 'Materia Laboral', icon: <Scale className="w-8 h-8" /> },
  { id: 'mercantil-1', titulo: 'Materia Mercantil', icon: <BriefcaseBusiness className="w-8 h-8" /> },
  { id: 'societario-1', titulo: 'Derecho Societario', icon: <Building2 className="w-8 h-8" /> },
  { id: 'inmobiliario-1', titulo: 'Derecho Inmobiliario', icon: <Home className="w-8 h-8" /> },
  { id: 'planeacion-1', titulo: 'Planeación Patrimonial', icon: <ClipboardCheck className="w-8 h-8" /> },
  { id: 'financiero-1', titulo: 'Derecho Financiero', icon: <TrendingUp className="w-8 h-8" /> },
  { id: 'laboral-2', titulo: 'Materia Laboral', icon: <Scale className="w-8 h-8" /> },
  { id: 'mercantil-2', titulo: 'Materia Mercantil', icon: <BriefcaseBusiness className="w-8 h-8" /> },
  { id: 'societario-2', titulo: 'Derecho Societario', icon: <Building2 className="w-8 h-8" /> },
  { id: 'inmobiliario-2', titulo: 'Derecho Inmobiliario', icon: <Home className="w-8 h-8" /> },
  { id: 'planeacion-2', titulo: 'Planeación Patrimonial', icon: <ClipboardCheck className="w-8 h-8" /> },
  { id: 'financiero-2', titulo: 'Derecho Financiero', icon: <TrendingUp className="w-8 h-8" /> },
];

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  arr.reduce<T[][]>((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

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

export const Servicios = (): React.JSX.Element => {
  const chunkSize = useResponsiveChunk();
  const slides = useMemo(() => chunkArray(servicios, chunkSize), [chunkSize]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  // Cuando cambia el chunk (por breakpoint), re‑inicializa y vuelve al slide 0
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit?.();
    emblaApi.scrollTo(0);
    setSelectedIndex(0);
  }, [slides.length, emblaApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="w-full bg-gradient-to-br from-[#0b4db0] via-[#0a58ca] to-[#0b63d3] py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-white text-3xl md:text-5xl font-bold">
          Servicios Legales
        </h2>

        {/* Embla */}
        <div className="mt-16 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((grupo, idx) => (
              <div key={idx} className="flex-[0_0_100%] px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 py-[1rem]">
                  {grupo.map((s) => (
                    <button
                      key={s.id}
                      className="
                        group rounded-2xl px-6 py-[2.6rem] text-white
                        bg-[#0b3ea6] hover:bg-[#0840b0]
                        ring-1 ring-white/10
                        drop-shadow-lg hover:drop-shadow-2xl
                        transition-all duration-300
                        motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.015]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                        focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a58ca]
                        active:scale-[0.995]
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
                        <span className="text-lg md:text-xl font-semibold text-center text-white">
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
        <div className="mt-10 flex items-center justify-center gap-8">
          <button
            onClick={scrollPrev}
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
                className={`h-2 w-2 rounded-full transition-all ${
                  i === selectedIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="rounded-full p-2 hover:bg-white/10 text-white/90 disabled:opacity-40 transition"
            disabled={slides.length <= 1}
            aria-label="Página siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
