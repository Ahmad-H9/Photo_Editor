let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hue_rotate");

let upload = document.querySelector("#upload");
let download = document.querySelector("#download");
let reset = document.querySelector("span");

let imgBox = document.querySelector(".img-box");
let img = document.querySelector("#img");

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

function resetValue() {
  saturate.value = 100;
  contrast.value = 100;
  brightness.value = 100;
  sepia.value = 0;
  grayscale.value = 0;
  blur.value = 0;
  hueRotate.value = 0;
  ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    hue-rotate(${hueRotate.value}deg)
    grayscale(${grayscale.value})
    sepia(${sepia.value}%)
    blur(${blur.value}px)
  `;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
upload.onchange = function () {
  resetValue();

  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = `none`;
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener(`input`, function () {
    ctx.filter = `
      saturate(${saturate.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      hue-rotate(${hueRotate.value}deg)
      grayscale(${grayscale.value})
      sepia(${sepia.value}%)
      blur(${blur.value}px)
      `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

download.onclick = function () {
  download.href = canvas.toDataURL();
};
