// 🎯 Hier kannst du ganz leicht Fragen hinzufügen
// Format: { date: "YYYY-MM-DD", question: "Frage ...", answer: "Antwort" }
const questions = [
  { date: "2025-12-01", question: "Wie heißt der Weihnachtsmann auf Englisch?", answer: "Santa Claus" },
  { date: "2025-12-02", question: "Welche Farbe hat Rudolf die Nase?", answer: "Rot" },
  { date: "2025-12-03", question: "Was bringt man traditionell auf den Weihnachtsbaum?", answer: "Sterne" }
];

// Endlösung: öffnet 1 Tag nach der letzten Frage
const finalSolutionDate = getNextDay(questions[questions.length - 1].date);
const finalAnswer = "Weihnachten"; // richtige Endlösung

// DOM Elemente
const quizScreen = document.getElementById("quiz-screen");
const lockedScreen = document.getElementById("locked-screen");
const solutionScreen = document.getElementById("solution-screen");
const winScreen = document.getElementById("win-screen");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");
const saveBtn = document.getElementById("save-btn");
const solutionInput = document.getElementById("solution-input");
const solutionBtn = document.getElementById("solution-btn");
const solutionFeedback = document.getElementById("solution-feedback");
const timeDisplay = document.getElementById("time");
const shareBtn = document.getElementById("share-btn");
const winCanvas = document.getElementById("win-canvas");

// aktuelles Datum (nur YYYY-MM-DD vergleichen)
const today = new Date().toISOString().split("T")[0];

// Prüfen, welcher Screen gezeigt wird
initScreen();

function initScreen() {
  // Endlösung freigeschaltet?
  if (today >= finalSolutionDate) {
    quizScreen.classList.add("hidden");
    lockedScreen.classList.add("hidden");
    solutionScreen.classList.remove("hidden");
    return;
  }

  // Schauen ob es für heute eine Frage gibt
  const q = questions.find(q => q.date === today);

  if (q) {
    questionTitle.textContent = `Frage vom ${q.date}`;
    questionText.textContent = q.question;

    const savedAnswer = localStorage.getItem("answer_" + q.date);
    if (savedAnswer) {
      answerInput.value = savedAnswer;
    }

    saveBtn.onclick = () => {
      const userAnswer = answerInput.value.trim();
      if (userAnswer) {
        localStorage.setItem("answer_" + q.date, userAnswer);
        feedback.textContent = "Antwort gespeichert ✅";
      }
    };

    quizScreen.classList.remove("hidden");
    lockedScreen.classList.add("hidden");
  } else {
    // Keine Frage für heute
    quizScreen.classList.add("hidden");
    lockedScreen.classList.remove("hidden");
  }
}

// Lösung prüfen
solutionBtn.addEventListener("click", () => {
  const userSolution = solutionInput.value.trim();
  if (userSolution.toLowerCase() === finalAnswer.toLowerCase()) {
    showWinScreen();
  } else {
    solutionFeedback.textContent = "Falsch ❌ Versuche es nochmal!";
  }
});

// Win-Screen
function showWinScreen() {
  solutionScreen.classList.add("hidden");
  winScreen.classList.remove("hidden");

  const now = new Date();
  const timeString = now.toLocaleTimeString();
  timeDisplay.textContent = timeString;

  drawWinCanvas(timeString);
}

// Canvas Gewinnbild
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

// Teilen mit Zufallszahl
shareBtn.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  const dataUrl = winCanvas.toDataURL("image/png");
  const message = `Ich habe das Holiday Adventure Quiz 2.0 geschafft 🎉 Code: ${randomNumber}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
});

// Hilfsfunktion: Datum +1 Tag
function getNextDay(dateStr) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
