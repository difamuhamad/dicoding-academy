const { LitElement } = require('lit');

class LitWithoutShadowDom extends LitElement {
  createRenderRoot() {
    return this;
  }
}

export default LitWithoutShadowDom;
