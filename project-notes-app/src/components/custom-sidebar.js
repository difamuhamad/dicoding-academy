class CustomSidebar extends HTMLElement {
  constructor() {
    super();

    this._active = this.getAttribute("active");

    this.innerHTML = `
<div class="links">
  <a class="public-page" href="/index.html"
    ><img src="/svg/globe.svg" alt="globe" />Public Notes</a
  >
  <a class="archive-page" href="/archive.html"
    ><img src="/svg/archive.svg" alt="archive" />Archived Notes</a
  >
  <a class="private-page" href="/private.html"
    ><img src="/svg/user-round.svg" alt="private" />Private Notes</a
  >
</div>`;
  }
  connectedCallback() {
    if (this._active) {
      const link = this.querySelector(`.${this._active}-page`);
      if (link) {
        link.classList.add("active-sidebar");
      }
    }
  }
}

customElements.define("custom-sidebar", CustomSidebar);
