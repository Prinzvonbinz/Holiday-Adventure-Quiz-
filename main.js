const correctAnswer = "69"; // hier die richtige Lösung eingeben
const submitBtn = document.getElementById("submit-btn");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");

const quizScreen = document.getElementById("quiz-screen");
const winScreen = document.getElementById("win-screen");
const timeDisplay = document.getElementById("time");
const shareBtn = document.getElementById("share-btn");
const winCanvas = document.getElementById("win-canvas");

submitBtn.addEventListener("click", () => {
    const answer = answerInput.value.trim();
    if(answer.toLowerCase() === correctAnswer.toLowerCase()) {
        showWinScreen();
    } else {
        feedback.textContent = "Nö!";
    }
});

function showWinScreen() {
    quizScreen.classList.add("hidden");
    winScreen.classList.remove("hidden");

    const now = new Date();
    const timeString = now.toLocaleTimeString();
    timeDisplay.textContent = timeString;

    drawWinCanvas(timeString);
}

function drawWinCanvas(timeString) {
    const ctx = winCanvas.getContext("2d");
    winCanvas.classList.remove("hidden");
    ctx.fillStyle = "#ff4e50";
    ctx.fillRect(0, 0, winCanvas.width, winCanvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Gewonnen! 🎉", winCanvas.width/2, 100);

    ctx.font = "20px Arial";
    ctx.fillText("Uhrzeit: " + timeString, winCanvas.width/2, 160);
}


