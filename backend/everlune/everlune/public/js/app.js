// Application State
let cart = JSON.parse(localStorage.getItem('everlune_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('everlune_favorites')) || [];

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateBadges();
  renderCart();
  renderFavorites();
  initFormHandler();
});

// Single Page Navigation
function navigateTo(sectionKey) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(`section-${sectionKey}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (sectionKey === 'cart') renderCart();
  if (sectionKey === 'favorites') renderFavorites();
  if (sectionKey === 'checkout') renderCheckoutSummary();
}

// Render Products across views
function renderCatalog() {
  const featured = PRODUCTS.slice(0, 4);
  const dresses = PRODUCTS.filter(p => p.category === 'dresses');
  const tuxedos = PRODUCTS.filter(p => p.category === 'tuxedos');
  const promotions = PRODUCTS.filter(p => p.category === 'bouquets' || p.category === 'packages');

  renderGrid('featured-grid', featured);
  renderGrid('dresses-grid', dresses);
  renderGrid('tuxedos-grid', tuxedos);
  renderGrid('promotions-grid', promotions);
}

function renderGrid(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = list.map(product => {
    const isFav = favorites.includes(product.id);
    const sizeOptions = product.sizes.map(s => `<option value="${s}">${s}</option>`).join('');

    return `
      <div class="product-card">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="fav-badge" onclick="toggleFavorite('${product.id}')" title="Wishlist">
            ${isFav ? '★' : '☆'}
          </button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <p class="product-price">$${product.price.toLocaleString()} AUD</p>
          <div class="card-controls">
            <select class="size-select" id="size-${product.id}">
              ${sizeOptions}
            </select>
            <select class="qty-select" id="qty-${product.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <button class="btn btn-primary" onclick="addToCart('${product.id}')">ADD TO CART</button>
        </div>
      </div>
    `;
  }).join('');
}

// Cart Functionality
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  const sizeSelect = document.getElementById(`size-${productId}`);
  const qtySelect = document.getElementById(`qty-${productId}`);

  const selectedSize = sizeSelect ? sizeSelect.value : product.sizes[0];
  const selectedQty = qtySelect ? parseInt(qtySelect.value, 10) : 1;

  const existingIndex = cart.findIndex(item => item.id === productId && item.size === selectedSize);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += selectedQty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: selectedQty
    });
  }

  saveCart();
  alert(`${product.name} (${selectedSize}) added to cart.`);
}

function updateCartItemQty(index, newQty) {
  const qty = parseInt(newQty, 10);
  if (qty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = qty;
  }
  saveCart();
  renderCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('everlune_cart', JSON.stringify(cart));
  updateBadges();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('btn-proceed-checkout');

  if (cart.length === 0) {
    container.innerHTML = '<p style="padding: 2rem 0;">Your shopping cart is currently empty.</p>';
    subtotalEl.innerText = '$0.00 AUD';
    totalEl.innerText = '$0.00 AUD';
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p style="font-size: 0.85rem; color: #707072;">Size: ${item.size}</p>
          <p style="font-size: 0.85rem; font-weight: 700; margin-top: 0.2rem;">$${item.price.toLocaleString()} AUD</p>
          <div style="margin-top: 0.5rem; display: flex; gap: 1rem; align-items: center;">
            <label style="font-size: 0.8rem;">Qty: 
              <input type="number" min="1" max="10" value="${item.quantity}" 
                     style="width: 50px; padding: 0.2rem;" 
                     onchange="updateCartItemQty(${index}, this.value)">
            </label>
            <button onclick="removeCartItem(${index})" style="background:none; border:none; text-decoration: underline; font-size: 0.8rem; cursor: pointer;">Remove</button>
          </div>
        </div>
        <div style="font-weight: 800;">$${itemTotal.toLocaleString()} AUD</div>
      </div>
    `;
  }).join('');

  subtotalEl.innerText = `$${total.toLocaleString()} AUD`;
  totalEl.innerText = `$${total.toLocaleString()} AUD`;
}

// Wishlist Functionality
function toggleFavorite(productId) {
  const index = favorites.indexOf(productId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(productId);
  }
  localStorage.setItem('everlune_favorites', JSON.stringify(favorites));
  updateBadges();
  renderCatalog();
  renderFavorites();
}

function renderFavorites() {
  const container = document.getElementById('favorites-grid');
  if (!container) return;

  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));
  if (favProducts.length === 0) {
    container.innerHTML = '<p>You have not saved any items yet.</p>';
    return;
  }
  renderGrid('favorites-grid', favProducts);
}

function updateBadges() {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').innerText = cartCount;
  document.getElementById('fav-count').innerText = favorites.length;
}

// Checkout Summary & Payment Instructions
function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-list');
  const totalEl = document.getElementById('checkout-total-price');

  let total = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="summary-line">
        <span>${item.name} (${item.size}) × ${item.quantity}</span>
        <span>$${itemTotal.toLocaleString()} AUD</span>
      </div>
    `;
  }).join('');

  totalEl.innerText = `$${total.toLocaleString()} AUD`;
}

function togglePaymentInstructions() {
  const method = document.querySelector('input[name="paymentMethod"]:checked').value;
  const box = document.getElementById('payment-instructions');

  if (method === 'bank_transfer') {
    box.innerHTML = `
      <h4>DIRECT BANK TRANSFER (AUSTRALIA)</h4>
      <p>Funds can be transferred directly to our Australian accounts at CommBank, NAB, Westpac, or ANZ. Details will appear upon confirmation.</p>
    `;
  } else {
    box.innerHTML = `
      <h4>CASH ON DELIVERY (COD)</h4>
      <p>Pay upon delivery by courier. Available strictly for residential and boutique delivery addresses within the Greater Sydney Metropolitan area.</p>
    `;
  }
}

// Checkout Form Submission
function initFormHandler() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const payload = {
      customer: {
        name: document.getElementById('cust-name').value,
        email: document.getElementById('cust-email').value,
        phone: document.getElementById('cust-phone').value,
        address: document.getElementById('cust-address').value,
        suburb: document.getElementById('cust-suburb').value,
        state: document.getElementById('cust-state').value,
        postcode: document.getElementById('cust-postcode').value
      },
      paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
      items: cart,
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.success) {
        showOrderConfirmation(data);
        cart = [];
        saveCart();
        form.reset();
      }
    } catch (err) {
      alert('Unable to process order. Please try again.');
    }
  });
}

function showOrderConfirmation(data) {
  document.getElementById('conf-order-id').innerText = data.orderId;
  const detailsContainer = document.getElementById('conf-payment-details');

  if (data.bankDetails) {
    const b = data.bankDetails;
    detailsContainer.innerHTML = `
      <div style="text-align: left; background: #F8F8F8; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
        <p><strong>Beneficiary:</strong> ${b.accountName}</p>
        <p><strong>Payment Reference:</strong> ${b.reference}</p>
        <hr style="margin: 0.5rem 0; border: none; border-top: 1px solid #E5E5E5;">
        <p><strong>${b.commBank.bank}:</strong> BSB: ${b.commBank.bsb} | Acc: ${b.commBank.acc}</p>
        <p><strong>${b.nab.bank}:</strong> BSB: ${b.nab.bsb} | Acc: ${b.nab.acc}</p>
        <p><strong>${b.westpac.bank}:</strong> BSB: ${b.westpac.bsb} | Acc: ${b.westpac.acc}</p>
        <p><strong>${b.anz.bank}:</strong> BSB: ${b.anz.bsb} | Acc: ${b.anz.acc}</p>
      </div>
    `;
  } else {
    detailsContainer.innerHTML = `
      <p style="margin-bottom: 1.5rem; font-size: 0.9rem;">
        Payment Method: <strong>Cash on Delivery (Sydney Metro)</strong>. Please have the exact balance ($${data.total.toLocaleString()} AUD) ready upon delivery.
      </p>
    `;
  }

  document.getElementById('order-confirmation').classList.add('active');
}

function closeOrderConfirmation() {
  document.getElementById('order-confirmation').classList.remove('active');
  navigateTo('home');
}