import { html, LitElement } from 'lit';

class MyElement extends LitElement {
  static properties = {
    name: {
      type: String,
      reflect: true,

      converter: {
        fromAttribute(value, type) {
          console.log('fromAttribute');
          if (value) {
            return type(value).toLowerCase();
          }
          return value;
        },
        toAttribute(value, type) {
          console.log('toAttribute');
          return String(value).toUpperCase();
        },
      },
    },
  };

  render() {
    let template;
    if (this.name) {
      template = html`
        <p>Selamat datang, ${this.name}</p>
        <p>
          <button @click=${this._logout}>Keluar</button>
        </p>
      `;
    } else {
      template = html`
        <p>Silakan masuk terlebih dulu:</p>
        <p>
          <button @click=${this._login}>Masuk</button>
        </p>
      `;
    }
    return template;
  }
  _login() {
    this.name = 'John Doe';
  }
  _logout() {
    this.name = null;
  }
}

customElements.define('my-element', MyElement);
