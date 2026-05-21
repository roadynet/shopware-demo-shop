const products = [
  {
    id: 'nlp',
    name: 'NLP',
    category: 'SkillBuilder Kurse',
    price: 37,
    rating: 4.8,
    badge: 'Published',
    color: '#1769ff',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    description: 'Automatisch aus SkillBuilder exportierter Kurs. Sichtbar, weil die Lesson veroeffentlicht ist.'
  },
  {
    id: 'symfony-update',
    name: 'Php update mit Symfony update',
    category: 'SkillBuilder Kurse',
    price: 37,
    rating: 4.7,
    badge: 'Updated',
    color: '#0b4fd8',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    description: 'Beispiel fuer ein aktualisiertes Shopware-Produkt aus einer veroeffentlichten SkillBuilder-Lesson.'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'SkillBuilder Kurse',
    price: 37,
    rating: 4.9,
    badge: 'Published',
    color: '#12a594',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    description: 'Produktdaten kommen aus SkillBuilder; Shopware uebernimmt Sichtbarkeit und Storefront-Ausgabe.'
  },
  {
    id: 'quantum-english',
    name: 'QuantenMechanic English',
    category: 'SkillBuilder Kurse',
    price: 37,
    rating: 4.6,
    badge: 'Published',
    color: '#5b21b6',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    description: 'Ein weiterer veroeffentlichter SkillBuilder-Kurs als sichtbares Shopware-Produkt.'
  },
  {
    id: 'quantum-spiritualitaet',
    name: 'Symbiose der QuantenMechanik und der Spiritualitaet',
    category: 'SkillBuilder Kurse',
    price: 37,
    rating: 4.5,
    badge: 'Published',
    color: '#1e3a8a',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    description: 'Kursdaten werden nicht doppelt gepflegt, sondern ueber den Admin-Import synchronisiert.'
  },
  {
    id: 'shopware-api',
    name: 'Shopware Admin API Import',
    category: 'Highlights',
    price: 37,
    rating: 4.7,
    badge: 'Bridge',
    color: '#0f172a',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    description: 'Portfolio-Highlight: Admin-Button, Symfony-Service, Shopware Admin API und Sync-Log.'
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
        <a class="brand" href="#top" aria-label="SkillBuilder Shopware Demo Startseite">
          <span>SB</span>
          SkillBuilder Shopware Demo
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#produkte">Produkte</a>
          <a href="#checkout">Demo-Modus</a>
          <a href="#portfolio">Portfolio</a>
        </nav>
        <button class="cart-button" type="button" data-cart-open aria-label="Warenkorb offnen">
          <span class="icon">Bag</span>
          <span>${totals.count}</span>
        </button>
      </header>

      <section class="hero" id="top">
        <div class="hero-copy">
          <p class="eyebrow">SkillBuilder Commerce Bridge</p>
          <h1>Veroeffentlichte Lessons werden Shopware-Produkte.</h1>
          <p>
            Diese Portfolio-Demo zeigt die echte Shopware Admin API Integration:
            SkillBuilder synchronisiert veroeffentlichte Kurse per Admin-Button als sichtbare Produkte.
            Bestellungen und Zahlungen sind bewusst deaktiviert.
          </p>
          <div class="hero-actions">
            <a class="primary-link" href="#produkte">Sortiment ansehen <span class="icon">-&gt;</span></a>
            <a class="secondary-link" href="#portfolio">Technik ansehen</a>
          </div>
        </div>
        <div class="hero-visual" aria-label="Ausgewaehlte SkillBuilder-Produkte">
          <img src="${products[2].image}" alt="SkillBuilder Kurs als Shopware-Produkt" />
          <div class="floating-card">
            <span class="icon">New</span>
            <span>Admin API Sync</span>
            <strong>Demo ohne Verkauf</strong>
          </div>
        </div>
      </section>

      <section class="trust-strip" aria-label="Shop Vorteile">
        <div><span class="icon">API</span> Produkte aus SkillBuilder</div>
        <div><span class="icon">No</span> Keine echten Bestellungen</div>
        <div><span class="icon">Lock</span> Keine Zahlung aktiv</div>
        <div><span class="icon">Log</span> Statusgesteuerte Synchronisation</div>
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
          <p class="eyebrow">Demo-Modus</p>
          <h2>Kein Verkauf, keine Bestellung, keine Zahlung</h2>
          <p>
            Der Warenkorb dient nur als klickbare Portfolio-Ansicht. Die Demo macht sichtbar,
            wie SkillBuilder-Inhalte im Shop erscheinen, ohne Kundendaten, Zahlungsanbieter
            oder echte Bestellungen zu verarbeiten.
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
          <button type="button" data-cart-open>Warenkorb als Demo ansehen <span class="icon">-&gt;</span></button>
        </div>
      </section>

      <section class="portfolio-notes" id="portfolio">
        <p class="eyebrow">Portfolio</p>
        <h2>Was dieses Projekt zeigt</h2>
        <div class="note-grid">
          ${[
            'Produktlisting mit Suche, Kategorie-Filter und stabilen Kartenlayouts',
            'JavaScript-State fur Warenkorb, Mengenanderung und Summenberechnung',
            'Demo-Modus ohne echte personenbezogene Daten, Zahlung oder Bestellung',
            'Reale Shopware Admin API Integration im verbundenen SkillBuilder Backend'
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
          <p class="cart-demo-note">Demo-Shop: Der Warenkorb ist nur eine Vorschau. Bestellungen sind deaktiviert.</p>
          <button type="button" disabled>Bestellung deaktiviert</button>
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
