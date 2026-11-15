// src/components/CryptoList.tsx
import React from 'react';
import { Crypto } from '../types/crypto';
import { CryptoCard } from './CryptoCard';

interface Props {
  cryptos: Crypto[];
  pinnedIds: string[];
  onTogglePin: (id: string) => void;
}

export const CryptoList: React.FC<Props> = ({ cryptos, pinnedIds, onTogglePin }) => {
  return (
    <div className="crypto-grid">
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          isPinned={pinnedIds.includes(crypto.id)}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
};