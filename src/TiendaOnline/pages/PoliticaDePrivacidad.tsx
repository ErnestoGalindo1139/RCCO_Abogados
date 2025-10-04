import React, { useEffect } from 'react';
import { Shield, Phone, Mail, Globe } from 'lucide-react';
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

const Callout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl border border-blue-300 bg-blue-50 p-4 md:p-5 text-blue-900">{children}</div>
);

const MetaBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
    {label}
  </span>
);


export const PoliticaDePrivacidadPage: React.FC = () => {
  const { t } = useTranslation('home'); // usa tu namespace

  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => { window.history.scrollRestoration = prev || 'auto'; };
  }, []);

  const arr = (key: string) => t(key, { returnObjects: true }) as string[];
  const lastUpdate = t('meta.lastUpdate');
  const jurisdiction = t('meta.jurisdiction');

  const heroTitle = t('privacy.title');
  const heroIntro = t('privacy.intro', {
    defaultValue: t('hero.intro', { brand: 'RCCO ABOGADOS®' })
  });

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
          id="aviso-privacidad"
          icon={<Shield className="w-6 h-6" />}
          title={t('privacy.title')}
          subtitle={t('privacy.subtitle')}
        />

        <div className="prose prose-slate max-w-none">
          <p>{t('privacy.responsable')}</p>

          <h3>{t('privacy.i.title')}</h3>
          <p>{t('privacy.i.ident.text')}</p>
          <ul className="list-none space-y-2">
            {arr('privacy.i.ident.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <p>{t('privacy.i.finanzas.text')}</p>
          <ul className="list-none space-y-2">
            {arr('privacy.i.finanzas.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <Callout>{t('privacy.consentCallout')}</Callout>

          <h3>{t('privacy.ii.title')}</h3>
          <ul className="list-none space-y-2">
            {arr('privacy.ii.items').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <h3>{t('privacy.iii.title')}</h3>
          <p>{t('privacy.iii.principalesLabel')}</p>
          <ul className="list-none space-y-2">
            {arr('privacy.iii.principales').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <p>{t('privacy.iii.secundariasLabel')}</p>
          <ul className="list-none space-y-2">
            {arr('privacy.iii.secundarias').map((li, i) => <Bullet key={i}>{li}</Bullet>)}
          </ul>

          <h3>{t('privacy.iv.title')}</h3>
          <p>{t('privacy.iv.text')}</p>

          <h3>{t('privacy.v.title')}</h3>
          <p>
            {t('privacy.v.text.beforeEmail')}
            <a className="text-blue-700 font-medium hover:underline" href={`mailto:${t('privacy.v.email')}`}>
              {t('privacy.v.email')}
            </a>
            {t('privacy.v.text.afterEmail')}
          </p>

          <h3>{t('privacy.vi.title')}</h3>
          <p>{t('privacy.vi.text')}</p>

          <h3>{t('privacy.vii.title')}</h3>
          <p>{t('privacy.vii.text')}</p>

          <h3>{t('privacy.viii.title')}</h3>
          <div className="not-prose grid sm:grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl border border-blue-300 bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <Mail className="w-4 h-4" />
                <span className="font-medium">{t('privacy.viii.cards.email.title')}</span>
              </div>
              <p className="mt-1">{t('privacy.viii.cards.email.value')}</p>
            </div>
            <div className="rounded-xl border border-blue-300 bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <Phone className="w-4 h-4" />
                <span className="font-medium">{t('privacy.viii.cards.phone.title')}</span>
              </div>
              <p className="mt-1">{t('privacy.viii.cards.phone.value')}</p>
            </div>
            <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 sm:col-span-2">
              <div className="flex items-center gap-2 text-blue-800">
                <Globe className="w-4 h-4" />
                <span className="font-medium">{t('privacy.viii.cards.addresses.title')}</span>
              </div>
              <ul className="mt-1 space-y-1">
                {arr('privacy.viii.cards.addresses.items').map((li, i) => <li key={i}>{li}</li>)}
              </ul>
            </div>
          </div>

          <Callout>{t('privacy.acceptCallout')}</Callout>
        </div>

        <div className="mt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} RCCO ABOGADOS®. {t('footer.allRights')}
        </div>
      </section>
    </main>
  );
};
