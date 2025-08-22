// src/app/components/blog/FeaturedPost.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const FeaturedPost: React.FC<{
  title: string;
  excerpt: string;
  image: string;
  href: string;
  tag?: string;
  readTime?: string;
}> = ({
  title,
  excerpt,
  image,
  href,
  tag = 'Artículo',
  readTime = '5 min',
}) => (
  <Link to={href} className="group block">
    <div className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
      <img src={image} alt={title} className="h-[340px] w-full object-cover" />
      <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-blue-900/40 transition" />
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-white/90 text-slate-800 text-xs px-2 py-1 ring-1 ring-black/5">
            {tag}
          </span>
          <span className="text-white drop-shadow text-xs">
            {readTime} lectura
          </span>
        </div>
        <h2 className="text-white drop-shadow text-2xl md:text-3xl font-extrabold leading-tight">
          {title}
        </h2>
        <p className="mt-2 text-white/95 max-w-3xl drop-shadow">{excerpt}</p>
      </div>
    </div>
  </Link>
);
