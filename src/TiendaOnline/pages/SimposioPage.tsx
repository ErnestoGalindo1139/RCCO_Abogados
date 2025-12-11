import React, { useState } from 'react';
import { VerArchivo } from '../components/VerArchivo';
import { Download, ClipboardList, Building } from 'lucide-react';
import { LogoCarousel } from '../components/LogoCarousel';
import { Banner } from '../components/Banner';
import { EventoEnero } from '../components/EventoEnero';

export const SimposioPage = (): React.JSX.Element => {
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<any>(null);

  // Brochure con preview
  const brochure = {
    nombre: 'Brochure Oficial del Simposio',
    tipo: 'pdf',
    url: '/BROCHURE_SIMPOSIO.pdf',
    preview: '/img/brochure.png',
    descripcion: 'Documento oficial con toda la información del evento.',
    boton: 'Ver documento',
  };

  // Otras cards
  const archivos = [
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
          'img/patrocinadores/ANMX.png',
          'img/patrocinadores/DIAZ SALAZAR Y ASOCIADOS.png',
          'img/patrocinadores/LF DESPACHO.png',
          'img/patrocinadores/P&C.png',
          'img/patrocinadores/RCCO NEGOCIOS.png',
          'img/patrocinadores/SOMOFA.png',
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

      {/* CARD ESPECIAL — BROCHURE */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div
          onClick={() => setArchivoSeleccionado(brochure)}
          className="
            bg-[#0D2044] rounded-2xl border border-white/10 shadow-xl
            transition-all cursor-pointer flex flex-col
            hover:-translate-y-1 hover:shadow-blue-600/40
            hover:border-[#0a387c] overflow-hidden
          "
        >
          <img
            src={brochure.preview}
            alt="Preview Brochure"
            className="w-full h-[200px] md:h-[450px] object-cover"
          />

          <div className="px-7 py-6">
            <h2 className="text-xl font-extrabold">{brochure.nombre}</h2>
            <p className="text-sm text-blue-200 mt-2">{brochure.descripcion}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setArchivoSeleccionado(brochure);
              }}
              className="
                mt-6 w-full py-3 rounded-xl
                bg-[#0a387c] hover:bg-[#114b9c]
                text-white text-base font-extrabold tracking-wide
                shadow-lg hover:shadow-blue-600/40
                transition-all active:scale-95
              "
            >
              {brochure.boton}
            </button>
          </div>
        </div>
      </div>

      {/* GRID — OTRAS 2 CARDS */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-10">
        {archivos.map((a, i) => {
          const Icon = a.icon;

          return (
            <div
              key={i}
              onClick={() => setArchivoSeleccionado(a)}
              className="
                bg-[#0D2044] rounded-2xl px-7 py-8 border border-white/10 shadow-xl
                transition-all cursor-pointer flex flex-col justify-between
                hover:-translate-y-1 hover:shadow-blue-600/40
                hover:border-[#0a387c] space-y-6
              "
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#143065] shadow-md">
                  {/* ICONOS SE QUEDAN DORADOS */}
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

                  setArchivoSeleccionado(a);
                }}
                className="
                  mt-6 w-full py-3 rounded-xl
                  bg-[#0a387c] hover:bg-[#114b9c]
                  text-white text-base font-extrabold tracking-wide
                  shadow-lg hover:shadow-blue-600/40
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
        <VerArchivo
          modo="modal"
          url={archivoSeleccionado.url}
          nombre={archivoSeleccionado.nombre}
          tipo={archivoSeleccionado.tipo}
          isOpen={true}
          onClose={() => setArchivoSeleccionado(null)}
        />
      )}
    </div>
  );
};
