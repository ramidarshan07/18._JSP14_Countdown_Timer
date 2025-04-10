let countdownInterval;
let remainingTime;
let paused = false;
let targetDate;

const countdownDisplay = document.getElementById("countdown");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const bellSound = document.getElementById("bellSound");
const errorMsg = document.getElementById("errorMsg");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

function updateCountdown() {
    if (!paused) {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "00 : 00 : 00 : 00";
            message.textContent = "⏰ Time's Up!";
            bellSound.play();
            return;
        }

        remainingTime = distance;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownDisplay.textContent =
            `${String(days).padStart(2, "0")} : ${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
    }
}

startBtn.addEventListener("click", () => {
    const datetimeInput = document.getElementById("datetime").value;
    if (!datetimeInput) return alert("Please select a valid date and time.");

    targetDate = new Date(datetimeInput).getTime();
    if (targetDate <= new Date()) {
        errorMsg.textContent = "❗ Please select a future date and time.";
        errorMsg.style.display = "block";
        return;
    } else {
        errorMsg.style.display = "none";
    }
    message.textContent = "✅ Countdown Started";
    paused = false;
    updateCountdown();
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
});

pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        clearInterval(countdownInterval);
        message.textContent = "⏸ Countdown Paused. Press Resume to continue.";
    }
});

resumeBtn.addEventListener("click", () => {
    if (paused && remainingTime > 0) {
        paused = false;
        message.textContent = "▶️ Countdown Resumed";
        targetDate = new Date().getTime() + remainingTime;
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "00 : 00 : 00 : 00";
    message.textContent = "🔁 Timer Reset";
    paused = false;
});

themeIcon.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    const isDark = body.classList.contains("dark-theme");
    themeIcon.className = isDark ? "bi bi-sun-fill fs-4 theme-toggle-icon" : "bi bi-moon-fill fs-4 theme-toggle-icon";
});