// ==========================================================================
// ALVEOLO PIZZERÍA - FULL-STACK PLATFORM ENGINE (SUPABASE REALTIME & BACKOFFICE)
// ==========================================================================

// Initial Products Database
let productsData = [
  {
    id: "mm-pesto",
    title: "Pizza Masa Madre (32 cm) - Pesto",
    category: "masa-madre",
    price: 500,
    desc: "Masa fermentada 48hs, salsa de tomate casera, muzzarella y remolino de pesto de la casa (perejil, ajo, albahaca).",
    image: "assets/pizza_masa_madre_pesto.jpg",
    badge: "⭐ Recomendada",
    in_stock: true
  },
  {
    id: "mm-peperoni",
    title: "Pizza Masa Madre (32 cm) - Peperoni",
    category: "masa-madre",
    price: 500,
    desc: "Masa madre de 32cm con muzzarella derretida y abundantes rodajas de peperoni tostado a la piedra.",
    image: "assets/hero_pizza.png",
    badge: "Popular",
    in_stock: true
  },
  {
    id: "mm-capresse",
    title: "Pizza Masa Madre (32 cm) - Capresse",
    category: "masa-madre",
    price: 500,
    desc: "Salsa de tomate, muzzarella fundida, rodajas de tomates frescos y hojas de albahaca recién cortadas.",
    image: "assets/pizza_burrata.png",
    badge: "Fresco",
    in_stock: true
  },
  {
    id: "mm-bondiola",
    title: "Pizza Masa Madre (32 cm) - Bondiola",
    category: "masa-madre",
    price: 500,
    desc: "Masa suave y esponjosa con muzzarella premium y fetas de bondiola artesanal horneada.",
    image: "assets/hero_pizza.png",
    badge: "Gourmet",
    in_stock: true
  },
  {
    id: "mm-cebolla",
    title: "Pizza Masa Madre (32 cm) - Cebolla Caramelizada",
    category: "masa-madre",
    price: 500,
    desc: "Cebollas suavemente caramelizadas al horno sobre una base de muzzarella cremosísima.",
    image: "assets/pizza_masa_madre_pesto.jpg",
    badge: "Especial",
    in_stock: true
  },
  {
    id: "mm-panceta",
    title: "Pizza Masa Madre (32 cm) - Panceta Crocante",
    category: "masa-madre",
    price: 500,
    desc: "Masa alveolada coronada con trozos generosos de panceta crocante dorada en el horno de piedra.",
    image: "assets/pizza_metro_panceta_aceitunas.jpg",
    badge: "Favorito",
    in_stock: true
  },
  {
    id: "metro-half-muzza",
    title: "1/2 Metro de Muzza Tradicional",
    category: "por-metro",
    price: 450,
    desc: "Medio metro de pizza a la piedra con salsa de tomate especial y generosa muzzarella dorada.",
    image: "assets/pizza_medio_metro_coca.jpg",
    badge: "Rinde 2 personas",
    in_stock: true
  },
  {
    id: "metro-half-2gustos",
    title: "1/2 Metro de Muzza + 2 Gustos",
    category: "por-metro",
    price: 600,
    desc: "Medio metro de muzzarella tradicional a la piedra combinando 2 gustos a tu elección.",
    image: "assets/pizza_metro_panceta_aceitunas.jpg",
    badge: "Personalizable",
    hasOptions: true,
    in_stock: true
  },
  {
    id: "metro-full-muzza",
    title: "1 Metro de Muzza Tradicional",
    category: "por-metro",
    price: 770,
    desc: "Un metro entero de nuestra clásica muzzarella a la piedra. La mejor opción para reuniones.",
    image: "assets/pizza_medio_metro_coca.jpg",
    badge: "Para Grupos (4 pers)",
    in_stock: true
  },
  {
    id: "metro-full-2gustos",
    title: "1 Metro de Muzza + 2 Gustos",
    category: "por-metro",
    price: 970,
    desc: "Un metro completo de muzzarella a la piedra combinando tus 2 gustos favoritos.",
    image: "assets/pizza_metro_panceta_aceitunas.jpg",
    badge: "El Gigante",
    hasOptions: true,
    in_stock: true
  },
  {
    id: "faina-slice",
    title: "Porción de Fainá Tradicional",
    category: "gustos",
    price: 120,
    desc: "Fainá de garbanzos dorado a la piedra con pimienta negra recién molida.",
    image: "assets/faina.png",
    badge: "Acompañamiento",
    in_stock: true
  },
  {
    id: "extra-gusto",
    title: "Gusto Adicional para Pizza",
    category: "gustos",
    price: 150,
    desc: "Agrega Bondiola, Capresse, Cebolla Caramelizada, Pesto, Panceta, Aceitunas o Peperoni.",
    image: "assets/logo.jpg",
    badge: "Extra",
    in_stock: true
  },
  {
    id: "coca-15l",
    title: "Coca-Cola / Coca-Cola Zero 1.5L",
    category: "bebidas",
    price: 180,
    desc: "Botella familiar de 1.5 Litros bien helada.",
    image: "assets/pizza_medio_metro_coca.jpg",
    badge: "Bebida",
    in_stock: true
  },
  {
    id: "cerveza-art",
    title: "Cerveza Artesanal 500ml",
    category: "bebidas",
    price: 220,
    desc: "Cerveza helada de cebada seleccionada ideal para maridar con pizza de masa madre.",
    image: "assets/hero_pizza.png",
    badge: "Fría",
    in_stock: true
  }
];

let flavorsData = [
  { id: 1, name: "Bondiola", in_stock: true },
  { id: 2, name: "Capresse (tomate, albahaca, queso)", in_stock: true },
  { id: 3, name: "Cebolla caramelizada", in_stock: true },
  { id: 4, name: "Pesto (perejil, ajo, albahaca)", in_stock: true },
  { id: 5, name: "Panceta crocante", in_stock: true },
  { id: 6, name: "Aceitunas", in_stock: true },
  { id: 7, name: "Peperoni", in_stock: true }
];

let ordersData = [];
let isStoreOpen = true;

// Supabase State
let supabaseClient = null;
let supabaseUrl = localStorage.getItem("alveolo_sp_url") || "";
let supabaseKey = localStorage.getItem("alveolo_sp_key") || "";

// Shopping Cart State
let cart = [];
let deliveryMode = "delivery";
let kdsSoundEnabled = true;

// Synthetic Audio Chime Context
function playOrderChime() {
  if (!kdsSoundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.log("Audio play error:", e);
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initSupabase();
  setupViewSwitcher();
  setupEventListeners();
  renderProducts("todos");
  renderKDS();
  renderAdmin();
  updateCartUI();
});

// Initialize Supabase Client if keys exist
function initSupabase() {
  if (supabaseUrl && supabaseKey && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
      console.log("Connected to Supabase Realtime Database!");
      loadSupabaseData();
      subscribeToOrdersRealtime();
    } catch (err) {
      console.error("Error connecting to Supabase:", err);
    }
  } else {
    // Load local storage initial state
    const savedOrders = localStorage.getItem("alveolo_orders");
    if (savedOrders) ordersData = JSON.parse(savedOrders);
  }
}

// Load data from Supabase Cloud
async function loadSupabaseData() {
  if (!supabaseClient) return;

  // Load Products
  const { data: prods } = await supabaseClient.from("products").select("*");
  if (prods && prods.length > 0) {
    productsData = prods;
    renderProducts("todos");
  }

  // Load Flavors
  const { data: flavs } = await supabaseClient.from("flavors").select("*");
  if (flavs && flavs.length > 0) {
    flavorsData = flavs;
  }

  // Load Store Config
  const { data: conf } = await supabaseClient.from("store_settings").select("*").single();
  if (conf) {
    isStoreOpen = conf.is_open;
    updateStoreOpenUI();
  }

  // Load Orders
  const { data: ords } = await supabaseClient.from("orders").select("*").order("created_at", { ascending: false });
  if (ords) {
    ordersData = ords;
    renderKDS();
    renderAdminMetrics();
  }
}

// Subscribe to Supabase Realtime Channels for Kitchen KDS
function subscribeToOrdersRealtime() {
  if (!supabaseClient) return;

  supabaseClient
    .channel("public:orders")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
      ordersData.unshift(payload.new);
      renderKDS();
      renderAdminMetrics();
      playOrderChime();
      showToast("🔔 ¡NUEVO PEDIDO RECIBIDO EN COCINA!");
    })
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, (payload) => {
      const idx = ordersData.findIndex(o => o.id === payload.new.id);
      if (idx !== -1) ordersData[idx] = payload.new;
      renderKDS();
      renderAdminMetrics();
    })
    .subscribe();
}

// Setup View Switching Tabs (Storefront, KDS, Admin)
function setupViewSwitcher() {
  const modeBtns = document.querySelectorAll(".mode-btn");
  modeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const targetId = btn.getAttribute("data-target");
      document.querySelectorAll(".app-view").forEach(v => v.classList.remove("active"));
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.add("active");
      
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

// Render Products Grid (Storefront)
function renderProducts(categoryFilter = "todos", searchQuery = "") {
  const container = document.getElementById("products-grid");
  if (!container) return;

  let filtered = productsData.filter(item => {
    const matchesCategory = categoryFilter === "todos" || item.category === categoryFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
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
    <div class="product-card" style="${!item.in_stock ? 'opacity: 0.6;' : ''}">
      <div class="product-thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
        ${!item.in_stock ? `<span class="product-badge" style="background: var(--accent-red); right: auto; left: 10px;">AGOTADO</span>` : ''}
      </div>
      <div class="product-details">
        <h3 class="product-title">${item.title}</h3>
        <p class="product-desc">${item.desc || ''}</p>
        <div class="product-footer">
          <span class="product-price">$${item.price}</span>
          ${!item.in_stock ? `
            <button class="btn btn-sm btn-secondary" disabled>Sin Stock</button>
          ` : item.hasOptions ? `
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

// Render Kitchen Display System (KDS)
function renderKDS() {
  const colPendiente = document.getElementById("list-pendiente");
  const colEnHorno = document.getElementById("list-en_horno");
  const colListo = document.getElementById("list-listo");
  const colEntregado = document.getElementById("list-entregado");

  if (!colPendiente) return;

  const grouped = {
    pendiente: ordersData.filter(o => o.status === "pendiente" || !o.status),
    en_horno: ordersData.filter(o => o.status === "en_horno"),
    listo: ordersData.filter(o => o.status === "listo"),
    entregado: ordersData.filter(o => o.status === "entregado")
  };

  document.getElementById("count-pendiente").textContent = grouped.pendiente.length;
  document.getElementById("count-en_horno").textContent = grouped.en_horno.length;
  document.getElementById("count-listo").textContent = grouped.listo.length;
  document.getElementById("count-entregado").textContent = grouped.entregado.length;

  renderKDSCards(colPendiente, grouped.pendiente, "en_horno", "🔥 Pasar a Horno");
  renderKDSCards(colEnHorno, grouped.en_horno, "listo", "✅ Marcar Listo");
  renderKDSCards(colListo, grouped.listo, "entregado", "📦 Marcar Entregado");
  renderKDSCards(colEntregado, grouped.entregado, null, "Completado");
}

function renderKDSCards(container, list, nextStatus, nextActionText) {
  if (list.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #617769; padding: 2rem 0; font-size: 0.9rem;">Sin comandas</div>`;
    return;
  }

  container.innerHTML = list.map(order => {
    const timeStr = new Date(order.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const itemsList = Array.isArray(order.items) ? order.items : [];

    return `
      <div class="kds-ticket">
        <div class="kds-ticket-header">
          <div>
            <div class="kds-ticket-cust">${order.customer_name}</div>
            <div class="kds-ticket-time"><i class="fa-solid fa-clock"></i> ${timeStr} | ${order.delivery_mode === 'delivery' ? '🛵 Delivery' : '🏪 Retiro'}</div>
          </div>
          <div style="font-weight: 800; color: var(--accent-gold); font-size: 1.1rem;">$${order.total}</div>
        </div>
        <div class="kds-ticket-items">
          ${itemsList.map(it => `
            <div class="kds-ticket-item">
              <strong>${it.qty}x</strong> ${it.title}
            </div>
          `).join("")}
          ${order.notes ? `<div style="font-size: 0.8rem; color: #e5a93c; margin-top: 0.4rem;">💬 <em>${order.notes}</em></div>` : ''}
        </div>
        ${nextStatus ? `
          <button class="kds-ticket-btn" onclick="updateOrderStatus('${order.id}', '${nextStatus}')">
            ${nextActionText}
          </button>
        ` : `<div style="text-align: center; font-size: 0.8rem; color: #8fa697;">✔ Entregado</div>`}
      </div>
    `;
  }).join("");
}

// Update Order Status in Supabase / Local
async function updateOrderStatus(orderId, newStatus) {
  const order = ordersData.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
  }

  if (supabaseClient) {
    await supabaseClient.from("orders").update({ status: newStatus }).eq("id", orderId);
  } else {
    localStorage.setItem("alveolo_orders", JSON.stringify(ordersData));
  }

  renderKDS();
  renderAdminMetrics();
  showToast(`Estado de pedido actualizado a: ${newStatus.replace('_', ' ').toUpperCase()}`);
}

// Render Admin Dashboard
function renderAdmin() {
  renderAdminMetrics();
  renderAdminProductsTable();
  renderAdminFlavors();
}

function renderAdminMetrics() {
  const totalRevEl = document.getElementById("admin-total-revenue");
  const totalOrdersEl = document.getElementById("admin-total-orders");
  const topPizzaEl = document.getElementById("admin-top-pizza");

  const totalRev = ordersData.reduce((sum, o) => sum + (o.total || 0), 0);
  if (totalRevEl) totalRevEl.textContent = `$${totalRev}`;
  if (totalOrdersEl) totalOrdersEl.textContent = ordersData.length;
  if (topPizzaEl) topPizzaEl.textContent = "Masa Madre Pesto";
}

function renderAdminProductsTable() {
  const tbody = document.getElementById("admin-products-tbody");
  if (!tbody) return;

  tbody.innerHTML = productsData.map(p => `
    <tr>
      <td><strong>${p.title}</strong></td>
      <td><span class="category-badge">${p.category}</span></td>
      <td>
        $<input type="number" class="price-input" value="${p.price}" onchange="updateProductPrice('${p.id}', this.value)">
      </td>
      <td>
        <input type="checkbox" ${p.in_stock ? 'checked' : ''} onchange="toggleProductStock('${p.id}', this.checked)" style="width: 18px; height: 18px; accent-color: var(--primary); cursor: pointer;">
      </td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="showToast('Precio actualizado')">Guardar</button>
      </td>
    </tr>
  `).join("");
}

function renderAdminFlavors() {
  const list = document.getElementById("admin-flavors-list");
  if (!list) return;

  const availableFlavors = flavorsData.filter(f => f.in_stock);
  list.innerHTML = flavorsData.map(f => `
    <div class="flavor-row">
      <span style="font-weight: 700;">${f.name}</span>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" ${f.in_stock ? 'checked' : ''} onchange="toggleFlavorStock(${f.id}, this.checked)" style="width: 18px; height: 18px; accent-color: var(--primary);">
        <span style="font-size: 0.85rem;">En Stock</span>
      </label>
    </div>
  `).join("");
}

// Update Product Price
async function updateProductPrice(id, newPrice) {
  const prod = productsData.find(p => p.id === id);
  if (prod) prod.price = parseInt(newPrice, 10) || prod.price;

  if (supabaseClient) {
    await supabaseClient.from("products").update({ price: prod.price }).eq("id", id);
  }
  renderProducts("todos");
  showToast("Precio guardado en la base de datos.");
}

// Toggle Product Stock
async function toggleProductStock(id, inStock) {
  const prod = productsData.find(p => p.id === id);
  if (prod) prod.in_stock = inStock;

  if (supabaseClient) {
    await supabaseClient.from("products").update({ in_stock: inStock }).eq("id", id);
  }
  renderProducts("todos");
  showToast(`Stock de producto ${inStock ? 'activado' : 'desactivado'}`);
}

// Toggle Flavor Stock
async function toggleFlavorStock(flavorId, inStock) {
  const flav = flavorsData.find(f => f.id === flavorId);
  if (flav) flav.in_stock = inStock;

  if (supabaseClient) {
    await supabaseClient.from("flavors").update({ in_stock: inStock }).eq("id", flavorId);
  }
  showToast(`Gusto ${flav ? flav.name : ''} ${inStock ? 'disponible' : 'pausado'}`);
}

// Toggle Store Open/Close Status
async function toggleStoreStatus() {
  isStoreOpen = !isStoreOpen;
  updateStoreOpenUI();

  if (supabaseClient) {
    await supabaseClient.from("store_settings").update({ is_open: isStoreOpen }).eq("id", 1);
  }
  showToast(`Local marcado como ${isStoreOpen ? 'ABIERTO' : 'CERRADO'}`);
}

function updateStoreOpenUI() {
  const statusHeader = document.getElementById("status-text-header");
  const dot = document.querySelector(".status-dot");
  const adminBtn = document.getElementById("admin-toggle-store-btn");

  if (statusHeader) statusHeader.textContent = isStoreOpen ? "LOCAL ABIERTO" : "LOCAL CERRADO";
  if (dot) dot.className = `status-dot ${isStoreOpen ? 'green' : 'red'}`;
  if (adminBtn) adminBtn.innerHTML = `<i class="fa-solid fa-store"></i> Local: ${isStoreOpen ? 'ABIERTO' : 'CERRADO'}`;
}

// Event Listeners
function setupEventListeners() {
  // Mobile Navigation
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
  }

  // Filter Pills
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
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

  // Products Grid delegate
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

  // Cart Drawer
  document.getElementById("cart-btn")?.addEventListener("click", openCart);
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-backdrop")?.addEventListener("click", closeCart);

  // Delivery Toggle Buttons
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const addressGroup = document.getElementById("address-group");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      deliveryMode = btn.getAttribute("data-mode");
      if (addressGroup) addressGroup.style.display = deliveryMode === "delivery" ? "block" : "none";
    });
  });

  // Admin Store Open/Closed Switch
  document.getElementById("admin-toggle-store-btn")?.addEventListener("click", toggleStoreStatus);

  // Supabase Config Modal Trigger
  document.getElementById("btn-config-supabase")?.addEventListener("click", () => {
    document.getElementById("modal-supabase")?.classList.add("active");
    document.getElementById("modal-supabase-backdrop")?.classList.add("active");
  });

  document.getElementById("modal-supabase-close")?.addEventListener("click", closeSupabaseModal);
  document.getElementById("modal-supabase-backdrop")?.addEventListener("click", closeSupabaseModal);

  // Save Supabase Keys
  document.getElementById("btn-save-supabase-keys")?.addEventListener("click", () => {
    const url = document.getElementById("sp-url").value.trim();
    const key = document.getElementById("sp-key").value.trim();
    if (!url || !key) {
      alert("Por favor ingresa la SUPABASE_URL y la SUPABASE_ANON_KEY de tu proyecto.");
      return;
    }
    localStorage.setItem("alveolo_sp_url", url);
    localStorage.setItem("alveolo_sp_key", key);
    supabaseUrl = url;
    supabaseKey = key;
    initSupabase();
    closeSupabaseModal();
    showToast("¡Credenciales de Supabase guardadas y conectadas!");
  });

  // KDS Sound Toggle
  document.getElementById("kds-sound-toggle")?.addEventListener("click", (e) => {
    kdsSoundEnabled = !kdsSoundEnabled;
    e.target.closest("button").innerHTML = `<i class="fa-solid fa-volume-${kdsSoundEnabled ? 'high' : 'xmark'}"></i> Sonido: ${kdsSoundEnabled ? 'ON' : 'OFF'}`;
  });

  // Modal Close
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("modal-backdrop")?.addEventListener("click", closeModal);

  // Checkout Button
  document.getElementById("checkout-whatsapp-btn")?.addEventListener("click", sendWhatsAppOrder);
}

function closeSupabaseModal() {
  document.getElementById("modal-supabase")?.classList.remove("active");
  document.getElementById("modal-supabase-backdrop")?.classList.remove("active");
}

function addToCartById(itemId) {
  const item = productsData.find(m => m.id === itemId);
  if (item) {
    addToCart({ id: item.id, title: item.title, price: item.price, qty: 1 });
  }
}

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

function openOptionsModal(itemId) {
  const item = productsData.find(m => m.id === itemId);
  if (!item) return;

  const modalBody = document.getElementById("modal-content-body");
  const modal = document.getElementById("item-modal");
  const backdrop = document.getElementById("modal-backdrop");

  const activeFlavors = flavorsData.filter(f => f.in_stock);

  modalBody.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--primary-dark);">
      Selecciona tus 2 Gustos
    </h3>
    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;">
      ${item.title} ($${item.price})
    </p>

    <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem;" id="gustos-checkboxes">
      ${activeFlavors.map(gusto => `
        <label style="display: flex; align-items: center; gap: 0.75rem; background: var(--bg-main); padding: 0.6rem 0.85rem; border-radius: 8px; cursor: pointer;">
          <input type="checkbox" value="${gusto.name}" class="gusto-chk" style="width: 18px; height: 18px; accent-color: var(--primary);">
          <span style="font-size: 0.95rem; font-weight: 600;">${gusto.name}</span>
        </label>
      `).join("")}
    </div>

    <button class="btn btn-primary btn-block" id="confirm-gustos-btn">
      <i class="fa-solid fa-plus"></i> Confirmar & Agregar ($${item.price})
    </button>
  `;

  modal.classList.add("active");
  backdrop.classList.add("active");

  document.getElementById("confirm-gustos-btn")?.addEventListener("click", () => {
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

function closeModal() {
  document.getElementById("item-modal")?.classList.remove("active");
  document.getElementById("modal-backdrop")?.classList.remove("active");
}

function openCart() {
  document.getElementById("cart-drawer")?.classList.add("active");
  document.getElementById("cart-backdrop")?.classList.add("active");
}

function closeCart() {
  document.getElementById("cart-drawer")?.classList.remove("active");
  document.getElementById("cart-backdrop")?.classList.remove("active");
}

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
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCartUI();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    updateCartUI();
  }
}

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

// Send Order (Saves to Supabase Database & Opens WhatsApp)
async function sendWhatsAppOrder() {
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

  const newOrder = {
    customer_name: name,
    delivery_mode: deliveryMode,
    address: address,
    notes: notes,
    items: cart,
    subtotal: total,
    total: total,
    status: "pendiente",
    created_at: new Date().toISOString()
  };

  // Save to Supabase Cloud Database or Local
  if (supabaseClient) {
    await supabaseClient.from("orders").insert([newOrder]);
  } else {
    newOrder.id = `ord-${Date.now()}`;
    ordersData.unshift(newOrder);
    localStorage.setItem("alveolo_orders", JSON.stringify(ordersData));
    renderKDS();
    renderAdminMetrics();
    playOrderChime();
  }

  // Build WhatsApp Message
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

  const phone = "59895679986";
  const encodedUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  cart = [];
  updateCartUI();
  closeCart();

  window.open(encodedUrl, "_blank");
}
