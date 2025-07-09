class Svetafor {
  constructor() {
    this.colors = ["red", "yellow", "green"];
    this.intervalId = null;
    this.timeoutId = null;
    this.timerSpan = null;
    this.autoRunning = false;
    this.currentStage = "red";
    this.init();
  }

  init() {
    this.colors.forEach((color) => {
      const el = document.getElementById(color);

      el.innerHTML = "";

      el.addEventListener("click", () => this.setLight(color, 0, false));
    });
  }

  setLight(color, countdown = 0, autoNext = true) {
    this.clearTimers();

    this.colors.forEach((c) => {
      const el = document.getElementById(c);

      el.style.backgroundColor = "#374151";

      el.classList.remove(
        "ring-4",
        `ring-${c}-500`,
        "scale-105",
        "animate-pulse"
      );
      el.innerHTML = "";
    });

    const active = document.getElementById(color);
    active.style.backgroundColor = color;

    active.classList.add(
      "ring-4",
      `ring-${color}-500`,
      "scale-105",
      "relative"
    );

    if (countdown > 0 && color !== "yellow") {
      const span = document.createElement("span");

      span.className = "absolute text-white text-4xl font-bold";

      span.style.top = "50%";

      span.style.left = "50%";

      span.style.transform = "translate(-50%, -50%)";

      span.innerText = countdown;

      active.appendChild(span);

      this.timerSpan = span;
    }

    this.countdownTimer(countdown, color, autoNext);
  }

  countdownTimer(seconds, color, autoNext) {
    this.intervalId = setInterval(() => {
      seconds--;

      if (this.timerSpan) {
        this.timerSpan.innerText = seconds;
      }

      if (
        (color === "yellow" && seconds <= 2) ||
        (color === "green" && seconds <= 3)
      ) {
        const el = document.getElementById(color);

        el.classList.add("animate-pulse");
      }

      if (seconds <= 0) {
        clearInterval(this.intervalId);

        this.intervalId = null;

        if (autoNext) this.nextStage();
      }
    }, 1000);
  }

  nextStage() {
    switch (this.currentStage) {
      case "red":
        this.currentStage = "yellowAfterRed";

        this.setLight("yellow", 5);

        break;

      case "yellowAfterRed":
        this.currentStage = "green";

        this.setLight("green", 15);

        break;

      case "green":
        this.currentStage = "yellowAfterGreen";

        this.setLight("yellow", 5);

        break;

      case "yellowAfterGreen":
        this.currentStage = "red";

        this.setLight("red", 20);
        break;
    }
  }

  startAuto() {
    if (this.autoRunning) return;

    this.autoRunning = true;

    this.stopAuto();

    this.currentStage = "red";

    this.setLight("red", 20);
  }

  stopAuto() {
    this.clearTimers();

    this.autoRunning = false;

    this.currentStage = "red";

    this.colors.forEach((c) => {
      const el = document.getElementById(c);

      el.style.backgroundColor = "#374151";

      el.classList.remove(
        "ring-4",
        `ring-${c}-500`,
        "scale-105",
        "animate-pulse"
      );

      el.innerHTML = "";
    });
  }

  clearTimers() {
    if (this.intervalId) clearInterval(this.intervalId);

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.intervalId = null;

    this.timeoutId = null;
  }
}

const svetafor = new Svetafor();

document.querySelector("button[onclick*='startAuto']").onclick = () =>
  svetafor.startAuto();

document.querySelector("button[onclick*='stopAuto']").onclick = () =>
  svetafor.stopAuto();
