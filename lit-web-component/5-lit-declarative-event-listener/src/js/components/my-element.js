import { css, html, LitElement } from 'lit';

class MyElement extends LitElement {
  static properties = {
    color: {
      attribute: false,
    },
  };
  static styles = css`
    :host {
      display: block;
    }
  `;
  render() {
    return html`
      <p>
        <input type="color" @input=${(event) => (this.color = event.target.value)} />
      </p>

      <button @click=${this._applyInputColor}>Terapkan</button>
      <button @click=${this._changeBackgroundClick}>Warna Acak</button>
    `;
  }

  _applyInputColor() {
    document.body.style.backgroundColor = this.color;
  }

  _changeBackgroundClick() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`;
  }
}

customElements.define('my-element', MyElement);
