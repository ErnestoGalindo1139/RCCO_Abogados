import { FaWhatsapp } from 'react-icons/fa';

export const Banner = () => {
  return (
    <section id="inicio" className="relative">
      <div className="w-full h-[100vh] bg-blue-500 flex items-center justify-center">
        <img
          src="/img/BannerDemo.jpg"
          alt="Banner Image"
          className="object-cover w-full h-full"
        />
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
        z-50
      "
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </section>
  );
};
