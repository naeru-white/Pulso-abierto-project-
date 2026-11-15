export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  high_24h?: number;
  low_24h?: number;
  price_change_percentage_24h?: number;
  market_cap?: number;
}

export type UIStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';