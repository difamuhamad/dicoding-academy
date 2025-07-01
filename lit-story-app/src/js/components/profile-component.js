import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { html, LitElement, css } from 'lit';

class ProfileComponent extends LitElement {
  constructor() {
    super();

    updateWhenLocaleChanges(this);
  }
  static styles = css`
    :host {
      display: block;
      --primary: hsl(210, 100%, 70%);
      --primary-hover: hsl(210, 100%, 60%);
      --secondary: hsl(0, 0%, 90%);
      --secondary-hover: hsl(0, 0%, 80%);
      --background: hsl(222, 47%, 11%);
      --card: hsl(222, 47%, 15%);
      --border: hsl(222, 47%, 25%);
      --text: hsl(0, 0%, 95%);
      --text-muted: hsl(0, 0%, 70%);
      --radius: 0.5rem;
    }

    * {
      box-sizing: border-box;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      max-width: 1200px;
      padding: 1rem;
    }

    .justify-content-center {
      justify-content: center;
    }

    .col-md-8 {
      width: 100%;
    }

    @media (min-width: 768px) {
      .col-md-8 {
        width: 66.666%;
      }
    }

    @media (min-width: 1024px) {
      .col-lg-6 {
        width: 50%;
      }
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      animation: fadeIn 0.3s ease-out;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .shadow-sm {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .card-body {
      padding: 2rem;
    }

    .text-center {
      text-align: center;
    }

    .mb-4 {
      margin-bottom: 1.5rem;
    }

    .mt-3 {
      margin-top: 1rem;
    }

    .rounded-circle {
      border-radius: 50%;
    }

    .img-thumbnail {
      border: 2px solid var(--border);
      padding: 0.25rem;
      background-color: var(--card);
      transition: all 0.3s ease;
      object-fit: cover;
    }

    .img-thumbnail:hover {
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(77, 171, 247, 0.2);
    }

    h5 {
      color: var(--text);
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border);
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      margin-right: -0.75rem;
      margin-left: -0.75rem;
    }

    .col-sm-4 {
      flex: 0 0 33.333%;
      max-width: 33.333%;
      padding-right: 0.75rem;
      padding-left: 0.75rem;
    }

    .col-sm-8 {
      flex: 0 0 66.666%;
      max-width: 66.666%;
      padding-right: 0.75rem;
      padding-left: 0.75rem;
    }

    dt {
      color: var(--text-muted);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    dd {
      color: var(--text);
      margin-bottom: 1rem;
      margin-left: 0;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.5;
      cursor: pointer;
      transition: all 0.2s ease;
      gap: 0.5rem;
    }

    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    .btn-outline-primary {
      color: var(--primary);
      border-color: var(--primary);
      background: transparent;
    }

    .btn-outline-primary:hover {
      background: var(--primary);
      color: var(--background);
    }

    .btn-outline-secondary {
      color: var(--secondary);
      border-color: var(--secondary);
      background: transparent;
    }

    .btn-outline-secondary:hover {
      background: var(--secondary);
      color: var(--background);
    }

    .btn-primary {
      background: var(--primary);
      color: var(--background);
    }

    .btn-primary:hover {
      background: var(--primary-hover);
    }

    .d-grid {
      display: grid;
    }

    .gap-2 {
      gap: 0.5rem;
    }

    .d-md-flex {
      display: flex;
    }

    .justify-content-md-end {
      justify-content: flex-end;
    }

    .me-md-2 {
      margin-right: 0.5rem;
    }

    .pb-2 {
      padding-bottom: 0.5rem;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="text-center mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Guest+User&background=EEEFE0&size=150"
                  class="rounded-circle img-thumbnail"
                  alt="Profile Picture"
                  width="150"
                  height="150"
                />
                <div class="mt-3">
                  <button class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-camera"></i> ${msg(`Change Photo`)}
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <h5 class="border-bottom pb-2">
                  ${msg(`Account Information`)}
                </h5>
                <dl class="row">
                  <dt class="col-sm-4">${msg(`User ID`)}</dt>
                  <dd class="col-sm-8">GUEST-12345</dd>

                  <dt class="col-sm-4">Username</dt>
                  <dd class="col-sm-8">guest_user</dd>

                  <dt class="col-sm-4">${msg(`Full Name`)}</dt>
                  <dd class="col-sm-8">Guest User</dd>

                  <dt class="col-sm-4">Email</dt>
                  <dd class="col-sm-8">guest@example.com</dd>

                  <dt class="col-sm-4">${msg(`Member since`)}</dt>
                  <dd class="col-sm-8">June 2025</dd>
                </dl>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-outline-secondary me-md-2">
                  <i class="bi bi-pencil"></i> ${msg(`Edit Profile`)}
                </button>
                <button class="btn btn-primary">
                  <i class="bi bi-box-arrow-right"></i> ${msg(`Sign Out`)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-component', ProfileComponent);
