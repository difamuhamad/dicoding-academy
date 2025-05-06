let width = 320;
let height = 0;
let streaming = false;
let currentStream;

async function startup() {
  const cameraVideo = document.getElementById("camera-video");
  const cameraCanvas = document.getElementById("camera-canvas");
  const cameraTakeButton = document.getElementById("camera-take-button");
  const cameraOutputList = document.getElementById("camera-list-output");
  const cameraListSelect = document.getElementById("camera-list-select");

  function stopCurrentStream() {
    if (!(currentStream instanceof MediaStream)) {
      return;
    }
    currentStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  cameraListSelect.addEventListener("change", async (event) => {
    stopCurrentStream();
    console.log("Kamera:", event.target.value);
    currentStream = await getStream();
    cameraLaunch(currentStream);
  });

  cameraVideo.addEventListener("canplay", () => {
    if (streaming) {
      return;
    }
    height = (cameraVideo.videoHeight * width) / cameraVideo.videoWidth;
    cameraVideo.setAttribute("width", width.toString());
    cameraVideo.setAttribute("height", height.toString());
    cameraCanvas.setAttribute("width", width.toString());
    cameraCanvas.setAttribute("height", height.toString());
    streaming = true;
  });

  function populateTakenPicture(imageDataUrl) {
    // Create a blob from the data URL
    fetch(imageDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        cameraOutputList.innerHTML = `
          <li>
            <img src="${imageUrl}" alt="Captured image">
            <a href="${imageUrl}" download="captured-image.png">Download</a>
          </li>
        `;
      });
  }

  async function getStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: cameraListSelect.value
            ? { exact: cameraListSelect.value }
            : undefined,
          aspectRatio: 16 / 9,
          width: {
            min: 640,
            max: 1920,
            ideal: 1280,
          },
          height: {
            min: 480,
            max: 1080,
            ideal: 720,
          },
        },
      });
      await populateCameraList();
      return stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      throw error;
    }
  }

  async function populateCameraList() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      cameraListSelect.innerHTML = videoDevices
        .map(
          (device, index) =>
            `<option value="${device.deviceId}">
            ${device.label || `Camera ${index + 1}`}
          </option>`
        )
        .join("");
    } catch (error) {
      console.error("Error enumerating devices:", error);
      throw error;
    }
  }

  function cameraLaunch(stream) {
    cameraVideo.srcObject = stream;
    cameraVideo.play();
  }

  function cameraTakePicture() {
    const context = cameraCanvas.getContext("2d");
    if (!context) return null;

    cameraCanvas.width = width;
    cameraCanvas.height = height;
    context.drawImage(cameraVideo, 0, 0, width, height);

    return cameraCanvas.toDataURL("image/png");
  }

  cameraTakeButton.addEventListener("click", () => {
    const imageDataUrl = cameraTakePicture();
    if (imageDataUrl) {
      populateTakenPicture(imageDataUrl);
    } else {
      console.error("Failed to capture image");
    }
  });

  async function init() {
    try {
      currentStream = await getStream();
      cameraLaunch(currentStream);

      currentStream.getVideoTracks().forEach((track) => {
        console.log("Camera settings:", track.getSettings());
      });
    } catch (error) {
      console.error("Initialization error:", error);
      alert(`Error occurred: ${error.message}`);
    }
  }

  init();
}

window.addEventListener("DOMContentLoaded", startup);
