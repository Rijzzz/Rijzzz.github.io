// API key and Hypixel API URL
const apiKey = 'ea5788be-6cd7-4278-a394-aa9f54ab00d9';
const BAZAAR_URL = `https://api.hypixel.net/skyblock/bazaar?key=${apiKey}`;

async function fetchBazaarData() {
  try {
    const response = await fetch(BAZAAR_URL);
    const data = await response.json();
    const bazaarData = data.products;

    const tbody = document.querySelector('#bazaar-table tbody');
    tbody.innerHTML = '';

    Object.keys(bazaarData).forEach(item => {
      const { buy_summary, sell_summary } = bazaarData[item];

      const buyPrice = buy_summary.length ? buy_summary[0].pricePerUnit.toFixed(2) : 'N/A';
      const sellPrice = sell_summary.length ? sell_summary[0].pricePerUnit.toFixed(2) : 'N/A';

      const row = `
        <tr>
          <td>${item}</td>
          <td>${buyPrice}</td>
          <td>${sellPrice}</td>
        </tr>
      `;

      tbody.insertAdjacentHTML('beforeend', row);
    });
  } catch (error) {
    console.error('Error fetching Bazaar data:', error);
  }
}

// Fetch Bazaar data on page load
window.onload = fetchBazaarData;
