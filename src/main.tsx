import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css';
import { TiendaOnlineApp } from './TiendaOnlineApp';
import { HashRouter } from 'react-router-dom';

import './TiendaOnline/i18n/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TiendaOnlineApp />
    </HashRouter>
  </StrictMode>
);
