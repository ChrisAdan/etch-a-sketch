const DEFAULT_GRID_SIZE = 30;
const SHADE_FACTOR = 4;
const BASE_OPACITY = 0.1;
const DEFAULT_PIXEL_FILL = "#000000";
const DEFAULT_PIXEL_EMPTY = "#FFFFFF";
let selectedGridSize;
let selectedTrailColor;
let activeDrag = true;
let canvasContainer;
let currentCanvasSize = DEFAULT_GRID_SIZE;

function initialize() {
  const gridSizeInput = document.querySelector(".select-size");
  gridSizeInput.value = DEFAULT_GRID_SIZE;
  const sizeDisplay = document.querySelector(".current-size");
  sizeDisplay.textContent = gridSizeInput.value;
  canvasContainer = createCanvas(DEFAULT_GRID_SIZE);
  currentCanvasSize = canvasContainer.children.length;
}

window.addEventListener("DOMContentLoaded", initialize);

// On mouseenter, set pixel class to black fill and increase opacity towards 1
const fillPixel = (event) => {
  if (activeDrag) {
    event.target.style.background = selectedTrailColor || DEFAULT_PIXEL_FILL;
    if (event.target.filled) {
      const opacityModifier = (1 - BASE_OPACITY) / SHADE_FACTOR;
      event.target.style.opacity = Math.min(
        +event.target.style.opacity + opacityModifier,
        1
      );
    } else {
      event.target.filled = true;
      event.target.style.opacity = BASE_OPACITY;
    }
  }
};

const clearPixel = (pixel) => {
  pixel.filled = false;
  pixel.style.background = DEFAULT_PIXEL_EMPTY;
};

// Construct and evenly distribute pixels on canvas
const createCanvas = (size) => {
  const container = document.querySelector(".canvas-container");
  let gridPercentage = (rows) => 100 / rows;
  const newCanvasSize = size ** 2;
  Array.from(container.children).forEach((child) => {
    container.removeChild(child);
  });
  for (let i = 0; i < newCanvasSize; i++) {
    const gridItem = document.createElement("div");
    const dimension = gridPercentage(size) + "%";
    gridItem.style.height = dimension;
    gridItem.style.width = dimension;
    gridItem.style.background = DEFAULT_PIXEL_EMPTY;
    gridItem.setAttribute("data-idx", `pixel-${i}`);
    gridItem.setAttribute("class", "pixel");
    gridItem.addEventListener("mouseenter", fillPixel);
    container.appendChild(gridItem);
  }
  return container;
};

// Functionality

const clearGrid = () => {
  Array.from(canvasContainer.children).forEach(clearPixel);
};

const setTrailColor = (event) => {
  selectedTrailColor = event.target.value;
};

const generateNewGrid = (event) => {
  const output = document.querySelector(".current-size");
  selectedGridSize = event.target.value;
  output.textContent = selectedGridSize;
  clearGrid();
  canvasContainer = createCanvas(selectedGridSize);
};

// Controls
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", clearGrid);

const selectColor = document.querySelector(".select-color");
selectColor.addEventListener("input", setTrailColor);

const gridSizeInput = document.querySelector(".select-size");
gridSizeInput.addEventListener("input", generateNewGrid);

// Maybe will add click to drag back in
// window.addEventListener("mousedown", () => (activeDrag = true));
// window.addEventListener("mouseup", () => (activeDrag = false));
