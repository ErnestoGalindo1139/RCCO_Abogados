import { FaWhatsapp } from 'react-icons/fa';

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
        
        {/* Puedes añadir contenido aquí para que aparezca sobre la imagen y el fondo */}
        <div className="absolute inset-0 flex flex-col items-start justify-center text-center px-20">
          <h3 className="text-white text-8xl font-bold">Ingeniería jurídica</h3>
          <h3 className="text-white text-8xl font-bold">para tu empresa</h3>
          <button className='bg-white text-blue-900 font-semibold h-14 px-2 rounded-lg text-2xl mt-9'>Agenda una cita</button>
        </div>
      </div>

      {/* Botón flotante */}
      <a
        href="https://wa.me/521234567890" // cambia al número real
        target="_blank"
        rel="noopener noreferrer"
        className="
        fixed bottom-6 right-6
        bg-green-500 hover:bg-green-600
        p-4 rounded-full shadow-lg
        transition-transform hover:scale-110
        z-40
      "
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </section>
  );
};
