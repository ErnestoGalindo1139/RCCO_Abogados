import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EncuestaPopUp } from '../components/EncuestaPopUp';
import { CertificadoCard } from '../components/CertificadoCard';

interface Documento {
  nombre: string;
  archivo: string;
}

interface SeccionDocumentos {
  titulo: string;
  ponentes: string[];
  documentos: Documento[];
}

export const MaterialesPage: React.FC = () => {
  const navigate = useNavigate();

  // ===============================
  // VALIDAR SESIÓN
  // ===============================
  useEffect(() => {
    const folio = localStorage.getItem('rcco_folio_logged');
    if (!folio) navigate('/login-folio');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('rcco_folio_logged');
    navigate('/login-folio');
  };

  const irAEncuesta = () => {
    navigate('/encuesta-satisfaccion');
  };

  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('rcco_folio_usuario');
    if (data) setUsuario(JSON.parse(data));
  }, []);

  // ===============================
  // DOCUMENTO PRINCIPAL DEL EVENTO
  // ===============================
  const documentoPrincipal: Documento = {
    nombre: 'ANÁLISIS AL SISTEMA PLD',
    archivo: '/ANÁLISIS AL SISTEMA PLD.pdf',
  };

  // ===============================
  // SECCIONES POR PONENTE
  // ===============================
  const secciones: SeccionDocumentos[] = [
    {
      titulo: 'Ponencia 1',
      ponentes: ['Lic. Lizbeth M. Lascarez Calderón'],
      documentos: [
        {
          nombre: 'México ante el lavado de dinero-eficacia de la Ley.',
          archivo:
            '/img/materialesPonencias/México ante el lavado de dinero-eficacia de la Ley. (Liz Lacarez).pdf',
        },
      ],
    },
    {
      titulo: 'Ponencia 2',
      ponentes: ['Mtro. Miguel Ángel Mojica', 'Lic. Alfredo Eduardo Soto Vela'],
      documentos: [
        {
          nombre:
            'PANORAMA ESTRATÉGICO DE LA REFORMA EN PLD 2025 VER.22-01-26',
          archivo:
            '/img/materialesPonencias/PANORAMA ESTRATÉGICO DE LA REFORMA EN PLD 2025 VER.22-01-26 (Ultima).pdf',
        },
      ],
    },
    {
      titulo: 'Ponencia 3',
      ponentes: [
        'C.P.C. Alejandra Vallejo Parcero',
        'Lic. Alejandro Ponce Rivera y Chávez',
      ],
      documentos: [
        {
          nombre: 'Simposium - Visitas LFPIORPI',
          archivo: '/img/materialesPonencias/Simposium - Visitas LFPIORPI.pdf',
        },
      ],
    },
    {
      titulo: 'Ponencia 4',
      ponentes: [
        'Lic. GPC Guadalupe Félix Sarabia',
        'Lic. Joel Gibrán Osuna Laveaga',
      ],
      documentos: [
        {
          nombre: 'BENEFICIARIO CONTROLADOR FISCAL_PLD 2.0',
          archivo:
            '/img/materialesPonencias/BENEFICIARIO CONTROLADOR FISCAL_PLD 2.0 (1).pdf',
        },
      ],
    },
    {
      titulo: 'Ponencia 5',
      ponentes: ['José Antonio Manzanero Escutia'],
      documentos: [
        {
          nombre: 'LEY ANTILAVADO',
          archivo: '/img/materialesPonencias/LEY ANTILAVADO.pptx.pdf',
        },
        {
          nombre: 'BENEFICIARIO CONTROLADOR 2025',
          archivo:
            '/img/materialesPonencias/BENEFICIARIO CONTROLADOR 2025.pptx.pdf',
        },
        {
          nombre: 'FECHAS MEMORABLES',
          archivo: '/img/materialesPonencias/FECHAS MEMORABLES.pdf',
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20 mt-[3rem]">
      <EncuestaPopUp />

      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#113873] via-[#164b98] to-[#0D47A1] py-12 px-6 text-white">
        <h1 className="text-3xl font-bold">Materiales del Simposio</h1>
        <p className="text-white/80 mt-1">
          Acceso exclusivo para asistentes registrados
        </p>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 -mt-6 space-y-10">

        {/* CERTIFICADO */}
        {usuario?.sn_Pagado && usuario?.ar_Certificado && (
          <CertificadoCard
            nombre={usuario.nb_Nombre}
            idUsuario={usuario.id_UsuarioEvento}
            certificadoUrl={usuario.ar_Certificado}
          />
        )}

        {/* DOCUMENTO PRINCIPAL */}
        <div className="bg-white p-8 rounded-2xl shadow-xl ring-2 ring-[#113873]">
          <h2 className="text-2xl font-bold text-[#113873] mb-4">
            📘 Entregables en Materia de PLD
          </h2>

          <a
            href={documentoPrincipal.archivo}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-xl border-2 border-[#113873]
                       hover:bg-blue-50 hover:shadow-lg transition"
          >
            📄 <strong>{documentoPrincipal.nombre}</strong>
          </a>
        </div>

        {/* BLOQUE ENCUESTA */}
        <div className="bg-gradient-to-r from-[#113873] to-[#164b98] text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2">
            📝 Encuesta de Satisfacción
          </h2>
          <p className="text-white/80 mb-6">
            Tu opinión es fundamental para mejorar futuras ediciones del
            simposio.
          </p>

          <button
            onClick={irAEncuesta}
            className="bg-white text-[#113873] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
          >
            Responder encuesta
          </button>
        </div>

        {/* SECCIONES POR PONENTE */}
        {secciones.map((sec, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-black/5"
          >
            <h2 className="text-2xl font-bold text-[#113873] mb-3">
              {sec.titulo}
            </h2>

            <div className="text-sm text-slate-600 mb-6 space-y-1">
              {sec.ponentes.map((p, i) => (
                <div key={i}>• {p}</div>
              ))}
            </div>

            <div className="space-y-3">
              {sec.documentos.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-blue-200 
                             hover:border-blue-600 hover:bg-blue-50 transition"
                >
                  📄 <strong>{doc.nombre}</strong>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 
                     text-white rounded-xl font-semibold"
        >
          Cerrar sesión
        </button>
      </section>
    </main>
  );
};
