import React, { useEffect } from 'react';
import { Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// dentro de TerminosYCondiciones.tsx, arriba del export principal
const SectionTitle: React.FC<{ id: string; icon?: React.ReactNode; title: string; subtitle?: string }> = ({ id, icon, title, subtitle }) => (
  <header id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3">
      <span className="text-blue-600">{icon}</span>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
    </div>
    {subtitle && <p className="mt-1 text-slate-600 text-sm md:text-base">{subtitle}</p>}
    <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-500/60 via-blue-500/20 to-transparent" />
  </header>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="pl-4 relative">
    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-600" />
    <span className="text-slate-800">{children}</span>
  </li>
);

const MetaBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
    {label}
  </span>
);


export const TerminosYCondicionesPage: React.FC = () => {
  const { t } = useTranslation('home'); // usa tu namespace (ej: 'legal')

  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => { window.history.scrollRestoration = prev || 'auto'; };
  }, []);

  const arr = (key: string) => t(key, { returnObjects: true }) as string[];

  const lastUpdate = t('meta.lastUpdate');
  const jurisdiction = t('meta.jurisdiction');
  const heroTitle = t('legal.title');
  const heroIntro = t('hero.intro', { brand: 'RCCO ABOGADOS®' });
  const siteUrl = t('legal.site');

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.10),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-10 md:pt-28 md:pb-12 relative">
          <h1 className="text-3xl md:text-4xl font-bold">{heroTitle}</h1>
          <p className="mt-3 max-w-2xl text-slate-600">{heroIntro}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <MetaBadge label={`${t('meta.lastUpdateLabel')} ${lastUpdate}`} />
            <MetaBadge label={jurisdiction} />
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-10">
        <SectionTitle
          id="aviso-legal"
          icon={<Scale className="w-6 h-6" />}
          title={t('legal.title')}
          subtitle={`${t('legal.subtitle')} ${siteUrl}`}
        />

        <div className="prose prose-slate max-w-none">
          <p>{t('legal.responsable')}</p>

          <h3>{t('legal.objeto.title')}</h3>
          <p>{t('legal.objeto.text')}</p>

          <h3>{t('legal.uso.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('legal.uso.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <h3>{t('legal.servicios.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('legal.servicios.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <h3>{t('legal.responsabilidad.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('legal.responsabilidad.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <h3>{t('legal.whatsapp.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('legal.whatsapp.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <h3>{t('legal.pi.title')}</h3>
          <p>{t('legal.pi.text')}</p>

          <h3>{t('legal.registro.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('legal.registro.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <h3>{t('legal.jurisdiccion.title')}</h3>
          <p>{t('legal.jurisdiccion.text')}</p>

          <h3>{t('legal.modificaciones.title')}</h3>
          <p>{t('legal.modificaciones.text')}</p>
        </div>

        <div className="mt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} RCCO ABOGADOS®. {t('footer.allRights')}
        </div>
      </section>
    </main>
  );
};
