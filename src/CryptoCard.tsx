// src/components/CryptoCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Crypto } from '../types/crypto';

interface Props {
  crypto: Crypto;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
}

export const CryptoCard: React.FC<Props> = ({ crypto, isPinned, onTogglePin }) => {
  return (
    <article className={`crypto-card ${isPinned ? 'pinned' : ''}`}>
      <img src={crypto.image} alt={crypto.name} width="32" height="32" />
      <h3>{crypto.name} <span>({crypto.symbol.toUpperCase()})</span></h3>
      <p className="price">USD ${crypto.current_price.toLocaleString()}</p>
      <div className="card-actions">
        <button
          type="button"
          onClick={() => onTogglePin(crypto.id)}
          className={`btn-pin ${isPinned ? 'active' : ''}`}
        >
          {isPinned ? '★ Destacada' : '☆ Destacar'}
        </button>
        <Link to={`/criptomonedas/${crypto.id}`} className="btn-detail">Ver Detalle →</Link>
      </div>
    </article>
  );
};