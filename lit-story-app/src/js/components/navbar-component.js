import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadowdom';

class NavbarComponent extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-md">
        <div class="container">
          <span class="navbar-brand">
            <img
              src="/icons/favicon.png"
              alt="Logo"
              width="30"
              height="30"
              class="d-inline-block align-top me-2"
            />
            ${this.brandName}
          </span>

          <navbar-link></navbar-link>
        </div>
      </nav>
    `;
  }
}

customElements.define('navbar-component', NavbarComponent);
