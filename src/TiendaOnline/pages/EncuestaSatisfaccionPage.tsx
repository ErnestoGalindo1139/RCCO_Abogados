import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EncuestaPopUp } from '../components/EncuestaPopUp';

type TipoPregunta = 1 | 2 | 3 | 4;

interface Opcion {
  id_OpcionRespuesta: number;
  nb_OpcionRespuesta: string;
}

interface Pregunta {
  id_Pregunta: number;
  nb_Pregunta: string;
  id_TipoPregunta: TipoPregunta;
  opciones?: Opcion[];
}

const labelsPuntuacion = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];

export const EncuestaSatisfaccionPage: React.FC = () => {
  const navigate = useNavigate();

  // ===============================
  // ESTADOS
  // ===============================
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  // ===============================
  // 🔐 VALIDAR SESIÓN POR FOLIO
  // ===============================
  useEffect(() => {
    const folio = localStorage.getItem('rcco_folio_logged');
    if (!folio) navigate('/login-folio');
  }, [navigate]);

  // ===============================
  // 📥 FETCH PREGUNTAS
  // ===============================
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await fetch('http://localhost:4005/preguntasEncuesta');

        const data = await res.json();

        if (!data.success || !Array.isArray(data.body)) {
          throw new Error('Respuesta inválida del endpoint de preguntas');
        }

        setPreguntas(data.body);
      } catch (err: any) {
        setError(err.message || 'Error al cargar encuesta');
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  // ===============================
  // 🧠 MANEJO DE RESPUESTAS
  // ===============================
  const responder = (id_Pregunta: number, valor: any) => {
    setRespuestas((prev) => ({
      ...prev,
      [id_Pregunta]: valor,
    }));
  };

  // ===============================
  // 🚀 ENVIAR ENCUESTA
  // ===============================
  const enviarEncuesta = async () => {
    const folio = localStorage.getItem('rcco_folio_logged');
    if (!folio) return;

    try {
      setEnviando(true);

      const res = await fetch(
        // 'https://api-rcco-abogados.grstechs.com/createEncuestaRespuesta',
        'http://localhost:4005/createEncuestaRespuesta',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            folio,
            respuestas,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error('No se pudo guardar la encuesta');
      }

      // localStorage.removeItem('rcco_folio_logged');
      navigate('/gracias');
    } catch (err: any) {
      alert(err.message || 'Error al enviar encuesta');
    } finally {
      setEnviando(false);
    }
  };

  // ===============================
  // LOADING / ERROR
  // ===============================
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100 text-xl font-semibold">
        Cargando encuesta...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 font-semibold">
        {error}
      </main>
    );
  }

  // ===============================
  // UI
  // ===============================
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-extrabold text-[#113873] mb-12 text-center">
          Encuesta de Satisfacción
        </h1>

        <div className="space-y-16">
          {preguntas.map((p) => (
            <div key={p.id_Pregunta} className="space-y-4">
              <p className="text-lg font-semibold text-slate-800">
                {p.nb_Pregunta}
              </p>

              {/* 📝 TEXTO LIBRE */}
              {p.id_TipoPregunta === 1 && (
                <textarea
                  className="w-full rounded-2xl border border-slate-300 p-4
                             focus:ring-2 focus:ring-[#113873] focus:outline-none
                             transition"
                  rows={3}
                  placeholder="Escribe tu respuesta aquí…"
                  value={respuestas[p.id_Pregunta] || ''}
                  onChange={(e) => responder(p.id_Pregunta, e.target.value)}
                />
              )}

              {/* ⭐ PUNTUACIÓN 1–5 */}
              {p.id_TipoPregunta === 2 && (
                <div>
                  <div className="flex gap-4 justify-center">
                    {[1, 2, 3, 4, 5].map((n) => {
                      const active = respuestas[p.id_Pregunta] === n;
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => responder(p.id_Pregunta, n)}
                          className={`w-14 h-14 rounded-full font-bold text-lg
                            transition-all duration-200
                            ${
                              active
                                ? 'bg-[#113873] text-white scale-110 shadow-lg'
                                : 'bg-white border border-slate-300 text-slate-700 hover:scale-105'
                            }`}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>

                  {respuestas[p.id_Pregunta] && (
                    <p className="mt-3 text-center text-sm font-medium text-slate-600">
                      {labelsPuntuacion[respuestas[p.id_Pregunta] - 1]}
                    </p>
                  )}
                </div>
              )}

              {/* ☑️ OPCIONES (MULTI SOLO PREGUNTA 14) */}
              {p.id_TipoPregunta === 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {p.opciones?.map((op) => {
                    const esMultiple = p.id_Pregunta === 14;
                    const valorActual = respuestas[p.id_Pregunta];

                    const selected = esMultiple
                      ? (valorActual || []).includes(op.id_OpcionRespuesta)
                      : valorActual === op.id_OpcionRespuesta;

                    const toggleOpcion = () => {
                      // MULTIPLE (solo pregunta 14)
                      if (esMultiple) {
                        if (selected) {
                          responder(
                            p.id_Pregunta,
                            valorActual.filter(
                              (v: number) => v !== op.id_OpcionRespuesta
                            )
                          );
                        } else {
                          responder(p.id_Pregunta, [
                            ...(valorActual || []),
                            op.id_OpcionRespuesta,
                          ]);
                        }
                      }
                      // SIMPLE (todas las demás)
                      else {
                        responder(
                          p.id_Pregunta,
                          selected ? null : op.id_OpcionRespuesta
                        );
                      }
                    };

                    return (
                      <button
                        key={op.id_OpcionRespuesta}
                        type="button"
                        onClick={toggleOpcion}
                        className={`p-4 rounded-xl border text-left transition
                          ${
                            selected
                              ? 'border-[#113873] bg-blue-50 shadow-sm'
                              : 'border-slate-300 hover:bg-slate-50'
                          }`}
                      >
                        <span className="font-medium">
                          {op.nb_OpcionRespuesta}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ✔️ VERDADERO / FALSO */}
              {p.id_TipoPregunta === 3 && (
                <div className="flex gap-6">
                  {[
                    { label: 'Sí', value: true },
                    { label: 'No', value: false },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => responder(p.id_Pregunta, opt.value)}
                      className={`px-6 py-2 rounded-full font-semibold border transition
                        ${
                          respuestas[p.id_Pregunta] === opt.value
                            ? 'bg-[#113873] text-white border-[#113873]'
                            : 'bg-white border-slate-300 hover:bg-slate-100'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          disabled={enviando}
          onClick={enviarEncuesta}
          className="mt-20 w-full py-4 rounded-2xl font-bold text-lg
                     bg-gradient-to-r from-[#113873] to-[#0D47A1]
                     text-white hover:opacity-90 transition
                     disabled:opacity-50"
        >
          {enviando ? 'Enviando encuesta…' : 'Enviar encuesta y salir'}
        </button>
      </div>
    </main>
  );
};
