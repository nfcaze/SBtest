let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBtn = document.getElementById("cart-btn");

fetch("products.json")
  .then(res => res.json())
  .then(data => {
      products = data;
      showProducts();
      updateCartCount();
  });

function showProducts() {
    const list = document.getElementById("product-list");
    products.forEach(p => {
        list.innerHTML += `
        <div class="product" onclick="openModal(${p.id})">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <p><strong>${p.price} ₺</strong></p>
        </div>`;
    });
}

function openModal(id) {
    const p = products.find(x => x.id === id);

    document.getElementById("modal-img").src = p.img;
    document.getElementById("modal-title").textContent = p.name;
    document.getElementById("modal-desc").textContent = p.desc;
    document.getElementById("modal-price").textContent = p.price + " ₺";

    document.getElementById("addToCart").onclick = () => addToCart(p);
    document.getElementById("productModal").style.display = "flex";
}

document.getElementById("closeModal").onclick = () => {
    document.getElementById("productModal").style.display = "none";
};

function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Sepete eklendi!");
}

function updateCartCount() {
    cartBtn.textContent = "Sepet (" + cart.length + ")";
}
