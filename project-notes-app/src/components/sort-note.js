import { changeSort } from "..";

export class SortNote extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="sort-note">
Sort Notes :  
<button class="sort-button"><img src="/svg/arrow-down-up.svg" alt="desc"/></button>
</div>
    `;
    this.querySelector(".sort-button").addEventListener("click", () => {
      changeSort();
    });
  }
}

customElements.define("sort-note", SortNote);
