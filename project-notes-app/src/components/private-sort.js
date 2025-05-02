import { changeSort } from "../private";

export class PrivateSort extends HTMLElement {
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

customElements.define("private-sort", PrivateSort);
