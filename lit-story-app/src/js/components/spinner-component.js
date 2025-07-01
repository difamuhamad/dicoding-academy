import LitWithoutShadowDom from './base/lit-without-shadowdom';

class SpinnerComponent extends LitWithoutShadowDom {
  render() {
    return `
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
        `;
  }
}

customElements.define('spinner-component', SpinnerComponent);
