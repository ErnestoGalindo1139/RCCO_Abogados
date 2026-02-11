import React from 'react';
import { useNavigate } from 'react-router-dom';

export const GraciasEncuestaPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen flex items-center justify-center 
                     bg-gradient-to-br from-slate-50 to-slate-100 px-6"
    >
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center animate-fade-in">
        {/* ICONO */}
        <div
          className="mx-auto mb-6 w-20 h-20 rounded-full 
                        bg-gradient-to-br from-[#113873] to-[#0D47A1]
                        flex items-center justify-center shadow-lg"
        >
          <span className="text-4xl text-white">☕</span>
        </div>

        {/* TITULO */}
        <h1 className="text-3xl font-extrabold text-[#113873] mb-4">
          ¡Gracias por responder nuestra encuesta!
        </h1>

        {/* TEXTO */}
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
          Agradecemos mucho tu tiempo y tus comentarios. Tu opinión nos ayuda a
          mejorar continuamente.
        </p>

        {/* INFO EXTRA (opcional, puedes quitarlo si no quieres café aquí) */}
        <div className="mb-10 p-4 rounded-2xl bg-blue-50 border border-blue-100">
          <p className="font-semibold text-[#113873]">
            🎁 No olvides tu beneficio
          </p>
          <p className="text-sm text-slate-600 mt-1">
            Presenta tu código en <strong>LE FROLLE</strong> y disfruta tu café
            gratis.
          </p>
        </div>

        {/* BOTON */}
        <button
          onClick={() => navigate('/materiales')}
          className="w-full py-4 rounded-2xl font-bold text-lg
                     bg-gradient-to-r from-[#113873] to-[#0D47A1]
                     text-white hover:opacity-90 transition
                     shadow-lg"
        >
          Finalizar y ver materiales
        </button>
      </div>

      {/* ANIMACIÓN */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
};
