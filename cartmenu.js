// Quantity Control Functions
const cartItems = {};
const cartList = document.querySelector('.cart-menu ul');
const cartTotalDisplay = document.createElement('li');
cartTotalDisplay.classList.add('cart-total');
cartList.appendChild(cartTotalDisplay);

function updateCartTotal() {
  let total = 0;
  Object.values(cartItems).forEach(item => {
    total += item.price * item.qty;
  });
  cartTotalDisplay.innerHTML = `<strong>Total:</strong> ₹${total.toLocaleString()}`;
}

function addToCart(productName, price, qty) {
  if (cartItems[productName]) {
    cartItems[productName].qty += qty;
  } else {
    cartItems[productName] = { price, qty };
  }

  renderCartItems();
  updateCartTotal();
  document.querySelector('.cart-menu').classList.add('active'); // Open cart
}

function renderCartItems() {
cartList.innerHTML = '';
Object.entries(cartItems).forEach(([name, data]) => {
  const item = document.createElement('li');
  item.className = 'cart-item';
  item.innerHTML = `
    <span>${name} × ${data.qty}</span>
    <span>₹${(data.price * data.qty).toLocaleString()}</span>
    <span class="remove-item" data-name="${name}" style="color:red;cursor:pointer;margin-left:10px;">&times;</span>
  `;
  cartList.appendChild(item);
});

cartList.appendChild(cartTotalDisplay);

// Attach delete handlers
document.querySelectorAll('.remove-item').forEach(btn => {
  btn.addEventListener('click', function () {
    const productName = this.getAttribute('data-name');
    delete cartItems[productName];
    renderCartItems();
    updateCartTotal();
  });
});
}
// Create Checkout Button
const checkoutBtn = document.createElement('button');
checkoutBtn.id = 'checkout-btn';
checkoutBtn.textContent = 'Checkout';
checkoutBtn.className = 'checkout-button';
cartList.appendChild(checkoutBtn);

// Example event listener (for now just alert)
checkoutBtn.addEventListener('click', () => {
if (Object.keys(cartItems).length === 0) {
  alert('Your cart is empty!');
  return;
}
alert('Proceeding to checkout...');
});

// Hook all Buy buttons
document.querySelectorAll('.buy-button').forEach(button => {
  button.addEventListener('click', function () {
    const card = this.closest('.product-card');
    const productName = card.querySelector('h6').textContent;
    const priceStr = card.querySelector('.discount-price').textContent.replace(/[₹$,]/g, '').trim();
    const price = parseFloat(priceStr);
    const qty = parseInt(card.querySelector('.qty-number').textContent);

    addToCart(productName, price, qty);
  });
});

// Quantity buttons logic (already in your code, just ensuring it's included)
function increaseQty(button) {
  const qtyNumber = button.parentElement.querySelector('.qty-number');
  let currentQty = parseInt(qtyNumber.textContent, 10);
  qtyNumber.textContent = currentQty + 1;
}

function decreaseQty(button) {
  const qtyNumber = button.parentElement.querySelector('.qty-number');
  let currentQty = parseInt(qtyNumber.textContent, 10);
  if (currentQty > 1) {
    qtyNumber.textContent = currentQty - 1;
  }
}