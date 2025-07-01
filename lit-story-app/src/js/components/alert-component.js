import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadowdom';

class AlertComponent extends LitWithoutShadowDom {
  static properties = {
    variant: { type: String, reflect: true },
    dismissible: { type: Boolean },
  };

  constructor() {
    super();
    this.variant = 'danger';
    this.dismissible = false;
  }

  render() {
    return html`
      <div
        class="alert alert-${this.variant} ${this.dismissible
          ? 'alert-dismissible'
          : ''}"
        role="alert"
      >
        <i class="bi ${this._getVariantIcon()} alert-icon"></i>
        <div>
          <slot></slot>
        </div>
        ${this.dismissible
          ? html`
              <button class="btn-close" @click=${this._handleDismiss}>
                <i class="bi bi-x-lg"></i>
              </button>
            `
          : ''}
      </div>
    `;
  }

  _getVariantIcon() {
    const icons = {
      danger: 'bi-exclamation-triangle',
      success: 'bi-check-circle',
      warning: 'bi-exclamation-circle',
      info: 'bi-info-circle',
    };
    return icons[this.variant] || icons.danger;
  }

  _handleDismiss() {
    this.remove();
  }
}

customElements.define('alert-component', AlertComponent);

/**
  <!-- Basic danger alert -->
<alert-component>A simple danger alert</alert-component>

<!-- Success alert with custom icon -->
<alert-component variant="success">Operation successful!</alert-component>

<!-- Dismissible warning alert -->
<alert-component variant="warning" dismissible>This alert can be dismissed</alert-component>

<!-- Info alert -->
<alert-component variant="info">Informational message</alert-component>
  
 */
