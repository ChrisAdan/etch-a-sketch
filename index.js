const SHADE_FACTOR = 4;
const BASE_OPACITY = 0.1;
const DEFAULT_PIXEL_FILL = "#A11B55";
const DEFAULT_PIXEL_EMPTY = "#121420"; //Rich Black
const RGB_MAX = 255;
let defaultGridSize;
let selectedTrailColor;
let activeDrag = true;
let canvasContainer;
let currentCanvasSize = defaultGridSize;
let selectedGridSize;

window.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const initialScreenSize = window.innerWidth;
  defaultGridSize = initialScreenSize <= 768 ? 15 : 30;
  const gridSizeInput = document.querySelector(".select-size");
  gridSizeInput.value = defaultGridSize;
  selectedGridSize = defaultGridSize;
  const sizeDisplay = document.querySelector(".current-size");
  sizeDisplay.textContent = gridSizeInput.value;
  canvasContainer = createCanvas(defaultGridSize);
  currentCanvasSize = canvasContainer.children.length;
  // Feels too laggy with 100x100 on phone screen
  const rangeInput = document.querySelector(".select-size");
  if (window.innerWidth <= 768) {
    rangeInput.setAttribute("max", "40");
  } else {
    rangeInput.setAttribute("max", "100");
  }
}

const initTouchStart = (event) => {
  event.preventDefault();
};
const initTouchEnd = (event) => {
  event.preventDefault();
};

const initTouchMove = (event) => {
  event.preventDefault();
};

function getTouchTarget(event) {
  let currentX = event.changedTouches[0].clientX;
  let currentY = event.changedTouches[0].clientY;
  const element = document.elementFromPoint(currentX, currentY);
  element.X = currentX;
  element.Y = currentY;
  return element;
}

// On mouseenter, set pixel class to black fill and increase opacity towards 1
const fillPixel = (event) => {
  const touchBoundaries = event.target.parentElement.getBoundingClientRect();
  const target =
    event instanceof TouchEvent ? getTouchTarget(event) : event.target;
  if (event instanceof TouchEvent && !target.classList.contains("pixel")) {
    return;
  } else {
    target.style.background = selectedTrailColor || DEFAULT_PIXEL_FILL;
    if (target.filled) {
      const opacityModifier = (1 - BASE_OPACITY) / SHADE_FACTOR;
      target.style.opacity = Math.min(
        +target.style.opacity + opacityModifier,
        1
      );
    } else {
      target.filled = true;
      target.style.opacity = BASE_OPACITY;
    }
  }
};

const clearPixel = (pixel) => {
  pixel.filled = false;
  pixel.style.background = DEFAULT_PIXEL_EMPTY;
  pixel.style.opacity = BASE_OPACITY;
};

// Construct and evenly distribute pixels on canvas
const createCanvas = (size, randomize = false) => {
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
    if (randomize) {
      const [red, green, blue] = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * RGB_MAX)
      );
      gridItem.style.background = `rgb(${red}, ${green}, ${blue})`;
      gridItem.style.opacity = Math.random();
    } else {
      gridItem.style.background = DEFAULT_PIXEL_EMPTY;
      gridItem.style.opacity = BASE_OPACITY;
    }
    gridItem.setAttribute("data-idx", `pixel-${i}`);
    gridItem.setAttribute("class", "pixel");
    gridItem.addEventListener("mouseenter", fillPixel);
    gridItem.addEventListener("touchstart", initTouchStart);
    gridItem.addEventListener("touchend", initTouchEnd);
    gridItem.addEventListener("touchmove", initTouchMove);
    gridItem.addEventListener("touchmove", fillPixel);
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

const randomizeGrid = () => {
  canvasContainer = createCanvas(selectedGridSize, true);
};

// Controls
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", clearGrid);

const selectColor = document.querySelector(".select-color");
selectColor.addEventListener("input", setTrailColor);

const gridSizeInput = document.querySelector(".select-size");
gridSizeInput.addEventListener("input", generateNewGrid);

const randomizeButton = document.querySelector(".randomize-button");
randomizeButton.addEventListener("click", randomizeGrid);
