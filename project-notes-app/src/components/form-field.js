import { addData, renderData, showLoading } from "../index.js";
import { customValidation } from "../utils/form-validation.js";
class FormField extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = ` 
    <div class="add-form hidden" id="add-form" >
    <form class="form-field" id="form-field"> 
    <label for="title" class="title-label">Note Title :</label> 
    <input name="title" type="text" id="new-note-title" required maxlength="30" aria-describedby="title-error"/> 
    <span class="error" id="title-error"></span> <label for="note-body" class="body-label">Body :</label> 
    <textarea name="note-body" id="new-note-body" required aria-describedby="body-error"></textarea> 
    <span class="error" id="body-error"></span> <input type="hidden" id="date-time" /> 
    <input type="hidden" value="false" /> 
    <button type="submit" class="save-note" id="save-note">SAVE NOTE</button> 
    </form> 
    </div> `;
  }
  connectedCallback() {
    const formInput = this.querySelector("#form-field");
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
      const noteTitle = titleInput.value;
      const noteBody = bodyInput.value;
      const newNoteItem = {
        title: noteTitle,
        body: noteBody,
      };
      addData(newNoteItem);
      showLoading();
      renderData();
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
customElements.define("form-field", FormField);
