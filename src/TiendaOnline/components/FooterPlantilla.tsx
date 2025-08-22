import { FaWhatsapp } from 'react-icons/fa';
import { LuClock2, LuFacebook, LuInstagram, LuMail } from 'react-icons/lu';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="container mx-auto text-center">
        {/* Sección superior: Llamada a la acción */}
        <div className="mb-4">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">¿Estás buscando a alguien que te ayude?</h3>
          <p className="text-blue-300 font-bold text-xl md:text-2xl">¡Permítenos asesorarte!</p>
        </div>

        {/* Sección central: Información de contacto */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 mb-4">
          <div className="flex items-center space-x-2">
            <LuMail />
            <a href="mailto:contacto@rccoabogados.com.mx" className="text-base md:text-lg hover:text-blue-300">contacto@rccoabogados.com.mx</a>
          </div>
          <div className="flex items-center space-x-2">
            <LuClock2 />
            <p className="text-base md:text-lg">Lunes a Viernes, de 9:00 a 17:00 hrs.</p>
          </div>
          <div className="text-blue-300 font-bold text-xl md:text-2xl">Escríbenos: (+52) 669-2291-634</div>
        </div>

        {/* Sección inferior: Redes sociales */}
        <div className="flex justify-center space-x-4 text-4xl mt-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            {/* <FontAwesomeIcon icon={faFacebookF} /> */}
            <LuFacebook />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            {/* <FontAwesomeIcon icon={faWhatsapp} /> */}
            <FaWhatsapp />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            {/* <FontAwesomeIcon icon={faInstagram} /> */}
            <LuInstagram />
          </a>
        </div>

        {/* Línea divisoria sutil */}
        <hr className="border-t border-blue-700 my-4" />

        {/* Derechos de autor (opcional) */}
        <p className="text-md text-blue-400">© {new Date().getFullYear()} RCCO Abogados. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};