// 🎯 Hier kannst du ganz leicht Fragen hinzufügen
// Format: { date: "YYYY-MM-DD", question: "Frage ...", answer: "Antwort" }
const questions = [
  { date: "2025-07-28", question: "*Aufgabe 1:*
Ein Fast-Food-Laden und eine Insel haben den selben Namen. Wie viele Kilometer liegen zwischen der Insel und Oslo aufgerundet (Es gibt ein Google-Maps-Tool dafür). Bilde dann die Quersumme.
_Bsp. (18637km ~ 19000km = QrS. 10)_?", answer: "4" },
  { date: "2025-07-31", question: "*Aufgabe 2:*
Lea möchte sich den 3. Teil ihrer Buch-Reihe kaufen, sie hat 20€ dabei. Der 1. Teil hat 7.50€ gekostet und der 2 Teil 10.75€.

_Wahr oder Falsch:_
- Lea kann sich das Buch leisten
- Lea hat am Ende noch mehr 10€
- Lea fehlt 1€ um sich das Buch zu leisten
- Lea muss für alle Bücher insgesamt mehr als 33€ bezahlen

Wahr = Zahl 5
Falsch = Zahl 3

Rechne am Ende allen Zahlen zusammen bzw. bilde die Quersumme soweit wie möglich.", answer: "7" },
  { date: "2025-08-03", question: "*Aufgabe 3:*
Vor laNger zeit lebte Ein mann in einem schloss voll mit kammern, die mit gold Und diamanten überfüllt waren. der mann hat davon Nie etwas ausgegeben. bis es dann gestohlen wurde ...", answer: "9" },
  { date: "2025-08-06", question: "*Aufgabe 4:*
Lyon, Paris = ?
Manchester, London = ?
Barcelona, Madrid = ?

= welche Länder? = welche Sprachen?

Übersetze folgendes Wort in allen 3 Sprachen, zähle die Buchstaben und bilde die Quersumme so weit wie möglich = Lösung

 - Essen -", answer: "2" },
  { date: "2025-08-09", question: "*Aufgabe 5:* 
_BinroäedC_
NENNNENE
NEENENNE
NEENEEEN
NEEENNEE", answer: "1" },
   { date: "2025-08-12", question: "*Aufgabe 6:*
1961 [Europa] --> Ereignis
Ereignis --> Ort
Ort --> Land
Land --> Kennzeichen [Eurofeld]
Buchstabe [Kennzeichen] --> Zahl
Zahl --> Lösung", answer: "4" },
  { date: "2025-08-15", question: "*Aufgabe 7:*
Bilde aus allen 6 Lösungszahlen Buchstaben.

Bilde daraus dann eine Abkürzung mit 2 Buchstaben, die oft im Alltag genutzt wird.
Von jung und alt.

Abkürzung --> Beliebteste 
--> letzten 3 Buchstaben
--> Daraus Zahlen
--> Alle 3 Zahlen addieren
--> Quersumme", answer: "11" },
  { date: "2025-08-18", question: "*Aufgabe 8:*
_Pippi Langstrumpf_, _Ronja Räubertochter_ und _die Brüder Löwenherz_ haben eins gemeinsam.
Was?

Antwort = Alter (2025)

Bilde die Quersumme.", answer: "10" },
  { date: "2025-08-21", question: "*Aufgabe 9:*
Wie lautete der allererste Gewinner vom 'Jugendwort des Jahres'?

Aus wie viel Wörtern wurde das Jugendwort zusammengesetzt = Lösung", answer: "3" },
    { date: "2025-08-24", question: "*Aufgabe 10:*

*F* ood *I* sle *N* ew *T* reasure", answer: "1" },
      { date: "2025-08-27", question: "*Aufgabe 11:*

Ich mach nie wieder Fanpost auf (vor 1 Jahr)

Welche beide Buchstaben stehen auf dem schwarzem Schild?

Beide Buchstaben in Zahlen umwandeln und addieren.", answer: "27" },
{ date: "2025-08-30", question: "*Aufgabe 12:*
Rätsel 7 + 8 + 9 + 10 + 11", answer: "52" },
  { date: "2025-09-02", question: "*Aufgabe 13:*
Die Buslinie [Aufgabe 12] fährt vom ... Tor bis zum Tierpark (Alemannenstraße)

An welchen Koordinaten liegt das ... Tor [Ort]?

Bilde aus den Koordinaten die Quersumme.", answer: "68" }
     ];

// Endlösung: öffnet 1 Tag nach der letzten Frage
const finalSolutionDate = getNextDay(questions[questions.length - 1].date);
const finalAnswer = "68"; // richtige Endlösung

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
const today = new Date().toISOString().split("T")[0]

   
// Kalender erzeugen
const calendar = document.getElementById("calendar");
const today = new Date().toISOString().split("T")[0];

questions.forEach((q, i) => {
  const btn = document.createElement("button");
  btn.textContent = i + 1; // Türchen-Nummer

  if (today >= q.date) {
    btn.addEventListener("click", () => openQuestion(q));
  } else {
    btn.classList.add("locked");
    btn.disabled = true;
  }

  calendar.appendChild(btn);
});

// Popup-Logik
const questionPopup = document.getElementById("question-popup");
const questionDate = document.getElementById("question-date");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const saveBtn = document.getElementById("save-btn");
const feedback = document.getElementById("feedback");
const closePopup = document.getElementById("close-popup");

function openQuestion(q) {
  questionDate.textContent = "Frage vom " + q.date;
  questionText.textContent = q.text;

  // gespeicherte Antwort laden
  answerInput.value = localStorage.getItem("answer_" + q.date) || "";

  saveBtn.onclick = () => {
    localStorage.setItem("answer_" + q.date, answerInput.value.trim());
    feedback.textContent = "Antwort gespeichert ✅";
  };

  questionPopup.classList.remove("hidden");
}

closePopup.addEventListener("click", () => {
  questionPopup.classList.add("hidden");
});

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
