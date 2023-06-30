const squareCount = 5;
let selectedSquares = [null, null];
let gradientSelected = null;
let gradSelectorOpened = false;

function initialize() {
  document.body.style.background = getRandomColor();
  for (let i = 1; i <= squareCount; i++) {
    square = document.querySelector(`#s${i}`);
    square.style.background = getRandomColor();
  }
  const borderColor = getRandomColor();
  document
    .querySelectorAll(".border-box")
    .forEach((x) => (x.style.borderColor = borderColor));
}

initialize();

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function openGradientSelector() {
  if (gradSelectorOpened) return;

  await closeSolidSelector();

  const selector = document.querySelector(".gradient-selector");
  selector.style.display = "grid";

  await wait(100);
  selector.style.opacity = 1;
  selector.className = "gradient-selector selected";

  gradSelectorOpened = true;
}

async function closeGradientSelector() {
  let squaresDeleted = false;
  for (var i = 0; i < selectedSquares.length; i++) {
    if (selectedSquares[i] != null) {
      toggleSelected(selectedSquares[i]);
      squaresDeleted = true;
    }
  }
  if (squaresDeleted) await wait(200);

  const selector = document.querySelector(".gradient-selector");

  selector.className = "gradient-selector";

  await wait(400);
  selector.style.display = "none";
  await wait(200);
}

async function openSolidSelector() {
  if (!gradSelectorOpened) return;

  await closeGradientSelector();

  const selector = document.querySelector(".solid-selector");
  selector.style.display = "grid";
  await wait(100);
  selector.className = "solid-selector selected";
  gradSelectorOpened = false;
}

async function closeSolidSelector() {
  let squaresDeleted = false;
  for (var i = 0; i < selectedSquares.length; i++) {
    if (selectedSquares[i] != null) {
      toggleSelected(selectedSquares[i]);
      squaresDeleted = true;
    }
  }
  if (squaresDeleted) await wait(100);

  const selector = document.querySelector(".solid-selector");

  selector.className = "solid-selector";

  await wait(300);
  selector.style.display = "none";
}

function toggleSelected(i) {
  const square = document.querySelector("#s" + i);

  const selected = selectedSquares.indexOf(i);
  if (selected != -1) {
    square.style.top = "0px";
    square.style.left = "0px";
    square.style.scale = "1";
    square.style.rotate = "0deg";
    selectedSquares[selected] = null;
    return;
  }

  if (gradSelectorOpened) {
    const selected = document.querySelector("#s" + gradientSelected);
    if (selected) {
      selected.style.scale = "1";
      square.classList.remove("select-square");
    }
    gradientSelected = i;
    square.classList.add("select-square");
    square.style.scale = "1.2";
    return;
  }

  const next = selectedSquares.find((x) => x != null);
  if (next) {
    toggleSelected(next);
  }

  selectedSquares[0] = i;
  moveSquare(i, 0);
  setColor(square.style.background);
}

function setGradient(slotNumber) {
  if (gradientSelected == null) return;
  moveSquare(gradientSelected, slotNumber);
  slotNumber -= 1;

  if (selectedSquares[slotNumber] != null) {
    toggleSelected(selectedSquares[slotNumber]);
  }
  selectedSquares[slotNumber] = gradientSelected;
  const colors = [];
  for (var i = 0; i < selectedSquares.length; i++) {
    colors.push(
      document.querySelector("#s" + selectedSquares[i])?.style.background
    );
  }
  setColor(colors[0], colors[1]);
  gradientSelected = null;
}

function moveSquare(id, slotNumber) {
  const selectorsRect = document
    .querySelectorAll(".circle")
    [slotNumber].getBoundingClientRect();

  const square = document.querySelector(`#s${id}`);
  square.classList.remove("select-square");
  square.style.scale = "2";

  const containerRect = square.getBoundingClientRect();
  square.style.top = `${
    selectorsRect.top +
    selectorsRect.height / 2 -
    (containerRect.top + containerRect.height / 2)
  }px`;
  square.style.scale = "2";
  square.style.rotate = "360deg";
  let left =
    selectorsRect.left +
    selectorsRect.width / 2 -
    (containerRect.left + containerRect.width / 2);
  square.style.left = `${left}px`;
}

function toggleSection() {
  const section1 = document.querySelector("#first");
  const section2 = document.querySelector("#second");

  const button = document.querySelector("#animated-dot");
  if (section1.classList.contains("hidden")) {
    section1.classList.remove("hidden");
    section2.classList.add("hidden");
    button.style.rotate = "45deg";
  } else {
    section1.classList.add("hidden");
    section2.classList.remove("hidden");
    button.style.rotate = "225deg";
  }
}

function setColor(c1, c2 = null) {
  if (c2 == null) c2 = c1;
  document.body.style.background = `linear-gradient(-45deg, ${c1}, ${c2})`;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}
