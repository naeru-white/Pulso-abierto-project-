import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header className="main-header">
        <div className="container header-content">
          <h1><Link to="/">Pulso Abierto</Link></h1>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criptomonedas/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer className="main-footer">
        <p>© 2026 Pulso Abierto - Actividad 2 React & TypeScript</p>
      </footer>
    </BrowserRouter>
  );
};