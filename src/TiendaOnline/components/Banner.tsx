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
    <section id="inicio" className="h-[100vh] w-full min-w-full overflow-hidden">
      <div className="relative w-full h-[100dvh] min-w-full">
        {/* Imagen de fondo */}
        <img
          src="/img/BannerDemo.jpg"
          alt={t('banner.bgAlt')}
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Capa de superposición azul */}
        <div className="absolute inset-0 bg-blue-900 opacity-85" />

        {/* Contenido principal - Centrado verticalmente */}
        <div className="absolute inset-0 flex flex-col justify-between py-[12vh]">
          {/* Sección superior */}
          <div className="flex-1 flex items-center">
            <div className="flex flex-col items-center md:items-start px-6 md:px-20 w-full">
              <div className="text-center md:text-left w-full sm:px-6 md:px-8 lg:px-10 xl:px-16">
                <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                  {t('banner.headline1')}
                </h3>
                <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] md:mt-2">
                  {t('banner.headline2')}
                </h3>
                <button className='
                  bg-white text-blue-900 
                  text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl
                  py-2 sm:py-2 md:py-2.5 lg:py-3 
                  px-5 sm:px-4 md:px-5 lg:px-6 
                  rounded-xl
                  mt-4 sm:mt-4 md:mt-6 lg:mt-8
                  font-bold 
                  transition-all 
                  hover:bg-blue-50
                ' onClick={() => window.open('https://wa.me/6692291634', '_blank')}>
                  {t('banner.cta')}
                </button>
              </div>
            </div>
          </div>

          {/* Contenedor inferior con slogan, firma e iconos */}
          <div className="flex flex-col gap-4">
            {/* Slogan y firma */}
            <div className="w-full px-4 sm:px-6 md:px-20">
              <div className="w-full sm:px-6 md:px-8 lg:px-10 xl:px-16">
                <h5 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl italic text-center mb-2">
                  "{t('banner.slogan')}"
                </h5>
                <h5 className='text-end italic text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl pr-6 sm:pr-12 md:pr-20 lg:pr-28 xl:pr-32'>
                  --RCCO
                </h5>
              </div>
            </div>

            {/* Social Icons en el flujo del contenido */}
            <div className="flex justify-end px-4 sm:px-16 md:px-20">
              <div className="flex items-center gap-3 sm:gap-3 md:gap-4">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="p-2.5 sm:p-2 rounded-full ring-1 ring-white/15 hover:ring-white/40 transition-all hover:scale-[1.03] bg-blue-900/50"
                  >
                    <Icon className="size-8 sm:size-7 md:size-9 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
