const DEFAULT_GRID_SIZE = 30;
const SHADE_FACTOR = 4;
const BASE_OPACITY = 0.1;
let selectedGridSize;

// On mouseenter, set pixel class to black fill and increase opacity towards 1
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

const clearPixel = (pixel) => {
  console.log(pixel.classList);
  console.log(pixel);
  pixel.classList.remove("filled");
};

// Construct and evenly distribute pixels on canvas
const createCanvas = (size) => {
  const container = document.querySelector(".canvas-container");
  let gridPercentage = (rows) => 100 / rows;
  for (let i = 0; i < size ** 2; i++) {
    const gridItem = document.createElement("div");
    const dimension = gridPercentage(size) + "%";
    gridItem.style.height = dimension;
    gridItem.style.width = dimension;
    gridItem.setAttribute("data-idx", `pixel-${i}`);
    gridItem.setAttribute("class", "pixel");
    gridItem.addEventListener("mouseenter", fillPixel);
    container.appendChild(gridItem);
  }
  return container;
};

const canvasContainer = createCanvas(selectedGridSize || DEFAULT_GRID_SIZE);

// Functionality

const clearGrid = () => {
  console.log("cleargrid");
  Array.from(canvasContainer.children).forEach(clearPixel);
};

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", clearGrid);
