import React from 'react';

export const Slogan = (): React.JSX.Element => {
  return (
    <figure className="mx-auto max-w-3xl px-4 py-8 text-center">
      <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight">
        <span className="font-serif">“Ingeniería </span>
        <span className="text-blue-600 font-semibold font-serif">
          Jurídica
        </span>{' '}
        <span className="font-serif">para tu empresa”</span>
      </blockquote>

      <figcaption className="mt-6 text-base md:text-lg text-gray-600 w-full text-center md:text-right font-serif">
        — RCCO
      </figcaption>
    </figure>
  );
};
