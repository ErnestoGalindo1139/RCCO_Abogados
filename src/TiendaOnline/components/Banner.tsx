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
            <h3 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ">
              “{t('banner.headline1')}”
            </h3>
            {/* <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              
            </h3> */}
            <h5 className='text-end italic text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-7 w-full'>--RCCO</h5>
            {/* <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              tu tranquilidad legal
            </h3> */}
            {/* <button className='bg-white text-blue-900 font-semibold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 md:mt-12 transition-all hover:bg-blue-50'>
              Agenda una cita
            </button> */}
          </div>
        </div>

        {/* Social Icons - Ajustado el margen derecho */}
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
