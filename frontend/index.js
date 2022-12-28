// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client'
import { WalletProvider } from './hooks/useWallet';
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <WalletProvider>
        <App />
      </WalletProvider>
    </HashRouter>
  </React.StrictMode>
);