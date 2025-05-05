import {
  getActiveRoute,
  getActivePathname,
  getRoute,
  parseActivePathname,
  parsePathname,
} from "./routes/url-parser.js";
import routes from "./routes/routes.js";

export default class App {
  #content;
  #currentPath;
  #targetThumbnail = null;

  constructor({ content }) {
    this.#content = content;
    this.#currentPath = getActivePathname();
  }

  async renderPage() {
    const routeName = getActiveRoute();
    const route = routes[routeName];

    // Get page instance
    const page = route();

    // Alternative DOM update for browsers without transition support
    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      return;
    }

    const navigationType = this.#getNavigationType();

    if (navigationType === "list-to-detail") {
      console.log("User navigated from list to detail.");
      const parsedPathname = parseActivePathname();
      this.#targetThumbnail = document.querySelector(
        `.cats-item[data-catid="${parsedPathname.id}"] .cats-item__image`
      );

      if (this.#targetThumbnail) {
        this.#targetThumbnail.style.viewTransitionName = "cat-image";
      }
    }

    // Update DOM with transition
    const transition = document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    });

    if (navigationType === "detail-to-list") {
      const parsedPathname = parsePathname(this.#currentPath);
      targetThumbnail = document.querySelector(
        `.cats-item[data-catid="${parsedPathname.id}"] .cats-item__image`
      );

      if (targetThumbnail) {
        targetThumbnail.style.viewTransitionName = "cat-image";
      }
    }

    transition.updateCallbackDone.then(() => {
      console.log("Callback function executed.");
    });

    transition.ready.then(() => {
      console.log("View transition ready.");
    });

    transition.finished.then(() => {
      // Clear the temporary view-transition-name
      if (targetThumbnail) {
        targetThumbnail.style.viewTransitionName = "";
      }

      // Update current path
      this.#currentPath = getActivePathname();
    });
    this.#currentPath = getActivePathname();

    // Reset viewTransitionName after animation completes
    if (this.#targetThumbnail) {
      this.#targetThumbnail.style.viewTransitionName = "";
      this.#targetThumbnail = null;
    }
  }

  #getNavigationType() {
    const fromRoute = getRoute(this.#currentPath);
    const toRoute = getActiveRoute();

    const catListPath = ["/"];
    const catDetailPath = ["/cat/:id"];

    if (catListPath.includes(fromRoute) && catDetailPath.includes(toRoute)) {
      return "list-to-detail";
    }

    if (catDetailPath.includes(fromRoute) && catListPath.includes(toRoute)) {
      return "detail-to-list";
    }

    return "other";
  }
}
