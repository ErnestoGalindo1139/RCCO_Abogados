// src/app/components/blog/Pagination.tsx
import React from 'react';

export const Pagination: React.FC<{
  page: number;
  pages: number;
  onChange: (p: number) => void;
}> = ({ page, pages, onChange }) => (
  <nav className="mt-10 flex items-center justify-center gap-2">
    <button
      className="px-3 py-2 rounded-xl bg-white ring-1 ring-black/10 hover:ring-black/20 disabled:opacity-50"
      disabled={page === 1}
      onClick={() => onChange(page - 1)}
    >
      ← Anterior
    </button>
    <span className="text-slate-600 text-sm">
      Página <b>{page}</b> de <b>{pages}</b>
    </span>
    <button
      className="px-3 py-2 rounded-xl bg-white ring-1 ring-black/10 hover:ring-black/20 disabled:opacity-50"
      disabled={page === pages}
      onClick={() => onChange(page + 1)}
    >
      Siguiente →
    </button>
  </nav>
);
