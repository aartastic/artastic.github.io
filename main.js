const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brushSizeSlider = document.getElementById("brush-size");
const shapeSelector = document.getElementById("shape-selector");
const fillModeCheckbox = document.getElementById("fill-mode");
let lastPoint = null;
let strokeWidth = 5;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let brushSize = brushSizeSlider.value;
let brushColor = document.getElementById("brush-color").value;
let history = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
let historyIndex = 0;
function draw(e) {
  if (!isDrawing) return;
  const shape = shapeSelector.value;
  ctx.strokeStyle = brushColor;
  ctx.fillStyle = brushColor;
  ctx.lineWidth = brushSize;

  if (shape === "line") {
    drawLine(e);
  } else if (shape === "rectangle") {
    drawRectangle(e);
  } else if (shape === "circle") {
    drawCircle(e);
  } else if (shape === "trapezium") {
    drawTrapezium(e);
  } else if (shape === "triangle") {
    drawTriangle(e);
  } else if (shape === "star") {
    drawStar(e);
  } else if (shape === "diamond") {
    drawDiamond(e);
  } else if(shape === "pentagon"){
    drawPentagon(e);
  } else if(shape === "hexagon"){
    drawHexagon(e);
  } else if(shape === "heptagon"){
    drawHeptagon(e);
  } else if(shape === "octagon"){
    drawOctagon(e);
  } else if(shape === "arrow"){
    drawArrow(e);
  } else if(shape === "plus"){
    drawPlus(e);
  } else if(shape === "oval"){
    drawOval(e);
  }
}

function drawOval(e) {
  const startX = lastX;
  const startY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const radiusX = Math.abs(endX - startX) / 2;
  const radiusY = Math.abs(endY - startY) / 2;
  const centerX = startX + radiusX;
  const centerY = startY + radiusY;
  const kappa = 0.5522848; // Kappa constant for calculating control points

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  ctx.moveTo(centerX + radiusX, centerY);
  ctx.bezierCurveTo(
    centerX + radiusX,
    centerY - kappa * radiusY,
    centerX + kappa * radiusX,
    centerY - radiusY,
    centerX,
    centerY - radiusY
  );
  ctx.bezierCurveTo(
    centerX - kappa * radiusX,
    centerY - radiusY,
    centerX - radiusX,
    centerY - kappa * radiusY,
    centerX - radiusX,
    centerY
  );
  ctx.bezierCurveTo(
    centerX - radiusX,
    centerY + kappa * radiusY,
    centerX - kappa * radiusX,
    centerY + radiusY,
    centerX,
    centerY + radiusY
  );
  ctx.bezierCurveTo(
    centerX + kappa * radiusX,
    centerY + radiusY,
    centerX + radiusX,
    centerY + kappa * radiusY,
    centerX + radiusX,
    centerY
  );
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}


function drawHexagon(e) {
  const centerX = lastX;
  const centerY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const radius = Math.sqrt(Math.pow(centerX - endX, 2) + Math.pow(centerY - endY, 2));
  const numPoints = 6;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  for (let i = 0; i < numPoints; i++) {
    const angle = (2 * Math.PI * i) / numPoints - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawHeptagon(e) {
  const centerX = lastX;
  const centerY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const radius = Math.sqrt(Math.pow(centerX - endX, 2) + Math.pow(centerY - endY, 2));
  const numPoints = 7;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  for (let i = 0; i < numPoints; i++) {
    const angle = (2 * Math.PI * i) / numPoints - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawOctagon(e) {
  const centerX = lastX;
  const centerY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const radius = Math.sqrt(Math.pow(centerX - endX, 2) + Math.pow(centerY - endY, 2));
  const numPoints = 8;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  for (let i = 0; i < numPoints; i++) {
    const angle = (2 * Math.PI * i) / numPoints - Math.PI / 8; // Adjust angle for octagon
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawArrow(e) {
  const startX = lastX;
  const startY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const arrowWidth = 20; // Width of the arrowhead
  const arrowHeight = 40; // Height of the arrowhead

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = brushSize;

  // Calculate the angle between the start and end points
  const angle = Math.atan2(endY - startY, endX - startX);
  const angleOffset = Math.PI / 8; // Adjust angle offset for arrowhead

  // Draw the arrowhead lines
  ctx.lineTo(
    endX - arrowHeight * Math.cos(angle - angleOffset),
    endY - arrowHeight * Math.sin(angle - angleOffset)
  );
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - arrowHeight * Math.cos(angle + angleOffset),
    endY - arrowHeight * Math.sin(angle + angleOffset)
  );

  ctx.stroke();
}

function drawPlus(e) {
  const centerX = e.offsetX;
  const centerY = e.offsetY;
  const plusSize = 50; // Length of each plus arm

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  ctx.moveTo(centerX - plusSize, centerY);
  ctx.lineTo(centerX + plusSize, centerY);
  ctx.moveTo(centerX, centerY - plusSize);
  ctx.lineTo(centerX, centerY + plusSize);
  ctx.lineWidth = brushSize;
  ctx.stroke();
}


function drawTrapezium(e) {
  const startX = lastX;
  const startY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const width = endX - startX;
  const height = endY - startY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + width / 4, endY);
  ctx.lineTo(startX + (3 * width) / 4, endY);
  ctx.lineTo(startX + width, startY);
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawTriangle(e) {
  const startX = lastX;
  const startY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineTo(startX - (endX - startX), endY);
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawPentagon(e) {
  const centerX = lastX;
  const centerY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const radius = Math.sqrt(
    Math.pow(centerX - endX, 2) + Math.pow(centerY - endY, 2)
  );
  const numPoints = 5;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  for (let i = 0; i < numPoints; i++) {
    const angle = (2 * Math.PI * i) / numPoints - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawDiamond(e) {
  const startX = lastX;
  const startY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const width = endX - startX;
  const height = endY - startY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  ctx.moveTo(startX + width / 2, startY);
  ctx.lineTo(endX, startY + height / 2);
  ctx.lineTo(startX + width / 2, endY);
  ctx.lineTo(startX, startY + height / 2);
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawLine(e) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(
    (e.offsetX * canvas.width) / canvas.clientWidth,
    (e.offsetY * canvas.height) / canvas.clientHeight
  );
  ctx.stroke();
  [lastX, lastY] = [
    (e.offsetX * canvas.width) / canvas.clientWidth,
    (e.offsetY * canvas.height) / canvas.clientHeight,
  ];
}

function drawRectangle(e) {
  const startX = lastX;
  const startY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const width = endX - startX;
  const height = endY - startY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fillRect(startX, startY, width, height);
  } else {
    ctx.strokeRect(startX, startY, width, height);
  }
}

function drawCircle(e) {
  const startX = lastX;
  const startY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const radius = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  ctx.arc(startX, startY, radius, 0, Math.PI * 2);
  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawStar(e) {
  const centerX = lastX;
  const centerY = lastY;
  const endX = e.offsetX;
  const endY = e.offsetY;
  const outerRadius = Math.sqrt(Math.pow(centerX - endX, 2) + Math.pow(centerY - endY, 2));
  const innerRadius = outerRadius / 2; // Adjust the inner radius based on your preference
  const numPoints = 5;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(history[historyIndex], 0, 0);

  ctx.beginPath();
  for (let i = 0; i < numPoints * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / numPoints - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();

  if (fillModeCheckbox.checked) {
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = brushColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [
    (e.offsetX * canvas.width) / canvas.clientWidth,
    (e.offsetY * canvas.height) / canvas.clientHeight,
  ];
}

function stopDrawing() {
  isDrawing = false;
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  historyIndex++;
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    ctx.putImageData(history[historyIndex], 0, 0);
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    ctx.putImageData(history[historyIndex], 0, 0);
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
  historyIndex = 0;
}

function downloadCanvas() {
  const link = document.createElement("a");

  // Create a temporary canvas with white background
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.fillStyle = "white";
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw the original canvas on top of the temporary canvas
  tempCtx.drawImage(canvas, 0, 0);

  // Generate the data URL and initiate the download
  link.href = tempCanvas.toDataURL("image/png");
  link.download = "drawing.png";
  link.click();
}
function updateBrushSize() {
  brushSize = brushSizeSlider.value;
}

function updateBrushColor() {
  brushColor = document.getElementById("brush-color").value;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

document.getElementById("pen").addEventListener("click", () => {
  shapeSelector.value = "line";
  ctx.globalCompositeOperation = "source-over";
});
document.getElementById("erase").addEventListener("click", () => {
  shapeSelector.value = "line";
  ctx.globalCompositeOperation = "destination-out";
  ctx.strokeStyle = "rgba(0,0,0,0)";
  ctx.lineWidth = brushSize;
});

document.getElementById("undo").addEventListener("click", undo);
document.getElementById("redo").addEventListener("click", redo);
document.getElementById("clear").addEventListener("click", clearCanvas);
document.getElementById("download").addEventListener("click", downloadCanvas);
brushSizeSlider.addEventListener("input", updateBrushSize);
document
  .getElementById("brush-color")
  .addEventListener("input", updateBrushColor);
