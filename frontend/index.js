// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client'
import { WalletProvider } from './hooks/useWallet';
import { HashRouter } from 'react-router-dom';
import { ProfileProvider } from './hooks/useProfile';
import { ValidateProvider } from './hooks/useValidate';
import ScrollToTop from './plugins/DefaultTop';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <WalletProvider>
        <ProfileProvider>
          <ValidateProvider>
          <ScrollToTop />
          <App />
          </ValidateProvider>
        </ProfileProvider>
      </WalletProvider>
    </HashRouter>
  </React.StrictMode>
);