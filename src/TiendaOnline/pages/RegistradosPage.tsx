import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Pencil, Trash2, RotateCcw } from 'lucide-react';

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
  sn_Activo: boolean;
};

type TipoAccion = 'pago' | 'activo' | 'editar';

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
  const [filtroPago, setFiltroPago] = useState<
    'todos' | 'pagados' | 'nopagados'
  >('todos');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [usuarios, setUsuarios] = useState<UsuarioEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioEvento | null>(null);
  const [nuevoValor, setNuevoValor] = useState<boolean>(false);
  const [tipoAccion, setTipoAccion] = useState<TipoAccion>('pago');

  // ===== FORM EDITAR (TODOS LOS CAMPOS) =====
  const [formEdit, setFormEdit] = useState({
    NombreCompleto: '',
    Empresa: '',
    Celular: '',
    Correo: '',
    Comentarios: '',
  });

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
          sn_Activo: u.sn_Activo,
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
  // MODALES
  // =====================================================
  const abrirModalPago = (user: UsuarioEvento) => {
    setSelectedUser(user);
    setTipoAccion('pago');
    setNuevoValor(!user.sn_Pagado);
    setConfirmModal(true);
  };

  const abrirModalActivo = (user: UsuarioEvento) => {
    setSelectedUser(user);
    setTipoAccion('activo');
    setNuevoValor(!user.sn_Activo);
    setConfirmModal(true);
  };

  const abrirModalEditar = (user: UsuarioEvento) => {
    setSelectedUser(user);
    setTipoAccion('editar');
    setFormEdit({
      NombreCompleto: user.NombreCompleto,
      Empresa: user.Empresa || '',
      Celular: user.Celular,
      Correo: user.Correo,
      Comentarios: user.Comentarios || '',
    });
    setConfirmModal(true);
  };

  // =====================================================
  // CONFIRMAR PAGO / ACTIVO
  // =====================================================
  const confirmarAccion = async () => {
    if (!selectedUser) return;

    const endpoint =
      tipoAccion === 'pago'
        ? 'https://api-rcco-abogados.grstechs.com/updatePagoUsuariosEvento'
        : 'https://api-rcco-abogados.grstechs.com/toggleUsuarioEvento';

    const body =
      tipoAccion === 'pago'
        ? {
            id_UsuarioEvento: selectedUser.id_UsuarioEvento,
            sn_Pagado: nuevoValor,
          }
        : {
            id_UsuarioEvento: selectedUser.id_UsuarioEvento,
            sn_Activo: nuevoValor,
          };

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setUsuarios((prev) =>
      prev.map((u) =>
        u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
          ? {
              ...u,
              ...(tipoAccion === 'pago'
                ? { sn_Pagado: nuevoValor }
                : { sn_Activo: nuevoValor }),
            }
          : u
      )
    );

    setConfirmModal(false);
  };

  // =====================================================
  // GUARDAR EDICIÓN
  // =====================================================
  const guardarEdicion = async () => {
    if (!selectedUser) return;

    await fetch('https://api-rcco-abogados.grstechs.com/updateUsuarioEvento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_UsuarioEvento: selectedUser.id_UsuarioEvento,
        ...formEdit,
      }),
    });

    setUsuarios((prev) =>
      prev.map((u) =>
        u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
          ? { ...u, ...formEdit }
          : u
      )
    );

    setConfirmModal(false);
  };

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
  // PAGINADO
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
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-[1600px] w-full text-sm">
            <thead className="bg-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Empresa</th>
                <th className="px-4 py-3 text-center">Pago</th>
                <th className="px-4 py-3 text-left">Celular</th>
                <th className="px-4 py-3 text-left">Correo</th>
                <th className="px-4 py-3 text-left">Comentarios</th>
                <th className="px-4 py-3 text-left">Folio</th>
                <th className="px-4 py-3 text-left">Fecha Registro</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {items.map((u) => (
                <tr key={u.id_UsuarioEvento} className="even:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{u.NombreCompleto}</td>
                  <td className="px-4 py-3">{u.Empresa || '-'}</td>
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
                  <td className="px-4 py-3">{u.Celular}</td>
                  <td className="px-4 py-3 truncate max-w-[300px]">
                    {u.Correo}
                  </td>
                  <td className="px-4 py-3 truncate max-w-[220px]">
                    {u.Comentarios || '-'}
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-700">
                    {u.nu_Folio}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(u.FechaRegistro).toLocaleString('es-MX')}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button onClick={() => abrirModalEditar(u)}>
                      <Pencil className="w-5 h-5 text-blue-600" />
                    </button>

                    <button onClick={() => abrirModalActivo(u)}>
                      {u.sn_Activo ? (
                        <Trash2 className="w-5 h-5 text-red-600" />
                      ) : (
                        <RotateCcw className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">
              {tipoAccion === 'editar'
                ? 'Editar usuario'
                : '¿Confirmar acción?'}
            </h2>

            {tipoAccion === 'editar' ? (
              <div className="space-y-3 text-left">
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Nombre completo"
                  value={formEdit.NombreCompleto}
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      NombreCompleto: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Empresa"
                  value={formEdit.Empresa}
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      Empresa: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Celular"
                  value={formEdit.Celular}
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      Celular: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Correo"
                  value={formEdit.Correo}
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      Correo: e.target.value,
                    })
                  }
                />

                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Comentarios"
                  value={formEdit.Comentarios}
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      Comentarios: e.target.value,
                    })
                  }
                />

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setConfirmModal(false)}
                    className="w-1/2 py-2 bg-slate-300 hover:bg-slate-400 rounded-lg font-semibold"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={guardarEdicion}
                    className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-slate-700 mb-6">
                  ¿Deseas{' '}
                  <b>
                    {tipoAccion === 'pago'
                      ? nuevoValor
                        ? 'marcar como PAGADO'
                        : 'marcar como NO PAGADO'
                      : nuevoValor
                        ? 'ACTIVAR'
                        : 'DESACTIVAR'}
                  </b>{' '}
                  al usuario?
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
                    onClick={confirmarAccion}
                    className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    Confirmar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
