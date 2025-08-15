import React, { useMemo, useState } from 'react';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

type Direction = 'left' | 'right';

type LogoCarouselProps = {
  height?: number; // alto del logo (px)
  gap?: number; // separación entre logos (px)
  speed?: number; // velocidad del autoscroll (1 lento — 5 rápido aprox.)
  direction?: Direction; // "left" (default) | "right"
  pauseOnHover?: boolean; // pausa al pasar el cursor/tocar
  grayscaleOnIdle?: boolean; // gris → color al hover
  title?: string;
  className?: string;
};

export const LogoCarousel: React.FC<LogoCarouselProps> = ({
  height = 64,
  gap = 48,
  speed = 1.6,
  direction = 'left',
  pauseOnHover = true,
  grayscaleOnIdle = true,
  title = 'Nuestros clientes',
  className = '',
}) => {
  const logos = [
    'https://digito-r.com/wp-content/uploads/2020/07/grupo-modelo.png',
    'https://digito-r.com/wp-content/uploads/2020/07/pisa.png',
    'https://digito-r.com/wp-content/uploads/2020/07/redbull.png',
    'https://digito-r.com/wp-content/uploads/2020/07/shell.png',
    'https://digito-r.com/wp-content/uploads/2020/07/mapfre.png',
    'https://digito-r.com/wp-content/uploads/2020/07/electrolit.png',
    'https://digito-r.com/wp-content/uploads/2020/07/canadevi.png',
    'https://digito-r.com/wp-content/uploads/2025/06/logo-universa-blanco-768x768.png',
    'https://digito-r.com/wp-content/uploads/2023/06/korber500.png',
    'https://digito-r.com/wp-content/uploads/2020/07/affipay.png',
  ];

  const options: EmblaOptionsType = useMemo(
    () => ({
      loop: true,
      dragFree: true, // arrastre suave sin “snap”
      direction: direction === 'left' ? 'ltr' : 'rtl',
      align: 'start',
      containScroll: 'trimSnaps',
      skipSnaps: false,
    }),
    [direction]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      speed, // controla la velocidad del desplazamiento continuo
      startDelay: 0,
      // pausa automát. (puedes desactivar si no te late)
      stopOnInteraction: pauseOnHover,
      stopOnMouseEnter: pauseOnHover,
      stopOnFocusIn: pauseOnHover,
    }),
  ]);

  // opcional: control manual de pausa en hover/touch
  const [isPaused, setIsPaused] = useState(false);
  const handlePause = (p: boolean): void => {
    if (!emblaApi) return;
    setIsPaused(p);
    const plugin = emblaApi.plugins()?.autoScroll;
    if (!plugin) return;
    if (p) plugin.stop();
    else plugin.play();
  };

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    maskImage:
      'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
  };

  const cellMinWidth = Math.max(height * 2, 140); // ancho mínimo por logo

  return (
    <section
      className={`w-full py-12 bg-gray-900 text-white ${className}`}
      aria-label="Carrusel de logotipos de clientes"
    >
      {title && (
        <h3 className="text-center text-white/90 text-xl sm:text-2xl font-semibold mb-6">
          {title}
        </h3>
      )}

      <div
        className="relative mx-auto max-w-7xl overflow-hidden"
        style={maskStyle}
      >
        <div
          className="embla__viewport overflow-hidden"
          ref={emblaRef}
          onMouseEnter={
            pauseOnHover ? (): void => handlePause(true) : undefined
          }
          onMouseLeave={
            pauseOnHover ? (): void => handlePause(false) : undefined
          }
          onPointerDown={
            pauseOnHover ? (): void => handlePause(true) : undefined
          }
          onPointerUp={
            pauseOnHover ? (): void => handlePause(false) : undefined
          }
          aria-roledescription="carousel"
          aria-label="Clientes que confían en nosotros"
        >
          <div className="embla__container flex" style={{ gap }} role="list">
            {logos.map((src, i) => (
              <div
                role="listitem"
                key={`${src}-${i}`}
                className="embla__slide flex-[0_0_auto] px-1 flex items-center justify-center"
                style={{ minWidth: cellMinWidth }}
              >
                <img
                  src={src}
                  alt={`Logo cliente ${i + 1}`}
                  height={height}
                  loading="lazy"
                  className={`object-contain transition duration-200 ${
                    grayscaleOnIdle
                      ? 'opacity-80 hover:opacity-100 grayscale hover:grayscale-0'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    height,
                    width: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.06))',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      'none';
                  }}
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botón de Play/Pause accesible (opcional) */}
        {/* <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => handlePause(!isPaused)}
            className="text-sm px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20"
            aria-pressed={isPaused}
          >
            {isPaused ? 'Reanudar' : 'Pausar'}
          </button>
        </div> */}
      </div>

      <div className="sr-only">
        Carrusel con desplazamiento automático continuo y loop infinito.
      </div>
    </section>
  );
};
