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
   🎨 Colores contrastados reales (no monocromáticos)
=========================================================== */

const CONTRAST_COLORS = [
  '#1E3A8A', // Azul
  '#10B981', // Verde
  '#F59E0B', // Amarillo
  '#EF4444', // Rojo
  '#8B5CF6', // Morado
  '#14B8A6', // Teal
  '#F97316', // Naranja
  '#0EA5E9', // Azul claro
];

/* ===========================================================
   🎨 Colores semánticos inteligentes
=========================================================== */

const getColorByOption = (label: string, index: number) => {
  const text = label.toLowerCase().trim();

  // 🔴 Negativo fuerte
  if (text === 'no') return '#EF4444';

  // 🟡 Neutral
  if (text.includes('no estoy')) return '#F59E0B';
  if (text.includes('seguro')) return '#F59E0B';

  // 🟢 Probable positivo
  if (text.includes('probablemente')) return '#3B82F6'; // Azul diferente

  // 🟢 Positivo fuerte
  if (text === 'sí') return '#10B981';

  // Otros casos tipo evaluación
  if (text.includes('excelente')) return '#3B82F6';
  if (text.includes('bueno')) return '#22C55E';
  if (text.includes('regular')) return '#F59E0B';
  if (text.includes('deficiente')) return '#EF4444';

  // Fallback
  return CONTRAST_COLORS[index % CONTRAST_COLORS.length];
};

const getAverageColor = (value: number) => {
  if (value >= 4.5) return '#1067b9'; // Verde excelente
  if (value >= 4) return '#278be9'; // Verde bueno
  if (value >= 3) return '#4aa0f0'; // Amarillo regular
  if (value >= 2) return '#75b8f7'; // Naranja bajo
  return '#EF4444'; // Rojo deficiente
};

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
   🧠 Tooltip personalizado
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
    <div className="bg-white p-3 rounded-xl shadow-lg border text-sm">
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
  const [selectedPregunta, setSelectedPregunta] = useState<number | 'all'>(
    'all'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://api-rcco-abogados.grstechs.com/resultados-encuesta'
        );
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

  const comentarios = data?.comentarios ?? [];
  const preguntasUnicas = useMemo(() => {
    const map = new Map<number, string>();
    comentarios.forEach((c) => {
      if (!map.has(c.id_Pregunta)) {
        map.set(c.id_Pregunta, c.nb_Pregunta);
      }
    });
    return Array.from(map.entries()); // [ [id, pregunta], ... ]
  }, [comentarios]);

  const comentariosFiltrados =
    selectedPregunta === 'all'
      ? comentarios
      : comentarios.filter((c) => c.id_Pregunta === selectedPregunta);

  const totalPages = Math.ceil(comentariosFiltrados.length / rowsPerPage);

  const paginatedComentarios = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return comentariosFiltrados.slice(start, start + rowsPerPage);
  }, [comentariosFiltrados, currentPage, rowsPerPage]);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-xl">
        Cargando resultados...
      </main>
    );
  }

  const { kpis, promedios, opciones } = data;

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
                          <Cell fill={getAverageColor(p.promedioPregunta)} />
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

        {/* OPCIONES DONUTS */}
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
            <section key={index} className="bg-white p-8 rounded-3xl shadow-md">
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
                      {dataChart.map((entry, i) => (
                        <Cell key={i} fill={getColorByOption(entry.name, i)} />
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

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* SELECT DE PREGUNTAS */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-600">
                Filtrar por pregunta:
              </label>

              <select
                value={selectedPregunta}
                onChange={(e) => {
                  const value =
                    e.target.value === 'all' ? 'all' : Number(e.target.value);

                  setSelectedPregunta(value);
                  setCurrentPage(1);
                }}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">Todas las preguntas</option>

                {preguntasUnicas.map(([id, pregunta]) => (
                  <option key={id} value={id}>
                    {pregunta}
                  </option>
                ))}
              </select>
            </div>

            {/* SELECT FILAS */}
            <div>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-500">
              Mostrando {paginatedComentarios.length} de{' '}
              {comentariosFiltrados.length}
            </span>

            {/* <select
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
            </select> */}
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
  <div className="bg-white p-6 rounded-2xl shadow-md text-center">
    <p className="text-sm text-slate-500 uppercase tracking-wide">{title}</p>
    <p className="text-3xl font-bold text-[#113873] mt-2">{value}</p>
  </div>
);
