const API = "/api";
const productList = document.getElementById("product-list");

async function fetchProducts() {
  const res = await fetch(`${API}/products`);
  const products = await res.json();
  productList.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<h3>${p.name}</h3><p>Price: $${p.price}</p>`;
    productList.appendChild(div);
  });
}

async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
  getUser();
}

async function logout() {
  await fetch(`${API}/auth/logout`, { credentials: "include" });
  document.getElementById("user-display").textContent = "Not logged in";
}

async function getUser() {
  const res = await fetch(`${API}/auth/me`, { credentials: "include" });
  if (res.ok) {
    const user = await res.json();
    document.getElementById("user-display").textContent = `Logged in as: ${user.username}`;
  }
}

fetchProducts();
getUser();
