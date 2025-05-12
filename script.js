const pomodoro = document.getElementById("pomodoro-timer");
const short = document.getElementById("short-timer");
const long = document.getElementById("long-timer");
const timers = document.querySelectorAll(".timer-display");
const session = document.getElementById("pomodoro-session");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const stopBtn = document.getElementById("stop");
const timerMsg = document.getElementById("timer-message");

let currentTimer = null;
let myInterval = null;

function showDefaultTimer() {
  pomodoro.style.display = "block";
  short.style.display = "none";
  long.style.display = "none";
  currentTimer = pomodoro;
}
showDefaultTimer();

function hideAll() {
  timers.forEach((timer) => {
    timer.style.display = "none";
  });
}

session.addEventListener("click", () => {
  hideAll();
  pomodoro.style.display = "block";
  currentTimer = pomodoro;

  session.classList.add("active");
  shortBreak.classList.remove("active");
  longBreak.classList.remove("active");
});

shortBreak.addEventListener("click", () => {
  hideAll();
  short.style.display = "block";
  currentTimer = short;

  session.classList.remove("active");
  shortBreak.classList.add("active");
  longBreak.classList.remove("active");
});

longBreak.addEventListener("click", () => {
  hideAll();
  long.style.display = "block";
  currentTimer = long;

  session.classList.remove("active");
  shortBreak.classList.remove("active");
  longBreak.classList.add("active");
});

// Start the timer
function startTimer(timerDisplay) {
  if (myInterval) {
    clearInterval(myInterval);
  }

  const timerDuration = parseInt(
    timerDisplay.getAttribute("data-duration").split(":")[0]
  );
  const durationInMs = timerDuration * 60 * 1000;
  const endTimestamp = Date.now() + durationInMs;

  myInterval = setInterval(() => {
    const remaining = endTimestamp - Date.now();

    if (remaining <= 0) {
      clearInterval(myInterval);
      timerDisplay.textContent = "00:00";

      const alarm = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );
      alarm.play();
    } else {
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      timerDisplay.textContent = formattedTime;
    }
  });
}

startBtn.addEventListener("click", () => {
  if (currentTimer) {
    startTimer(currentTimer);
    timerMsg.style.display = "none";
  } else {
    timerMsg.style.display = "block";
  }
});

stopBtn.addEventListener("click", () => {
  if (currentTimer) {
    clearInterval(myInterval);
  }
});

resetBtn.addEventListener("click", () => {
  if (currentTimer) {
    clearInterval(myInterval);
    myInterval = null;

    const originalTime = currentTimer.getAttribute("data-duration");
    currentTimer.textContent = originalTime;
  }
});
