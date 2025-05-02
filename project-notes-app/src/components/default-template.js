class DefaultTemplate extends HTMLElement {
  constructor() {
    super();

    this._message = this.getAttribute("message");

    this.innerHTML = `
        <div class="default-template" id="default-template">
          <img src="/images/paimon5.png" alt="" />
          <p>${this._message}</p>
        </div>
        `;
  }
}

customElements.define("default-template", DefaultTemplate);
