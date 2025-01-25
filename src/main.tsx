import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App.tsx';
import { MoviesProvider } from './contexts/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </StrictMode>
);
