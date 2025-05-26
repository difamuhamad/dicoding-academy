import { sleep } from "../../utils.js";
export default class HomePresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async showCats() {
    // Indikator loading saat mulai
    this.#view.showLoading();

    const cats = await this.#model.getAllCats();

    // simulasi loading degnan sleep
    await sleep();

    this.#view.showCats(cats);

    // Indikator loading di hapus
    this.#view.hideLoading();
  }
}
