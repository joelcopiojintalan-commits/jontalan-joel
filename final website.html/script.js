/* 🛒 Add to Cart System */
let cart = [];
let cartCount = 0;

/* Add item to cart */
function addToCart(name = "Product", price = 10) {
  // Check if item already exists
  let existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartCount();
  updateCart();
}

function addProductWithSize(name, sizeId) {
  const select = document.getElementById(sizeId);
  const size = select.value;
  const price = Number(select.selectedOptions[0].dataset.price);

  // Add size into the product name so cart separates Medium & Large
  addToCart(`${name} (${size})`, price);
}

/* Update total item count (sum of quantities) */
function updateCartCount() {
  cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = cartCount;
}

/* Update cart display */
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <div class="cart-controls">
          <button onclick="decreaseQuantity(${index})">➖</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">➕</button>
          <span>₱${(item.price * item.quantity).toLocaleString()}</span>
          <button class="remove-btn" onclick="removeItem(${index})">❌</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cart-total").innerText = "₱" + total.toLocaleString();
}

/* Increase quantity */
function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
  updateCartCount();
}

/* Decrease quantity */
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    // Optional: confirm before removing
    if (confirm("Remove this item from cart?")) {
      cart.splice(index, 1);
    }
  }
  updateCart();
  updateCartCount();
}

/* Remove item completely */
function removeItem(index) {
  if (confirm("Are you sure you want to remove this item?")) {
    cart.splice(index, 1);
    updateCart();
    updateCartCount();
  }
}

/* Open / Close Cart Panel */
function openCart() {
  document.getElementById("cart-panel").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cart-panel").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

/*chechout modal*/
/* ======================
   🛍️ OPEN CHECKOUT FORM
   ====================== */
function openCheckout() {
  document.getElementById("checkoutModal").classList.add("show");
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("show");
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function confirmCheckout() {
  let name = document.getElementById("custName").value;
  let address = document.getElementById("custAddress").value;
  let number = document.getElementById("custNumber").value;

  if (name === "" || address === "" || number === "") {
    alert("Please fill out all required fields.");
    return;
  }

  // ✅ Get real updated total
  let total = getCartTotal();

  alert(
    "ORDER CONFIRMED!\n\n" +
    "Name: " + name + "\n" +
    "Address: " + address + "\n" +
    "Contact: " + number + "\n\n" +
    "Total Amount: ₱" + total.toLocaleString() + "\n\n" +
    "Your order is on the way!"
  );

  closeCheckout();
  closeCart();
}
/* ======================
   📄 OPEN RECEIPT FORM
   ====================== */
function openReceipt() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const receiptModal = document.getElementById("receiptModal");
  const receiptItems = document.getElementById("receipt-items");
  const receiptTotal = document.getElementById("receipt-total");

  receiptItems.innerHTML = "";
  
  let total = 0;

  cart.forEach(item => {
    let subtotal = item.price * item.quantity;
    total += subtotal;

    receiptItems.innerHTML += `
      <div class="receipt-item">
        <span>${item.name} x${item.quantity}</span>
        <span>₱${subtotal.toLocaleString()}</span>
      </div>
    `;
  });

  // ✅ Show the correct computed total
  receiptTotal.innerText = "₱" + total.toLocaleString();

  receiptModal.classList.add("show");
}

/* Close receipt modal */
function closeReceipt() {
  document.getElementById("receiptModal").classList.remove("show");
}

/* ======================
   📦 SUBMIT ORDER
   ====================== */
function submitOrder() {
  const name = document.getElementById("custName").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const phone = document.getElementById("custPhone").value.trim();

  if (!name || !address || !phone) {
    alert("Please complete all required fields.");
    return;
  }

  alert("Order submitted successfully!");

  // Clear cart after submitting
  cart = [];
  updateCartCount();
  updateCart();

  closeReceipt();
}

// === MODAL ELEMENTS ===
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    const openSignup = document.getElementById('openSignup');
    const openLogin = document.getElementById('openLogin');
    const closeSignup = document.getElementById('closeSignup');
    const closeLogin = document.getElementById('closeLogin');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToSignup = document.getElementById('switchToSignup');

    // === FUNCTIONS ===
    function showSignup() {
      closeAllModals();
      signupModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function showLogin() {
      closeAllModals();
      loginModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeAllModals() {
      document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
      document.body.style.overflow = '';
    }

    // === EVENT LISTENERS ===
    openSignup.addEventListener('click', e => { e.preventDefault(); showSignup(); });
    openLogin.addEventListener('click', e => { e.preventDefault(); showLogin(); });

    closeSignup.addEventListener('click', closeAllModals);
    closeLogin.addEventListener('click', closeAllModals);

    switchToLogin.addEventListener('click', e => { e.preventDefault(); showLogin(); });
    switchToSignup.addEventListener('click', e => { e.preventDefault(); showSignup(); });

    // Click outside to close
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeAllModals();
      });
    });

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAllModals();
    });

    // Open from URL hash
    if (location.hash === '#signup') showSignup();
    if (location.hash === '#login') showLogin();
    
/*responsive design*/
const items = document.querySelectorAll('.menu, .info-section');

function revealOnScroll() {
  items.forEach(item => {
    let position = item.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    if (position < windowHeight - 100) {
      item.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load

 function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('show');
  }


// Toggle main mobile menu
function toggleMenu() {
    document.querySelector('nav ul').classList.toggle('show');
  }

// Toggle dropdowns in mobile view
document.querySelectorAll('.dropdown > .dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {

      // Prevent link navigation
      e.preventDefault();
      
      // Close other open dropdowns
      document.querySelectorAll('.dropdown').forEach(drop => {
        if (drop !== btn.parentElement) {
          drop.classList.remove('open');
        }
      });

      // Toggle current dropdown
      btn.parentElement.classList.toggle('open');
    });
  });

  

