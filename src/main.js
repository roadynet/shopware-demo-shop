const products = [
  {
    id: 'linen-apron',
    name: 'Leinen Atelier-Schurze',
    category: 'Studio',
    price: 79,
    rating: 4.8,
    badge: 'Bestseller',
    color: '#b7a081',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    description: 'Robuste Arbeitsqualitat mit weichem Griff und verstellbarem Nackenband.'
  },
  {
    id: 'ceramic-cup',
    name: 'Keramikbecher Set',
    category: 'Home',
    price: 46,
    rating: 4.7,
    badge: 'Neu',
    color: '#829b8e',
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
    description: 'Vier handglasierte Becher fur Espresso, Tee und ruhige Arbeitstage.'
  },
  {
    id: 'desk-lamp',
    name: 'Fokus Tischleuchte',
    category: 'Office',
    price: 129,
    rating: 4.9,
    badge: 'Limited',
    color: '#d3a15f',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    description: 'Blendarmes Licht, gedimmter Abendmodus und klare Metallform.'
  },
  {
    id: 'wool-throw',
    name: 'Merino Plaid',
    category: 'Home',
    price: 115,
    rating: 4.6,
    badge: 'Fair',
    color: '#947d92',
    image:
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=900&q=80',
    description: 'Dicht gewebtes Plaid aus Merinowolle fur Sofa, Studio und Reise.'
  },
  {
    id: 'notebook-kit',
    name: 'Planer Kit',
    category: 'Office',
    price: 38,
    rating: 4.5,
    badge: 'Bundle',
    color: '#6c8796',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    description: 'Notizbuch, Marker und Projektkarten fur kleine, gut gefuhrte Systeme.'
  },
  {
    id: 'market-tote',
    name: 'Canvas Market Tote',
    category: 'Studio',
    price: 34,
    rating: 4.7,
    badge: 'Eco',
    color: '#9d785b',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
    description: 'Stabile Alltagstasche mit Innenfach und verstarkten Nahten.'
  }
];

const categories = ['Alle', ...new Set(products.map((product) => product.category))];
const cart = new Map();
let selectedCategory = 'Alle';
let searchQuery = '';

const root = document.querySelector('#root');

function formatCurrency(value) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
}

function getCartItems() {
  return [...cart.values()];
}

function getCartTotals() {
  const subtotal = getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 5;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    count: getCartItems().reduce((sum, item) => sum + item.quantity, 0)
  };
}

function getFilteredProducts() {
  const normalizedQuery = searchQuery.toLowerCase();

  return products.filter((product) => {
    const matchesCategory = selectedCategory === 'Alle' || product.category === selectedCategory;
    const matchesSearch = `${product.name} ${product.description} ${product.category}`
      .toLowerCase()
      .includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const existing = cart.get(productId);

  cart.set(productId, {
    ...product,
    quantity: existing ? existing.quantity + 1 : 1
  });

  render();
  openCart();
}

function changeQuantity(productId, change) {
  const existing = cart.get(productId);

  if (!existing) {
    return;
  }

  const nextQuantity = existing.quantity + change;

  if (nextQuantity <= 0) {
    cart.delete(productId);
  } else {
    cart.set(productId, { ...existing, quantity: nextQuantity });
  }

  render();
  openCart();
}

function openCart() {
  document.querySelector('.cart-drawer')?.classList.add('open');
  document.querySelector('.cart-drawer')?.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  document.querySelector('.cart-drawer')?.classList.remove('open');
  document.querySelector('.cart-drawer')?.setAttribute('aria-hidden', 'true');
}

function render() {
  const totals = getCartTotals();
  const filteredProducts = getFilteredProducts();

  root.innerHTML = `
    <main>
      <header class="topbar">
        <a class="brand" href="#top" aria-label="Atelier Supply Startseite">
          <span>AS</span>
          Atelier Supply
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#produkte">Produkte</a>
          <a href="#checkout">Checkout</a>
          <a href="#portfolio">Portfolio</a>
        </nav>
        <button class="cart-button" type="button" data-cart-open aria-label="Warenkorb offnen">
          <span class="icon">Bag</span>
          <span>${totals.count}</span>
        </button>
      </header>

      <section class="hero" id="top">
        <div class="hero-copy">
          <p class="eyebrow">Shopware Demo Store</p>
          <h1>Atelier Supply</h1>
          <p>
            Ein ruhiger Concept Store fur Studio, Home und Office. Gebaut als Portfolio-Demo
            mit Produktkatalog, Filterlogik, Warenkorb und Checkout-Simulation.
          </p>
          <div class="hero-actions">
            <a class="primary-link" href="#produkte">Sortiment ansehen <span class="icon">-&gt;</span></a>
            <a class="secondary-link" href="#portfolio">Technik ansehen</a>
          </div>
        </div>
        <div class="hero-visual" aria-label="Ausgewahlte Shop-Produkte">
          <img src="${products[2].image}" alt="Design Tischleuchte" />
          <div class="floating-card">
            <span class="icon">New</span>
            <span>6 Produkte</span>
            <strong>Store API ready</strong>
          </div>
        </div>
      </section>

      <section class="trust-strip" aria-label="Shop Vorteile">
        <div><span class="icon">Truck</span> Versandfrei ab 120 EUR</div>
        <div><span class="icon">Safe</span> Sichere Checkout-Strecke</div>
        <div><span class="icon">Pack</span> Lagerstatus je Produkt</div>
        <div><span class="icon">Pay</span> Zahlungsarten vorbereitet</div>
      </section>

      <section class="catalog" id="produkte">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Katalog</p>
            <h2>Produkte entdecken</h2>
          </div>
          <label class="search-field">
            <span class="icon">Search</span>
            <input
              type="search"
              value="${escapeHtml(searchQuery)}"
              placeholder="Suche"
              aria-label="Produkte suchen"
              data-search
            />
          </label>
        </div>

        <div class="filters" aria-label="Kategorien filtern">
          <span class="icon">Filter</span>
          ${categories
            .map(
              (category) => `
                <button
                  class="${category === selectedCategory ? 'active' : ''}"
                  type="button"
                  data-category="${category}"
                >
                  ${category}
                </button>
              `
            )
            .join('')}
        </div>

        <div class="product-grid">
          ${filteredProducts.map(renderProductCard).join('')}
        </div>
      </section>

      <section class="checkout-preview" id="checkout">
        <div>
          <p class="eyebrow">Checkout</p>
          <h2>Demo-Bestellung ohne echte Zahlung</h2>
          <p>
            Die Checkout-Strecke bildet Warenkorb, Versandkosten, Summen und Bestellstatus ab.
            Fur eine echte Shopware-Anbindung waren Store API, Zahlungsanbieter und
            Kundenkonto der nachste Schritt.
          </p>
        </div>
        <div class="order-panel">
          <div class="order-row">
            <span>Zwischensumme</span>
            <strong>${formatCurrency(totals.subtotal)}</strong>
          </div>
          <div class="order-row">
            <span>Versand</span>
            <strong>${totals.shipping === 0 ? 'Kostenlos' : formatCurrency(totals.shipping)}</strong>
          </div>
          <div class="order-row total">
            <span>Gesamt</span>
            <strong>${formatCurrency(totals.total)}</strong>
          </div>
          <button type="button" data-cart-open>Warenkorb prufen <span class="icon">-&gt;</span></button>
        </div>
      </section>

      <section class="portfolio-notes" id="portfolio">
        <p class="eyebrow">Portfolio</p>
        <h2>Was dieses Projekt zeigt</h2>
        <div class="note-grid">
          ${[
            'Produktlisting mit Suche, Kategorie-Filter und stabilen Kartenlayouts',
            'JavaScript-State fur Warenkorb, Mengenanderung und Summenberechnung',
            'Checkout-nahe UI ohne echte personenbezogene Daten',
            'Vorbereitet fur Shopware Store API, Admin API und CMS-Inhalte'
          ]
            .map((note) => `<div class="note"><span class="icon">OK</span><span>${note}</span></div>`)
            .join('')}
        </div>
      </section>

      ${renderCartDrawer(totals)}
    </main>
  `;

  bindEvents();
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        <span style="background-color: ${product.color}">${product.badge}</span>
      </div>
      <div class="product-content">
        <div>
          <p>${product.category}</p>
          <h3>${product.name}</h3>
        </div>
        <p class="description">${product.description}</p>
        <div class="product-meta">
          <strong>${formatCurrency(product.price)}</strong>
          <span>${product.rating} Bewertung</span>
        </div>
        <button type="button" data-add="${product.id}">
          <span class="icon">+</span>
          In den Warenkorb
        </button>
      </div>
    </article>
  `;
}

function renderCartDrawer(totals) {
  const items = getCartItems();

  return `
    <aside class="cart-drawer" aria-hidden="true">
      <div class="drawer-backdrop" data-cart-close></div>
      <div class="drawer-panel" role="dialog" aria-label="Warenkorb">
        <div class="drawer-header">
          <div>
            <p class="eyebrow">Warenkorb</p>
            <h2>Deine Auswahl</h2>
          </div>
          <button class="icon-button" type="button" data-cart-close aria-label="Warenkorb schliessen">
            <span class="icon">X</span>
          </button>
        </div>

        ${
          items.length === 0
            ? `
              <div class="empty-cart">
                <span class="large-icon">Bag</span>
                <p>Der Warenkorb ist noch leer.</p>
              </div>
            `
            : `
              <div class="cart-items">
                ${items
                  .map(
                    (item) => `
                      <div class="cart-item">
                        <img src="${item.image}" alt="" />
                        <div>
                          <strong>${item.name}</strong>
                          <span>${formatCurrency(item.price)}</span>
                          <div class="quantity">
                            <button type="button" data-qty="${item.id}" data-change="-1" aria-label="Menge reduzieren">-</button>
                            <span>${item.quantity}</span>
                            <button type="button" data-qty="${item.id}" data-change="1" aria-label="Menge erhohen">+</button>
                          </div>
                        </div>
                      </div>
                    `
                  )
                  .join('')}
              </div>
            `
        }

        <div class="cart-summary">
          <div>
            <span>Zwischensumme</span>
            <strong>${formatCurrency(totals.subtotal)}</strong>
          </div>
          <div>
            <span>Versand</span>
            <strong>${totals.shipping === 0 ? 'Kostenlos' : formatCurrency(totals.shipping)}</strong>
          </div>
          <div class="grand-total">
            <span>Gesamt</span>
            <strong>${formatCurrency(totals.total)}</strong>
          </div>
          <button type="button" ${items.length === 0 ? 'disabled' : ''}>Demo-Bestellung abschliessen</button>
        </div>
      </div>
    </aside>
  `;
}

function bindEvents() {
  document.querySelectorAll('[data-cart-open]').forEach((button) => {
    button.addEventListener('click', openCart);
  });

  document.querySelectorAll('[data-cart-close]').forEach((button) => {
    button.addEventListener('click', closeCart);
  });

  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => addToCart(button.dataset.add));
  });

  document.querySelectorAll('[data-qty]').forEach((button) => {
    button.addEventListener('click', () => {
      changeQuantity(button.dataset.qty, Number(button.dataset.change));
    });
  });

  document.querySelectorAll('[data-category]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.category;
      render();
    });
  });

  document.querySelector('[data-search]')?.addEventListener('input', (event) => {
    searchQuery = event.target.value;
    render();
    document.querySelector('[data-search]')?.focus();
  });
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

render();
