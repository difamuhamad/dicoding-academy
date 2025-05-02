import "./styles/style.css";
import "./components/header-nav.js";
import "./components/form-field.js";
import "./components/note-item.js";
import "./components/custom-footer.js";
import "./components/custom-loading.js";
import "./components/archived-note.js";
import "./components/default-template.js";
import { getArchivedData } from "./data/data.js";
import {
  failedAlert,
  failedLoadAlert,
  successRemoveAlert,
  succesUnacrhiveAlert,
} from "./utils/sweetalert.js";
import { deleteData, patchArchiveData } from "./utils/fetch-data.js";

import { showLoading, formatDate, hideTemplate, hideLoading } from "./index.js";
import { archivedNoteList, template } from "./utils/html-element.js";

const setTemplate = () => {
  template.innerHTML = `<default-template message="archived note is empty ..."></default-template>`;
};

const path = window.location.pathname;

if (path.includes("archive")) {
  document.addEventListener("DOMContentLoaded", () => {
    renderData();
  });
}

export async function renderArchivedNotes() {
  try {
    const notesData = await getArchivedData();
    if (notesData.length >= 1) {
      hideTemplate();
      archivedNoteList.innerHTML = notesData
        .map((note) => {
          const formattedDate = formatDate(note.createdAt);
          return `<archived-note
            id="${note.id}"
            title="${note.title}"
            body="${note.body}"
            createdAt="${formattedDate}"
            >
            </archived-note>
            `;
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
  archivedNoteList.innerHTML = "";
  showLoading();
  try {
    renderArchivedNotes();
  } catch (error) {
    failedLoadAlert();
  } finally {
    hideLoading();
  }
}

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

export const unarchiveData = async (id) => {
  try {
    const status = await patchArchiveData(id);
    if (status) {
      succesUnacrhiveAlert();
      renderData();
    }
  } catch (error) {
    failedAlert();
  }
};
