// src/pages/DetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCryptoData } from '../services/cryptoService';
import { Crypto } from '../types/crypto';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState<Crypto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await fetchCryptoData();
        const found = list.find((c) => c.id === id);
        setCrypto(found || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="container status-box loading">⏳ Cargando detalle...</div>;

  if (!crypto) {
    return (
      <main className="container status-box error">
        <h2>⚠️ Criptomoneda no encontrada</h2>
        <p>El ID <code>{id}</code> no existe.</p>
        <Link to="/" className="btn-primary">← Volver al Inicio</Link>
      </main>
    );
  }

  return (
    <main className="container detail-container">
      <Link to="/" className="btn-back">← Volver al Listado</Link>
      <div className="detail-card">
        <img src={crypto.image} alt={crypto.name} width="64" height="64" />
        <h1>{crypto.name} ({crypto.symbol.toUpperCase()})</h1>
        <p className="detail-price">USD ${crypto.current_price.toLocaleString()}</p>
        {crypto.market_cap && <p><strong>Cap. Mercado:</strong> USD ${crypto.market_cap.toLocaleString()}</p>}
        {crypto.high_24h && <p><strong>Máximo 24h:</strong> USD ${crypto.high_24h.toLocaleString()}</p>}
        {crypto.low_24h && <p><strong>Mínimo 24h:</strong> USD ${crypto.low_24h.toLocaleString()}</p>}
      </div>
    </main>
  );
};