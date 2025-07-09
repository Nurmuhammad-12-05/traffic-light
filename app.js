let autoInterval;

let currentLight = 0;

const lights = ["red", "yellow", "green"];

function setLight(color) {
  document.getElementById("red-light").className = "light-circle";

  document.getElementById("yellow-light").className = "light-circle";

  document.getElementById("green-light").className = "light-circle";

  document.getElementById(color + "-light").className =
    "light-circle " + color + "-active";
}

function startAuto() {
  stopAuto();

  autoInterval = setInterval(() => {
    setLight(lights[currentLight]);

    currentLight = (currentLight + 1) % lights.length;
  }, 2000);
}

function stopAuto() {
  if (autoInterval) {
    clearInterval(autoInterval);

    autoInterval = null;
  }

  document.getElementById("red-light").className = "light-circle";

  document.getElementById("yellow-light").className = "light-circle";

  document.getElementById("green-light").className = "light-circle";
}

document
  .getElementById("red-light")

  .addEventListener("click", () => setLight("red"));
document
  .getElementById("yellow-light")

  .addEventListener("click", () => setLight("yellow"));
document
  .getElementById("green-light")

  .addEventListener("click", () => setLight("green"));
