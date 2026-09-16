// ==========================================================================
// ALVEOLO PIZZERÍA - APPLICATION LOGIC & DATA
// ==========================================================================

// Menu Database
const MENU_DATA = [
  {
    id: "mm-pesto",
    title: "Pizza Masa Madre (32 cm) - Pesto",
    category: "masa-madre",
    price: 500,
    desc: "Masa fermentada 48hs, salsa de tomate casera, muzzarella y remolino de pesto de la casa (perejil, ajo, albahaca).",
    image: "assets/pizza_masa_madre_pesto.jpg",
    badge: "⭐ Recomendada",
    gustos: ["Pesto", "Muzzarella", "Salsa de Tomate"]
  },
  {
    id: "mm-peperoni",
    title: "Pizza Masa Madre (32 cm) - Peperoni",
    category: "masa-madre",
    price: 500,
    desc: "Masa madre de 32cm con muzzarella derretida y abundantes rodajas de peperoni tostado a la piedra.",
    image: "assets/hero_pizza.png",
    badge: "Popular",
    gustos: ["Peperoni", "Muzzarella"]
  },
  {
    id: "mm-capresse",
    title: "Pizza Masa Madre (32 cm) - Capresse",
    category: "masa-madre",
    price: 500,
    desc: "Salsa de tomate, muzzarella fundida, rodajas de tomates frescos y hojas de albahaca recién cortadas.",
    image: "assets/pizza_burrata.png",
    badge: "Fresco",
    gustos: ["Tomate", "Albahaca", "Queso"]
  },
  {
    id: "mm-bondiola",
    title: "Pizza Masa Madre (32 cm) - Bondiola",
    category: "masa-madre",
    price: 500,
    desc: "Masa suave y esponjosa con muzzarella premium y fetas de bondiola artesanal horneada.",
    image: "assets/hero_pizza.png",
    badge: "Gourmet",
    gustos: ["Bondiola", "Muzzarella"]
  },
  {
    id: "mm-cebolla",
    title: "Pizza Masa Madre (32 cm) - Cebolla Caramelizada",
    category: "masa-madre",
    price: 500,
    desc: "Cebollas suavemente caramelizadas al horno sobre una base de muzzarella cremosísima.",
    image: "assets/pizza_masa_madre_pesto.jpg",
    badge: "Especial",
    gustos: ["Cebolla Caramelizada", "Muzzarella"]
  },
  {
    id: "mm-panceta",
    title: "Pizza Masa Madre (32 cm) - Panceta Crocante",
    category: "masa-madre",
    price: 500,
    desc: "Masa alveolada coronada con trozos generosos de panceta crocante dorada en el horno de piedra.",
    image: "assets/pizza_metro_panceta_aceitunas.jpg",
    badge: "Favorito",
    gustos: ["Panceta Crocante", "Muzzarella"]
  },

  // Por Metro Tradicional
  {
    id: "metro-half-muzza",
    title: "1/2 Metro de Muzza Tradicional",
    category: "por-metro",
    price: 450,
    desc: "Medio metro de pizza a la piedra con salsa de tomate especial y generosa muzzarella dorada.",
    image: "assets/pizza_medio_metro_coca.jpg",
    badge: "Rinde 2 personas"
  },
  {
    id: "metro-half-2gustos",
    title: "1/2 Metro de Muzza + 2 Gustos",
    category: "por-metro",
    price: 600,
    desc: "Medio metro de muzzarella tradicional a la piedra combinando 2 gustos a tu elección.",
    image: "assets/pizza_metro_panceta_aceitunas.jpg",
    badge: "Personalizable",
    hasOptions: true
  },
  {
    id: "metro-full-muzza",
    title: "1 Metro de Muzza Tradicional",
    category: "por-metro",
    price: 770,
    desc: "Un metro entero de nuestra clásica muzzarella a la piedra. La mejor opción para reuniones.",
    image: "assets/pizza_medio_metro_coca.jpg",
    badge: "Para Grupos (4 pers)"
  },
  {
    id: "metro-full-2gustos",
    title: "1 Metro de Muzza + 2 Gustos",
    category: "por-metro",
    price: 970,
    desc: "Un metro completo de muzzarella a la piedra combinando tus 2 gustos favoritos.",
    image: "assets/pizza_metro_panceta_aceitunas.jpg",
    badge: "El Gigante",
    hasOptions: true
  },

  // Gustos & Adicionales
  {
    id: "faina-slice",
    title: "Porción de Fainá Tradicional",
    category: "gustos",
    price: 120,
    desc: "Fainá de garbanzos dorado a la piedra con pimienta negra recién molida.",
    image: "assets/faina.png",
    badge: "Acompañamiento"
  },
  {
    id: "extra-gusto",
    title: "Gusto Adicional para Pizza",
    category: "gustos",
    price: 150,
    desc: "Agrega Bondiola, Capresse, Cebolla Caramelizada, Pesto, Panceta, Aceitunas o Peperoni.",
    image: "assets/logo.jpg",
    badge: "Extra"
  },

  // Bebidas
  {
    id: "coca-15l",
    title: "Coca-Cola / Coca-Cola Zero 1.5L",
    category: "bebidas",
    price: 180,
    desc: "Botella familiar de 1.5 Litros bien helada.",
    image: "assets/pizza_medio_metro_coca.jpg",
    badge: "Bebida"
  },
  {
    id: "cerveza-art",
    title: "Cerveza Artesanal 500ml",
    category: "bebidas",
    price: 220,
    desc: "Cerveza helada de cebada seleccionada ideal para maridar con pizza de masa madre.",
    image: "assets/hero_pizza.png",
    badge: "Fría"
  }
];

// Available Gustos options from Flyer
const AVAILABLE_GUSTOS = [
  "Bondiola",
  "Capresse (tomate, albahaca, queso)",
  "Cebolla caramelizada",
  "Pesto (perejil, ajo, albahaca)",
  "Panceta crocante",
  "Aceitunas",
  "Peperoni"
];

// Application State
let cart = [];
let deliveryMode = "delivery"; // 'delivery' or 'retiro'

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  renderProducts("todos");
  setupEventListeners();
  updateCartUI();
}

// Render Products Grid
function renderProducts(categoryFilter = "todos", searchQuery = "") {
  const container = document.getElementById("products-grid");
  if (!container) return;

  let filtered = MENU_DATA.filter(item => {
    const matchesCategory = categoryFilter === "todos" || item.category === categoryFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-pizza-slice" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-light);"></i>
        <h3>No se encontraron productos</h3>
        <p>Intenta con otra búsqueda o categoría.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="product-card">
      <div class="product-thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
      </div>
      <div class="product-details">
        <h3 class="product-title">${item.title}</h3>
        <p class="product-desc">${item.desc}</p>
        <div class="product-footer">
          <span class="product-price">$${item.price}</span>
          ${item.hasOptions ? `
            <button class="btn btn-sm btn-outline open-options-btn" data-id="${item.id}">
              <i class="fa-solid fa-sliders"></i> Elegir Gustos
            </button>
          ` : `
            <button class="btn btn-sm btn-primary add-to-cart-btn" data-id="${item.id}">
              <i class="fa-solid fa-plus"></i> Agregar
            </button>
          `}
        </div>
      </div>
    </div>
  `).join("");
}

// Event Listeners
function setupEventListeners() {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Filter Pills
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const category = pill.getAttribute("data-category");
      const searchVal = document.getElementById("menu-search").value;
      renderProducts(category, searchVal);
    });
  });

  // Search Input
  const searchInput = document.getElementById("menu-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activePill = document.querySelector(".filter-pill.active");
      const category = activePill ? activePill.getAttribute("data-category") : "todos";
      renderProducts(category, e.target.value);
    });
  }

  // Delegate Product Clicks (Add to cart & Options modal)
  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) {
    productsGrid.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".add-to-cart-btn");
      if (addBtn) {
        const itemId = addBtn.getAttribute("data-id");
        addToCartById(itemId);
        return;
      }

      const optionsBtn = e.target.closest(".open-options-btn");
      if (optionsBtn) {
        const itemId = optionsBtn.getAttribute("data-id");
        openOptionsModal(itemId);
      }
    });
  }

  // Direct Showcase Buttons
  document.querySelectorAll(".add-to-cart-direct").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");
      const price = parseInt(btn.getAttribute("data-price"), 10);
      addToCart({ id, title: name, price, qty: 1 });
    });
  });

  // Cart Drawer Triggers
  const cartBtn = document.getElementById("cart-btn");
  const cartClose = document.getElementById("cart-close");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const cartDrawer = document.getElementById("cart-drawer");

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  // Delivery Mode Toggle
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const addressGroup = document.getElementById("address-group");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      deliveryMode = btn.getAttribute("data-mode");
      if (addressGroup) {
        addressGroup.style.display = deliveryMode === "delivery" ? "block" : "none";
      }
    });
  });

  // Modal Close
  const modalClose = document.getElementById("modal-close");
  const modalBackdrop = document.getElementById("modal-backdrop");
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  // Checkout via WhatsApp
  const checkoutBtn = document.getElementById("checkout-whatsapp-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", sendWhatsAppOrder);
  }
}

// Add Item by ID
function addToCartById(itemId) {
  const item = MENU_DATA.find(m => m.id === itemId);
  if (item) {
    addToCart({ id: item.id, title: item.title, price: item.price, qty: 1 });
  }
}

// Add Item Object to Cart
function addToCart(itemObj) {
  const existing = cart.find(c => c.id === itemObj.id && c.selectedOptions === itemObj.selectedOptions);
  if (existing) {
    existing.qty += itemObj.qty || 1;
  } else {
    cart.push({ ...itemObj, qty: itemObj.qty || 1 });
  }
  updateCartUI();
  showToast(`¡${itemObj.title} agregado al pedido!`);
}

// Modal for selecting gustos
function openOptionsModal(itemId) {
  const item = MENU_DATA.find(m => m.id === itemId);
  if (!item) return;

  const modalBody = document.getElementById("modal-content-body");
  const modal = document.getElementById("item-modal");
  const backdrop = document.getElementById("modal-backdrop");

  modalBody.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--primary-dark);">
      Selecciona tus 2 Gustos
    </h3>
    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;">
      ${item.title} ($${item.price})
    </p>

    <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem;" id="gustos-checkboxes">
      ${AVAILABLE_GUSTOS.map((gusto, idx) => `
        <label style="display: flex; align-items: center; gap: 0.75rem; background: var(--bg-main); padding: 0.6rem 0.85rem; border-radius: 8px; cursor: pointer;">
          <input type="checkbox" value="${gusto}" class="gusto-chk" style="width: 18px; height: 18px; accent-color: var(--primary);">
          <span style="font-size: 0.95rem; font-weight: 600;">${gusto}</span>
        </label>
      `).join("")}
    </div>

    <button class="btn btn-primary btn-block" id="confirm-gustos-btn">
      <i class="fa-solid fa-plus"></i> Confirmar & Agregar ($${item.price})
    </button>
  `;

  modal.classList.add("active");
  backdrop.classList.add("active");

  const confirmBtn = document.getElementById("confirm-gustos-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const selected = Array.from(document.querySelectorAll(".gusto-chk:checked")).map(c => c.value);
      if (selected.length === 0) {
        alert("Por favor selecciona al menos 1 gusto.");
        return;
      }
      const titleWithOptions = `${item.title} (${selected.join(", ")})`;
      addToCart({
        id: `${item.id}-${Date.now()}`,
        title: titleWithOptions,
        price: item.price,
        qty: 1,
        selectedOptions: selected.join(", ")
      });
      closeModal();
    });
  }
}

function closeModal() {
  document.getElementById("item-modal")?.classList.remove("active");
  document.getElementById("modal-backdrop")?.classList.remove("active");
}

// Cart Drawer open/close
function openCart() {
  document.getElementById("cart-drawer")?.classList.add("active");
  document.getElementById("cart-backdrop")?.classList.add("active");
}

function closeCart() {
  document.getElementById("cart-drawer")?.classList.remove("active");
  document.getElementById("cart-backdrop")?.classList.remove("active");
}

// Update Cart UI
function updateCartUI() {
  const cartBody = document.getElementById("cart-body");
  const cartBadge = document.getElementById("cart-badge");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) cartBadge.textContent = totalCount;

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Tu carrito está vacío</h4>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Agrega tus pizzas favoritas del menú para continuar.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "$0";
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  let subtotal = 0;
  cartBody.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item">
        <div style="flex-grow: 1; padding-right: 0.75rem;">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">$${item.price} c/u</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
            <span style="font-weight: 700; font-size: 0.9rem;">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 800; font-family: var(--font-heading); color: var(--accent-red); font-size: 1.1rem;">
            $${itemTotal}
          </div>
          <button onclick="removeFromCart(${index})" style="color: var(--accent-red); font-size: 0.8rem; margin-top: 0.4rem;">
            <i class="fa-solid fa-trash-can"></i> Quitar
          </button>
        </div>
      </div>
    `;
  }).join("");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
  if (totalEl) totalEl.textContent = `$${subtotal}`;
}

function changeQty(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    updateCartUI();
  }
}

// Toast Notifications
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Send Order via WhatsApp
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío. Agrega productos del menú antes de enviar el pedido.");
    return;
  }

  const nameInput = document.getElementById("cust-name");
  const addressInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");

  const name = nameInput ? nameInput.value.trim() : "";
  const address = addressInput ? addressInput.value.trim() : "";
  const notes = notesInput ? notesInput.value.trim() : "";

  if (!name) {
    alert("Por favor ingresa tu nombre para personalizar el pedido.");
    if (nameInput) nameInput.focus();
    return;
  }

  if (deliveryMode === "delivery" && !address) {
    alert("Por favor ingresa tu dirección para el delivery.");
    if (addressInput) addressInput.focus();
    return;
  }

  let total = 0;
  let itemsText = cart.map(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `• ${item.qty}x ${item.title} -> *$${itemTotal}*`;
  }).join("\n");

  const modeText = deliveryMode === "delivery" ? `🛵 *DELIVERY A DOMICILIO*\n📍 *Dirección:* ${address}` : `🏪 *RETIRO EN EL LOCAL*`;

  let message = `🍕 *NUEVO PEDIDO - ALVEOLO PIZZERÍA*\n`;
  message += `==============================\n`;
  message += `👤 *Cliente:* ${name}\n`;
  message += `${modeText}\n`;
  message += `==============================\n\n`;
  message += `📋 *DETALLE DEL PEDIDO:*\n${itemsText}\n\n`;
  if (notes) {
    message += `💬 *Notas:* ${notes}\n\n`;
  }
  message += `💵 *TOTAL A PAGAR:* *$${total}*\n`;
  message += `==============================\n`;
  message += `¡Muchas gracias!`;

  const phone = "59895679986"; // Alveolo WhatsApp number from flyer
  const encodedUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(encodedUrl, "_blank");
}
