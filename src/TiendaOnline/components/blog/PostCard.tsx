// src/app/components/blog/PostCard.tsx
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../../data/blogData';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <article className="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-lg transition overflow-hidden">
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="relative">
        <img
          src={post.cover}
          alt={post.title}
          className="h-44 w-full object-cover"
        />
        {post.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 text-white text-xs px-2 py-1 shadow">
            {post.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-1 text-slate-600 line-clamp-3">{post.excerpt}</p>
        <div className="mt-3 flex items-center gap-4 text-slate-500 text-sm">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  </article>
);
