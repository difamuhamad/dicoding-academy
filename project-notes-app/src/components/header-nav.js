class HeaderNav extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="navbar">
    <div class="head-title">
    <img class="svg-logo" src="/favicon.png" alt="logo" />
              <h1>Notes App</h1>
            </div>
            <div class="button-glow" id="button-glow">
              <button class="add-button" type="submit" id="add-button">
                + NEW NOTE
              </button>
            </div>
          </div>
    `;
    this.querySelector("#add-button").addEventListener("click", () => {
      const formField = document.querySelector("form-field");
      const addForm = formField.querySelector("#add-form");
      const glowButton = document.querySelector("#button-glow");
      glowButton.classList.toggle("button-glow");
      glowButton.classList.toggle("button-glow-on");
      if (addForm.classList.contains("hidden")) {
        addForm.classList.add("bounce");
        addForm.classList.remove("hidden");
      } else {
        addForm.classList.remove("bounce");
        addForm.classList.add("bounce-out");
        setTimeout(() => {
          addForm.classList.remove("bounce-out");
          addForm.classList.add("hidden");
        }, 500);
      }
    });
  }
}
customElements.define("header-nav", HeaderNav);
