import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { VerArchivo } from './VerArchivo';
import { useNavigate } from 'react-router-dom';

const SOCIALS = [
  {
    href: 'https://www.facebook.com/profile.php?id=100063488083767',
    label: 'Facebook',
    Icon: FaFacebook,
  },
  {
    href: 'https://www.instagram.com/rccoabogados/',
    label: 'Instagram',
    Icon: FaInstagram,
  },
];

// 🔥 Slide responsive
const SLIDES = [
  {
    type: 'responsiveImage',
    desktop: '/img/BannerDemo.jpg',
    mobile: '/img/simposio_banner_mobile.jpg',
  },
];

export const Banner: React.FC<{ quitarboton?: boolean }> = ({
  quitarboton,
}) => {
  const { t } = useTranslation('home');
  const [activeIndex, setActiveIndex] = useState(0);

  const [verArchivoAbierto, setVerArchivoAbierto] = useState(false);
  const navigate = useNavigate();

  return (
    <section
      id="inicio"
      className="h-[100vh] w-full min-w-full overflow-hidden"
    >
      <div className="relative w-full h-[100dvh] min-w-full">
        {/* Imagen de fondo */}
        <img
          src="/img/BannerDemo.jpg"
          alt={t('banner.bgAlt')}
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Capa de superposición azul */}
        <div className="absolute inset-0 bg-blue-900 opacity-85" />

        {/* Contenido principal */}
        <div className="absolute inset-0 flex flex-col justify-between py-[12vh] pb-24">
          {/* Contenido superior */}
          <div className="flex-1 flex items-center">
            {' '}
            {/* Cambiado de items-end a items-center y removido mb-12 */}
            <div className="flex flex-col items-center md:items-start px-6 md:px-20 w-full">
              <div className="text-center md:text-left w-full sm:px-6 md:px-8 lg:px-10 xl:px-16">
                <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                  {t('banner.headline1')}
                </h3>
                <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] md:mt-2">
                  {t('banner.headline2')}
                </h3>
                <button
                  className="
                  bg-white text-blue-900 
                  text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl
                  py-2 sm:py-2 md:py-2.5 lg:py-3 
                  px-5 sm:px-4 md:px-5 lg:px-6 
                  rounded-xl
                  mt-4 sm:mt-4 md:mt-6 lg:mt-8
                  font-bold 
                  transition-all 
                  hover:bg-blue-50
                "
                  onClick={() =>
                    window.open('https://wa.me/6692291634', '_blank')
                  }
                >
                  {t('banner.cta')}
                </button>
              </div>
            </div>
          </div>

          {/* Slogan y firma */}
          <div className="w-full px-4 sm:px-6 md:px-20 mb-4">
            <div className="w-full sm:px-6 md:px-8 lg:px-10 xl:px-16">
              <h5 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl italic text-center mb-2">
                "{t('banner.slogan')}"
              </h5>
              <h5 className="text-end italic text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl pr-6 sm:pr-32 md:pr-32 lg:pr-32 xl:pr-32">
                --RCCO
              </h5>
            </div>
          </div>
        </div>

        {/* Social Icons - Posición absoluta con espacio reservado */}
        <div className="absolute bottom-4 right-4 sm:right-16 md:right-20 flex items-center gap-3 sm:gap-3 md:gap-4">
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
    </section>

    // <section
    //   id="inicio"
    //   className="h-[100vh] w-full min-w-full overflow-hidden"
    // >
    //   <div className="relative w-full h-[100dvh] min-w-full">
    //     {/* CARRUSEL */}
    //     <Swiper
    //       modules={[Autoplay, EffectFade, Navigation]}
    //       effect="fade"
    //       autoplay={{ delay: 4000, disableOnInteraction: false }}
    //       loop
    //       navigation={{
    //         nextEl: '.banner-next',
    //         prevEl: '.banner-prev',
    //       }}
    //       onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    //       className="absolute inset-0 w-full h-full z-0"
    //     >
    //       {SLIDES.map((slide, i) => (
    //         <SwiperSlide key={i}>
    //           <div
    //             // className="absolute inset-0 w-full h-full cursor-pointer"
    //             className="absolute inset-0 w-full h-full"
    //             // onClick={() => {
    //             //   const el = document.getElementById('evento-enero');
    //             //   if (el) el.scrollIntoView({ behavior: 'smooth' });
    //             // }}
    //           >
    //             {/* Imagen MOBILE */}
    //             <img
    //               src={slide.mobile}
    //               className="absolute inset-0 object-cover w-full h-full block lg:hidden"
    //               alt="banner mobile"
    //             />

    //             {/* Imagen DESKTOP */}
    //             <img
    //               src={slide.desktop}
    //               className="absolute inset-0 object-cover w-full h-full hidden lg:block"
    //               alt="banner desktop"
    //             />
    //           </div>
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>

    //     {/* FLECHAS */}
    //     <button className="banner-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl opacity-70 hover:opacity-100 select-none">
    //       ‹
    //     </button>

    //     <button className="banner-next absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl opacity-70 hover:opacity-100 select-none">
    //       ›
    //     </button>

    //     {/* 🌟 BOTONES – DIFERENTES COLORES + RESPONSIVE */}
    //     {!quitarboton && (
    //       <div
    //         className="
    //         absolute
    //         bottom-20     /* 👉 Móvil: botones más arriba */
    //         md:bottom-10  /* 👉 Desktop: posición original */
    //         w-full flex justify-center gap-8
    //         z-20 px-4
    //       "
    //       >
    //         {/* === BOTÓN REGISTRO — AMARILLO DORADO RCCO === */}
    //         {/* <button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           document
    //             .getElementById('evento-enero')
    //             ?.scrollIntoView({ behavior: 'smooth' });
    //         }}
    //         className="
    //           bg-[#D4AF37] text-[#0A1A3B] font-bold
    //           text-base sm:text-lg md:text-xl
    //           py-3 px-7 sm:px-10
    //           rounded-xl shadow-lg
    //           transition-all duration-200
    //           hover:brightness-110 hover:scale-105
    //           hover:shadow-[0_0_20px_rgba(212,175,55,0.8)]
    //           active:scale-95
    //         "
    //       >
    //         Registro
    //       </button> */}

    //         {/* === BOTÓN INFORMES — AZUL CLARO CORPORATIVO === */}
    //         <button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             navigate('/simposio'); // ⬅️ Aquí navegamos
    //             // window.open('https://wa.me/6692291634', '_blank');
    //             // setVerArchivoAbierto(true);
    //           }}
    //           className="
    //           bg-[#2D6CDF] text-white font-bold
    //           text-base sm:text-lg md:text-xl
    //           py-3 px-7 sm:px-10
    //           rounded-xl shadow-lg
    //           transition-all duration-200
    //           hover:brightness-110 hover:scale-105
    //           hover:shadow-[0_0_20px_rgba(45,108,223,0.7)]
    //           active:scale-95
    //         "
    //         >
    //           Más sobre nuestro simposio
    //         </button>
    //       </div>
    //     )}

    //     {/* ICONOS SOCIALES */}
    //     <div className="absolute bottom-4 right-4 sm:right-16 md:right-20 flex items-center gap-3 sm:gap-3 md:gap-4 z-20">
    //       {SOCIALS.map(({ href, label, Icon }) => (
    //         <a
    //           key={label}
    //           href={href}
    //           target="_blank"
    //           rel="noreferrer noopener"
    //           aria-label={label}
    //           className="p-2.5 sm:p-2 rounded-full ring-1 ring-white/15 hover:ring-white/40 transition-all hover:scale-[1.03] bg-blue-900/50"
    //         >
    //           <Icon className="size-8 sm:size-7 md:size-9 text-white" />
    //         </a>
    //       ))}
    //     </div>
    //   </div>
    //   {/* 🪟 Modal de vista previa */}
    //   <VerArchivo
    //     modo="modal"
    //     isOpen={verArchivoAbierto}
    //     onClose={() => setVerArchivoAbierto(false)}
    //     url={'/brochure_simposio_V4.pdf'}
    //     nombre={'brochure_simposio_V4.pdf'}
    //     tipo={'pdf'}
    //   />
    // </section>
  );
};
