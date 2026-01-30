export const FOLIO_PREFIX = 'PLD-2026';

export const validarFormatoFolio = (folio: string) => {
  return folio.startsWith(FOLIO_PREFIX) && folio.length >= 12;
};

// 🔥 SIMULACIÓN BACKEND
// luego esto será un fetch real
export const verificarFolio = async (folio: string): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 800)); // fake loading

  // 👉 por ahora dejamos pasar cualquier PLD-2026-XXXX
  return validarFormatoFolio(folio);
};
