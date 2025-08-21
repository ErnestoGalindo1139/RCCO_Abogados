// app/blog/page.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Post, PostCard } from '../components/blog/PostCard';
import { FeaturedPost } from '../components/blog/FeaturedPost';
import { Pagination } from '../components/blog/Pagination';
import { BlogHero } from '../components/blog/BlogHero';

const MOCK: Post[] = [
  {
    id: '1',
    title: 'Checklist para constituir tu S.A.P.I. sin errores',
    excerpt:
      'Pasos, documentos y cláusulas clave para evitar dolores de cabeza al crear tu sociedad y pactos entre socios.',
    cover:
      'https://derechomexicano.com.mx/wp-content/uploads/2020/10/bufete-de-abogados.jpg',
    date: '2025-08-05',
    readTime: '7 min',
    tag: 'Societario',
    href: '/blog/checklist-constituir-sapi',
  },
  {
    id: '2',
    title: 'Contratos mercantiles: cómo blindar tus acuerdos B2B',
    excerpt:
      'Elementos mínimos, penalidades, confidencialidad y jurisdicción para contratos que sí se cumplen.',
    cover:
      'https://static.vecteezy.com/system/resources/previews/002/921/775/non_2x/lawyers-and-judge-people-cartoon-character-vector.jpg',
    date: '2025-07-28',
    readTime: '5 min',
    tag: 'Mercantil',
    href: '/blog/contratos-mercantiles-b2b',
  },
  {
    id: '3',
    title: 'Prevención de Lavado de Dinero: guía práctica para pymes',
    excerpt:
      'Obligaciones, umbrales de identificación, avisos y políticas internas para cumplir con PLD sin ahogarte.',
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS-gEoaMEN7x-deBs5w67BvU7PwOQqrcQv-A&s',
    date: '2025-08-10',
    readTime: '6 min',
    tag: 'PLD',
    href: '/blog/pld-guia-pymes',
  },
  {
    id: '4',
    title: 'Deducciones fiscales 2025 que sí puedes aprovechar',
    excerpt:
      'Qué gastos deducen, límites y comprobación para optimizar tu carga fiscal sin riesgos en auditoría.',
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafP-POcrjGAaPi2kRMMkV_WMBKeRFcCV5Zg&s',
    date: '2025-08-12',
    readTime: '8 min',
    tag: 'Fiscal',
    href: '/blog/deducciones-fiscales-2025',
  },
  // {
  //   id: '5',
  //   title: 'Due diligence legal en arrendamientos comerciales',
  //   excerpt:
  //     'Checklist de revisión legal del local, uso de suelo, permisos y cláusulas antes de firmar.',
  //   cover:
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFZs9CIk7hmrz8xTwV7c7i0_que2TPl_nBQ&s',
  //   date: '2025-08-03',
  //   readTime: '7 min',
  //   tag: 'Inmobiliario',
  //   href: '/blog/due-diligence-arrendamiento-comercial',
  // },
  // {
  //   id: '6',
  //   title: 'Políticas internas laborales que debes actualizar ya',
  //   excerpt:
  //     'Teletrabajo, jornada, hostigamiento, NOM-035 y sanciones: políticas modelo para 2025.',
  //   cover:
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqAokdpJHVqbUmy_FvsdmpGvEuvyx2xodUig&s',
  //   date: '2025-07-30',
  //   readTime: '5 min',
  //   tag: 'Laboral',
  //   href: '/blog/politicas-laborales-actualizadas',
  // },
];

const norm = (s: string): string =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // quita acentos

export const BlogPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('Todos');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Siempre iniciar arriba al montar la página del blog
  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'auto' });
    return (): void => {
      // restaurar comportamiento por defecto al salir del blog
      window.history.scrollRestoration = prev || 'auto';
    };
  }, []);

  // categorías dinámicas desde los posts
  const categories = useMemo(
    () =>
      ['Todos', ...Array.from(new Set(MOCK.map((p) => p.tag)))].filter(
        (cat): cat is string => typeof cat === 'string'
      ),
    []
  );

  // filtra por categoría + búsqueda (título, extracto o tag)
  const filtered = useMemo(() => {
    const q = norm(query);
    return MOCK.filter((p) => {
      const catOk = activeCat === 'Todos' || p.tag === activeCat;
      if (!catOk) return false;
      if (!q) return true;
      return (
        norm(p.title).includes(q) ||
        norm(p.excerpt).includes(q) ||
        norm(p.tag || '').includes(q)
      );
    });
  }, [query, activeCat]);

  // reinicia a página 1 al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [query, activeCat]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Franja superior azul */}
      <div className="bg-gradient-to-r from-[#113873] via-[#164b98] to-[#0D47A1]">
        <BlogHero
          categories={categories}
          activeCat={activeCat}
          onSearch={setQuery}
          onFilter={setActiveCat}
        />
      </div>

      {/* Cuerpo claro */}
      <section
        className="
          relative mx-auto max-w-6xl px-4 pb-16 pt-[4.5rem]
          -mt-8
          [background-image:radial-gradient(24rem_24rem_at_20%_10%,_rgba(13,71,161,0.06),_transparent),radial-gradient(20rem_20rem_at_80%_0%,_rgba(17,56,115,0.05),_transparent)]
        "
      >
        <FeaturedPost
          title="Sociedades: errores comunes al constituir la empresa"
          excerpt="Lo que debes evitar al seleccionar el tipo societario, redacción de estatutos y pactos entre socios."
          image="/img/bannerBlog.jpg"
          href="/blog/errores-constitucion"
          tag="Societario"
          readTime="7 min"
        />

        {/* Resultados */}
        <div className="mt-4 text-sm text-slate-600">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} •{' '}
          {activeCat}
          {query ? ` • “${query}”` : ''}
        </div>

        {/* Grid */}
        {items.length ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center ring-1 ring-black/5">
            <p className="text-slate-700 font-medium">
              No encontramos artículos con esos criterios.
            </p>
            <button
              className="mt-3 inline-flex rounded-xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
              onClick={() => {
                setQuery('');
                setActiveCat('Todos');
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        <Pagination page={page} pages={pages} onChange={setPage} />
      </section>
    </main>
  );
};
