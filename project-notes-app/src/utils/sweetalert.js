import Swal from "sweetalert2";
import {
  archiveData,
  formatDate,
  postEditedNote,
  removeData,
  renderData,
  showLoading,
} from "..";
import { hideDisclaimerToast } from "./toast";

export function failedLoadAlert() {
  Swal.fire({
    title: "Oops..!",
    text: "Failed to load data from the server, check your network and try again.",
    color: "white",
    confirmButtonText: "Ok",
    confirmButtonColor: "",
    imageUrl: "/images/paimon1.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}
export function failedAlert() {
  Swal.fire({
    title: "Something went wrong.",
    text: "Please check your network connection and try again",
    color: "white",
    confirmButtonText: "Ok",
    confirmButtonColor: "rgb(7, 103, 194)",
    imageUrl: "/images/paimon1.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}
export function succesAddAlert() {
  Swal.fire({
    title: "Success! ",
    text: "Your Notes Is Successfully Added",
    color: "white",
    confirmButtonColor: "aquamarine",
    imageUrl: "/images/paimon2.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}

export function removeAlert(id) {
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

export function successRemoveAlert() {
  Swal.fire({
    title: "Deleted!",
    text: "Your Note has been deleted.",
    imageUrl: "/images/paimon3.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    color: "white",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}

export function successArchiveAlert() {
  Swal.fire({
    title: "Archived!",
    text: "Your note successfully archived, check the (Archived Notes) to see your notes there.",
    color: "white",
    imageUrl: "/images/paimon3.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}
export function succesUnacrhiveAlert() {
  Swal.fire({
    title: "Success!",
    text: "Your note are now unarchived.",
    color: "white",
    imageUrl: "/images/paimon2.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}

export function showOneNote(note) {
  const formattedDate = formatDate(note.createdAt);
  Swal.fire({
    html: `<h2 class="archived-note-title">${note.title}</h2><hr /><p class="archived-note-body">${note.body}</p><span class="archived-note-date">${formattedDate}</span>`,
    color: "white",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}

export function archiveAlert(id) {
  Swal.fire({
    title: "Archive This Note?",
    text: "You can view all the archived notes in ( Archived Notes )",
    color: "white",
    showCancelButton: true,
    confirmButtonText: "Archive",
    imageUrl: "/images/paimon4.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    background: "#1c1f2b",
    customClass: {
      cancelButton: "cancel-button",
      confirmButton: "archive-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      archiveData(id);
    } else {
    }
  });
}

export function successEditAlert() {
  Swal.fire({
    title: "Note Edited!",
    text: "Your note successfully updated!",
    color: "white",
    imageUrl: "/images/paimon2.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "confirm-button",
    },
  });
}

export function editNoteData(note) {
  Swal.fire({
    html: `
        <div class="edit-form" id="add-form">
        <label for="title" class="title-label">Edit Note :</label>
          <form class="edit-field" id="edit-field">
            <input name="title" type="text" id="new-note-title" required maxlength="60" aria-describedby="title-error" value="${note.title}" />
            <span class="error" id="title-error"></span>
            <textarea name="note-body" class="new-note-body" id="new-note-body" required aria-describedby="body-error">${note.body}</textarea>
            <span class="error" id="body-error"></span>
            <input type="hidden" id="date-time" />
            <input type="hidden" value="false" />
            <button type="submit" class="edit-note" id="edit-note">Save Changes</button>
          </form>
        </div>`,
    showCloseButton: false,
    showConfirmButton: false,
    background: "#1c1f2b",

    didOpen: (toast) => {
      const form = toast.querySelector("#edit-field");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const noteTitle = toast.querySelector("#new-note-title").value;
        const noteBody = toast.querySelector("#new-note-body").value;
        const newNoteItem = {
          title: noteTitle,
          body: noteBody,
        };
        postEditedNote(newNoteItem, note.id);
      });
    },
  });
}

export function showTutorial() {
  Swal.fire({
    html: `
    <div class="toast">
        <h1>Welcome to Notes App</h1>
        <span>Quick Guides :</span>
        <div class="tutorial-add">
          <h2> Writing a Note</h2>
          <p>• Click the (+ new note) button to add a new note</p>
          <p>• Enter your note title and your note body at the form field</p>
          <p>• Click the ( save note ) button to save your note</p>
          <p>• Congratulations! Your note will now be available in the main list
          </p>
        </div>
        <div class="tutorial-archive">
          <h2> Archiving a Note</h2>
          <p>• Find the note you want to archive in the main list</p>
          <p>• Click the Archive button (📥)</p>
          <p>• Your note are now saved in the Archived Notes section!</p>
          <span
            >tips: You can show and unarchive a note with the helper
            button</span
          >
        </div>
        <div class="tutorial-edit">
          <h2> Editing a Note</h2>
          <p>• Locate the note you want to edit</p>
          <p>• Click on the Edit button (✏️)</p>
          <p>• Modify the title or content at the edit field</p>
          <p>• Click (Save Notes) to update the note</p>
          <span>Tips: The Archived note cannot be edited, until you unarchive it.</span>
        </div>
        <div class="tutorial-archive">
          <h2> Sorting Notes</h2>
          <p>• You can sort the notes by the timestamp, newest or oldest</p>
          <p>• Click the toggle button ( Sort Note ↕ ) in the sidebar</p>
          <p>• Now the note list is sorted by the timestamp!</p>
        </div>
        <div class="tutorial-delete">
          <h2> Deleting a Note</h2>
          <p>• Locate the note you want to delete</p>
          <p>• Click on the Remove button (🗑️)</p>
          <p>• Confirm the deletion in the pop-up dialog</p>
          <p><span>important:</span>⚠️ Deleted note cannot be recovered</p>
        </div>
      </div>`,
    width: 600,
    confirmButtonText: "Close",
    padding: "5px",
    color: "#716add",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "understand-button",
    },
  });
}

export function disclaimerToast() {
  Swal.fire({
    html: `
    <div class="toast">
        <h1>Terms & Privacy</h1>
        <div class="tutorial-private">
          <h2>Public notes are visible to everyone :</h2>
          <p>Every notes you add is saved in API data, so everyone who connected to the same API can get your data, edit it or delete it.</p>
          <h2>Private Notes Section :</h2>
         <p>When building this app i consider to make the private section, so if you need privacy, save your notes in the <a href="/private.html">Private Notes</a> section.</p>
          <span
            >Tips : The Private note is saved in your storage, so nobody can access
            your note!</span
          >
        </div>
      </div>`,
    width: 600,
    confirmButtonText: "I Understand",
    showCancelButton: true,
    cancelButtonText: "Close",
    padding: "5px",
    color: "#716add",
    background: "#1c1f2b",
    customClass: {
      confirmButton: "understand-button",
      cancelButton: "close-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      hideDisclaimerToast();
    }
  });
}
