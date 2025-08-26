import React from 'react';
import {
  LuClock2,
  LuFacebook,
  LuInstagram,
  LuLinkedin,
  LuMail,
} from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

type FooterProps = {
  email?: string; // por si lo quieres parametrizar (default: tu correo)
  phone?: string; // por si cambias el número
  hoursKeyOrText?: string; // clave o texto literal para el horario (default: footer.contact.hours)
  company?: string; // nombre para copyright (default: RCCO Abogados)
};

export const Footer: React.FC<FooterProps> = ({
  email = 'contacto@rccoabogados.com.mx',
  phone = '(+52) 669-2291-634',
  hoursKeyOrText = 'footer.contact.hours',
  company = 'RCCO Abogados',
}) => {
  const { t } = useTranslation('common');

  // Si recibes un literal en hoursKeyOrText, se usa tal cual; si es clave, se traduce.
  const hoursText = t(hoursKeyOrText, { defaultValue: hoursKeyOrText });

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

        {/* Contacto */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 mb-4">
          <div className="flex items-center space-x-2">
            <LuMail />
            <a
              href={`mailto:${email}`}
              className="text-base md:text-lg hover:text-blue-300"
              aria-label={`${t('footer.contact.emailAria')} ${email}`}
            >
              {email}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <LuClock2 />
            <p className="text-base md:text-lg">{hoursText}</p>
          </div>
          <div className="text-blue-300 font-bold text-xl md:text-2xl">
            {t('footer.contact.writeUs')} {phone}
          </div>
        </div>

        {/* Redes */}
        <div className="flex justify-center space-x-4 text-4xl mt-4">
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
            href="https://www.linkedin.com/company/rcco-abogados/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
            aria-label={t('footer.socials.linkedin')}
          >
            <LuLinkedin />
          </a>
        </div>

        {/* Línea divisoria */}
        <hr className="border-t border-blue-700 my-4" />

        {/* Copyright */}
        <p className="text-md text-blue-400">
          © {new Date().getFullYear()} {company}. {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};
