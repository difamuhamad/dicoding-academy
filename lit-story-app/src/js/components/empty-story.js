import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { css, html, LitElement } from 'lit';

class EmptyStoryTemplate extends LitElement {
  constructor() {
    super();

    updateWhenLocaleChanges(this);
  }
  static styles = css`
    .error-container {
      display: flex;
      justify-content: center;
      padding: 1rem;
    }

    .error-alert {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 500;
      color: hsl(0, 100%, 98%);
      background-color: hsl(0, 0%, 70%);
      border: 1px solid hsl(0, 72%, 25%);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      max-width: 32rem;
      width: 100%;
      animation: fadeIn 0.3s ease-out;
    }

    .error-icon {
      width: 1rem;
      height: 1rem;
      color: hsl(0, 85%, 70%);
    }

    .error-message {
      flex: 1;
      text-align: center;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  render() {
    return html`
      <div class="error-container">
        <div class="error-alert">
          <div class="error-message">${msg(`Story is empty`)}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('empty-story-template', EmptyStoryTemplate);
