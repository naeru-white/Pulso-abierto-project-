import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchCryptoData } from '../services/cryptoService';
import { Crypto, UIStatus } from '../types/crypto';
import { SearchControls } from '../components/SearchControls';
import { StatusState } from '../components/StatusState';
import { CryptoList } from '../components/CryptoList';

export const HomePage: React.FC = () => {
  const [data, setData] = useState<Crypto[]>([]);
  const [status, setStatus] = useState<UIStatus>('idle');
  const [filters, setFilters] = useState({ searchTerm: '', category: 'all' });
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const loadData = useCallback(async (signal?: AbortSignal) => {
    setStatus('loading');
    try {
      const result = await fetchCryptoData(signal);
      setData(result);
      setStatus(result.length === 0 ? 'empty' : 'success');
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setStatus('error');
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadData(controller.signal);
    return () => controller.abort();
  }, [loadData]);

  const handleTogglePin = (id: string) => {
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const visibleCryptos = useMemo(() => {
    return data.filter((c) =>
      c.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      c.symbol.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
  }, [data, filters.searchTerm]);

  const resultsCount = visibleCryptos.length;

  return (
    <main className="container">
      <SearchControls onSearch={setFilters} />

      {status === 'success' && visibleCryptos.length === 0 ? (
        <StatusState status="empty" />
      ) : status !== 'success' ? (
        <StatusState status={status} onRetry={() => loadData()} />
      ) : (
        <section>
          <p className="results-count">Mostrando <strong>{resultsCount}</strong> registro(s)</p>
          <CryptoList
            cryptos={visibleCryptos}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
          />
        </section>
      )}
    </main>
  );
};