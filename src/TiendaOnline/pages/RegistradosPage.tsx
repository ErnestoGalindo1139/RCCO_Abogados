import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Pencil, Trash2, RotateCcw } from 'lucide-react';

// ===============================
// TIPOS
// ===============================
type UsuarioEvento = {
  id_UsuarioEvento: number;

  nb_Nombre: string;
  nb_ApellidoPaterno: string;
  nb_ApellidoMaterno: string | null;

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

// ===============================
// COMPONENTE
// ===============================
export default function RegistradosPage() {
  const navigate = useNavigate();

  // ===============================
  // ESTADOS
  // ===============================
  const [query, setQuery] = useState('');
  const [filtroPago, setFiltroPago] = useState<
    'todos' | 'pagados' | 'nopagados'
  >('todos');

  const [filtroEmpresa, setFiltroEmpresa] = useState<string>('todas');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [usuarios, setUsuarios] = useState<UsuarioEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmModalPago, setConfirmModalPago] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioEvento | null>(null);
  const [nuevoValorPago, setNuevoValorPago] = useState<boolean>(false);
  const [nuevoValor, setNuevoValor] = useState(false);
  const [tipoAccion, setTipoAccion] = useState<TipoAccion>('pago');

  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ===== FORM EDITAR =====
  const [formEdit, setFormEdit] = useState({
    nb_Nombre: '',
    nb_ApellidoPaterno: '',
    nb_ApellidoMaterno: '',
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
          throw new Error('Respuesta inválida del endpoint');
        }

        const mapped = data.body.map((u: any) => ({
          id_UsuarioEvento: u.id_UsuarioEvento,

          nb_Nombre: u.nb_Nombre,
          nb_ApellidoPaterno: u.nb_ApellidoPaterno,
          nb_ApellidoMaterno: u.nb_ApellidoMaterno,

          NombreCompleto: `${u.nb_Nombre} ${u.nb_ApellidoPaterno} ${
            u.nb_ApellidoMaterno ?? ''
          }`.trim(),

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
  // EMPRESAS ÚNICAS
  // =====================================================
  const empresas = useMemo(() => {
    const set = new Set<string>();
    usuarios.forEach((u) => {
      if (u.Empresa && u.Empresa.trim() !== '') {
        set.add(u.Empresa);
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [usuarios]);

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
      if (filtroEmpresa !== 'todas' && u.Empresa !== filtroEmpresa)
        return false;

      return true;
    });
  }, [query, filtroPago, filtroEmpresa, usuarios]);

  // =====================================================
  // PAGINADO
  // =====================================================
  const pages = Math.max(1, Math.ceil(filtrados.length / pageSize));
  const items = filtrados.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, filtroPago, filtroEmpresa, pageSize]);

  // =====================================================
  // MODALES
  // =====================================================
  const abrirModalPago = (u: UsuarioEvento) => {
    setSelectedUser(u);
    setNuevoValorPago(!u.sn_Pagado);
    setTipoAccion('pago');
    setNuevoValor(!u.sn_Pagado);
    setConfirmModalPago(true);
  };

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

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
            ? { ...u, sn_Pagado: nuevoValorPago }
            : u
        )
      );

      if (nuevoValorPago) {
        await fetch(
          'https://api-rcco-abogados.grstechs.com/enviarCorreoPagoEvento',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              correo: selectedUser.Correo,
              nombre: selectedUser.NombreCompleto,
              folio: selectedUser.nu_Folio,
            }),
          }
        );
      }
    } catch {
      alert('Error al actualizar pago.');
    }

    mostrarExito(
      nuevoValorPago
        ? 'Pago confirmado y correo enviado correctamente.'
        : 'El pago fue marcado como NO PAGADO.'
    );

    setConfirmModalPago(false);
  };

  const mostrarExito = (mensaje: string) => {
    setSuccessMessage(mensaje);
    setSuccessModal(true);
  };

  const abrirModalActivo = (u: UsuarioEvento) => {
    setSelectedUser(u);
    setTipoAccion('activo');
    setNuevoValor(!u.sn_Activo);
    setConfirmModal(true);
  };

  const abrirModalEditar = (u: UsuarioEvento) => {
    setSelectedUser(u);
    setTipoAccion('editar');
    setFormEdit({
      nb_Nombre: u.nb_Nombre,
      nb_ApellidoPaterno: u.nb_ApellidoPaterno,
      nb_ApellidoMaterno: u.nb_ApellidoMaterno || '',
      Empresa: u.Empresa || '',
      Celular: u.Celular,
      Correo: u.Correo,
      Comentarios: u.Comentarios || '',
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
        ? ''
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

    mostrarExito(
      nuevoValor
        ? 'Usuario activado correctamente.'
        : 'Usuario desactivado correctamente.'
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
        nb_Nombre: formEdit.nb_Nombre,
        nb_ApellidoPaterno: formEdit.nb_ApellidoPaterno,
        nb_ApellidoMaterno: formEdit.nb_ApellidoMaterno || null,
        nb_Empresa: formEdit.Empresa,
        de_Celular: formEdit.Celular,
        de_Correo: formEdit.Correo,
        de_Comentarios: formEdit.Comentarios,
      }),
    });

    setUsuarios((prev) =>
      prev.map((u) =>
        u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
          ? {
              ...u,
              ...formEdit,
              NombreCompleto:
                `${formEdit.nb_Nombre} ${formEdit.nb_ApellidoPaterno} ${formEdit.nb_ApellidoMaterno}`.trim(),
            }
          : u
      )
    );

    mostrarExito('Los datos del usuario se actualizaron correctamente.');

    setConfirmModal(false);
  };

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = () => {
    localStorage.removeItem('rcco_user_logged');
    localStorage.removeItem('rcco_role');
    navigate('/login');
  };

  // =====================================================
  // LOADING / ERROR
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
  // RENDER
  // =====================================================
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="w-full bg-slate-900 text-right px-6 py-3">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="bg-gradient-to-r from-[#113873] to-[#0D47A1] py-6 px-6 text-white">
        <h1 className="text-3xl font-bold">Registros del Evento</h1>
      </div>

      {/* FILTROS */}
      <section className="max-w-[98vw] mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow p-6 flex gap-4">
          <input
            className="w-1/2 px-4 py-2 border rounded-xl"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            value={filtroPago}
            onChange={(e) => setFiltroPago(e.target.value as any)}
            className="px-4 py-2 border rounded-xl"
          >
            <option value="todos">Todos</option>
            <option value="pagados">Pagados</option>
            <option value="nopagados">No pagados</option>
          </select>

          <select
            value={filtroEmpresa}
            onChange={(e) => setFiltroEmpresa(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          >
            <option value="todas">Todas las empresas</option>
            {empresas.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        </div>

        {/* PAGE SIZE */}
        <div className="flex justify-between items-center mb-3 text-md mt-[1rem]">
          <span>
            Mostrando {items.length} de {filtrados.length} registros
          </span>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border"
          >
            <option value={filtrados.length}>Todos</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow mt-4">
          <table className="min-w-[1600px] w-full text-sm">
            <thead className="bg-slate-200">
              <tr>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Empresa</th>
                <th className="px-4 py-3 text-center">Pago</th>
                <th className="px-4 py-3">Celular</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Comentarios</th>
                <th className="px-4 py-3">Folio</th>
                <th className="px-4 py-3">Fecha</th>
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
                      className={`px-3 py-1 rounded-xl text-xs text-white ${
                        u.sn_Pagado ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {u.sn_Pagado ? 'Pagado' : 'No pagado'}
                    </span>
                    <button onClick={() => abrirModalPago(u)}>
                      {u.sn_Pagado ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">{u.Celular}</td>
                  <td className="px-4 py-3">{u.Correo}</td>
                  <td className="px-4 py-3">{u.Comentarios || '-'}</td>
                  <td className="px-4 py-3 font-semibold">{u.nu_Folio}</td>
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

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-4 mt-8 pb-8">
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

      {/* MODAL CONFIRMAR PAGO */}
      {confirmModalPago && (
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
                onClick={() => setConfirmModalPago(false)}
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

      {/* MODAL ACTIVAR / DESACTIVAR */}
      {confirmModal && tipoAccion === 'activo' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">
              {nuevoValor ? 'Activar usuario' : 'Desactivar usuario'}
            </h2>

            <p className="text-slate-700 mb-6">
              ¿Estás seguro que deseas{' '}
              <b>{nuevoValor ? 'ACTIVAR' : 'DESACTIVAR'}</b> al usuario:
              <br />
              <span className="font-semibold">
                {selectedUser?.NombreCompleto}
              </span>
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setConfirmModal(false)}
                className="w-1/2 py-2 bg-slate-300 hover:bg-slate-400 rounded-lg font-semibold"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarAccion}
                className={`w-1/2 py-2 text-white rounded-lg font-semibold ${
                  nuevoValor
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL OPERACIÓN EXITOSA */}
      {successModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
            <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />

            <h2 className="text-xl font-bold mb-3">Operación exitosa</h2>

            <p className="text-slate-700 mb-6">{successMessage}</p>

            <button
              onClick={() => setSuccessModal(false)}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {confirmModal && tipoAccion === 'editar' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">
              Editar usuario
            </h2>

            <div className="space-y-3">
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Nombre"
                value={formEdit.nb_Nombre}
                onChange={(e) =>
                  setFormEdit({ ...formEdit, nb_Nombre: e.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Apellido paterno"
                value={formEdit.nb_ApellidoPaterno}
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    nb_ApellidoPaterno: e.target.value,
                  })
                }
              />
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Apellido materno"
                value={formEdit.nb_ApellidoMaterno}
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    nb_ApellidoMaterno: e.target.value,
                  })
                }
              />
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Empresa"
                value={formEdit.Empresa}
                onChange={(e) =>
                  setFormEdit({ ...formEdit, Empresa: e.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Celular"
                value={formEdit.Celular}
                onChange={(e) =>
                  setFormEdit({ ...formEdit, Celular: e.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Correo"
                value={formEdit.Correo}
                onChange={(e) =>
                  setFormEdit({ ...formEdit, Correo: e.target.value })
                }
              />
              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                placeholder="Comentarios"
                value={formEdit.Comentarios}
                onChange={(e) =>
                  setFormEdit({ ...formEdit, Comentarios: e.target.value })
                }
              />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setConfirmModal(false)}
                  className="w-1/2 py-2 bg-slate-300 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={guardarEdicion}
                  className="w-1/2 py-2 bg-blue-600 text-white rounded-lg font-semibold"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
