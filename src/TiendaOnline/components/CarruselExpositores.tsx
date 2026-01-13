import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Expositor {
  id: number;
  nombre: string;
  imagenMobile: string;
  imagenDesktop: string;
}

const EXPOSITORES: Expositor[] = [
  {
    id: 1,
    nombre: 'Oscar',
    imagenMobile: '/img/expositores/Movil y escritorio/movil oscar.png',
    imagenDesktop: '/img/expositores/Movil y escritorio/escritorio oscar.png',
  },
  {
    id: 2,
    nombre: 'Alfredo',
    imagenMobile: '/img/expositores/Movil y escritorio/movil alfredo.png',
    imagenDesktop: '/img/expositores/Movil y escritorio/escritorio alfredo.png',
  },
  {
    id: 3,
    nombre: 'Liz',
    imagenMobile: '/img/expositores/Movil y escritorio/movil liz.png',
    imagenDesktop: '/img/expositores/Movil y escritorio/escritorio liz.png',
  },
  {
    id: 4,
    nombre: 'Lupita',
    imagenMobile: '/img/expositores/Movil y escritorio/movil lupita.png',
    imagenDesktop: '/img/expositores/Movil y escritorio/escritorio lupita.png',
  },
  {
    id: 5,
    nombre: 'Alejandra',
    imagenMobile: '/img/expositores/Movil y escritorio/movil alejandra.png',
    imagenDesktop:
      '/img/expositores/Movil y escritorio/escritorio alejandra.png',
  },
  {
    id: 6,
    nombre: 'Alejandro',
    imagenMobile: '/img/expositores/Movil y escritorio/movil alejandro.png',
    imagenDesktop:
      '/img/expositores/Movil y escritorio/escritorio alejandro.png',
  },
  {
    id: 7,
    nombre: 'Gibran',
    imagenMobile: '/img/expositores/Movil y escritorio/movil gibran.png',
    imagenDesktop: '/img/expositores/Movil y escritorio/escritorio gibran.png',
  },
  {
    id: 8,
    nombre: 'Manzanero',
    imagenMobile: '/img/expositores/Movil y escritorio/movil manzanero.png',
    imagenDesktop:
      '/img/expositores/Movil y escritorio/escritorio manzanero.png',
  },
  {
    id: 9,
    nombre: 'Miguel',
    imagenMobile: '/img/expositores/Movil y escritorio/movil miguel .png',
    imagenDesktop: '/img/expositores/Movil y escritorio/escritorio miguel .png',
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
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
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
    <section className="relative w-full max-w-[100rem] mx-auto px-4">
      {/* TEXTO */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Expositores Destacados
        </h2>
        <p className="mt-3 text-base md:text-lg">
          Conoce a los especialistas que participarán en el{' '}
          <strong>
            1er Simposio Anual Corporativo sobre Prevención del Lavado de Dinero
            en Sinaloa
          </strong>
          .
        </p>
      </div>

      {/* Flecha izquierda */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-[65%] md:top-[60%] z-10 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={scrollNext}
        className="absolute right-0 top-[65%] md:top-[60%] z-10 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition"
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
                {/* CONTENEDOR QUE MANDA */}
                <div className="relative w-full sm:h-[460px] md:h-[500px] overflow-hidden">
                  {/* Mobile */}
                  <img
                    src={expositor.imagenMobile}
                    alt={expositor.nombre}
                    className="
                      w-full h-full
                      md:hidden
                      object-cover
                    "
                    loading="lazy"
                  />

                  {/* Desktop */}
                  <img
                    src={expositor.imagenDesktop}
                    alt={expositor.nombre}
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      object-[60%_center]
                      hidden md:block
                    "
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
