let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtn = document.getElementById("cart-btn");

// Ürünleri yükle
fetch("products.json")
  .then(res => res.json())
  .then(data => {
      products = data;
      showProducts();
      updateCartCount();
  });

// Ürünleri listele
function showProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";

    products.forEach(p => {
        list.innerHTML += `
        <div class="card" onclick="openModal(${p.id})">
            <img class="img" src="${p.img}">
            
            <div class="textBox">
                <p class="text head">${p.name}</p>
                <span>${p.desc}</span>
                <p class="text price">${p.price} ₼</p>
            </div>
        </div>`;
    });
}

// Ürün modal aç
function openModal(id) {
    const p = products.find(x => x.id === id);

    document.getElementById("modal-img").src = p.img;
    document.getElementById("modal-title").textContent = p.name;
    document.getElementById("modal-desc").textContent = p.desc;
    document.getElementById("modal-price").textContent = p.price + " ₼";

    document.getElementById("addToCart").onclick = () => addToCart(p);
    document.getElementById("productModal").style.display = "flex";
}

// Ürün modal kapatma
document.getElementById("closeModal").onclick = () => {
    document.getElementById("productModal").style.display = "none";
};

// Sepete ekle
function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Səbətə Əlavə Edildi");
}

// Sepet sayısı güncelle
function updateCartCount() {
    cartBtn.textContent = "Səbət (" + cart.length + ")";
}

// Sepet modal aç
cartBtn.onclick = () => {
    showCart();
    document.getElementById("cartModal").style.display = "flex";
};

// Sepet modal kapatma
document.getElementById("closeCart").onclick = () => {
    document.getElementById("cartModal").style.display = "none";
};

// Sepet içeriklerini göster
function showCart() {
    const cartItems = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
        <div class="cart-item">
            <span>${item.name} - ${item.price}₼</span>
            <button onclick="removeCartItem(${index})">Sil</button>
        </div>`;
    });

    totalEl.textContent = total;
}

// Sepetten ürün sil
function removeCartItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
}
