// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="container status-box error">
      <h1>404 - Página No Encontrada</h1>
      <Link to="/" className="btn-primary">Volver al Inicio</Link>
    </main>
  );
};