// Create a grid using GRID_SIZE
const GRID_SIZE = 16;

const canvasContainer = document.querySelector(".canvas-container");

for (let i = 0; i < GRID_SIZE; i++) {
  const gridItem = document.createElement("div");
  const dimension = gridPercentage(Math.sqrt(GRID_SIZE)) + "%";
  gridItem.style.height = dimension;
  gridItem.style.width = dimension;
  gridItem.setAttribute("data-idx", `pixel-${i}`);
  gridItem.textContent = gridItem.getAttribute("data-idx");
  console.log(gridItem);
  gridItem.style.border = "1px solid green";
  canvasContainer.appendChild(gridItem);
}

function gridPercentage(rows) {
  return 100 / rows;
}
