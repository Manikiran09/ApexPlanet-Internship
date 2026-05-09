const NOTES_KEY = "task4_notes";

const notesInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const clearNotesBtn = document.getElementById("clearNotesBtn");
const notesList = document.getElementById("notesList");

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

addNoteBtn.addEventListener("click", addNote);
clearNotesBtn.addEventListener("click", clearNotes);
notesInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNote();
  }
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderNotes();
  // Trigger card reveals
  document.querySelectorAll('.card').forEach((el, i) => 
    setTimeout(() => el.classList.add('reveal'), 120 + i * 80)
  );
});
