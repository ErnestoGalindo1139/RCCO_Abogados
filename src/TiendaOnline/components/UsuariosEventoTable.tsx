import {
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  RotateCcw,
  Star,
} from 'lucide-react';
import { UsuarioEvento } from '../types/UsuarioEvento';

// ===============================
// TIPOS
// ===============================
// export type UsuarioEvento = {
//   id_UsuarioEvento: number;
//   NombreCompleto: string;
//   Empresa: string | null;
//   Celular: string;
//   Correo: string;
//   Comentarios: string | null;
//   FechaRegistro: string;
//   nu_Folio: string;
//   sn_Pagado: boolean;
//   sn_Activo: boolean;

//   // ⭐ NUEVOS
//   sn_UsuarioEspecial: boolean;
//   nb_TipoUsuarioEspecial: string | null;
// };

type Props = {
  items: UsuarioEvento[];
  onEditar: (u: UsuarioEvento) => void;
  onToggleActivo: (u: UsuarioEvento) => void;
  onTogglePago: (u: UsuarioEvento) => void;
};

export const UsuariosEventoTable = ({
  items,
  onEditar,
  onToggleActivo,
  onTogglePago,
}: Props) => {
  const formatFechaSinZona = (iso: string) => {
    if (!iso) return '-';

    const [fecha, hora] = iso.split('T');
    const [hh, mm, ss] = hora.split('.')[0].split(':');

    const [yyyy, mmf, dd] = fecha.split('-');

    return `${dd}/${mmf}/${yyyy}, ${hh}:${mm}:${ss}`;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow mt-4">
      <table className="min-w-[1800px] w-full text-sm">
        <thead className="bg-slate-200">
          <tr>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3">Empresa</th>
            <th className="px-4 py-3 text-center">Pago</th>
            <th className="px-4 py-3">Celular</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3">Comentarios</th>
            <th className="px-4 py-3">Folio</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3 text-center">Acciones</th>
            <th className="px-4 py-3 text-center">Especial</th>
            <th className="px-4 py-3">Tipo Especial</th>
          </tr>
        </thead>

        <tbody>
          {items.map((u) => (
            <tr key={u.id_UsuarioEvento} className="even:bg-slate-50">
              <td className="px-4 py-3 font-medium">{u.NombreCompleto}</td>
              <td className="px-4 py-3">{u.Empresa || '-'}</td>

              {/* PAGO */}
              <td className="px-4 py-3 flex justify-center gap-2">
                <span
                  className={`px-3 py-1 rounded-xl text-xs text-white ${
                    u.sn_Pagado ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {u.sn_Pagado ? 'Pagado' : 'No pagado'}
                </span>

                <button onClick={() => onTogglePago(u)}>
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
                {formatFechaSinZona(u.FechaRegistro)}
              </td>

              <td className="px-4 py-3 flex justify-center gap-3">
                <button onClick={() => onEditar(u)}>
                  <Pencil className="w-5 h-5 text-blue-600" />
                </button>

                <button onClick={() => onToggleActivo(u)}>
                  {u.sn_Activo ? (
                    <Trash2 className="w-5 h-5 text-red-600" />
                  ) : (
                    <RotateCcw className="w-5 h-5 text-green-600" />
                  )}
                </button>
              </td>

              {/* ⭐ USUARIO ESPECIAL */}
              <td className="px-4 py-3 text-center">
                {u.sn_UsuarioEspecial ? (
                  <Star className="w-5 h-5 text-yellow-500 inline" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300 inline" />
                )}
              </td>

              <td className="px-4 py-3">{u.nb_TipoUsuarioEspecial || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
