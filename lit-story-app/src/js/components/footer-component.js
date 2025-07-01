import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { html, LitElement, css } from 'lit';

class FooterComponent extends LitElement {
  constructor() {
    super();

    updateWhenLocaleChanges(this);
  }
  static styles = css`
    :host {
      display: block;
      --background: hsl(222, 47%, 11%);
      --foreground: hsl(0, 0%, 95%);
      --muted: hsl(0, 0%, 70%);
      --border: hsl(222, 47%, 25%);
      --radius: 0.5rem;
    }

    footer {
      background-color: var(--background);
      border-top: 1px solid var(--border);
    }

    .main-footer {
      width: 100%;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    .px-3 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .py-4 {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }

    .text-center {
      text-align: center;
    }

    .text-white {
      color: var(--foreground);
    }

    .mb-0 {
      margin-bottom: 0;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--muted);
      margin: 0;
    }

    @media (min-width: 768px) {
      .container {
        padding: 0 2rem;
      }

      .py-4 {
        padding-top: 2rem;
        padding-bottom: 2rem;
      }

      p {
        font-size: 0.9375rem;
      }
    }
  `;

  render() {
    return html`
      <footer>
        <div class="main-footer">
          <div class="container px-3 py-4">
            <p class="text-center text-white mb-0">
              &copy; 2025 ${msg(`Story App. All rights reserved.`)}
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);
