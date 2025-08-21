import { FaFacebook, FaInstagram } from 'react-icons/fa';


const SOCIALS = [
  { href: 'https://www.facebook.com/', label: 'Facebook', Icon: FaFacebook },
  { href: 'https://www.instagram.com/', label: 'Instagram', Icon: FaInstagram }
];

export const Banner = () => {
  return (
    <section id="inicio" className="">
      <div className="relative w-full h-[100vh]">
        {/* Imagen de fondo */}
        <img 
          src="/img/BannerDemo.jpg" 
          alt="Banner Image" 
          className="object-cover w-full h-full" 
        />
        {/* Capa de superposición azul */}
        <div className="absolute inset-0 bg-blue-900 opacity-85"></div>
        
        {/* Contenido del banner con estilos responsivos */}
        <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 md:px-20">
          <div className="text-center md:text-left max-w-full">
            <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              Comprometidos con
            </h3>
            <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              tu tranquilidad legal
            </h3>
            <button className='bg-white text-blue-900 font-semibold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 md:mt-12 transition-all hover:bg-blue-50'>
              Agenda una cita
            </button>
          </div>
        </div>
        
        {/* Social Icons - Responsive positioning */}
        <div className="absolute bottom-8 md:bottom-16 lg:bottom-24 right-4 md:right-8 flex items-center gap-2 md:gap-4">
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