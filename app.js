/* =========================================================
   app.js — Lumière Dorée | Luxury Jewelry E-Commerce
   ========================================================= */

'use strict';

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Solitaire Éternité',
    category: 'bagues',
    catLabel: 'Bague',
    price: 3200,
    badge: 'bestseller',
    image: 'assets/ring_product.jpg',
    desc: 'Solitaire en or jaune 18 carats serti d\'un diamant brillant de 1,2 ct certifié GIA.',
    features: ['Or jaune 18 carats', 'Diamant 1,2 ct certifié GIA', 'Tailles 48-62 disponibles', 'Livraison offerte'],
  },
  {
    id: 2,
    name: 'Collier Lumière Perles',
    category: 'colliers',
    catLabel: 'Collier',
    price: 1850,
    badge: 'new',
    image: 'assets/necklace_product.jpg',
    desc: 'Collier de perles d\'eau douce naturelles reliées par des maillons en or jaune 18 carats, avec pendentif goutte.',
    features: ['Perles d\'eau douce AAA', 'Or jaune 18 carats', 'Longueur 45 cm', 'Emballage cadeau offert'],
  },
  {
    id: 3,
    name: 'Bracelet Tennis Diamants',
    category: 'bracelets',
    catLabel: 'Bracelet',
    price: 4600,
    badge: 'bestseller',
    image: 'assets/bracelet_product.jpg',
    desc: 'Bracelet tennis serti de 38 diamants ronds brillants en or jaune 18 carats. Un classique indémodable.',
    features: ['38 diamants totaux 2,8 ct', 'Or jaune 18 carats', 'Fermeture sécurisée double', 'Certificat GIA inclus'],
  },
  {
    id: 4,
    name: 'Boucles Saphir Royal',
    category: 'boucles',
    catLabel: 'Boucles d\'Oreilles',
    price: 2750,
    badge: 'new',
    image: 'assets/earrings_product.jpg',
    desc: 'Boucles d\'oreilles pendantes ornées de saphirs bleus de Ceylan entourés d\'un halo de diamants.',
    features: ['Saphirs de Ceylan naturels', 'Halo de diamants', 'Or jaune 18 carats', 'Coffret prestige inclus'],
  },
  {
    id: 5,
    name: 'Alliance Constellation',
    category: 'bagues',
    catLabel: 'Bague',
    price: 1480,
    badge: '',
    image: 'assets/ring_product.jpg',
    desc: 'Alliance semi-pavée de 16 diamants ronds en or blanc 18 carats. L\'alliance idéale pour une vie ensemble.',
    features: ['16 diamants 0,48 ct', 'Or blanc 18 carats', 'Tailles 48-60 disponibles', 'Gravure offerte'],
  },
  {
    id: 6,
    name: 'Jonc Or Guilloché',
    category: 'bracelets',
    catLabel: 'Bracelet',
    price: 890,
    badge: 'new',
    image: 'assets/bracelet_product.jpg',
    desc: 'Jonc rigide en or jaune 18 carats avec motif guilloché artisanal. Élégance intemporelle.',
    features: ['Or jaune 18 carats', 'Motif guilloché à la main', 'Diamètre intérieur 58 mm', 'Poids 18g'],
  },
  {
    id: 7,
    name: 'Pendentif Étoile Diamant',
    category: 'colliers',
    catLabel: 'Collier',
    price: 1250,
    badge: '',
    image: 'assets/necklace_product.jpg',
    desc: 'Délicat pendentif en forme d\'étoile pavé de diamants, en or blanc 18 carats sur chaîne fine.',
    features: ['Diamants 0,35 ct', 'Or blanc 18 carats', 'Chaîne 42 cm incluse', 'Livraison gratuite'],
  },
  {
    id: 8,
    name: 'Créoles Diamants Pavés',
    category: 'boucles',
    catLabel: 'Boucles d\'Oreilles',
    price: 1990,
    badge: 'bestseller',
    image: 'assets/earrings_product.jpg',
    desc: 'Boucles d\'oreilles créoles entièrement pavées de diamants brillants en or jaune 18 carats.',
    features: ['Diamants totaux 0,8 ct', 'Or jaune 18 carats', 'Diamètre 25 mm', 'Système fermoir sécurisé'],
  },
];

// ─── STATE ───────────────────────────────────────────────────────────────────
let cart = [];
let currentFilter = 'all';
let toastTimeout = null;
const wishlist = new Set(); // persists across re-renders

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const loader = document.getElementById('loader');
const header = document.getElementById('main-header');
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartSidebar = document.getElementById('cart-sidebar');
const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const cartFooterEl = document.getElementById('cart-footer');
const cartTotalEl = document.getElementById('cart-total-price');
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const modalOverlay = document.getElementById('product-modal-overlay');
const modalInner = document.getElementById('modal-inner');
const modalCloseBtn = document.getElementById('modal-close-btn');
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');
const collectionFilterBtns = document.querySelectorAll('.btn-card-link');
const heroParticles = document.getElementById('hero-particles');

// ─── LOADER ───────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    // Trigger hero animations after loader
    document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 160);
    });
    initScrollReveal();
    initParticles();
  }, 1900);
});

// ─── HEADER SCROLL ────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── HAMBURGER ────────────────────────────────────────────────────────────────
hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
mobileNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ─── SMOOTH SCROLL ───────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return; // skip bare # links (logo)
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── REVEAL ON SCROLL ────────────────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger children within a parent
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal-up:not(.visible)')];
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal-up:not(#hero .reveal-up)').forEach(el => observer.observe(el));
}

// ─── PARTICLES ───────────────────────────────────────────────────────────────
function initParticles() {
  const count = 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * -20}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    heroParticles.appendChild(p);
  }
}

// ─── PRODUCTS GRID ───────────────────────────────────────────────────────────
function renderProducts(filter = 'all') {
  productsGrid.innerHTML = '';
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  if (filtered.length === 0) {
    productsGrid.innerHTML = `<p style="text-align:center;color:var(--text-dim);grid-column:1/-1;padding:3rem">Aucun produit dans cette catégorie.</p>`;
    return;
  }

  filtered.forEach((product, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal-up';
    card.dataset.category = product.category;
    card.dataset.id = product.id;
    const inWishlist = wishlist.has(product.id);
    card.innerHTML = `
      <div class="product-img-wrap">
        ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge === 'new' ? 'Nouveau' : 'Best-seller'}</span>` : ''}
        <button class="product-wishlist" aria-label="${inWishlist ? 'Retirer des' : 'Ajouter aux'} favoris" data-id="${product.id}" style="opacity:${inWishlist ? 1 : ''}; color:${inWishlist ? 'var(--gold)' : ''}">${inWishlist ? '♥' : '♡'}</button>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <p class="product-cat">${product.catLabel}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc.substring(0, 80)}…</p>
        <div class="product-footer">
          <div>
            <span class="product-price">${product.price.toLocaleString('fr-FR')} €</span>
          </div>
          <button class="btn-add-cart" data-id="${product.id}" aria-label="Ajouter ${product.name} au panier">+ Panier</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);

    // Stagger reveal
    setTimeout(() => card.classList.add('visible'), i * 80);
  });

  // Bind events
  productsGrid.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.id));
    });
  });
  productsGrid.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.textContent = '♡';
        btn.style.color = '';
        btn.style.opacity = '';
        showToast('Retiré des favoris');
      } else {
        wishlist.add(id);
        btn.textContent = '♥';
        btn.style.color = 'var(--gold)';
        btn.style.opacity = '1';
        showToast('Ajouté aux favoris ✦');
      }
    });
  });
  productsGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
  });
}

// ─── FILTER ──────────────────────────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProducts(currentFilter);
  });
});

// Collection cards → filter
collectionFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.filterTarget;
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      filterBtns.forEach(b => b.classList.remove('active'));
      document.querySelector(`.filter-btn[data-filter="${target}"]`)?.classList.add('active');
      renderProducts(target);
    }, 600);
  });
});

// ─── CART ─────────────────────────────────────────────────────────────────────
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`"${product.name}" ajouté au panier`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  // Badge
  cartCountEl.textContent = totalQty;
  cartCountEl.classList.toggle('visible', totalQty > 0);

  // Items
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">◇</div>
        <p>Votre panier est vide</p>
        <span>Découvrez nos collections</span>
      </div>
    `;
    cartFooterEl.style.display = 'none';
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${item.image}" alt="${item.name}" /></div>
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${(item.price * item.qty).toLocaleString('fr-FR')} €</p>
          <div class="cart-item-controls">
            <button class="cart-qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Diminuer la quantité">−</button>
            <span class="cart-qty-value">${item.qty}</span>
            <button class="cart-qty-btn" data-action="increase" data-id="${item.id}" aria-label="Augmenter la quantité">+</button>
            <button class="cart-item-remove" data-id="${item.id}">Retirer</button>
          </div>
        </div>
      </div>
    `).join('');
    cartFooterEl.style.display = 'block';
    cartTotalEl.textContent = `${totalPrice.toLocaleString('fr-FR')} €`;

    cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
    cartItemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        const item = cart.find(c => c.id === id);
        if (!item) return;
        if (action === 'increase') {
          item.qty += 1;
        } else {
          item.qty -= 1;
          if (item.qty <= 0) { removeFromCart(id); return; }
        }
        updateCartUI();
      });
    });
  }
}

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
  showToast('Fonctionnalité de paiement à venir ✦');
});

// ─── TOAST ───────────────────────────────────────────────────────────────────
function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────
function openModal(id) {
  const p = PRODUCTS.find(prod => prod.id === id);
  if (!p) return;

  modalInner.innerHTML = `
    <div class="modal-img">
      <img src="${p.image}" alt="${p.name}" />
    </div>
    <div class="modal-info">
      <p class="modal-cat">${p.catLabel}</p>
      <h2 class="modal-name">${p.name}</h2>
      <p class="modal-price">${p.price.toLocaleString('fr-FR')} €</p>
      <p class="modal-desc">${p.desc}</p>
      <ul class="modal-features">
        ${p.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div class="modal-actions">
        <button class="btn-primary" id="modal-add-cart" data-id="${p.id}">Ajouter au Panier</button>
        <button class="btn-ghost" id="modal-close-inner">Continuer les achats</button>
      </div>
    </div>
  `;

  document.getElementById('modal-add-cart').addEventListener('click', () => {
    addToCart(p.id);
    closeModal();
    setTimeout(openCart, 300);
  });
  document.getElementById('modal-close-inner').addEventListener('click', closeModal);

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// Close modal / cart on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCart();
  }
});

// ─── NEWSLETTER ──────────────────────────────────────────────────────────────
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Veuillez entrer une adresse e-mail valide');
    return;
  }
  document.getElementById('newsletter-email').value = '';
  showToast('Merci pour votre inscription ! ✦');
});

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  if (!name || !email || !message) {
    showToast('Veuillez remplir tous les champs obligatoires');
    return;
  }
  contactForm.reset();
  showToast('Message envoyé avec succès ! ✦');
});

// ─── SEARCH (demo) ──────────────────────────────────────────────────────────
document.getElementById('search-btn').addEventListener('click', () => {
  showToast('Recherche — fonctionnalité à venir ✦');
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderProducts();
updateCartUI();
