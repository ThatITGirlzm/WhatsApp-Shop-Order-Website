 const products = [
  {
    id: 1,
    name: "Crop Top",
    price: 120,
    category: "Tops",
    image: "top.jpeg"
  },
  {
    id: 2,
    name: "Hoodie",
    price: 250,
    category: "Tops",
    image: "hoodie.jpeg"
  },
  {
    id: 3,
    name: "Summer Dress",
    price: 300,
    category: "Dresses",
    image: "dress.jpeg"
  },
  {
    id: 4,
    name: "Heels",
    price: 350,
    category: "Shoes",
    image: "sneakers.jpeg"
  }
];


let cart = [];
let currentCategory = "All";

const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const whatsappBtn = document.getElementById("whatsapp-btn");


// ---------------- PRODUCTS ----------------

function renderProducts() {
  productListEl.innerHTML = "";

  const filteredProducts =
    currentCategory === "All"
      ? products
      : products.filter(p => p.category === currentCategory);

  filteredProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <h4>${product.name}</h4>
      <p>K${product.price}</p>
      <button onclick="addToCart(${product.id})">Add</button>
    `;

    productListEl.appendChild(div);
  });
}

// ---------------- CART ----------------

function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  item.qty++;
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find(p => p.id === id);

  if (item.qty > 1) {
    item.qty--;
  } else {
    cart = cart.filter(p => p.id !== id);
  }

  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (K${item.price})
      <div class="qty-box">
        <button onclick="decreaseQty(${item.id})">−</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${item.id})">+</button>
      </div>
    `;

    cartItemsEl.appendChild(li);
  });

  totalPriceEl.textContent = total;
}

// ---------------- CATEGORIES ----------------

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentCategory = btn.dataset.cat;
    renderProducts();
  });
});

// ---------------- WHATSAPP ----------------

whatsappBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const name = document.getElementById("customer-name").value;

  let message = "Hello, I'd like to order:%0A";

  if (name.trim() !== "") {
    message = `Hello, my name is ${name}. I'd like to order:%0A`;
  }

  cart.forEach(item => {
    message += `${item.name} x${item.qty} = K${item.price * item.qty}%0A`;
  });

  message += `%0ATotal: K${totalPriceEl.textContent}`;

  const phone = "260771854391"; // PUT CLIENT NUMBER
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
});

// INIT

renderProducts();




