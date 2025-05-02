import { sessionDisclaimer } from "../data/data.js";
import { disclaimerToast } from "./sweetalert.js";

export function showDisclaimer() {
  if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem(sessionDisclaimer) !== "no") {
      disclaimerToast();
    }
  }
}

export function hideDisclaimerToast() {
  sessionStorage.setItem(sessionDisclaimer, "no");
}
