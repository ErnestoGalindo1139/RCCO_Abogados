export const API_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, '');

if (!API_URL) {
  throw new Error('Configura VITE_API_URL en el archivo .env del frontend.');
}
