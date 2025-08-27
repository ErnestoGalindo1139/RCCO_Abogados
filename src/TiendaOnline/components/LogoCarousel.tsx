import React, { useMemo, useState } from 'react';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { useTranslation } from 'react-i18next';

type Direction = 'left' | 'right';

type LogoCarouselProps = {
  height?: number; // alto del logo (px)
  gap?: number; // separación entre logos (px)
  speed?: number; // velocidad autoscroll
  direction?: Direction; // "left" | "right"
  pauseOnHover?: boolean; // pausa al pasar el cursor/tocar
  grayscaleOnIdle?: boolean; // gris → color al hover
  /** Texto o clave de i18n (si existe en los JSON se traduce, si no, se usa literal) */
  title?: string | null;
  /** Clave de i18n para fallback, default: "home:logos.title" */
  titleKey?: string;
  className?: string;
  /** Lista de URLs de logos. Si no se provee, se usa la default */
  logos?: string[];
};

export const LogoCarousel: React.FC<LogoCarouselProps> = ({
  height = 64,
  gap = 48,
  speed = 1.6,
  direction = 'left',
  pauseOnHover = true,
  grayscaleOnIdle = true,
  title = undefined,
  titleKey = 'home:logos.title',
  className = '',
  logos = [
    'img/cliente1.png',
    'img/cliente2.png',
    'img/cliente3.png',
    'img/cliente4.png',
    'img/cliente5.png',
    'img/cliente6.png',
  ],
}) => {
  const { t } = useTranslation('home');

  const options: EmblaOptionsType = useMemo(
    () => ({
      loop: true,
      dragFree: true,
      direction: direction === 'left' ? 'ltr' : 'rtl',
      align: 'start',
      containScroll: 'trimSnaps',
      skipSnaps: false,
    }),
    [direction]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      speed,
      startDelay: 0,
      stopOnInteraction: pauseOnHover,
      stopOnMouseEnter: pauseOnHover,
      stopOnFocusIn: pauseOnHover,
    }),
  ]);

  // Pausa manual
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

  const cellMinWidth = Math.max(height * 2, 140);

  // 🔑 Lógica del título (TIP-SAFE)
  const computedTitle =
    title === null
      ? null // ocultar título
      : title !== undefined
        ? t(title, { defaultValue: title }) // title es string aquí (no null)
        : t(titleKey);

  return (
    <section
      className={`w-full py-12 bg-gray-900 text-white ${className}`}
      aria-label={t('logos.aria.section')}
    >
      {computedTitle && (
        <h3 className="text-center text-white/90 text-xl sm:text-2xl font-semibold mb-6">
          {computedTitle}
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
          aria-label={t('logos.aria.viewport')}
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
                  alt={`Logo ${i + 1}`}
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
      </div>

      <div className="sr-only">{t('logos.aria.srNote')}</div>
    </section>
  );
};
