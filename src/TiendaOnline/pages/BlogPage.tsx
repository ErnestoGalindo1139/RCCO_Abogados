// src/app/blog/page.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { PostCard } from '../components/blog/PostCard';
import { FeaturedPost } from '../components/blog/FeaturedPost';
import { Pagination } from '../components/blog/Pagination';
import { BlogHero } from '../components/blog/BlogHero';
import { POSTS } from '../data/blogData';

const norm = (s: string): string =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const BlogPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('Todos');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => {
      window.history.scrollRestoration = prev || 'auto';
    };
  }, []);

  const categories = useMemo(
    () =>
      ['Todos', ...Array.from(new Set(POSTS.map((p) => p.tag)))].filter(
        (cat): cat is string => typeof cat === 'string'
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = norm(query);
    return POSTS.filter((p) => {
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

  useEffect(() => setPage(1), [query, activeCat]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-[#113873] via-[#164b98] to-[#0D47A1]">
        <BlogHero
          categories={categories}
          activeCat={activeCat}
          onSearch={setQuery}
          onFilter={setActiveCat}
        />
      </div>

      <section
        className="relative mx-auto max-w-6xl px-4 pb-16 pt-[4.5rem] -mt-8
        [background-image:radial-gradient(24rem_24rem_at_20%_10%,_rgba(13,71,161,0.06),_transparent),radial-gradient(20rem_20rem_at_80%_0%,_rgba(17,56,115,0.05),_transparent)]"
      >
        <FeaturedPost
          title={POSTS[0].title}
          excerpt={POSTS[0].excerpt}
          image={POSTS[0].cover}
          href={`/blog/${POSTS[0].slug}`}
          tag={POSTS[0].tag}
          readTime={POSTS[0].readTime}
        />

        <div className="mt-4 text-sm text-slate-600">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} •{' '}
          {activeCat}
          {query ? ` • “${query}”` : ''}
        </div>

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
