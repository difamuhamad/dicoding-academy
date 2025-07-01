const HomePage = {
  async init() {
    this._initializeTheme();
    await this._initialData();
    this._setupThemeToggle();
  },

  _initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  _setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');

    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.insertBefore(themeToggle, navbarCollapse.firstChild);
  },

  async _initialData() {
    try {
      this._loadingSpinner();
      const fetchResult = await fetch('/data/data.json');
      const dataResult = await fetchResult.json();
      // const dataResult = [];
      this._storyList = dataResult.listStory;
      console.log(this._storyList);
      this._populateStoryCard(this._storyList);
    } catch (error) {
      console.error('Error fetching data:', error);
      this._showError();
    } finally {
      this._removeLoadingSpinner();
    }
  },

  _showError() {
    const storyContainer = document.querySelector('#storyContainer');
    storyContainer.innerHTML = `
     <error-template></error-template>
    `;
  },

  _populateStoryCard(storyData = null) {
    if (!(typeof storyData === 'object')) {
      throw new Error(`Parameter storyData should be an object.`);
    }

    if (!Array.isArray(storyData)) {
      throw new Error('Parameter storyData should be an array.');
    }

    const storyContainer = document.querySelector('#storyContainer');
    storyContainer.innerHTML = '';

    if (storyData.length <= 0) {
      storyContainer.innerHTML = this._templateEmptyStory();
      return;
    }

    storyData.forEach((story) => {
      storyContainer.innerHTML += this._templateStoryCard(story);
    });
  },

  _templateStoryCard(story) {
    return `
  <div class="col-md-4 mb-4">
    <div class="card h-100">
      <img src="${story.photoUrl}" class="card-img-top" alt="${
      story.name
    }" style="height: 200px; object-fit: cover;">
      <div class="card-body">
              <h5 class="card-title">
          <i class="bi bi-person-circle me-2"></i>${story.name}
        </h5>
        <p class="card-text">${story.description}</p>
      </div>
      <div class="card-footer bg-transparent">
       <small class="card-subtitle d-flex align-items-center">
          <i class="bi bi-calendar-event me-2"></i>${this._formatTanggalIndonesia(
            story.createdAt
          )}
        </small>
      </div>
    </div>
  </div>
    `;
  },

  _formatTanggalIndonesia(tanggal) {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  _templateEmptyStory() {
    return `
      <empty-story-template></empty-story-template>
    `;
  },

  _loadingSpinner() {
    const storyContainer = document.querySelector('#storyContainer');
    storyContainer.innerHTML = `
 <div class="text-center my-5">
    <spinner-component></spinner-component>
    <p class="mt-2 text-muted">Loading...</p>
  </div>
    `;
  },

  _removeLoadingSpinner() {
    const spinner = document.querySelector('#storyContainer spinner-component');
    if (spinner) spinner.remove();
  },
};

export default HomePage;
