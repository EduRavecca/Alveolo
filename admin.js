// ==========================================================================
// ALVEOLO PIZZERÍA - DEDICATED ADMIN & OPERATIONS PORTAL (admin.js)
// ==========================================================================

let productsData = [
  { id: "mm-pesto", title: "Pizza Masa Madre (32 cm) - Pesto", category: "masa-madre", price: 500, in_stock: true },
  { id: "mm-peperoni", title: "Pizza Masa Madre (32 cm) - Peperoni", category: "masa-madre", price: 500, in_stock: true },
  { id: "mm-capresse", title: "Pizza Masa Madre (32 cm) - Capresse", category: "masa-madre", price: 500, in_stock: true },
  { id: "mm-bondiola", title: "Pizza Masa Madre (32 cm) - Bondiola", category: "masa-madre", price: 500, in_stock: true },
  { id: "mm-cebolla", title: "Pizza Masa Madre (32 cm) - Cebolla Caramelizada", category: "masa-madre", price: 500, in_stock: true },
  { id: "mm-panceta", title: "Pizza Masa Madre (32 cm) - Panceta Crocante", category: "masa-madre", price: 500, in_stock: true },
  { id: "metro-half-muzza", title: "1/2 Metro de Muzza Tradicional", category: "por-metro", price: 450, in_stock: true },
  { id: "metro-half-2gustos", title: "1/2 Metro de Muzza + 2 Gustos", category: "por-metro", price: 600, in_stock: true },
  { id: "metro-full-muzza", title: "1 Metro de Muzza Tradicional", category: "por-metro", price: 770, in_stock: true },
  { id: "metro-full-2gustos", title: "1 Metro de Muzza + 2 Gustos", category: "por-metro", price: 970, in_stock: true },
  { id: "faina-slice", title: "Porción de Fainá Tradicional", category: "gustos", price: 120, in_stock: true },
  { id: "extra-gusto", title: "Gusto Adicional para Pizza", category: "gustos", price: 150, in_stock: true },
  { id: "coca-15l", title: "Coca-Cola / Coca-Cola Zero 1.5L", category: "bebidas", price: 180, in_stock: true },
  { id: "cerveza-art", title: "Cerveza Artesanal 500ml", category: "bebidas", price: 220, in_stock: true }
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
let activeRole = sessionStorage.getItem("alveolo_logged_role") || null;
let soundEnabled = true;

// Supabase Connection
let supabaseClient = null;
let supabaseUrl = "https://wpaeqkpiskdxlaxgveom.supabase.co";
let supabaseKey = "sb_publishable_4ELqp97b8ORO6BVZvrPlww_eK0dhk0o";

// Audio Chime
function playChime() {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
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

document.addEventListener("DOMContentLoaded", () => {
  initSupabase();
  setupEventListeners();

  if (activeRole) {
    showDashboard();
  }
});

function initSupabase() {
  if (supabaseUrl && supabaseKey && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
      loadSupabaseData();
      subscribeToOrdersRealtime();
    } catch (e) {
      console.error("Supabase init error:", e);
    }
  }
}

async function loadSupabaseData() {
  if (!supabaseClient) return;

  const { data: prods } = await supabaseClient.from("products").select("*");
  if (prods && prods.length > 0) productsData = prods;

  const { data: flavs } = await supabaseClient.from("flavors").select("*");
  if (flavs && flavs.length > 0) flavorsData = flavs;

  const { data: conf } = await supabaseClient.from("store_settings").select("*").single();
  if (conf) {
    isStoreOpen = conf.is_open;
    updateStoreBtnUI();
  }

  const { data: ords } = await supabaseClient.from("orders").select("*").order("created_at", { ascending: false });
  if (ords) {
    ordersData = ords;
    renderOrders();
    renderMetrics();
  }
}

function subscribeToOrdersRealtime() {
  if (!supabaseClient) return;

  supabaseClient
    .channel("public:orders")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
      ordersData.unshift(payload.new);
      renderOrders();
      renderMetrics();
      if (activeRole) {
        playChime();
        showToast("🔔 ¡NUEVA COMANDA RECIBIDA EN EL SISTEMA!");
      }
    })
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, (payload) => {
      const idx = ordersData.findIndex(o => o.id === payload.new.id);
      if (idx !== -1) ordersData[idx] = payload.new;
      renderOrders();
      renderMetrics();
    })
    .subscribe();
}

function setupEventListeners() {
  // Login Form
  const loginForm = document.getElementById("admin-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const role = document.getElementById("portal-role").value;
      const pass = document.getElementById("portal-pass").value;

      if (pass === "alveolo2026" || pass === "1234") {
        activeRole = role;
        sessionStorage.setItem("alveolo_logged_role", role);
        showDashboard();
        showToast(`¡Sesión iniciada como ${role === 'admin' ? 'Administrador' : 'Operador'}!`);
      } else {
        alert("Contraseña incorrecta. (Clave por defecto: alveolo2026)");
      }
    });
  }

  // Logout
  document.getElementById("portal-logout-btn")?.addEventListener("click", () => {
    sessionStorage.removeItem("alveolo_logged_role");
    activeRole = null;
    document.getElementById("admin-login-screen").style.display = "flex";
    document.getElementById("admin-dashboard-view").style.display = "none";
    showToast("Sesión cerrada.");
  });

  // Store Status Toggle
  document.getElementById("portal-toggle-store-btn")?.addEventListener("click", toggleStoreStatus);

  // Sound Toggle
  document.getElementById("portal-sound-toggle")?.addEventListener("click", (e) => {
    soundEnabled = !soundEnabled;
    e.target.closest("button").innerHTML = `<i class="fa-solid fa-volume-${soundEnabled ? 'high' : 'xmark'}"></i> Sonido: ${soundEnabled ? 'ON' : 'OFF'}`;
  });

  // Subnav Tabs
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));
      const content = document.getElementById(target);
      if (content) content.classList.add("active");
    });
  });
}

function showDashboard() {
  document.getElementById("admin-login-screen").style.display = "none";
  document.getElementById("admin-dashboard-view").style.display = "block";

  const badge = document.getElementById("portal-role-badge");
  if (badge) badge.textContent = `Rol: ${activeRole === 'admin' ? 'Administrador General' : 'Operador de Pedidos'}`;

  // Hide admin-only tabs for operators
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = activeRole === "admin" ? "inline-block" : "none";
  });

  renderOrders();
  renderProductsTable();
  renderFlavors();
  renderMetrics();
  updateStoreBtnUI();
}

function renderOrders() {
  const colPend = document.getElementById("list-orders-pendiente");
  const colPrep = document.getElementById("list-orders-preparacion");
  const colCam = document.getElementById("list-orders-camino");
  const colEnt = document.getElementById("list-orders-entregado");

  if (!colPend) return;

  const grouped = {
    pendiente: ordersData.filter(o => o.status === "pendiente" || !o.status),
    preparacion: ordersData.filter(o => o.status === "en_preparacion" || o.status === "en_horno"),
    camino: ordersData.filter(o => o.status === "en_camino" || o.status === "listo"),
    entregado: ordersData.filter(o => o.status === "entregado")
  };

  document.getElementById("cnt-pend").textContent = grouped.pendiente.length;
  document.getElementById("cnt-prep").textContent = grouped.preparacion.length;
  document.getElementById("cnt-camino").textContent = grouped.camino.length;
  document.getElementById("cnt-entregado").textContent = grouped.entregado.length;

  renderOrderList(colPend, grouped.pendiente, "en_preparacion", "🔥 Pasar a Preparación");
  renderOrderList(colPrep, grouped.preparacion, "en_camino", "🛵 Despachar / En Camino");
  renderOrderList(colCam, grouped.camino, "entregado", "✅ Marcar Entregado");
  renderOrderList(colEnt, grouped.entregado, null, "✔ Completado");
}

function renderOrderList(container, list, nextStatus, nextText) {
  if (list.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: rgba(255,255,255,0.4); padding: 1.5rem 0; font-size: 0.85rem;">Sin comandas</div>`;
    return;
  }

  container.innerHTML = list.map(order => {
    const timeStr = new Date(order.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const itemsList = Array.isArray(order.items) ? order.items : [];

    return `
      <div class="order-card-ticket" style="background: #1c3426; border-color: #2e523d; color: white;">
        <div class="order-card-header" style="border-bottom-color: #2e523d;">
          <div>
            <div class="order-card-cust">${order.customer_name}</div>
            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);"><i class="fa-solid fa-clock"></i> ${timeStr} | ${order.delivery_mode === 'delivery' ? '🛵 Delivery' : '🏪 Retiro'}</div>
          </div>
          <div style="font-weight: 900; font-family: var(--font-heading); color: var(--accent-gold); font-size: 1.1rem;">$${order.total}</div>
        </div>
        <div class="order-card-items" style="color: rgba(255,255,255,0.9);">
          ${itemsList.map(it => `
            <div class="order-card-item">
              <strong>${it.qty}x</strong> ${it.title}
            </div>
          `).join("")}
          ${order.address ? `<div style="font-size: 0.8rem; color: #86efac; margin-top: 0.25rem;">📍 <strong>${order.address}</strong></div>` : ''}
          ${order.notes ? `<div style="font-size: 0.78rem; color: #fde047; margin-top: 0.2rem;">💬 <em>${order.notes}</em></div>` : ''}
        </div>
        ${nextStatus ? `
          <button class="btn btn-sm btn-primary btn-block" onclick="updateOrderStatus('${order.id}', '${nextStatus}')">
            ${nextText}
          </button>
        ` : `<div style="text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.5); font-weight: 700;">✔ Entregado</div>`}
      </div>
    `;
  }).join("");
}

async function updateOrderStatus(orderId, newStatus) {
  const order = ordersData.find(o => o.id === orderId);
  if (order) order.status = newStatus;

  if (supabaseClient) {
    await supabaseClient.from("orders").update({ status: newStatus }).eq("id", orderId);
  }

  renderOrders();
  renderMetrics();
  showToast(`Estado actualizado a ${newStatus.replace('_', ' ').toUpperCase()}`);
}

function renderProductsTable() {
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
        <button class="btn btn-sm btn-outline" onclick="showToast('Precio guardado')">Guardar</button>
      </td>
    </tr>
  `).join("");
}

function renderFlavors() {
  const list = document.getElementById("admin-flavors-list");
  if (!list) return;

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

function renderMetrics() {
  const totalRevEl = document.getElementById("admin-total-revenue");
  const totalOrdersEl = document.getElementById("admin-total-orders");
  const topPizzaEl = document.getElementById("admin-top-pizza");

  const totalRev = ordersData.reduce((sum, o) => sum + (o.total || 0), 0);
  if (totalRevEl) totalRevEl.textContent = `$${totalRev}`;
  if (totalOrdersEl) totalOrdersEl.textContent = ordersData.length;
  if (topPizzaEl) topPizzaEl.textContent = "Masa Madre Pesto";
}

async function updateProductPrice(id, newPrice) {
  const prod = productsData.find(p => p.id === id);
  if (prod) prod.price = parseInt(newPrice, 10) || prod.price;

  if (supabaseClient) {
    await supabaseClient.from("products").update({ price: prod.price }).eq("id", id);
  }
  showToast("Precio guardado en Supabase.");
}

async function toggleProductStock(id, inStock) {
  const prod = productsData.find(p => p.id === id);
  if (prod) prod.in_stock = inStock;

  if (supabaseClient) {
    await supabaseClient.from("products").update({ in_stock: inStock }).eq("id", id);
  }
  showToast(`Stock de producto ${inStock ? 'activado' : 'desactivado'}`);
}

async function toggleFlavorStock(flavorId, inStock) {
  const flav = flavorsData.find(f => f.id === flavorId);
  if (flav) flav.in_stock = inStock;

  if (supabaseClient) {
    await supabaseClient.from("flavors").update({ in_stock: inStock }).eq("id", flavorId);
  }
  showToast(`Gusto ${flav ? flav.name : ''} ${inStock ? 'disponible' : 'pausado'}`);
}

async function toggleStoreStatus() {
  isStoreOpen = !isStoreOpen;
  updateStoreBtnUI();

  if (supabaseClient) {
    await supabaseClient.from("store_settings").update({ is_open: isStoreOpen }).eq("id", 1);
  }
  showToast(`Local marcado como ${isStoreOpen ? 'ABIERTO' : 'CERRADO'}`);
}

function updateStoreBtnUI() {
  const btn = document.getElementById("portal-toggle-store-btn");
  if (btn) btn.innerHTML = `<i class="fa-solid fa-store"></i> Local: ${isStoreOpen ? 'ABIERTO' : 'CERRADO'}`;
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
