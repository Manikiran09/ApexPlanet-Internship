const products = [
  { id: 1, name: "Wireless Earbuds", category: "electronics", price: 79, rating: 4.5 },
  { id: 2, name: "Smart Watch", category: "electronics", price: 149, rating: 4.2 },
  { id: 3, name: "Cotton Hoodie", category: "fashion", price: 39, rating: 4.1 },
  { id: 4, name: "Running Shoes", category: "fashion", price: 89, rating: 4.6 },
  { id: 5, name: "Desk Lamp", category: "home", price: 29, rating: 4.0 },
  { id: 6, name: "Storage Basket", category: "home", price: 19, rating: 3.9 },
  { id: 7, name: "Bluetooth Speaker", category: "electronics", price: 59, rating: 4.3 },
  { id: 8, name: "Wall Clock", category: "home", price: 25, rating: 4.4 }
];

const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const productsGrid = document.getElementById("productsGrid");

function getFilteredProducts() {
  const category = categoryFilter.value;
  const sortBy = sortFilter.value;

  let list = [...products];

  if (category !== "all") {
    list = list.filter((product) => product.category === category);
  }

  if (sortBy === "priceLow") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHigh") {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === "ratingHigh") {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const list = getFilteredProducts();
  productsGrid.innerHTML = "";

  if (!list.length) {
    productsGrid.innerHTML = "<p>No products found for this filter.</p>";
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p class="meta">Category: ${product.category}</p>
      <p class="meta">Rating: ${product.rating}</p>
      <p class="price">$${product.price}</p>
    `;

    productsGrid.appendChild(card);
  });

  // stagger reveal for product cards
  const cards = Array.from(productsGrid.querySelectorAll('.product-card'));
  cards.forEach((c, i) => setTimeout(() => c.classList.add('reveal'), i * 70));
}

categoryFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  // Trigger card reveals
  document.querySelectorAll('.card').forEach((el, i) => 
    setTimeout(() => el.classList.add('reveal'), 120 + i * 80)
  );
});
