import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Expositor {
  id: number;
  nombre: string;
  imagen: string;
}

const EXPOSITORES: Expositor[] = [
  {
    id: 1,
    nombre: 'Lic. Lizbeth M. Lascarez Calderón',
    imagen: '/img/expositores/expositor1.jpeg',
  },
  {
    id: 2,
    nombre: 'Lic. Alfredo Soto',
    imagen: '/img/expositores/expositor2.jpeg',
  },
  {
    id: 3,
    nombre: 'Maestro Óscar Urcisichi Arellano',
    imagen: '/img/expositores/expositor3.jpeg',
  },
  {
    id: 4,
    nombre: 'Lic. María G. Félix Sarabia',
    imagen: '/img/expositores/expositor4.jpeg',
  },
];

export const CarruselExpositores = (): React.JSX.Element => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 6000, // 6 segundos
        stopOnInteraction: false, // NO se detiene al usar flechas
        stopOnMouseEnter: true, // Se pausa al pasar el mouse
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative w-full max-w-[80rem] mx-auto px-4">
      {/* TEXTO DESCRIPTIVO */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h2 className="text-3xl md:text-4xl font-bold ">
          Expositores Destacados
        </h2>
        <p className="mt-3 text-base md:text-lg">
          Conoce a los especialistas que participarán en el{' '}
          <strong>
            1er Simposio Anual Corporativo sobre Prevención del Lavado de Dinero
            en Sinaloa
          </strong>
          , líderes en cumplimiento normativo, fiscalización y prevención de
          riesgos regulatorios.
        </p>
      </div>

      {/* Botón izquierdo */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* Botón derecho */}
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Carrusel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex py-10 mx-auto">
          {EXPOSITORES.map((expositor) => (
            <motion.div
              key={expositor.id}
              whileHover={{ scale: 1.03 }}
              className="
                px-3
                flex-[0_0_80%]
                sm:flex-[0_0_60%]
                md:flex-[0_0_45%]
                lg:flex-[0_0_30%]
              "
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
                {/* Imagen */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={expositor.imagen}
                    alt={expositor.nombre}
                    className="w-full h-full object-center"
                  />
                </div>

                {/* Info */}
                {/* <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {expositor.nombre}
                  </h3>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
