import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSimposio from '/img/1ER_SIMPOSIO_LOGO_PRINCIPAL_01.png';
import LogoCafe from '/img/logo-cafe.jpg';

export const EncuestaPopUpHomePage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="evento-overlay">
      <div className="evento-card animate-popup-zoom">
        {/* 🔝 LOGO SUPERIOR */}
        <div className="evento-logo-top">
          <img src={LogoSimposio} alt="Logo Simposio" />
        </div>

        {/* HEADER */}
        {/* <div className="evento-header cafe">
          <div className="evento-icon">☕</div>
          <span>Simposio 2026</span>
        </div> */}

        {/* TITLE */}
        <h2 className="evento-title">
          ¿Asististe a nuestro <span className="highlight">Simposio</span>?
        </h2>

        {/* TEXT */}
        <p className="evento-text">
          Si fuiste parte de nuestro evento, ayúdanos respondiendo esta
          <strong> encuesta de satisfacción</strong>.
        </p>

        <p className="evento-text">
          Tu opinión es muy importante para nosotros y como agradecimiento
          recibirás un <strong>café de cortesía en LE FROLLE</strong>.
        </p>

        <div className="evento-deco"></div>

        {/* BUTTONS */}
        <div className="evento-buttons">
          <button
            className="btn-primary-strong cafe"
            onClick={() => {
              navigate('/login-folio');
              setOpen(false);
            }}
          >
            Responder encuesta
          </button>

          <button className="btn-secondary-soft" onClick={() => setOpen(false)}>
            Más tarde
          </button>
        </div>

        {/* 🔻 LOGO INFERIOR */}
        <div className="evento-logo-bottom">
          <div className="cafe-info">
            <span className="cafe-label">Café de cortesía por parte de</span>
            {/* <span className="cafe-brand"> LE FROLLE</span> */}
          </div>

          <div className="cafe-logo-wrapper">
            <img src={LogoCafe} alt="Logo LE FROLLE" />
          </div>
        </div>

        {/* LEYENDA VALIDEZ */}
        <div className="evento-validity">Válido hasta el 10 de marzo</div>
      </div>

      <style>{`
        .evento-overlay {
          position: fixed;
          inset: 0;
          background: rgba(40, 20, 0, 0.65);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .evento-card {
          width: 92%;
          max-width: 500px;
          background: #ffffff;
          border-radius: 24px;
          padding: 32px 38px 28px 38px;
          text-align: center;
          position: relative;
          box-shadow: 0 25px 55px rgba(0,0,0,0.35);
          border: 1px solid rgba(120, 72, 0, 0.15);
          animation: card-float 6s ease-in-out infinite;
        }

        .evento-header {
          padding: 12px 22px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-weight: 700;
          margin-bottom: 22px;
          letter-spacing: 0.4px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }

        .evento-header.cafe {
          background: linear-gradient(90deg, #6f3b16, #a35a2c);
        }

        .evento-title {
          font-size: 24px;
          font-weight: 800;
          color: #3a1f0b;
          margin-bottom: 14px;
          line-height: 1.25;
        }

        .highlight {
          color: #a35a2c;
        }

        .evento-text {
          font-size: 15px;
          color: #444;
          margin-bottom: 12px;
          line-height: 1.45;
        }

        .evento-deco {
          width: 90px;
          height: 4px;
          margin: 24px auto 32px auto;
          border-radius: 6px;
          background: linear-gradient(90deg, #6f3b16, #a35a2c);
          animation: linePulse 1.2s infinite alternate ease-in-out;
        }

        .evento-buttons {
          display: flex;
          justify-content: center;
          gap: 18px;
        }

        .btn-primary-strong {
          color: white;
          padding: 12px 26px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          transition: 0.25s ease;
        }

        .btn-primary-strong.cafe {
          background: linear-gradient(90deg, #6f3b16, #a35a2c);
        }

        .btn-primary-strong:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .btn-secondary-soft {
          background: #e6e6e6;
          color: #444;
          padding: 12px 26px;
          border-radius: 10px;
          font-size: 15px;
          cursor: pointer;
          border: none;
          transition: 0.25s ease;
        }

        .btn-secondary-soft:hover {
          background: #d0d0d0;
        }

        @keyframes popupZoom {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(20px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-popup-zoom {
          animation: popupZoom 0.35s ease forwards;
        }

        /* LOGO SUPERIOR */
        .evento-logo-top {
          display: flex;
          justify-content: center;
          margin-bottom: 22px;
        }

        .evento-logo-top img {
          width: 100%;
          max-width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.15));
          transition: 0.3s ease;
        }

        .evento-logo-top img:hover {
          transform: scale(1.04);
        }

        /* BLOQUE INFERIOR PATROCINADOR */
        .evento-logo-bottom {
          margin-top: 42px;
          padding-top: 28px;
          border-top: 2px solid rgba(120, 72, 0, 0.12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .evento-validity {
          margin-top: 22px;
          padding-top: 14px;
          border-top: 1px dashed rgba(163, 90, 44, 0.4);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #6f3b16;
          opacity: 0.8;
        }

        /* TEXTO IZQUIERDA */
        .cafe-info {
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .cafe-label {
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8a6a52;
          margin-bottom: 4px;
          font-weight: 700;
        }

        .cafe-brand {
          font-size: 18px;
          font-weight: 800;
          color: #6f3b16;
          letter-spacing: 1px;
        }

        /* LOGO DERECHA */
        .cafe-logo-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cafe-logo-wrapper img {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 50%;
          padding: 12px;
          background: white;
          box-shadow: 
            0 8px 22px rgba(0,0,0,0.12),
            0 0 0 6px rgba(163, 90, 44, 0.08);
          transition: 0.3s ease;
        }

        .cafe-logo-wrapper img:hover {
          transform: scale(1.06);
          box-shadow: 
            0 12px 30px rgba(0,0,0,0.18),
            0 0 0 8px rgba(163, 90, 44, 0.15);
        }

        @keyframes card-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }

        @keyframes linePulse {
          0% { transform: scaleX(0.6); opacity: 0.6; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 640px) {
          .evento-card {
            padding: 24px 20px;
            max-width: 95%;
            border-radius: 20px;
          }

          .evento-logo-top {
            margin-bottom: 16px;
          }

          .evento-logo-top img {
            max-width: 140px;
          }

          .evento-title {
            font-size: 20px;
            margin-bottom: 12px;
          }

          .evento-text {
            font-size: 14px;
            margin-bottom: 10px;
          }

          .evento-deco {
            width: 70px;
            height: 3px;
            margin: 20px auto 24px auto;
          }

          .evento-buttons {
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .btn-primary-strong,
          .btn-secondary-soft {
            width: 100%;
            padding: 12px 20px;
            font-size: 14px;
          }

          .evento-logo-bottom {
            margin-top: 28px;
            padding-top: 20px;
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .cafe-info {
            text-align: center;
            align-items: center;
          }

          .cafe-label {
            font-size: 11px;
          }

          .cafe-brand {
            font-size: 16px;
          }

          .cafe-logo-wrapper img {
            width: 75px;
            height: 75px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};
