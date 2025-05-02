class CustomLoading extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
    .hidden {
    display: none;
  }
    .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 50px;
  }
  .loading-spinner {
    border: 10px solid rgb(7, 103, 194);
    border-top: 10px solid aquamarine;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: loadingSpin 1s linear infinite;
    box-shadow: 0 0 20px, 0 0 40px rgb(7, 103, 194);
    
  }
    @keyframes loadingSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
      </style>
    <div class="loading-container hidden" id="loading-container">
        <div class="loading-spinner">
        </div>
        <p>Loading...</p>
      </div>
    `;
    this.container = this.shadowRoot.getElementById("loading-container");
  }
  show() {
    this.container.classList.remove("hidden");
  }
  hide() {
    this.container.classList.add("hidden");
  }
}

customElements.define("custom-loading", CustomLoading);
