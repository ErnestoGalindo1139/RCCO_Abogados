import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

/* ===========================================================
   🎨 Colores corporativos
=========================================================== */
const COLORS = [
  '#113873',
  '#1D4ED8',
  '#2563EB',
  '#3B82F6',
  '#60A5FA',
  '#93C5FD',
  '#0F172A',
];

/* ===========================================================
   📦 Tipos
=========================================================== */
interface ApiResponse {
  success: boolean;
  message: string;
  body: BodyResultados;
}

interface BodyResultados {
  kpis: {
    totalUsuarios: number;
    totalRespuestas: number;
    promedioGeneral: number;
  };
  promedios: PromedioPregunta[];
  opciones: Opcion[];
  comentarios: Comentario[];
}

interface PromedioPregunta {
  id_Pregunta: number;
  nb_Pregunta: string;
  promedioPregunta: number;
  totalRespuestas: number;
}

interface Opcion {
  id_Pregunta: number;
  nb_Pregunta: string;
  id_OpcionRespuesta: number;
  nb_OpcionRespuesta: string;
  totalSeleccionado: number;
}

interface Comentario {
  folio?: string;
  nombre?: string;
  id_Pregunta: number;
  nb_Pregunta: string;
  nb_Respuesta: string;
}

/* ===========================================================
   🧠 Tooltip Personalizado
=========================================================== */
const CustomTooltip = ({ active, payload, total }: any) => {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;
  const value = Number(item?.value ?? 0);
  const name = item?.name ?? '';
  const totalNumber = Number(total);

  const pct =
    totalNumber > 0 ? ((value / totalNumber) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border text-sm">
      <p className="font-semibold text-[#113873] mb-1">{name}</p>
      <p>
        Respuestas: <strong>{value}</strong>
      </p>
      <p>
        Porcentaje: <strong>{pct}%</strong>
      </p>
    </div>
  );
};

/* ===========================================================
   🚀 COMPONENTE PRINCIPAL
=========================================================== */
export const ResultadosEncuestaPage: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<BodyResultados | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4005/resultados-encuesta');
        const json: ApiResponse = await res.json();
        setData(json.body);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= COMENTARIOS ================= */
  const comentarios = data?.comentarios ?? [];

  const totalPages = Math.ceil(comentarios.length / rowsPerPage);

  const paginatedComentarios = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return comentarios.slice(start, start + rowsPerPage);
  }, [comentarios, currentPage, rowsPerPage]);

  /* ================= LOADING ================= */
  if (loading || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-xl">
        Cargando resultados...
      </main>
    );
  }

  const { kpis, promedios, opciones } = data;

  /* =======================================================
     🔥 Agrupar opciones por pregunta
  ======================================================= */
  const opcionesAgrupadas = Object.values(
    opciones.reduce((acc: any, op) => {
      if (!acc[op.id_Pregunta]) {
        acc[op.id_Pregunta] = {
          pregunta: op.nb_Pregunta,
          opciones: [],
        };
      }
      acc[op.id_Pregunta].opciones.push(op);
      return acc;
    }, {})
  );

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-14">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-[#113873]">
              Resultados de la Encuesta 📊
            </h1>
            <p className="text-slate-600 mt-2">
              Dashboard de análisis y comentarios detallados.
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('rcco_folio_logged');
              localStorage.removeItem('rcco_folio_role');
              navigate('/');
            }}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-xl font-semibold transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Kpi title="Participantes" value={kpis.totalUsuarios} />
          <Kpi title="Respuestas Totales" value={kpis.totalRespuestas} />
          <Kpi
            title="Promedio General"
            value={kpis.promedioGeneral.toFixed(2)}
          />
        </div>

        {/* PROMEDIOS DONUT */}
        <section className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-8">Promedios por pregunta</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {promedios.map((p, index) => {
              const dataChart = [
                { name: 'Promedio', value: p.promedioPregunta },
                { name: 'Restante', value: 5 - p.promedioPregunta },
              ];

              return (
                <div key={p.id_Pregunta} className="text-center">
                  <h3 className="text-sm font-semibold mb-4">
                    {p.nb_Pregunta}
                  </h3>

                  <div className="w-full h-64">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={dataChart}
                          innerRadius={60}
                          outerRadius={90}
                          dataKey="value"
                        >
                          <Cell fill={COLORS[index % COLORS.length]} />
                          <Cell fill="#E5E7EB" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="text-xl font-bold text-[#113873] mt-2">
                    {p.promedioPregunta} / 5
                  </p>
                  <p className="text-xs text-slate-500">
                    {p.totalRespuestas} respuestas
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* OPCIONES DONUT */}
        {opcionesAgrupadas.map((grupo: any, index) => {
          const total = grupo.opciones.reduce(
            (sum: number, op: Opcion) => sum + op.totalSeleccionado,
            0
          );

          const dataChart = grupo.opciones.map((op: Opcion) => ({
            name: op.nb_OpcionRespuesta,
            value: op.totalSeleccionado,
          }));

          return (
            <section key={index} className="bg-white p-8 rounded-3xl shadow">
              <h2 className="text-xl font-bold mb-8">{grupo.pregunta}</h2>

              <div className="w-full h-96">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={dataChart}
                      innerRadius={80}
                      outerRadius={130}
                      dataKey="value"
                    >
                      {dataChart.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>

                    <Tooltip
                      content={(props) => (
                        <CustomTooltip {...props} total={total} />
                      )}
                    />

                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          );
        })}

        {/* TABLA CON PAGINACIÓN */}
        <section className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-6">Comentarios detallados</h2>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-500">
              Mostrando {paginatedComentarios.length} de {comentarios.length}
            </span>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200 rounded-lg">
              <thead className="bg-[#113873] text-white text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Folio</th>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Pregunta</th>
                  <th className="px-4 py-3 text-left">Respuesta</th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-slate-200">
                {paginatedComentarios.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-[#113873]">
                      {c.folio ?? '-'}
                    </td>
                    <td className="px-4 py-3">{c.nombre ?? 'Anónimo'}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {c.nb_Pregunta}
                    </td>
                    <td className="px-4 py-3 max-w-md">{c.nb_Respuesta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINACIÓN */}
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

/* KPI */
const Kpi = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white p-6 rounded-2xl shadow text-center">
    <p className="text-sm text-slate-500 uppercase tracking-wide">{title}</p>
    <p className="text-3xl font-bold text-[#113873] mt-2">{value}</p>
  </div>
);
