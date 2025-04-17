// Toggle Side Menu
document.getElementById('menuToggle').addEventListener('click', () => {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('open');
  });
  
  // Toggle Cart Popup
  document.getElementById('cartToggle').addEventListener('click', () => {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
  });
  

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
