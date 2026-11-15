import { Crypto } from '../types/crypto';

const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana';

export async function fetchCryptoData(signal?: AbortSignal): Promise<Crypto[]> {
  const response = await fetch(COINGECKO_URL, { signal });
  if (!response.ok) {
    throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
  }
  const data: Crypto[] = await response.json();
  return data;
}