/* ============================================================
   IDLI EXPRESS — Shared App State & Utilities
   ============================================================ */

// ─── MENU DATA ───────────────────────────────────────────────
const MENU_DATA = {
  classics: [
    {
      id: 'idli',
      name: 'Idli',
      desc: 'Pillowy soft steamed rice cakes, served warm',
      hasGluten: false,
      images: [
        'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/idli-recipe-1.jpg',
        'https://www.cookwithmanali.com/wp-content/uploads/2019/10/idli-recipe.jpg'
      ],
      emoji: '🍚'
    },
    {
      id: 'medu-vada',
      name: 'Medu Vada',
      desc: 'Golden crispy lentil doughnuts, crunchy outside, fluffy inside',
      hasGluten: false,
      images: [
        'https://www.cookwithmanali.com/wp-content/uploads/2019/11/medu-vada.jpg',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2020/10/medu-vada-1.jpg'
      ],
      emoji: '🍩'
    }
  ],
  combos: [
    {
      id: 'mini-combo',
      name: 'Mini Combo',
      desc: '2 Idlis + 1 Medu Vada — a light & satisfying meal',
      hasGluten: false,
      images: [
        'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/idli-recipe-1.jpg',
        'https://www.cookwithmanali.com/wp-content/uploads/2019/10/idli-recipe.jpg'
      ],
      emoji: '🍽️'
    },
    {
      id: 'full-set',
      name: 'Full Set',
      desc: '3 Idlis + 2 Medu Vadas — the classic South Indian spread',
      hasGluten: false,
      images: [
        'https://www.cookwithmanali.com/wp-content/uploads/2019/11/medu-vada.jpg',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2020/10/medu-vada-1.jpg'
      ],
      emoji: '🥘'
    },
    {
      id: 'five-idli',
      name: 'Five Idli Plate',
      desc: 'Five soft idlis — perfect for a hearty appetite',
      hasGluten: false,
      images: [
        'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/idli-recipe-1.jpg',
        'https://www.cookwithmanali.com/wp-content/uploads/2019/10/idli-recipe.jpg'
      ],
      emoji: '🍚'
    },
    {
      id: 'sambar-vada',
      name: 'Sambar Vada',
      desc: 'Crispy vada dunked in warm, spiced sambar',
      hasGluten: false,
      images: [
        'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/01/sambar-vada-recipe.jpg',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2021/07/sambar-vada-1.jpg'
      ],
      emoji: '🥣'
    }
  ],
  chutneys: [
    {
      id: 'red-chutney',
      name: 'Red Chutney',
      desc: 'Tangy tomato & spice blend',
      hasGluten: false,
      images: [
        'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/05/tomato-chutney-recipe.jpg',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2021/03/tomato-chutney-1.jpg'
      ],
      emoji: '🍅'
    },
    {
      id: 'white-chutney',
      name: 'White Chutney',
      desc: 'Creamy coconut & temper',
      hasGluten: false,
      images: [
        'https://www.cookwithmanali.com/wp-content/uploads/2019/01/coconut-chutney-recipe.jpg',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2021/02/coconut-chutney-recipe-1.jpg'
      ],
      emoji: '🥥'
    }
  ],
  sides: [
    {
      id: 'sambar',
      name: 'Sambar',
      desc: 'Lentil vegetable stew',
      hasGluten: false,
      images: [
        'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/sambar-recipe.jpg',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2020/09/sambar-recipe-1.jpg'
      ],
      emoji: '🍲'
    },
    {
      id: 'idli-podi',
      name: 'Idli Podi',
      desc: 'Spiced lentil powder',
      hasGluten: false,
      images: [
        'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/idli-podi-recipe.jpg',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/idli-podi-1.jpg'
      ],
      emoji: '🌶️'
    },
    {
      id: 'utensils',
      name: 'Utensils',
      desc: 'Cutlery set on request',
      hasGluten: false,
      images: [
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80'
      ],
      emoji: '🥄'
    }
  ]
};

const DISCOUNT_CODES = {
  'IDLI10': 10,
  'WELCOME20': 20,
  'NEWUSER15': 15
};

// ─── CART STATE ──────────────────────────────────────────────
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('ie_cart') || '[]');
  }

  save() {
    localStorage.setItem('ie_cart', JSON.stringify(this.items));
    this.updateUI();
  }

  add(item) {
    const key = `${item.id}-${item.glutenFree ? 'gf' : 'g'}`;
    const existing = this.items.find(i => i.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...item, key, qty: 1 });
    }
    this.save();
    showToast(`${item.name} added to cart!`);
  }

  remove(key) {
    this.items = this.items.filter(i => i.key !== key);
    this.save();
  }

  updateQty(key, delta) {
    const item = this.items.find(i => i.key === key);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) this.remove(key);
    else this.save();
  }

  get count() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  }

  get subtotal() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }

  updateUI() {
    const count = this.count;
    // Update all cart count elements
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
    document.querySelectorAll('.cart-fab-count').forEach(el => {
      el.textContent = count;
    });
    const fab = document.querySelector('.cart-fab');
    if (fab) fab.classList.toggle('hidden', count === 0);
  }
}

// Global cart instance
const cart = new Cart();

// ─── CHECKOUT DATA ───────────────────────────────────────────
const CheckoutData = {
  get() {
    return JSON.parse(localStorage.getItem('ie_checkout') || '{}');
  },
  save(data) {
    localStorage.setItem('ie_checkout', JSON.stringify(data));
  },
  getOrder() {
    return JSON.parse(localStorage.getItem('ie_order') || '{}');
  },
  saveOrder(data) {
    localStorage.setItem('ie_order', JSON.stringify(data));
  }
};

// ─── IMAGE LOADER ─────────────────────────────────────────────
function loadImage(imgEl, fallbackEl, sources, idx = 0) {
  if (!imgEl) return;
  if (idx >= sources.length) {
    if (imgEl) imgEl.style.display = 'none';
    if (fallbackEl) fallbackEl.style.display = 'flex';
    return;
  }
  imgEl.onload = () => {
    imgEl.style.display = 'block';
    if (fallbackEl) fallbackEl.style.display = 'none';
  };
  imgEl.onerror = () => loadImage(imgEl, fallbackEl, sources, idx + 1);
  imgEl.src = sources[idx];
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── NAVBAR ──────────────────────────────────────────────────
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }
  cart.updateUI();
}

// ─── GENERATE DELIVERY TIMES ──────────────────────────────────
function generateDeliveryTimes() {
  const times = [];
  for (let h = 7; h <= 10; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      const suffix = h < 12 ? 'AM' : 'PM';
      const h12 = h > 12 ? h - 12 : h;
      times.push({ value: `${hh}:${mm}`, label: `${h12}:${mm} ${suffix}` });
    }
  }
  times.push({ value: '11:00', label: '11:00 AM' });
  return times;
}

// ─── NAV LOGO SVG ─────────────────────────────────────────────
const NAV_LOGO_SVG = `<svg class="nav-logo-icon" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
  <circle cx="45" cy="45" r="43" fill="none" stroke="#C49A48" stroke-width="1.5"/>
  <path d="M30 28 Q27 22 30 16 Q33 10 30 4" fill="none" stroke="#C49A48" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M45 26 Q42 20 45 14 Q48 8 45 2" fill="none" stroke="#C49A48" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M60 28 Q57 22 60 16 Q63 10 60 4" fill="none" stroke="#C49A48" stroke-width="1.5" stroke-linecap="round"/>
  <ellipse cx="45" cy="60" rx="26" ry="5" fill="none" stroke="#C49A48" stroke-width="1"/>
  <ellipse cx="33" cy="53" rx="9" ry="6" fill="#F5C87A" opacity="0.9"/>
  <ellipse cx="57" cy="53" rx="9" ry="6" fill="#F5C87A" opacity="0.9"/>
  <ellipse cx="45" cy="49" rx="9" ry="6" fill="#F5C87A"/>
  <ellipse cx="45" cy="68" rx="11" ry="5" fill="#B86A1A" opacity="0.85"/>
  <ellipse cx="45" cy="68" rx="5" ry="2.5" fill="#1A1008"/>
</svg>`;

// ─── SHARED NAV HTML ──────────────────────────────────────────
function renderNav(activePage) {
  const pages = [
    { id: 'menu', label: 'Menu', href: 'index.html' },
    { id: 'cart', label: 'Cart', href: 'cart.html' },
    { id: 'checkout', label: 'Checkout', href: 'checkout.html' }
  ];
  const navLinks = pages.map(p =>
    `<a href="${p.href}" class="nav-link${activePage === p.id ? ' active' : ''}">${p.label}</a>`
  ).join('');

  return `
  <nav class="navbar">
    <a href="index.html" class="nav-logo">
      ${NAV_LOGO_SVG}
      <span class="nav-logo-text">Idli Express</span>
    </a>
    <div class="nav-links">
      ${navLinks}
      <a href="cart.html" class="nav-cart-btn">
        🛒 Cart <span class="cart-count hidden">0</span>
      </a>
    </div>
    <button class="nav-hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    ${pages.map(p => `<a href="${p.href}" class="nav-link${activePage === p.id ? ' active' : ''}">${p.label}</a>`).join('')}
    <a href="cart.html" class="nav-cart-btn">
      🛒 Cart <span class="cart-count hidden">0</span>
    </a>
  </div>`;
}

// ─── STEPS BAR ───────────────────────────────────────────────
function renderSteps(activeStep) {
  // 0=menu, 1=cart, 2=checkout, 3=payment, 4=confirm
  const steps = ['Menu', 'Cart', 'Checkout', 'Payment', 'Done'];
  let html = '<div class="steps-bar">';
  steps.forEach((s, i) => {
    const done = i < activeStep;
    const active = i === activeStep;
    html += `<div class="step-item">
      <div class="step-dot ${done ? 'done' : active ? 'active' : ''}">
        ${done ? '✓' : i + 1}
      </div>
      <span class="step-label ${done ? 'done' : active ? 'active' : ''}">${s}</span>
    </div>`;
    if (i < steps.length - 1) {
      html += `<div class="step-connector${done ? ' done' : ''}"></div>`;
    }
  });
  html += '</div>';
  return html;
}

// ─── SHARED FOOTER ────────────────────────────────────────────
function renderFooter() {
  return `<footer>
    <strong>Idli Express</strong> &mdash; Authentic South Indian Kitchen<br>
    <span style="opacity:0.6;font-size:0.75rem;">© 2025 Idli Express. All rights reserved.</span>
  </footer>`;
}

// ─── FORMAT CURRENCY ─────────────────────────────────────────
function formatPrice(n) {
  return '$' + n.toFixed(2);
}

// Initialize nav on load
document.addEventListener('DOMContentLoaded', initNav);
