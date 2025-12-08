import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

// Tipo ya normalizado
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
};

// Normalizar texto
const norm = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function RegistradosPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [filtroPago, setFiltroPago] = useState<
    'todos' | 'pagados' | 'nopagados'
  >('todos');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [usuarios, setUsuarios] = useState<UsuarioEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal confirmación actualización
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioEvento | null>(null);
  const [nuevoValorPago, setNuevoValorPago] = useState<boolean>(false);

  // =====================================================
  // 🔹 Fetch desde backend
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
  // 🔹 Abrir modal
  // =====================================================
  const abrirModalPago = (user: UsuarioEvento) => {
    setSelectedUser(user);
    setNuevoValorPago(!user.sn_Pagado);
    setConfirmModal(true);
  };

  // =====================================================
  // 🔹 Confirmar actualización de pago
  // =====================================================
  const confirmarPago = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(
        'https://api-rcco-abogados.grstechs.com/updatePagoUsuariosEvento',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_UsuarioEvento: selectedUser.id_UsuarioEvento,
            sn_Pagado: nuevoValorPago,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert('No se pudo actualizar el pago.');
        return;
      }

      // Refrescar UI sin recargar
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
            ? {
                ...u,
                sn_Pagado: nuevoValorPago,
                FechaPago: nuevoValorPago ? 'PAGADO' : null,
              }
            : u
        )
      );
    } catch (err) {
      alert('Error al actualizar el pago.');
    }

    setConfirmModal(false);
  };

  // =====================================================
  // 🔹 Filtrado
  // =====================================================
  const filtrados = useMemo(() => {
    const q = norm(query);

    return usuarios.filter((u) => {
      const match =
        norm(u.NombreCompleto).includes(q) ||
        norm(u.Correo).includes(q) ||
        norm(u.Celular).includes(q) ||
        norm(u.Empresa || '').includes(q) ||
        norm(u.Comentarios || '').includes(q);

      if (!match) return false;

      if (filtroPago === 'pagados' && !u.sn_Pagado) return false;
      if (filtroPago === 'nopagados' && u.sn_Pagado) return false;

      return true;
    });
  }, [query, filtroPago, usuarios]);

  const pages = Math.max(1, Math.ceil(filtrados.length / pageSize));
  const items = filtrados.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [query, filtroPago]);

  // =====================================================
  // 🔹 Logout
  // =====================================================
  const logout = () => {
    localStorage.removeItem('rcco_user_logged');
    localStorage.removeItem('rcco_role');
    navigate('/login');
  };

  // =====================================================
  // 🔹 Loading & Error
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
  // 🔹 Render principal
  // =====================================================
  return (
    <main className="min-h-screen bg-slate-100">
      {/* LOGOUT ARRIBA */}
      <div className="w-full bg-slate-900 text-right px-6 py-3">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>

      {/* HERO HEADER (REDUCIDO) */}
      <div className="bg-gradient-to-r from-[#113873] via-[#164b98] to-[#0D47A1] py-6 px-6 text-white">
        <h1 className="text-3xl font-bold">Registros del Evento</h1>
        <p className="text-white/80 mt-1">
          Consulta todas las personas registradas al Simposio PLD.
        </p>
      </div>

      {/* CONTENIDO */}
      <section className="max-w-7xl mx-auto px-6 py-10 -mt-4">
        {/* Filtros */}
        <div className="bg-white shadow-lg rounded-2xl p-6 ring-1 ring-black/5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre, correo, teléfono, empresa..."
              className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              value={filtroPago}
              onChange={(e) => setFiltroPago(e.target.value as any)}
              className="px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option value="todos">Todos</option>
              <option value="pagados">Pagados</option>
              <option value="nopagados">No Pagados</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        {items.length ? (
          <div className="overflow-x-auto rounded-2xl shadow ring-1 ring-black/5 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-200/60 text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Celular</th>
                  <th className="px-4 py-3 text-left">Correo</th>
                  <th className="px-4 py-3 text-left">Empresa</th>
                  <th className="px-4 py-3 text-left">Comentarios</th>
                  <th className="px-4 py-3 text-left">Fecha Registro</th>
                  <th className="px-4 py-3 text-left">Pago</th>
                </tr>
              </thead>

              <tbody>
                {items.map((u) => (
                  <tr
                    key={u.id_UsuarioEvento}
                    className="odd:bg-white even:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {u.NombreCompleto}
                    </td>
                    <td className="px-4 py-3">{u.Celular}</td>
                    <td className="px-4 py-3">{u.Correo}</td>
                    <td className="px-4 py-3">{u.Empresa || '-'}</td>
                    <td className="px-4 py-3">{u.Comentarios || '-'}</td>
                    <td className="px-4 py-3">
                      {new Date(u.FechaRegistro).toLocaleString('es-MX')}
                    </td>

                    {/* Botón pago */}
                    <td className="px-4 py-3 flex items-center gap-2">
                      {u.sn_Pagado ? (
                        <span className="px-3 py-1 rounded-xl bg-green-600 text-white text-xs font-semibold">
                          Pagado
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-xl bg-red-600 text-white text-xs font-semibold">
                          No pagado
                        </span>
                      )}

                      <button
                        onClick={() => abrirModalPago(u)}
                        className="ml-2 hover:scale-110 transition"
                      >
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
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-black/5 mt-10">
            <p className="text-slate-700 font-medium">
              No se encontraron registros con esos criterios.
            </p>
          </div>
        )}

        {/* Paginación */}
        <div className="flex items-center justify-center mt-10 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="text-slate-700 font-medium">
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
      </section>

      {/* MODAL CONFIRMACIÓN */}
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
