export type UsuarioEvento = {
  id_UsuarioEvento: number;
  nu_AnioEvento?: number | null;
  nu_EdicionEvento?: number | null;

  nb_Nombre: string;
  nb_ApellidoPaterno: string;
  nb_ApellidoMaterno: string | null;

  NombreCompleto: string;

  Celular: string;
  Correo: string;
  Empresa: string | null;
  Comentarios: string | null;
  constanciaWhatsApp?: string;
  FechaRegistro: string;
  FechaPago: string | null;
  sn_Pagado: boolean;
  nu_Folio: string;
  sn_Activo: boolean;

  // ⭐ NUEVOS
  sn_UsuarioEspecial: boolean;
  nb_TipoUsuarioEspecial: string | null;
};
