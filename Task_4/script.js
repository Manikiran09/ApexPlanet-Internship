const NOTES_KEY = "task4_notes";

const notesInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const clearNotesBtn = document.getElementById("clearNotesBtn");
const notesList = document.getElementById("notesList");

const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const productsGrid = document.getElementById("productsGrid");

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

function getNotes() {
  const stored = localStorage.getItem(NOTES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function renderNotes() {
  const notes = getNotes();
  notesList.innerHTML = "";

  if (!notes.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "note-item";
    emptyItem.innerHTML = "<span class=\"note-text\">No tasks yet. Add your first one.</span>";
    notesList.appendChild(emptyItem);
    return;
  }

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-item ${note.done ? "done" : ""}`;

    const text = document.createElement("span");
    text.className = "note-text";
    text.textContent = note.text;

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = note.done ? "Undo" : "Done";
    toggleBtn.addEventListener("click", () => toggleNote(note.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "secondary";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    actions.append(toggleBtn, deleteBtn);
    li.append(text, actions);
    notesList.appendChild(li);
  });
    // stagger reveal for notes items
    const noteItems = Array.from(notesList.querySelectorAll('.note-item'));
    noteItems.forEach((it, i) => setTimeout(() => it.classList.add('reveal'), i * 80));
}

function addNote() {
  const value = notesInput.value.trim();
  if (!value) {
    return;
  }

  const notes = getNotes();
  notes.push({
    id: Date.now(),
    text: value,
    done: false
  });

  saveNotes(notes);
  notesInput.value = "";
  renderNotes();
}

function toggleNote(id) {
  const notes = getNotes().map((note) => {
    if (note.id === id) {
      return { ...note, done: !note.done };
    }
    return note;
  });

  saveNotes(notes);
  renderNotes();
}

function deleteNote(id) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  renderNotes();
}

function clearNotes() {
  localStorage.removeItem(NOTES_KEY);
  renderNotes();
}

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

addNoteBtn.addEventListener("click", addNote);
clearNotesBtn.addEventListener("click", clearNotes);
notesInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNote();
  }
});

categoryFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);

renderNotes();
renderProducts();

// initial reveal for main cards (portfolio / layout cards)
document.querySelectorAll('.card').forEach((el, i) => setTimeout(() => el.classList.add('reveal'), 120 + i * 80));
