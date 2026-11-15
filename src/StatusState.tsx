import React from 'react';

interface Props {
  status: 'idle' | 'loading' | 'empty' | 'error';
  onRetry?: () => void;
}

export const StatusState: React.FC<Props> = ({ status, onRetry }) => {
  if (status === 'loading') {
    return <div className="status-box loading">⏳ Cargando cotizaciones en tiempo real...</div>;
  }

  if (status === 'empty') {
    return <div className="status-box empty">🔍 No se encontraron criptomonedas.</div>;
  }

  if (status === 'error') {
    return (
      <div className="status-box error">
        <p>❌ Error al consultar CoinGecko.</p>
        {onRetry && <button onClick={onRetry} className="btn-retry">Reintentar</button>}
      </div>
    );
  }

  return <div className="status-box idle">💡 Ingresa una búsqueda para filtrar cotizaciones.</div>;
};