const AddPage = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    evidenceInput.addEventListener('change', () => {
      this._updatePhotoPreview();
    });

    const addFormRecord = document.querySelector('#uploadStoryForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      this._clearAlerts();
      if (!isValid) {
        this._showAlert('Please fill all required fields correctly', 'danger');
        return;
      }

      this._showAlert('Story submitted successfully!', 'success');
      // this._goToDashboardPage();
    }
  },

  _getFormData() {
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    const descriptionInput = document.querySelector('#validationCustomNotes');

    return {
      evidence: evidenceInput.files[0],
      description: descriptionInput.value,
    };
  },

  _updatePhotoPreview() {
    const evidenceImgChange = document.querySelector(
      '#validationCustomEvidenceImgChange'
    );
    const evidenceImgInput = document.querySelector(
      '#validationCustomEvidence'
    );

    const photo = evidenceImgInput.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      evidenceImgChange.parentElement.classList.remove('d-none');
      evidenceImgChange.style.backgroundImage = `url('${event.target.result}')`;
    };

    reader.readAsDataURL(photo);
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === ''
    );

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
  _showAlert(message, variant) {
    const alertContainer = document
      .getElementById('alertContainer')
      .querySelector('.col-md-8');
    const alert = document.createElement('alert-component');
    alert.setAttribute('variant', variant);
    alert.textContent = message;
    alertContainer.appendChild(alert);
  },

  _clearAlerts() {
    const alertContainer = document
      .getElementById('alertContainer')
      .querySelector('.col-md-8');
    alertContainer.innerHTML = '';
  },
};

export default AddPage;
