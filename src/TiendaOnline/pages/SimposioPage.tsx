import React, { useEffect, useState } from 'react';
import { VerArchivo } from '../components/VerArchivo';
import { Download, NotebookText, ClipboardList, Building } from 'lucide-react';
import { LogoCarousel } from '../components/LogoCarousel';
import { Banner } from '../components/Banner';
import { EventoEnero } from '../components/EventoEnero';
import { useLocation } from 'react-router-dom';

export const SimposioPage = (): React.JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    // Tomar la sección desde la URL: /#/?section=evento-enero
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    if (section) {
      // Esperar un momento a que cargue el DOM
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }
  }, [location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<any>(null);

  const archivos = [
    {
      nombre: 'Brochure Oficial del Simposio',
      tipo: 'pdf',
      url: '/BROCHURE_SIMPOSIO.pdf',
      descripcion: 'Documento oficial con toda la información del evento.',
      icon: NotebookText,
      boton: 'Ver documento',
      whatsapp: false,
    },
    {
      nombre: 'Proceso de Registro',
      tipo: 'image',
      url: '/PROCESO_DE_REGISTRO.jpeg.jpg',
      descripcion: 'Guía visual para completar tu registro.',
      icon: ClipboardList,
      boton: 'Ver proceso',
      whatsapp: false,
    },
    {
      nombre: 'Soy una organización',
      tipo: 'pdf',
      url: '/PRECIO_PASE.pdf',
      descripcion:
        'Información especial para organizaciones, instituciones o grupos.',
      icon: Building,
      boton: 'Solicitar información',
      whatsapp: true,
    },
  ];

  return (
    <div className="w-full min-h-screen mt-[3rem] bg-[#07152E] text-white">
      <LogoCarousel
        title="logos.tituloPatrocinadores"
        logos={[
          'img/patrocinadores/ANMX.png',
          'img/patrocinadores/DIAZ SALAZAR Y ASOCIADOS.png',
          'img/patrocinadores/LF DESPACHO.png',
          'img/patrocinadores/P&C.png',
          'img/patrocinadores/RCCO NEGOCIOS.png',
          'img/patrocinadores/SOMOFA.png',
          // Segunda vuelta
          'img/patrocinadores/ANMX.png',
          'img/patrocinadores/DIAZ SALAZAR Y ASOCIADOS.png',
          'img/patrocinadores/LF DESPACHO.png',
          'img/patrocinadores/P&C.png',
          'img/patrocinadores/RCCO NEGOCIOS.png',
          'img/patrocinadores/SOMOFA.png',
          'img/patrocinadores/grupoAHRE.png',
          // '',
        ]}
      />
      <Banner quitarboton />
      {/* HERO */}
      <section className="w-full py-24 text-center bg-gradient-to-b from-[#0A1A3B] to-[#07152E]">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Documentos Oficiales del Simposio
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-blue-200">
          Consulta y descarga los documentos oficiales del 1er Simposio Anual
          Corporativo sobre Prevención de Lavado de Dinero en Sinaloa.
        </p>
      </section>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-10 -mt-4">
        {archivos.map((a, i) => {
          const Icon = a.icon;

          return (
            <div
              key={i}
              onClick={() => setArchivoSeleccionado(a)}
              className="
                bg-[#0D2044] rounded-2xl px-7 py-8 border border-white/10 shadow-xl
                transition-all cursor-pointer flex flex-col justify-between
                hover:-translate-y-1 hover:shadow-[0_0_22px_rgba(212,175,55,0.32)]
                hover:border-[#D4AF37]/50 min-h-[260px]
              "
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#143065] shadow-md">
                  <Icon className="text-[#D4AF37] w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-tight">
                    {a.nombre}
                  </h3>
                  <p className="text-sm text-blue-200 mt-2">{a.descripcion}</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (a.whatsapp) {
                    const mensaje = encodeURIComponent(
                      'Hola, estoy interesado en obtener información para registrar a mi organización en el 1er Simposio Anual Corporativo sobre Prevención de Lavado de Dinero.'
                    );
                    window.open(
                      `https://wa.me/6692291634?text=${mensaje}`,
                      '_blank'
                    );
                    return;
                  }

                  // Para las demás cards, abrir modal
                  setArchivoSeleccionado(a);
                }}
                className="
                  mt-8 w-full py-2.5 rounded-lg bg-[#D4AF37]
                  text-[#0A1A3B] text-base font-extrabold tracking-wide
                  hover:brightness-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.55)]
                  transition-all active:scale-95
                "
              >
                {a.boton}
              </button>
            </div>
          );
        })}
      </div>

      <EventoEnero />

      {/* MODAL */}
      {archivoSeleccionado && (
        <div className="relative">
          {/* BOTÓN DE DESCARGA SOLO PARA IMÁGENES — A NIVEL SIMPOSIOPAGE */}
          {archivoSeleccionado.tipo === 'image' && (
            <div className="absolute right-10 top-10 z-[9999]">
              <a
                href={archivoSeleccionado.url}
                download={archivoSeleccionado.nombre}
                className="
                  flex items-center gap-2 
                  px-4 py-2 rounded-lg 
                  border border-[#D4AF37]
                  text-[#D4AF37] font-semibold text-sm
                  hover:bg-[#D4AF37]/20
                  transition-all duration-200
                  shadow-[0_0_12px_rgba(212,175,55,0.35)]
                  active:scale-95
                "
              >
                <Download size={16} />
                Descargar imagen
              </a>
            </div>
          )}

          <VerArchivo
            modo="modal"
            url={archivoSeleccionado.url}
            nombre={archivoSeleccionado.nombre}
            tipo={archivoSeleccionado.tipo}
            isOpen={true}
            onClose={() => setArchivoSeleccionado(null)}
          />
        </div>
      )}
    </div>
  );
};
