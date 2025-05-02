import "./styles/style.css";
import "./components/private-navbar.js";
import "./components/private-form.js";
import "./components/custom-footer.js";
import "./components/custom-loading.js";
import "./components/default-template.js";
import "./components/private-sort.js";
import { privateNoteList } from "./utils/html-element.js";
import {
  privateTutorialToast,
  succesAddAlert,
  successRemoveAlert,
} from "./utils/sweetalert.js";
import { formatDate, hideTemplate, setTemplate } from "./index.js";
import { showDisclaimer } from "./utils/toast.js";
import { sortNotes } from "./data/data.js";
export let notes = [];
const NOTES_DATA = "NOTES_KEY";

export function renderNotes() {
  privateNoteList.innerHTML = "";
  if (notes.length >= 1) {
    hideTemplate();
    for (const noteData of notes) {
      const note = renderNote(noteData);
      privateNoteList.innerHTML += note;
    }
    loadButton();
  } else {
    setTemplate();
  }
}
export function renderNotesDesc() {
  privateNoteList.innerHTML = "";
  if (notes.length >= 1) {
    hideTemplate();
    const sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    for (const noteData of sortedNotes) {
      const note = renderNote(noteData);
      privateNoteList.innerHTML += note;
    }
    loadButton();
  } else {
    setTemplate();
  }
}

export function addNewNote(newNoteItem) {
  notes.push(newNoteItem);
  succesAddAlert();
}

export function saveNote() {
  if (checkStorage()) {
    const data = JSON.stringify(notes);
    localStorage.setItem(NOTES_DATA, data);
  }
}

function checkStorage() {
  if (typeof Storage === undefined) {
    alert("❗ Harap Update Browser Anda. ❗");
  } else {
    return true;
  }
}

export function createDate() {
  const date = new Date();
  return date;
}

function loadNotesFromLocal() {
  if (checkNotes()) {
    const notesData = localStorage.getItem(NOTES_DATA);
    const parsedNotes = JSON.parse(notesData);
    notes = parsedNotes;
  }
}

function checkNotes() {
  if (localStorage.getItem(NOTES_DATA) == null) {
    return false;
  } else {
    return true;
  }
}

export function renderNote(noteData) {
  const formattedDate = formatDate(noteData.createdAt);
  return `
    <div class="note" id="${noteData.id}">
      <h2 class="note-title">${noteData.title}</h2>
      <hr />
      <p class="note-body">${noteData.body}</p>
      <div class="note-other">
        <span class="note-date">${formattedDate}</span>
        <div class="note-option">
          <button class="delete" id="delete" title="Remove Note">
            <img class="trash-svg" src="/svg/trash.svg" alt="remove-note" />
          </button>
        </div>
      </div>
    </div>
  `;
}

export function loadButton() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const noteElement = event.target.closest(".note");
      const noteId = noteElement.getAttribute("id");
      removeNote(noteId);
    });
  });
}

export function removeNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id == noteId);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNote();
    successRemoveAlert();
    renderNotes();
  }
}

window.addEventListener("load", () => {
  showDisclaimer();
  loadNotesFromLocal();
  renderNotes();
  loadButton();
});

export function changeSort() {
  const sortData = localStorage.getItem(sortNotes);
  if (sortData === "descending") {
    renderNotesDesc();
    localStorage.setItem(sortNotes, "ascending");
  } else {
    renderNotes();
    localStorage.setItem(sortNotes, "descending");
  }
}
