import Swal from "sweetalert2";
import { removeData, renderData, unarchiveData } from "../archive.js";
import { showLoading, showNote } from "../index.js";

class ArchivedNote extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const id = this.getAttribute("id");
    const title = this.getAttribute("title");

    this.innerHTML = `<div class="archived-note">
  <h2 class="note-title">${title}</h2>
  <hr />
  <div class="archived-note-other">
    <div class="note-option">
      <button class="show-note" id="show-note" title="Show Note">
        <img
          class="show-note-svg"
          src="/svg/magnifying-glass.svg"
          alt="magnifying-glass"
        />
      </button>
      <button class="unarchive" id="unarchive" title="Unarchive Note">
        <img
          class="unarchive-svg"
          src="/svg/unarchive.svg"
          alt="unarchive"
        />
      </button>
      <button class="delete" id="delete" title="Remove Note">
        <img class="trash-svg" src="/svg/trash.svg" alt="trash" />
      </button>
    </div>
  </div>
</div>
`;

    this.querySelector("#unarchive").addEventListener("click", () => {
      showLoading();
      unarchiveData(id);
      renderData();
    });
    this.querySelector("#show-note").addEventListener("click", () => {
      showNote(id);
    });
    this.querySelector("#delete").addEventListener("click", () => {
      function removeAlert(id) {
        Swal.fire({
          title: "Are you sure to delete this note?",
          text: "You won't be able to return the deleted note.",
          color: "white",
          showCancelButton: true,
          confirmButtonText: "Delete",
          imageUrl: "/images/paimon6.png",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          background: "#1c1f2b",
          customClass: {
            confirmButton: "remove-button",
            cancelButton: "cancel-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            showLoading();
            removeData(id);
            renderData();
          }
        });
      }
      removeAlert(id);
    });
  }
}

customElements.define("archived-note", ArchivedNote);
