
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
});
// Close menu after clicking a link (smooth scroll is handled by CSS)
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  }),
);


// ===== Timeline expand / collapse =====
document.querySelectorAll(".tl-head").forEach((btn) => {
  btn.addEventListener("click", () => {
    const body = btn.nextElementSibling;
    const open = body.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
});

// ===== Quiz =====
const questions = [
  {
    q: "What was the main goal of the Propaganda Movement?",
    c: [
      "Armed rebellion against Spain",
      "Peaceful reforms under Spanish rule",
      "Joining the United States",
      "Restoring pre-colonial kingdoms",
    ],
    a: 1,
  },
  {
    q: "Which newspaper served as the voice of the Propaganda Movement?",
    c: ["Kalayaan", "La Independencia", "La Solidaridad", "Diario de Manila"],
    a: 2,
  },
  {
    q: "What was the main purpose of La Liga Filipina (1892)?",
    c: [
      "To unite Filipinos for mutual aid and reform",
      "To train soldiers",
      "To publish novels",
      "To elect a Filipino governor",
    ],
    a: 0,
  },
  {
    q: "Which was one of Rizal's contributions in Dapitan?",
    c: [
      "Leading the Katipunan",
      "Building a water system for the town",
      "Writing the Philippine constitution",
      "Founding La Solidaridad",
    ],
    a: 1,
  },
  {
    q: "Which statement about Rizal and the Revolution is accurate?",
    c: [
      "Rizal commanded the revolutionary army",
      "Rizal founded the Katipunan",
      "Rizal's writings inspired nationalism, though he favored peaceful reform",
      "Rizal had no influence on Filipinos",
    ],
    a: 2,
  },
];
let current = 0,
  score = 0,
  selected = null;
const qCount = document.getElementById("q-count");
const qText = document.getElementById("q-text");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
  const item = questions[current];
  selected = null;
  nextBtn.disabled = true;
  nextBtn.textContent =
    current === questions.length - 1 ? "See Results" : "Next Question";
  qCount.textContent = `Question ${current + 1} of ${questions.length}`;
  qText.textContent = item.q;
  choicesEl.innerHTML = "";
  item.c.forEach((text, i) => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = text;
    b.addEventListener("click", () => {
      choicesEl
        .querySelectorAll(".choice")
        .forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selected = i;
      nextBtn.disabled = false;
    });
    choicesEl.appendChild(b);
  });
}

function showResults() {
  const msg =
    score === 5
      ? "Excellent! You truly know Rizal's story."
      : score >= 3
        ? "Good job! Review a few sections to master it."
        : "Keep learning — revisit the topics above and try again.";
  qCount.textContent = "Quiz complete";
  qText.textContent = `You scored ${score} out of ${questions.length}.`;
  choicesEl.innerHTML = `<p>${msg}</p>`;
  nextBtn.disabled = false;
  nextBtn.textContent = "Try Again";
}

nextBtn.addEventListener("click", () => {
  if (current >= questions.length) {
    current = 0;
    score = 0;
    showQuestion();
    return;
  }
  if (selected === questions[current].a) score++;
  current++;
  current < questions.length ? showQuestion() : showResults();
});
showQuestion();
