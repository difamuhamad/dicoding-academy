import "./styles/style.css";
import "./components/header-nav.js";
import "./components/form-field.js";
import "./components/note-item.js";
import "./components/custom-footer.js";
import "./components/custom-loading.js";
import "./components/archived-note.js";
import "./components/default-template.js";
import "./components/custom-sidebar.js";
import "./components/sort-note.js";
import { getData, sortNotes } from "./data/data.js";
import {
  editNoteData,
  failedAlert,
  failedLoadAlert,
  showOneNote,
  succesAddAlert,
  successArchiveAlert,
  successEditAlert,
  successRemoveAlert,
} from "./utils/sweetalert.js";
import { customLoading, noteList, template } from "./utils/html-element.js";
import {
  deleteData,
  getOneData,
  postArchiveData,
  postData,
  putMethod,
} from "./utils/fetch-data.js";
import { showDisclaimer } from "./utils/toast.js";

export const showLoading = () => {
  customLoading?.show();
};
export const hideLoading = () => {
  customLoading?.hide();
};
export const setTemplate = () => {
  template.innerHTML = `<default-template message="your note is empty, click ( + ) to add new note"></default-template>`;
};
export const hideTemplate = () => {
  template.innerHTML = "";
};

export function formatDate(createdAt) {
  return new Date(createdAt).toLocaleString();
}

const path = window.location.pathname;
if (path.includes("index") || path.endsWith("/")) {
  document.addEventListener("DOMContentLoaded", () => {
    showDisclaimer(), renderData();
  });
}

export function changeSort() {
  const sortData = localStorage.getItem(sortNotes);
  if (sortData === "descending") {
    renderDataDesc();
    localStorage.setItem(sortNotes, "ascending");
  } else {
    renderData();
    localStorage.setItem(sortNotes, "descending");
  }
}

// Crud Fetch (async )

export async function renderNotes() {
  try {
    const notesData = await getData();
    if (notesData.length >= 1) {
      hideTemplate();
      noteList.innerHTML = notesData
        .map((note) => {
          const formattedDate = formatDate(note.createdAt);
          return `
          <note-item
            id="${note.id}"
            title="${note.title}"
            body="${note.body}"
            createdAt="${formattedDate}"
          >
          </note-item>`;
        })
        .join("");
    } else {
      setTemplate();
    }
  } catch (error) {
    failedLoadAlert();
  }
}

export async function renderNotesDesc() {
  try {
    const notesData = await getData();
    if (notesData.length >= 1) {
      hideTemplate();
      const sortedNotes = notesData.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      noteList.innerHTML = sortedNotes
        .map((note) => {
          const formattedDate = formatDate(note.createdAt);
          return `
          <note-item
            id="${note.id}"
            title="${note.title}"
            body="${note.body}"
            createdAt="${formattedDate}"
          >
          </note-item>`;
        })
        .join("");
    } else {
      setTemplate();
    }
  } catch (error) {
    failedLoadAlert();
  }
}

export async function renderData() {
  noteList.innerHTML = "";
  showLoading();
  try {
    renderNotes();
  } catch (error) {
    failedLoadAlert();
  } finally {
    hideLoading();
  }
}

export async function renderDataDesc() {
  noteList.innerHTML = "";
  showLoading();
  try {
    renderNotesDesc();
  } catch (error) {
    failedLoadAlert();
  } finally {
    hideLoading();
  }
}

export const addData = async (newNote) => {
  try {
    const status = await postData(newNote);
    if (status === "success") {
      succesAddAlert();
      renderData();
    }
  } catch (error) {
    failedAlert();
  }
};

export const removeData = async (id) => {
  try {
    const status = await deleteData(id);
    if (status) {
      successRemoveAlert();
      renderData();
    }
  } catch (error) {
    failedAlert();
  }
};

export const archiveData = async (id) => {
  try {
    const status = await postArchiveData(id);
    if (status) {
      successArchiveAlert();
      renderData();
    }
  } catch (error) {
    failedAlert();
  }
};

export const showNote = async (id) => {
  try {
    const note = await getOneData(id);
    showOneNote(note);
  } catch (error) {
    failedAlert();
  }
};

export const editNote = async (id) => {
  try {
    const note = await getOneData(id);
    editNoteData(note);
  } catch (error) {
    failedAlert();
  }
};

export const postEditedNote = async (newNoteItem, id) => {
  try {
    const status = await putMethod(newNoteItem, id);
    if (status === "success") {
      successEditAlert();
      renderData();
    }
  } catch (error) {
    failedAlert();
  }
};
