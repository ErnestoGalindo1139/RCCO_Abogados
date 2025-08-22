// src/app/blog/[slug].tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Share2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { POSTS } from '../data/blogData';

// ──────────────────────────────────────────────────────────────────────────────
// Barra de progreso
// ──────────────────────────────────────────────────────────────────────────────
const ReadingProgress: React.FC = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setPct(Math.max(0, Math.min(100, p)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

// Botón compartir/copy
const ShareBtn: React.FC<{ title: string }> = ({ title }) => {
  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        // feedback sutil
      }
    } catch {
      /* noop */
    }
  };
  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-white ring-1 ring-white/20 hover:bg-white/25"
      title="Compartir"
    >
      <Share2 className="h-4 w-4" />
      <span className="text-sm">Compartir</span>
    </button>
  );
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => POSTS.find((p) => p.slug === slug), [slug]);

  const { prev, next } = useMemo(() => {
    const i = POSTS.findIndex((p) => p.slug === slug);
    return {
      prev: i > 0 ? POSTS[i - 1] : undefined,
      next: i >= 0 && i < POSTS.length - 1 ? POSTS[i + 1] : undefined,
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Artículo no encontrado
          </h1>
          <p className="mt-2 text-slate-600">Tal vez fue movido o no existe.</p>
          <Link
            to="/blog"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            ← Volver al blog
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <ReadingProgress />

      {/* HERO con imagen y overlay */}
      <header className="relative h-[60vh] min-h-[420px]">
        <img
          src={post.cover}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 flex h-full items-end px-6 md:px-12 pb-10 max-w-5xl mx-auto w-full">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/blog')}
                className="text-white/90 hover:text-white text-sm underline-offset-4 hover:underline"
              >
                ← Volver al blog
              </button>
              <ShareBtn title={post.title} />
            </div>

            <div className="mt-3">
              {post.tag && (
                <span className="inline-block rounded-full bg-white/90 text-slate-900 text-xs px-3 py-1 mb-3">
                  {post.tag}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                {post.title}
              </h1>
              <div className="mt-3 flex items-center gap-4 text-white/90 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <article className="prose prose-lg prose-slate max-w-3xl mx-auto px-4 py-12">
        {/* Si no quieres GFM, quita remarkPlugins */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content || ''}
        </ReactMarkdown>
      </article>

      {/* PREV / NEXT con miniatura */}
      <section className="max-w-5xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-6">
        {prev ? (
          <Link
            to={`/blog/${prev.slug}`}
            className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow ring-1 ring-black/5 hover:shadow-md hover:ring-black/10 transition"
          >
            <img src={prev.cover} alt="" className="w-32 h-24 object-cover" />
            <div className="p-3">
              <p className="text-xs text-slate-500">Anterior</p>
              <h3 className="font-semibold text-slate-900 group-hover:underline underline-offset-4">
                {prev.title}
              </h3>
            </div>
          </Link>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 p-5 text-slate-400">
            Sin anterior
          </div>
        )}

        {next ? (
          <Link
            to={`/blog/${next.slug}`}
            className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow ring-1 ring-black/5 hover:shadow-md hover:ring-black/10 transition"
          >
            <div className="p-3 text-right grow">
              <p className="text-xs text-slate-500">Siguiente</p>
              <h3 className="font-semibold text-slate-900 group-hover:underline underline-offset-4">
                {next.title}
              </h3>
            </div>
            <img src={next.cover} alt="" className="w-32 h-24 object-cover" />
          </Link>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 p-5 text-slate-400">
            Sin siguiente
          </div>
        )}
      </section>
    </main>
  );
};
