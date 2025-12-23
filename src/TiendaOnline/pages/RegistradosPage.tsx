import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

// ===============================
// TIPOS
// ===============================
type UsuarioEvento = {
  id_UsuarioEvento: number;
  NombreCompleto: string;
  Celular: string;
  Correo: string;
  Empresa: string | null;
  Comentarios: string | null;
  FechaRegistro: string;
  FechaPago: string | null;
  sn_Pagado: boolean;
  nu_Folio: string;
};

// ===============================
// HELPERS
// ===============================
const norm = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function RegistradosPage() {
  const navigate = useNavigate();

  // ===============================
  // ESTADOS
  // ===============================
  const [query, setQuery] = useState('');
  const [filtroPago, setFiltroPago] =
    useState<'todos' | 'pagados' | 'nopagados'>('todos');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [usuarios, setUsuarios] = useState<UsuarioEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioEvento | null>(null);
  const [nuevoValorPago, setNuevoValorPago] = useState<boolean>(false);

  // =====================================================
  // FETCH
  // =====================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://api-rcco-abogados.grstechs.com/usuariosEvento'
        );
        const data = await res.json();

        if (!data.success || !Array.isArray(data.body)) {
          throw new Error('El endpoint no regresó un arreglo válido.');
        }

        const mapped = data.body.map((u: any) => ({
          id_UsuarioEvento: u.id_UsuarioEvento,
          NombreCompleto:
            `${u.nb_Nombre} ${u.nb_ApellidoPaterno} ${u.nb_ApellidoMaterno ?? ''}`.trim(),
          Celular: u.de_Celular,
          Correo: u.de_Correo,
          Empresa: u.nb_Empresa,
          Comentarios: u.de_Comentarios,
          FechaRegistro: u.fh_Registro,
          FechaPago: u.sn_Pagado ? 'PAGADO' : null,
          sn_Pagado: u.sn_Pagado,
          nu_Folio: u.nu_Folio,
        }));

        setUsuarios(mapped);
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // =====================================================
  // FILTROS
  // =====================================================
  const filtrados = useMemo(() => {
    const q = norm(query);

    return usuarios.filter((u) => {
      const match =
        norm(u.NombreCompleto).includes(q) ||
        norm(u.Correo).includes(q) ||
        norm(u.Celular).includes(q) ||
        norm(u.Empresa || '').includes(q) ||
        norm(u.nu_Folio || '').includes(q) ||
        norm(u.Comentarios || '').includes(q);

      if (!match) return false;
      if (filtroPago === 'pagados' && !u.sn_Pagado) return false;
      if (filtroPago === 'nopagados' && u.sn_Pagado) return false;

      return true;
    });
  }, [query, filtroPago, usuarios]);

  // =====================================================
  // PAGINADO (ÚNICO, GLOBAL)
  // =====================================================
  const pages = Math.max(1, Math.ceil(filtrados.length / pageSize));
  const items = filtrados.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, filtroPago, pageSize]);

  // =====================================================
  const logout = () => {
    localStorage.removeItem('rcco_user_logged');
    localStorage.removeItem('rcco_role');
    navigate('/login');
  };

  // =====================================================
  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100 text-xl font-semibold">
        Cargando registros...
      </main>
    );

  if (error)
    return (
      <main className="min-h-screen flex items-center justify-center bg-red-100 text-xl font-semibold text-red-700">
        Error: {error}
      </main>
    );

  // =====================================================
  return (
    <main className="min-h-screen bg-slate-100">
      {/* LOGOUT */}
      <div className="w-full bg-slate-900 text-right px-6 py-3">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
        >
          Cerrar sesión
        </button>
      </div>

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#113873] via-[#164b98] to-[#0D47A1] py-6 px-6 text-white">
        <h1 className="text-3xl font-bold">Registros del Evento</h1>
        <p className="text-white/80 mt-1">
          Consulta todas las personas registradas al Simposio PLD.
        </p>
      </div>

      {/* CONTENIDO */}
      <section className="max-w-[98vw] mx-auto px-6 py-10 -mt-6">
        {/* FILTROS */}
        <div className="bg-white shadow rounded-2xl p-6 mb-4 flex justify-between gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, correo, teléfono, empresa, folio..."
            className="w-1/2 px-4 py-2 rounded-xl border"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            value={filtroPago}
            onChange={(e) => setFiltroPago(e.target.value as any)}
            className="px-4 py-2 rounded-xl border"
          >
            <option value="todos">Todos</option>
            <option value="pagados">Pagados</option>
            <option value="nopagados">No Pagados</option>
          </select>
        </div>

        {/* PAGE SIZE */}
        <div className="flex justify-between items-center mb-3 text-sm">
          <span>
            Mostrando {items.length} de {filtrados.length} registros
          </span>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </div>

        {/* TABLA (TODOS LOS DISPOSITIVOS) */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-[1600px] w-full text-sm">
            <thead className="bg-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Celular</th>
                <th className="px-4 py-3 text-left">Correo</th>
                <th className="px-4 py-3 text-left">Empresa</th>
                <th className="px-4 py-3 text-left">Comentarios</th>
                <th className="px-4 py-3 text-left">Folio</th>
                <th className="px-4 py-3 text-left">Fecha Registro</th>
                <th className="px-4 py-3 text-center">Pago</th>
              </tr>
            </thead>

            <tbody>
              {items.map((u) => (
                <tr key={u.id_UsuarioEvento} className="even:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{u.NombreCompleto}</td>
                  <td className="px-4 py-3">{u.Celular}</td>
                  <td className="px-4 py-3 truncate max-w-[300px]">{u.Correo}</td>
                  <td className="px-4 py-3">{u.Empresa || '-'}</td>
                  <td className="px-4 py-3 truncate max-w-[220px]">
                    {u.Comentarios || '-'}
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-700">
                    {u.nu_Folio}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(u.FechaRegistro).toLocaleString('es-MX')}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-semibold text-white ${
                        u.sn_Pagado ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {u.sn_Pagado ? 'Pagado' : 'No pagado'}
                    </span>
                    <button onClick={() => abrirModalPago(u)}>
                      {u.sn_Pagado ? (
                        <XCircle className="text-red-600 w-6 h-6" />
                      ) : (
                        <CheckCircle className="text-green-600 w-6 h-6" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-4 my-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-40"
        >
          Anterior
        </button>

        <span className="font-medium">
          Página {page} de {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>

      {/* MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">¿Confirmar acción?</h2>

            <p className="text-slate-700 mb-6">
              ¿Deseas marcar como{' '}
              <b>{nuevoValorPago ? 'PAGADO' : 'NO PAGADO'}</b> al usuario?
              <br />
              <span className="font-semibold">
                {selectedUser?.NombreCompleto}
              </span>
            </p>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setConfirmModal(false)}
                className="w-1/2 py-2 bg-slate-300 hover:bg-slate-400 rounded-lg font-semibold"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarPago}
                className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
