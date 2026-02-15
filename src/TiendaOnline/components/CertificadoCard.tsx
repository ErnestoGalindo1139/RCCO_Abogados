import React from 'react';
import { Download } from 'lucide-react';

interface Props {
  nombre: string;
  idUsuario: number;
  certificadoUrl: string; // ← usamos la original para mostrar
}

export const CertificadoCard: React.FC<Props> = ({
  nombre,
  idUsuario,
  certificadoUrl,
}) => {
  const descargar = () => {
    const usuario = JSON.parse(
      localStorage.getItem('rcco_folio_usuario') || '{}'
    );

    if (!usuario?.id_UsuarioEvento) return;

    // window.location.href = `https://api-rcco-abogados.grstechs.com/descargar-certificado/${usuario.id_UsuarioEvento}`;
    window.location.href = `http://localhost:4005/descargar-certificado/${usuario.id_UsuarioEvento}`;
  };

  return (
    <div className="mb-12 p-8 bg-gradient-to-br from-[#0f2f5e] via-[#113873] to-[#164b98] rounded-3xl shadow-2xl text-white relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <h2 className="text-2xl font-bold mb-2 tracking-wide">
        🏅 Reconocimiento Oficial
      </h2>

      <p className="text-white/80 mb-6 text-sm">
        Emitido por RCCO Abogados en el marco del Simposio PLD 2026
      </p>

      <div className="bg-white rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
        <img
          src={certificadoUrl} // ← URL original directa
          alt={`Reconocimiento de ${nombre}`}
          className="w-full object-contain"
        />
      </div>

      <button
        onClick={descargar}
        className="mt-6 w-full flex items-center justify-center gap-3
                   py-4 rounded-xl font-semibold text-lg
                   bg-white text-[#113873]
                   hover:bg-gray-100 active:scale-[0.98]
                   transition-all duration-200
                   shadow-md hover:shadow-lg"
      >
        <Download size={20} />
        Descargar reconocimiento
      </button>
    </div>
  );
};
