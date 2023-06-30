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

  const selected = selectedSquares.indexOf(i);
  if (selected != -1) {
    square.style.top = "0px";
    square.style.left = "0px";
    square.style.scale = "1";
    square.style.rotate = "0deg";
    selectedSquares.splice(selected, 1);
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
  setColor(square.style.background);
}

function setGradient(slotNumber) {
  if (gradientSelected == null) return;

  moveSquare(gradientSelected, slotNumber);
  selectedSquares.push(gradientSelected);
  const colors = [];
  for (var i = 0; i < selectedSquares.length; i++) {
    colors.push(
      document.querySelector("#s" + selectedSquares[i])?.style.background
    );
  }
  setColor(colors[1], colors[0]);
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
/*================[CLEAR]==================*/
// function clear() {
//   gsq.forEach(function (x, key) {
//     if (x >= 0) {
//       ani(x, true);
//     }
//     setTimeout(function () {
//       gsq.set(key, -1);
//     }, 500);
//   });
//   if (selectedSquare) {
//     ani(selectedSquare, true);
//     setTimeout(function () {
//       selectedSquare = null;
//     }, 500);
//   }

//   selected = null;
// }

// function borderColor(color) {
//   var borders = document.getElementsByClassName("border");
//   for (var i = 0; i < borders.length; i++) {
//     borders[i].style.borderColor = color;
//   }
//   document.getElementsByClassName("b")[0].style.backgroundColor = color;
// }

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

// var fill1 = $(".fill2");
// var fill = $(".fill1");

// var sqBack = {
//   name: "sqBack",
//   "0%": {
//     top: "225px",
//     left: "293px",
//     transform: "rotate(90deg) scale(1.5,1.5)",
//   },
//   "100%": {
//     top: "0px",
//     left: "0px",
//     transform: "rotate(0deg) scale(1, 1)",
//   },
// };
// var sqForward = {
//   name: "sqForward",
//   "0%": {
//     top: "0px",
//     left: "0px",
//     transform: "rotate(0deg) scale(1, 1)",
//   },
//   "100%": {
//     top: "225px",
//     left: "293px",
//     transform: "rotate(90deg) scale(1.5,1.5)",
//   },
// };

// var frameNames = {};
// function animate(obj, frame, play, valuesOrCall = {}, callOrTime, time) {
//   var temp = frame;
//   if (typeof valuesOrCall == "object") {
//     for (const [key1, value1] of Object.entries(valuesOrCall)) {
//       for (const [key2, value2] of Object.entries(value1)) {
//         temp[key1][key2] = value2;
//       }
//     }
//   }
//   var anNum = 0;
//   if (temp.name in frameNames) {
//     anNum = 1;
//     while (frameNames[temp.name].indexOf(anNum) >= 0) {
//       anNum++;
//     }
//     frameNames[temp.name].push(anNum);
//   } else {
//     frameNames[temp.name] = [0];
//   }
//   temp.name = temp.name + anNum;

//   $.keyframe.define([temp]);
//   if (typeof callOrTime == "number") {
//     time = callOrTime;
//   }
//   if (typeof play == "object") {
//     play["name"] = temp.name;
//     if (!time) {
//       time = parseFloat(play.duration) * 1000;
//     }
//     obj.playKeyframe(play);
//     setTimeout(function () {
//       if (typeof valuesOrCall == "function") {
//         return valuesOrCall();
//       } else if (typeof callOrTime == "function") {
//         return callOrTime();
//       }
//     }, time);
//   } else {
//     if (!time) {
//       time = parseFloat(play) * 1000;
//     }
//     obj.playKeyframe(temp.name + play);
//     setTimeout(function () {
//       if (typeof valuesOrCall == "function") {
//         return valuesOrCall();
//       } else if (typeof callOrTime == "function") {
//         return callOrTime();
//       }
//     }, time);
//   }
// }
// var shrink = {
//   name: "shrink",
//   from: {
//     height: "300px",
//   },
//   to: {
//     height: "0px",
//   },
// };
// var stretch = {
//   name: "stretch",
//   "0%": {
//     width: "0px",
//   },
//   "100%": {
//     width: "600px",
//   },
// };
// var expand = {
//   name: "expand",
//   "0%": {
//     visibility: "hidden",
//     right: "125px",
//     width: 0,
//     height: 0,
//   },
//   "100%": {
//     visibility: "visible",
//     right: 0,
//     width: "250px",
//     height: "250px",
//   },
// };
// //
