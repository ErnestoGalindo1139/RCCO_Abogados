import React from "react";
import { useNavigate } from "react-router-dom";

export const MaterialesPage: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("rcco_user_logged");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-gradient-to-r from-[#113873] via-[#164b98] to-[#0D47A1] py-12 px-6 text-white">
        <h1 className="text-3xl font-bold">Materiales del Simposio</h1>
        <p className="text-white/80 mt-1">
          Acceso exclusivo para asistentes con usuario autorizado.
        </p>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-10 -mt-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 ring-1 ring-black/5">
          <h2 className="text-2xl font-bold text-[#113873] mb-6">
            Descargas Disponibles
          </h2>

          <div className="space-y-4">

            <a
              href="/docs/Programa-Oficial.pdf"
              target="_blank"
              className="block p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition"
            >
              📄 <strong>Programa Oficial del Simposio (PDF)</strong>
            </a>

            <a
              href="/docs/Guia-PLD-2025.pdf"
              target="_blank"
              className="block p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition"
            >
              📘 <strong>Guía de Cumplimiento PLD 2025</strong>
            </a>

            <a
              href="/docs/Reforma-LFPIORPI.pdf"
              target="_blank"
              className="block p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition"
            >
              ⚖️ <strong>Análisis de la Reforma a la LFPIORPI</strong>
            </a>
          </div>

          <button
            className="mt-10 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
};
