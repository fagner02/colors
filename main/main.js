const slotSize = 340;
const gapSize = 20;
const squareCount = 5;
let selectedSquares = [];
let gradientSelected = null;
let gradSelectorOpened = false;

(() => {
  document.body.style.background = getRandomColor();
  for (let i = 1; i <= squareCount; i++) {
    square = document.querySelector(`#s${i}`);
    square.style.background = getRandomColor();
  }
})();

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
  if (selectedSquares.length > 0) {
    while (selectedSquares.length > 0) {
      toggleSelected(selectedSquares[0]);
    }
    await wait(200);
  }
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
  if (selectedSquares.length > 0) {
    while (selectedSquares.length > 0) {
      toggleSelected(selectedSquares[0]);
    }
    await wait(100);
  }
  const selector = document.querySelector(".solid-selector");

  selector.className = "solid-selector";

  await wait(300);
  selector.style.display = "none";
}

function toggleSelected(i) {
  const square = document.querySelector("#s" + i);

  console.log("select ", i);
  const selected = selectedSquares.indexOf(i);
  if (selected != -1) {
    square.style.top = "0px";
    square.style.left = "0px";
    square.style.scale = "1";
    square.style.rotate = "0deg";
    selectedSquares.splice(selected, 1);
    console.log("delete", selectedSquares);
    return;
  }

  square.style.scale = "2";

  if (gradSelectorOpened) {
    gradientSelected = i;
    return;
  }

  if (selectedSquares.length > 0) {
    toggleSelected(selectedSquares[0]);
  }

  selectedSquares.push(i);
  moveSquare(i, 0);
}

function setGradient(slotNumber) {
  if (gradientSelected == null) return;

  moveSquare(gradientSelected, slotNumber);
  selectedSquares.push(gradientSelected);
  console.log(selectedSquares);
  gradientSelected = null;
}

function moveSquare(id, slotNumber) {
  const selectorsRect = document
    .querySelectorAll(".circle")
    [slotNumber].getBoundingClientRect();

  const square = document.querySelector(`#s${id}`);
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
  const section = document.querySelector("#first");
  const button = document.querySelector("#animated-dot");
  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
    button.style.rotate = "45deg";
  } else {
    section.classList.add("hidden");
    button.style.rotate = "225deg";
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}
