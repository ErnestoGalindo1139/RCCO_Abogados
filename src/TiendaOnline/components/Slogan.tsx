import React from 'react';
import { useTranslation } from 'react-i18next';

export const Slogan: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <figure className="mx-auto max-w-3xl px-4 py-8 text-center">
      <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight font-serif">
        “<span className="text-blue-600 font-semibold">{t('slogan.text')}</span>
        ”
      </blockquote>

      <figcaption className="mt-6 text-base md:text-lg text-gray-600 w-full text-center md:text-right font-serif">
        {t('slogan.author')}
      </figcaption>
    </figure>
  );
};
