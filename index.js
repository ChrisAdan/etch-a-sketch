const GRID_SIZE = 25;
const SHADE_FACTOR = 4;
const BASE_OPACITY = 0.1;

const canvasContainer = document.querySelector(".canvas-container");

for (let i = 0; i < GRID_SIZE ** 2; i++) {
  const gridItem = document.createElement("div");
  const dimension = gridPercentage(GRID_SIZE) + "%";
  gridItem.style.height = dimension;
  gridItem.style.width = dimension;
  gridItem.setAttribute("data-idx", `pixel-${i}`);
  gridItem.setAttribute("class", "pixel");
  canvasContainer.appendChild(gridItem);
}

function gridPercentage(rows) {
  return 100 / rows;
}

const fillPixel = (event) => {
  if (event.target.classList.contains("filled")) {
    const opacityModifier = (1 - BASE_OPACITY) / SHADE_FACTOR;
    event.target.style.opacity = Math.min(
      +event.target.style.opacity + opacityModifier,
      1
    );
  } else {
    event.target.classList.add("filled");
    event.target.style.opacity = BASE_OPACITY;
  }
};

Array.from(canvasContainer.children).forEach((child) => {
  child.addEventListener("mouseenter", fillPixel);
});
