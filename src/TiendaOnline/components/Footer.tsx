import {
  Brain,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white pt-20 pb-12 px-6 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Columna logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="mr-4 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <Brain className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                RCCO Abogados
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Especialistas en salud mental integral, ofreciendo terapias
              personalizadas basadas en evidencia científica para tu bienestar
              emocional.
            </p>

            {/* Newsletter */}
            {/* <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Suscríbete a nuestro newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-grow px-4 py-3 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
                />
                <button className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-r-lg hover:shadow-lg transition-all">
                  <Send />
                </button>
              </div>
            </div> */}

            {/* Redes sociales */}
            <div className="flex space-x-4">
              {[
                {
                  icon: <Facebook className="w-5 h-5" />,
                  color: 'bg-blue-600',
                },
                {
                  icon: <Twitter className="w-5 h-5" />,
                  color: 'bg-blue-400',
                },
                {
                  icon: <Instagram className="w-5 h-5" />,
                  color: 'bg-gradient-to-r from-purple-600 to-pink-600',
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  color: 'bg-blue-700',
                },
                {
                  icon: <Youtube className="w-5 h-5" />,
                  color: 'bg-red-600',
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${social.color} text-white hover:shadow-lg transition-all`}
                  aria-label={`Red social ${index}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de enlaces */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative pb-2">
              <span className="relative z-10">Sectores / Giros</span>
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
            </h4>
            <ul className="space-y-3">
              {[
                'Terapia Individual',
                'Terapia de Pareja',
                'Terapia Infantil',
                'Evaluaciones',
                'Talleres',
                'Consultoría',
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-start"
                  >
                    <span className="text-indigo-400 mr-2">•</span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative pb-2">
              <span className="relative z-10">Clínica</span>
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
            </h4>
            <ul className="space-y-3">
              {[
                'Nuestro equipo',
                'Métodos terapéuticos',
                'Instalaciones',
                'Testimonios',
                'Blog',
                'Preguntas frecuentes',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-start"
                  >
                    <span className="text-indigo-400 mr-2">•</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 relative pb-2">
              <span className="relative z-10">Contacto</span>
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-indigo-400">
                  <MapPin />
                </div>
                <div>
                  <p className="text-gray-400">Av. Psicología 123</p>
                  <p className="text-gray-400">Col. Bienestar, CDMX</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-indigo-400">
                  <Phone />
                </div>
                <div>
                  <p className="text-gray-400">55 1234 5678</p>
                  <p className="text-gray-400">Lunes a Viernes: 9am - 7pm</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-indigo-400">
                  <Mail />
                </div>
                <div>
                  <p className="text-gray-400">contacto@mentesana.com</p>
                  <p className="text-gray-400">emergencias@mentesana.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider y copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} RCCO Abogados. Todos los derechos
              reservados.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Política de privacidad
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Términos de servicio
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Aviso legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
