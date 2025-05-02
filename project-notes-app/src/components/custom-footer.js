import { showTutorial } from "../utils/sweetalert.js";
class CustomFooter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="footer-desc">
    <div class="footer-left">
    <p>current version : <span id="version"></span></p>
    <p>&#169;Copyright 2025, Difa Muhamad</p>
    </div>
    <div class="footer-right">
    <button class="show-tutorial">
      <img class="help-svg" src="/svg/help.svg" alt="help" />
    </button>
  </div>  
    </div>
        `;
    this.querySelector(".show-tutorial").addEventListener("click", () => {
      showTutorial();
    });
    this.renderVersion();
  }

  static get observedAttributes() {
    return ["version"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "version") {
      this.renderVersion(newValue);
    }
  }

  renderVersion(version) {
    const versionElement = this.querySelector("#version");
    if (versionElement) {
      versionElement.textContent = version || "1.0.0";
    }
  }
}

customElements.define("custom-footer", CustomFooter);
