import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/styles/index.scss';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
