import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/lit-without-shadowdom';

class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    rows: { type: Number, reflect: true },
    inputId: { type: String, reflect: true },
    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: {
      type: String,
      reflect: true,
      attribute: 'invalid-feedback-message',
    },
    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.rows = 3;
    this.required = false;
    this.invalidFeedbackMessage = '';
  }

  render() {
    if (!this.invalidFeedbackMessage) {
      console.warn('invalidFeedbackMessage is required');
      return nothing;
    }

    return html`
      <textarea
        id=${this.inputId || nothing}
        class="form-control"
        rows=${this.rows || nothing}
        .value=${this.value || ''}
        ?required=${this.required}
        @input=${(e) => (this.value = e.target.value)}
      ></textarea>

      ${this.validFeedbackMessage
        ? html`<div class="valid-feedback">${this.validFeedbackMessage}</div>`
        : nothing}

      <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
    `;
  }
}

customElements.define('textarea-with-validation', TextareaWithValidation);
