let uploadedImage = null;
let cropData = { x: 50, y: 50, width: 100, height: 100 };

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const image = new Image();
    image.src = e.target.result;

    image.onload = () => {
      uploadedImage = image;
      drawCropPreview();
    };
  };

  reader.readAsDataURL(file);
}

function validateCrop(crop, image) {
  let { x, y, width, height } = crop;
  x = Math.max(0, x);
  y = Math.max(0, y);
  width = Math.max(1, Math.min(width, image.width - x));
  height = Math.max(1, Math.min(height, image.height - y));
  return { x, y, width, height };
}

function drawCropPreview() {
  if (!uploadedImage) return;
  const canvas = document.getElementById("previewCanvas");
  const ctx = canvas.getContext("2d");

  const safeCrop = validateCrop(cropData, uploadedImage);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    uploadedImage,
    safeCrop.x, safeCrop.y, safeCrop.width, safeCrop.height,
    0, 0, canvas.width, canvas.height
  );
}

function applyCrop() {
  const canvas = document.getElementById("previewCanvas");
  const croppedImage = canvas.toDataURL("image/png");

  const payload = {
    crop: { ...cropData },
    image: croppedImage
  };

  console.log("🚀 Applying Crop:");
  console.log(payload);

  // Simulate mock API call
  setTimeout(() => {
    alert("Crop applied successfully!");
  }, 1000);
}

document.getElementById("imageInput").addEventListener("change", handleImageUpload);
