import React, { useState } from 'react';
import { VerArchivo } from '../components/VerArchivo';
import { FileText, FileImage, FileDown, Download } from 'lucide-react';

export const SimposioPage = () => {
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<any>(null);

  const archivos = [
    {
      nombre: 'Brochure Oficial del Simposio',
      tipo: 'pdf',
      url: '/BROCHURE_SIMPOSIO.pdf',
      descripcion: 'Documento oficial con toda la información del evento.',
      icon: FileText,
    },
    {
      nombre: 'Proceso de Registro',
      tipo: 'image',
      url: '/PROCESO_DE_REGISTRO.jpeg.jpg',
      descripcion: 'Guía visual para completar tu registro.',
      icon: FileImage,
    },
    {
      nombre: 'Precio del Pase',
      tipo: 'pdf',
      url: '/PRECIO_PASE.pdf',
      descripcion: 'Costo oficial y beneficios del pase del evento.',
      icon: FileDown,
    },
  ];

  return (
    <div className="w-full min-h-screen mt-[3rem] bg-[#07152E] text-white">
      
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
                  <h3 className="text-lg font-bold leading-tight">{a.nombre}</h3>
                  <p className="text-sm text-blue-200 mt-2">{a.descripcion}</p>
                </div>
              </div>

              <button
                className="
                  mt-8 w-full py-2.5 rounded-lg bg-[#D4AF37]
                  text-[#0A1A3B] text-base font-extrabold tracking-wide
                  hover:brightness-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.55)]
                  transition-all active:scale-95
                "
              >
                Ver documento
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {archivoSeleccionado && (
        <div className="relative">

          {/* BOTÓN DE DESCARGA SOLO PARA IMÁGENES — A NIVEL SIMPOSIOPAGE */}
          {archivoSeleccionado.tipo === "image" && (
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
