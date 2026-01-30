import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Material {
  titulo: string;
  archivo: string;
  icono: string;
}

export const MaterialesPage: React.FC = () => {
  const navigate = useNavigate();

  // ===============================
  // 🔐 VALIDAR SESIÓN POR FOLIO
  // ===============================
  useEffect(() => {
    const folio = localStorage.getItem('rcco_folio_logged');
    if (!folio) {
      navigate('/login-folio');
    }
  }, [navigate]);

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    localStorage.removeItem('rcco_folio_logged');
    navigate('/login-folio');
  };

  // ===============================
  // 📚 MATERIALES
  // ===============================
  const materiales: Material[] = [
    {
      titulo: 'Programa Oficial del Simposio',
      archivo: '/docs/Programa-Oficial.pdf',
      icono: '📄',
    },
    {
      titulo: 'Guía de Cumplimiento PLD 2025',
      archivo: '/docs/Guia-PLD-2025.pdf',
      icono: '📘',
    },
    {
      titulo: 'Análisis de la Reforma a la LFPIORPI',
      archivo: '/docs/Reforma-LFPIORPI.pdf',
      icono: '⚖️',
    },
  ];

  // ===============================
  // 📦 DISPONIBILIDAD REAL
  // ===============================
  const [disponibles, setDisponibles] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarArchivos = async () => {
      const results: Record<string, boolean> = {};

      for (const mat of materiales) {
        try {
          const res = await fetch(mat.archivo, { method: 'HEAD' });
          const contentType = res.headers.get('content-type');

          // ✅ FORZAR A BOOLEAN
          results[mat.archivo] =
            res.ok && !!contentType && contentType.includes('application/pdf');
        } catch {
          results[mat.archivo] = false;
        }
      }

      setDisponibles(results);
      setLoading(false);
    };

    verificarArchivos();
  }, []);

  // ===============================
  // UI
  // ===============================
  return (
    <main className="min-h-screen bg-slate-50 pb-20 mt-[3rem]">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#113873] via-[#164b98] to-[#0D47A1] py-12 px-6 text-white">
        <h1 className="text-3xl font-bold">Materiales del Simposio</h1>
        <p className="text-white/80 mt-1">
          Acceso exclusivo para asistentes registrados
        </p>
      </header>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10 -mt-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 ring-1 ring-black/5">
          <h2 className="text-2xl font-bold text-[#113873] mb-6">
            Descargas disponibles
          </h2>

          {loading && (
            <p className="text-slate-500 text-sm mb-4">
              Verificando materiales disponibles...
            </p>
          )}

          {/* LISTA */}
          <div className="space-y-4">
            {materiales.map((mat, idx) => {
              const existe = disponibles[mat.archivo] ?? false;

              return existe ? (
                // ✅ DISPONIBLE
                <a
                  key={idx}
                  href={mat.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition"
                >
                  <span className="text-lg">{mat.icono}</span>{' '}
                  <strong>{mat.titulo}</strong>
                  <span className="ml-3 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                    Disponible
                  </span>
                </a>
              ) : (
                // ❌ NO DISPONIBLE
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 flex justify-between items-center"
                >
                  <span>
                    {mat.icono} <strong>{mat.titulo}</strong>
                  </span>

                  <span className="text-xs bg-slate-300 text-slate-700 px-3 py-1 rounded-full">
                    Próximamente
                  </span>
                </div>
              );
            })}
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="mt-10 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
};
