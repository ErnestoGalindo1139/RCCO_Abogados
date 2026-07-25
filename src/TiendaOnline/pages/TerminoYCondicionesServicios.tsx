import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUp,
  ChevronRight,
  FileText,
  Scale,
  DownloadCloud,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

type LegalSection = {
  id: string;
  title: string;
  content: string;
};

const MetaBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
    {label}
  </span>
);

const SectionContent: React.FC<{ content: string }> = ({ content }) => {
  const blocks = useMemo(
    () =>
      content
        .split(/\n\s*\n/)
        .map((block) => block.replace(/\s*\n\s*/g, ' ').trim())
        .filter(Boolean),
    [content]
  );

  const renderContentWithLinks = (text: string) => {
    const privacyUrl = 'rccoabogados.com.mx/#/avisos-de-privacidad';
    const parts = text.split(privacyUrl);

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}

        {index < parts.length - 1 && (
          <a
            href="https://rccoabogados.com.mx/#/PoliticaDePrivacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-900 hover:decoration-blue-700"
          >
            {privacyUrl}
          </a>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div
      className="space-y-4 text-justify text-[15px] leading-7 text-slate-700 md:text-base"
      style={{ textAlign: 'justify' }}
    >
      {blocks.map((block, index) => {
        const isListItem = /^[a-z]\)\s/i.test(block);
        const isNumberedParagraph = /^\d+\.\d+\.\s/.test(block);

        if (isListItem) {
          const listIndicator = block.match(/^[a-z]\)/i)?.[0];
          const listContent = block.replace(/^[a-z]\)\s*/i, '');

          return (
            <div key={index} className="relative pl-7">
              <span className="absolute left-0 top-0 font-semibold text-blue-700">
                {listIndicator}
              </span>

              <p>{renderContentWithLinks(listContent)}</p>
            </div>
          );
        }

        if (isNumberedParagraph) {
          const number = block.match(/^\d+\.\d+\./)?.[0];
          const paragraphContent = block.replace(/^\d+\.\d+\.\s*/, '');

          return (
            <p key={index}>
              <strong className="font-semibold text-slate-900">{number}</strong>{' '}
              {renderContentWithLinks(paragraphContent)}
            </p>
          );
        }

        return <p key={index}>{renderContentWithLinks(block)}</p>;
      })}
    </div>
  );
};

export const TerminosYCondicionesServicios: React.FC = () => {
  const { t, i18n } = useTranslation('home');
  const [activeSection, setActiveSection] = useState('introduccion');
  const [mobileIndexOpen, setMobileIndexOpen] = useState(false);

  const sections = useMemo(
    () =>
      t('termsServices.sections', {
        returnObjects: true,
      }) as LegalSection[],
    [i18n.resolvedLanguage, t]
  );

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      window.history.scrollRestoration = previous || 'auto';
    };
  }, []);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-110px 0px -70% 0px', threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  const goToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileIndexOpen(false);
  };

  const navigation = (
    <nav aria-label={t('termsServices.indexTitle')} className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => goToSection(section.id)}
          className={`group flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
            activeSection === section.id
              ? 'bg-blue-50 font-medium text-blue-800'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <ChevronRight
            className={`mt-0.5 h-4 w-4 shrink-0 transition-transform ${
              activeSection === section.id
                ? 'translate-x-0.5 text-blue-600'
                : 'text-slate-400'
            }`}
          />
          <span className="line-clamp-2">{section.title}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <main id="inicio-terminos" className="min-h-screen bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.11),transparent_58%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 md:pb-16 md:pt-28">
          <div className="flex max-w-4xl items-start gap-4">
            <div className="hidden rounded-2xl border border-blue-100 bg-white/80 p-3 text-blue-700 shadow-sm sm:block">
              <Scale className="h-7 w-7" />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                RCCO Abogados
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                {t('termsServices.hero.title')}
              </h1>
              <p className="mt-2 text-lg font-medium text-slate-700 md:text-xl">
                {t('termsServices.hero.subtitle')}
              </p>
              <p className="mt-4 max-w-2xl text-slate-600">
                {t('termsServices.hero.intro')}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <MetaBadge
                  label={`${t('termsServices.meta.lastUpdateLabel')} ${t('termsServices.meta.lastUpdate')}`}
                />
                {/* <MetaBadge
                  label={`${t('termsServices.meta.versionLabel')} ${t('termsServices.meta.version')}`}
                /> */}
                <MetaBadge label={t('termsServices.meta.jurisdiction')} />
                <a
                  href="/Terminos-y-Condiciones.pdf"
                  download
                  aria-label={t('termsServices.downloadPdf', {
                    defaultValue: 'Descargar PDF',
                  })}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <DownloadCloud className="h-4 w-4" />
                  <span>
                    {t('termsServices.downloadPdf', { defaultValue: 'Descargar PDF' })}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-14">
        <aside className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileIndexOpen((open) => !open)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900"
            aria-expanded={mobileIndexOpen}
          >
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-700" />
              {t('termsServices.indexTitle')}
            </span>
            <ChevronRight
              className={`h-5 w-5 transition-transform ${mobileIndexOpen ? 'rotate-90' : ''}`}
            />
          </button>
          {mobileIndexOpen && (
            <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              {navigation}
            </div>
          )}
        </aside>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-3 flex items-center gap-2 px-3">
              <FileText className="h-5 w-5 text-blue-700" />
              <h2 className="font-semibold text-slate-950">
                {t('termsServices.indexTitle')}
              </h2>
            </div>
            <div className="max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
              {navigation}
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-slate-200 pb-12 last:border-b-0"
              >
                <header className="mb-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-600/60 via-blue-500/20 to-transparent" />
                </header>
                <SectionContent content={section.content} />
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500">
            <span>
              © {new Date().getFullYear()} RCCO ABOGADOS®.{' '}
              {t('footer.allRights')}
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 font-medium text-blue-700 hover:text-blue-900"
            >
              <ArrowUp className="h-4 w-4" />
              {t('termsServices.backToTop')}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};
