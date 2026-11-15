
export interface FormattedCrypto {
  id: string;
  name: string;
  priceUsd: number;
}

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

export async function fetchCryptoPrices(): Promise<FormattedCrypto[]> {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error(`Error en la consulta HTTP: ${response.status}`);
  }

  const data = await response.json();

  return [
    { id: 'bitcoin', name: 'Bitcoin', priceUsd: data.bitcoin?.usd ?? 0 },
    { id: 'ethereum', name: 'Ethereum', priceUsd: data.ethereum?.usd ?? 0 },
    { id: 'solana', name: 'Solana', priceUsd: data.solana?.usd ?? 0 },
  ];
}