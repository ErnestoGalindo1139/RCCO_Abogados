// components/blog/BlogHero.tsx
import React from 'react';
import { Search, Tag } from 'lucide-react';

type Props = {
  categories: string[];
  activeCat: string;
  onSearch: (q: string) => void;
  onFilter: (cat: string) => void;
};

export const BlogHero: React.FC<Props> = ({
  categories,
  activeCat,
  onSearch,
  onFilter,
}) => {
  const [q, setQ] = React.useState('');

  // debounce 250ms
  React.useEffect(() => {
    const id = setTimeout(() => onSearch(q), 250);
    return () => clearTimeout(id);
  }, [q, onSearch]);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-[8rem] pb-8">
      <h1 className="text-white text-[2.2rem] md:text-[2.7rem] font-black tracking-tight">
        Blog RCCO
      </h1>
      <p className="mt-1 text-white/85">
        Actualidad legal, criterios y guías prácticas.
      </p>

      <div className="mt-5 flex flex-col md:flex-row gap-3">
        {/* Buscador */}
        <div className="relative w-full md:max-w-[520px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar artículos..."
            className="h-11 w-full rounded-xl bg-white text-slate-800 placeholder:text-slate-500 pl-10 pr-3 shadow-sm ring-1 ring-black/10 focus:ring-blue-600/30 outline-none"
          />
        </div>

        {/* Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => {
            const active = activeCat === c;
            return (
              <button
                key={c}
                onClick={() => onFilter(c)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition border
                  ${
                    active
                      ? 'bg-white text-slate-900 border-blue-600 shadow-sm'
                      : 'bg-white text-slate-800 border-blue-600/30 hover:border-blue-600/50 hover:shadow-sm'
                  }`}
              >
                <Tag
                  className={`h-4 w-4 ${active ? 'text-blue-700' : 'text-blue-700'}`}
                />
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
