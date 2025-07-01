import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from './base/lit-without-shadowdom';
import { html } from 'lit';

class UploadForm extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <form class="row g-3" id="uploadStoryForm" novalidate>
        <div class="col-12 col-md-6">
          <label for="validationCustomEvidence" class="form-label">
            ${msg(`Image Preview`)}:
          </label>
          <input-image-with-preview
            inputId="validationCustomEvidence"
            invalid-feedback-message="${msg(`Upload minimum 1 image`)}"
            required
          ></input-image-with-preview>
        </div>

        <div class="col-12">
          <label for="validationCustomNotes" class="form-label">
            ${msg(`Description`)}:
          </label>
          <textarea-with-validation
            input-id="validationCustomNotes"
            invalid-feedback-message="${msg(`Description cannot be empty`)}"
            required
          ></textarea-with-validation>
        </div>

        <div class="col-12 text-end">
          <button id="liveToastBtn" class="btn btn-primary" type="submit">
            ${msg(`Submit`)}
            <i class="bi bi-send ms-2"></i>
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define('upload-form', UploadForm);
