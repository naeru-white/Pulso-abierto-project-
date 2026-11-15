# Pulso Abierto — Consulta de Criptomonedas

## Descripción
Aplicación web desarrollada en TypeScript, HTML5 y CSS que permite consultar en tiempo real las cotizaciones actuales de Bitcoin, Ethereum y Solana expresadas en dólares estadounidenses mediante la API pública de CoinGecko.

## API utilizada
- **Nombre:** CoinGecko API
- **Endpoint consultado:** `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd`[cite: 5, 6]
- **Método:** GET[cite: 6]
- **Parámetros:**[cite: 6]
  - `ids`: Controla qué criptomonedas se consultan (bitcoin, ethereum, solana)[cite: 5, 6].
  - `vs_currencies`: Define la moneda en la que se expresa el precio (usd)[cite: 5, 6].
- **Propiedad de la respuesta utilizada:** `bitcoin.usd`, `ethereum.usd`, `solana.usd`[cite: 6].

## Instalación
Desde la terminal en la carpeta del proyecto, ejecuta:
```bash
npm install