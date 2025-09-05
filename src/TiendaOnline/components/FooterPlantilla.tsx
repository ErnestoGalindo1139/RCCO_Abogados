import React from 'react';
import { LuFacebook, LuInstagram, LuLinkedin, LuYoutube } from 'react-icons/lu';
import { BsTiktok } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

type FooterProps = {
  company?: string;
  brandHref?: string; // link del “powered by”
  brandLabel?: string; // texto visible del “powered by”
  privacyHref?: string; // URL de tu política
};

export const Footer: React.FC<FooterProps> = ({
  company = 'RCCO Abogados',
  brandHref = 'https://grstechs.com',
  brandLabel = 'grstechs.com',
  privacyHref = '/privacy-policy',
}) => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="container mx-auto text-center">
        {/* CTA */}
        <div className="mb-4">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">
            {t('footer.cta.title')}
          </h3>
          <p className="text-blue-300 font-bold text-xl md:text-2xl">
            {t('footer.cta.subtitle')}
          </p>
        </div>

        {/* Redes */}
        <div className="flex justify-center space-x-4 text-3xl mt-4">
          <a
            href="https://www.facebook.com/profile.php?id=100063488083767"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
            aria-label={t('footer.socials.facebook')}
          >
            <LuFacebook />
          </a>
          <a
            href="https://www.instagram.com/rccoabogados/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
            aria-label={t('footer.socials.instagram')}
          >
            <LuInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/rcco-abogados-a4a222348/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
            aria-label={t('footer.socials.linkedin')}
          >
            <LuLinkedin />
          </a>
          <a
            href="https://youtube.com/@rccoabogados?si=qr4pvkcewB0tLcZc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
            aria-label={t('footer.socials.youtube')}
          >
            <LuYoutube />
          </a>
          <a
            href="https://www.tiktok.com/@rccoabogados?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
            aria-label={t('footer.socials.tiktok')}
          >
            <BsTiktok />
          </a>
        </div>

        {/* Línea divisoria */}
        <hr className="border-t border-blue-700 my-4" />

        {/* Copyright + Powered by + Privacidad */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-blue-400 text-sm md:text-[1rem]">
          <p>
            © {new Date().getFullYear()} {company}. {t('footer.copyright')}
          </p>
          <span className="hidden md:inline">•</span>
          <p>
            {t('footer.poweredBy')}{' '}
            <a
              href={brandHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 font-medium text-[#ffffff]"
              aria-label={t('footer.poweredByAria', { brand: brandLabel })}
            >
              {brandLabel}
            </a>
          </p>
          <span className="hidden md:inline">•</span>
          <a href={privacyHref} className="hover:text-blue-300 font-medium">
            {t('footer.privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
};
