import {
  addNewNote,
  createDate,
  loadButton,
  renderNotes,
  saveNote,
} from "../private.js";
import { customValidation } from "../utils/form-validation.js";
class PrivateForm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = ` 
     <div class="add-form hidden" id="add-form">
          <form class="private-form form-field" id="private-form">
            <label for="title" class="title-label">Note Title :</label>
            <input
              name="title"
              type="text"
              id="new-note-title"
              required
              maxlength="30"
              aria-describedby="title-error"
            />
            <span class="error" id="title-error"></span>
            <label for="note-body" class="body-label">Body :</label>
            <textarea
              name="note-body"
              class="new-note-body"
              id="new-note-body"
              required
              aria-describedby="body-error"
            ></textarea>
            <span class="error" id="body-error"></span>
            <input type="hidden" id="date-time" />
            <input type="hidden" value="false" />
            <button type="submit" class="save-note" id="save-note">
              SAVE NOTE
            </button>
          </form>
        </div> `;
  }
  connectedCallback() {
    const formInput = this.querySelector("#private-form");
    const titleInput = formInput.querySelector("#new-note-title");
    const bodyInput = formInput.querySelector("#new-note-body");
    formInput.addEventListener("submit", (event) => {
      event.preventDefault();
      [titleInput, bodyInput].forEach((input) => {
        if (!input.validity.valid) {
          customValidation({ target: input });
          this.showValidationMessage(input);
        } else {
          this.clearValidationMessage(input);
        }
      });
      if (!formInput.checkValidity()) {
        return;
      }
      const date = new Date();
      const noteTitle = titleInput.value;
      const noteBody = bodyInput.value;
      const createdAt = createDate();
      const newNoteItem = {
        id: date,
        title: noteTitle,
        body: noteBody,
        createdAt,
      };
      console.log(newNoteItem);
      addNewNote(newNoteItem);
      saveNote();
      renderNotes();
      loadButton();

      titleInput.value = "";
      bodyInput.value = "";
    });
    [titleInput, bodyInput].forEach((input) => {
      input.addEventListener("invalid", customValidation);
      input.addEventListener("input", (event) => {
        customValidation(event);
        this.showValidationMessage(event.target);
      });
    });
  }
  showValidationMessage(input) {
    const errorMessage = input.validationMessage;
    const connectedValidationId = input.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? this.querySelector(`#${connectedValidationId}`)
      : null;
    if (connectedValidationEl && errorMessage) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  }
  clearValidationMessage(input) {
    const connectedValidationId = input.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? this.querySelector(`#${connectedValidationId}`)
      : null;
    if (connectedValidationEl) {
      connectedValidationEl.innerText = "";
    }
  }
}
customElements.define("private-form", PrivateForm);
