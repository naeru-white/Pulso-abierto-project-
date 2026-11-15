import './style.css';

// 1. Definición de la interfaz estricta (Evitamos 'any')
interface CryptoResponse {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  solana: { usd: number };
}

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

const form = document.getElementById('crypto-form') as HTMLFormElement;
const statusContainer = document.getElementById('status-container') as HTMLElement;
const resultsContainer = document.getElementById('results-container') as HTMLElement;
const submitButton = document.getElementById('consulta-btn') as HTMLButtonElement;

// Función asincrónica para consultar la API con fetch
async function fetchCryptoData() {
  // Estado de Carga
  setUIState('loading', '⏳ Consultando precios en tiempo real...');
  resultsContainer.innerHTML = '';
  submitButton.disabled = true;

  try {
    const response = await fetch(API_URL);

    // Comprobación response.ok
    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status} ${response.statusText}`);
    }

    const data: CryptoResponse = await response.json();

    // Verificación de Estado Vacío (simulado o validado)
    if (!data.bitcoin && !data.ethereum && !data.solana) {
      setUIState('empty', '🔍 La consulta fue correcta, pero no se encontraron resultados.');
      return;
    }

    // Estado de Éxito / Resultado
    setUIState('success', '✅ Cotizaciones actualizadas correctamente.');
    renderResults(data);

  } catch (error) {
    // Estado de Error
    console.error(error);
    setUIState('error', '❌ Ocurrió un error al conectar con la API de CoinGecko.');
  } finally {
    submitButton.disabled = false;
  }
}

// Controlador de los estados visuales de la interfaz
function setUIState(state: 'initial' | 'loading' | 'success' | 'empty' | 'error', message: string) {
  statusContainer.className = `status-box ${state}`;
  statusContainer.innerHTML = message;

  if (state === 'error') {
    // Agregamos botón de reintento en caso de error según consigna
    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn-retry';
    retryBtn.textContent = 'Volver a intentar';
    retryBtn.onclick = () => fetchCryptoData();
    statusContainer.appendChild(retryBtn);
  }
}

// Renderizado de tarjetas independientes
function renderResults(data: CryptoResponse) {
  resultsContainer.innerHTML = `
    <article class="crypto-card">
      <h3>Bitcoin <span>(BTC)</span></h3>
      <p class="price">USD $${data.bitcoin.usd.toLocaleString()}</p>
    </article>
    <article class="crypto-card">
      <h3>Ethereum <span>(ETH)</span></h3>
      <p class="price">USD $${data.ethereum.usd.toLocaleString()}</p>
    </article>
    <article class="crypto-card">
      <h3>Solana <span>(SOL)</span></h3>
      <p class="price">USD $${data.solana.usd.toLocaleString()}</p>
    </article>
  `;
}

// Evento del formulario evitando la recarga de página
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchCryptoData();
}); 