import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import React from 'react';

const SOCIALS = [
  { href: 'https://www.facebook.com/profile.php?id=100063488083767', label: 'Facebook', Icon: FaFacebook },
  { href: 'https://www.instagram.com/rccoabogados/', label: 'Instagram', Icon: FaInstagram }
];

export const Banner: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <section id="inicio" className="h-screen">
      <div className="relative w-full h-full">
        {/* Imagen de fondo */}
        <img
          src="/img/BannerDemo.jpg"
          alt={t('banner.bgAlt')}
          className="object-cover w-full h-full"
        />

        {/* Capa de superposición azul */}
        <div className="absolute inset-0 bg-blue-900 opacity-85" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 md:px-20">
          <div className="text-center md:text-left w-full sm:px-6 md:px-8 lg:px-10 xl:px-16">
            <h3 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              {t('banner.headline1')}
            </h3>
            <h3 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              {t('banner.headline2')}
            </h3>
            <button className='
              bg-white text-blue-900 
              text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl 
              py-2 sm:py-2.5 md:py-3 lg:py-4 
              px-4 sm:px-4 md:px-6 lg:px-8 
              rounded-xl
              mt-5 sm:mt-6 md:mt-8 lg:mt-10 
              font-bold 
              transition-all 
              hover:bg-blue-50
            '>
              {t('banner.cta')}
            </button>
          </div>
        </div>

        {/* Slogan y firma cerca del fondo */}
        <div className="absolute bottom-32 inset-x-0 px-6 md:px-20">
          <div className="w-full sm:px-6 md:px-8 lg:px-10 xl:px-16">
            <h5 className="text-white text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl italic text-center  mb-4 ">
              "{t('banner.slogan')}"
            </h5>
            <h5 className='text-end italic text-white text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pr-8 sm:pr-12 md:pr-20 lg:pr-28 xl:pr-32'>
              --RCCO
            </h5>
          </div>
        </div>

        {/* Social Icons - Sin cambios */}
        <div className="absolute bottom-4 md:bottom-8 lg:bottom-10 right-16 md:right-20 flex items-center gap-2 md:gap-4">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="p-1 md:p-2 rounded-full ring-1 ring-white/15 hover:ring-white/40 transition-all hover:scale-[1.03] bg-blue-900/50"
            >
              <Icon className="size-7 md:size-9 text-white" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
