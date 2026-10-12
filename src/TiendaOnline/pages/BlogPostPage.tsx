import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { POSTS } from '../data/blogData';
import { EditorialPost } from '../components/blog/EditorialPost';
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

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(
    () => POSTS.find((entry) => entry.slug === slug),
    [slug]
  );
  const index = POSTS.findIndex((entry) => entry.slug === slug);

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
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            <ArrowLeft size={18} /> Volver al blog
          </Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <ReadingProgress key={post.id} />
      <EditorialPost
        key={post.id}
        post={post}
        prev={POSTS[index - 1]}
        next={POSTS[index + 1]}
      />
    </>
  );
};
