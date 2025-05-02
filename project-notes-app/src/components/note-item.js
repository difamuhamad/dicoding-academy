import { editNote, showNote } from "..";
import { archiveAlert, removeAlert } from "../utils/sweetalert";

class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const id = this.getAttribute("id");
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = this.getAttribute("createdAt");

    this.innerHTML = `
   <div class="note">
  <h2 class="note-title">${title}</h2>
  <hr />
  <p class="note-body">${body}</p>
  <div class="note-other">
    <span class="note-date">${createdAt}</span>
    <div class="note-option">
      <button class="edit" id="edit" title="Edit Note">
        <img class="edit-svg" src="/svg/pencil.svg" alt="edit-note" />
      </button>
      <button class="archive" id="archive" title="Archive Note">
        <img class="archive-svg" src="/svg/archive.svg" alt="archive-note" />
      </button>
      <button class="delete" id="delete" title="Remove Note">
        <img class="trash-svg" src="/svg/trash.svg" alt="renove-note" />
      </button>
    </div>
  </div>
</div>`;
    this.querySelector(".note-body").addEventListener("click", () => {
      showNote(id);
    });
    this.querySelector(".note-title").addEventListener("click", () => {
      showNote(id);
    });
    this.querySelector("#edit").addEventListener("click", () => {
      editNote(id);
    });
    this.querySelector("#archive").addEventListener("click", () => {
      archiveAlert(id);
    });
    this.querySelector("#delete").addEventListener("click", () => {
      removeAlert(id);
    });
  }
}

customElements.define("note-item", NoteItem);
