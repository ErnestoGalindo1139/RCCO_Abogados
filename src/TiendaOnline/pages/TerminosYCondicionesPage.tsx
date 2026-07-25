import React, { useEffect } from 'react';
import { Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SectionTitle: React.FC<{
  id: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}> = ({ id, icon, title, subtitle }) => (
  <header id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3">
      <span className="text-blue-600">{icon}</span>

      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
    </div>

    {subtitle && (
      <p className="mt-1 text-sm text-slate-600 md:text-base">{subtitle}</p>
    )}

    <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-500/60 via-blue-500/20 to-transparent" />
  </header>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="relative pl-4">
    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
    <span className="text-slate-800">{children}</span>
  </li>
);

const MetaBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
    {label}
  </span>
);

export const TerminosYCondicionesPage: React.FC = () => {
  const { t } = useTranslation('home');

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration || 'auto';
    };
  }, []);

  const arr = (key: string): string[] =>
    t(key, { returnObjects: true }) as string[];

  const lastUpdate = t('meta.lastUpdate');
  const jurisdiction = t('meta.jurisdiction');
  const heroTitle = t('termsPage.title');
  const heroIntro = t('hero.intro', {
    brand: 'RCCO ABOGADOS®',
  });
  const siteUrl = t('termsPage.site');

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.10),transparent_55%)]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-20 md:pb-12 md:pt-28">
          <h1 className="text-3xl font-bold md:text-4xl">{heroTitle}</h1>

          <p className="mt-3 max-w-2xl text-slate-600">{heroIntro}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <MetaBadge label={`${t('meta.lastUpdateLabel')} ${lastUpdate}`} />

            <MetaBadge label={jurisdiction} />
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="mx-auto max-w-5xl space-y-10 px-6 pb-24">
        <SectionTitle
          id="aviso-legal-servicios"
          icon={<Scale className="h-6 w-6" />}
          title={t('termsPage.title')}
          subtitle={`${t('termsPage.subtitle')} ${siteUrl}`}
        />

        <div className="prose prose-slate max-w-none">
          <p>{t('termsPage.responsable')}</p>

          <h3>{t('termsPage.objeto.title')}</h3>
          <p>{t('termsPage.objeto.text')}</p>

          <h3>{t('termsPage.uso.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('termsPage.uso.items').map((item, index) => (
              <Bullet key={index}>{item}</Bullet>
            ))}
          </ul>

          <h3>{t('termsPage.servicios.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('termsPage.servicios.items').map((item, index) => (
              <Bullet key={index}>{item}</Bullet>
            ))}
          </ul>

          <h3>{t('termsPage.responsabilidad.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('termsPage.responsabilidad.items').map((item, index) => (
              <Bullet key={index}>{item}</Bullet>
            ))}
          </ul>

          <h3>{t('termsPage.whatsapp.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('termsPage.whatsapp.items').map((item, index) => (
              <Bullet key={index}>{item}</Bullet>
            ))}
          </ul>

          <h3>{t('termsPage.pi.title')}</h3>
          <p>{t('termsPage.pi.text')}</p>

          <h3>{t('termsPage.registro.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('termsPage.registro.items').map((item, index) => (
              <Bullet key={index}>{item}</Bullet>
            ))}
          </ul>

          <h3>{t('termsPage.jurisdiccion.title')}</h3>
          <p>{t('termsPage.jurisdiccion.text')}</p>

          <h3>{t('termsPage.modificaciones.title')}</h3>
          <p>{t('termsPage.modificaciones.text')}</p>
        </div>

        <div className="mt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} RCCO ABOGADOS®. {t('footer.allRights')}
        </div>
      </section>
    </main>
  );
};
