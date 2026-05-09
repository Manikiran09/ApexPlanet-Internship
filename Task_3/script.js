const carouselSlides = [
  {
    title: "Sunrise Workspace",
    description: "A warm, layered composition that feels alive on every screen size.",
    image: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#173f45"/>
            <stop offset="100%" stop-color="#f0b35f"/>
          </linearGradient>
          <radialGradient id="g2" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stop-color="#fdf5df"/>
            <stop offset="100%" stop-color="#f3b14e" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#g1)"/>
        <circle cx="860" cy="210" r="190" fill="url(#g2)"/>
        <rect x="100" y="150" width="430" height="440" rx="36" fill="#f5f1ea" opacity="0.92"/>
        <rect x="180" y="220" width="260" height="34" rx="17" fill="#173f45" opacity="0.9"/>
        <rect x="180" y="280" width="330" height="18" rx="9" fill="#9db7b5"/>
        <rect x="180" y="320" width="300" height="18" rx="9" fill="#9db7b5"/>
        <rect x="180" y="360" width="240" height="18" rx="9" fill="#9db7b5"/>
        <rect x="620" y="190" width="440" height="330" rx="30" fill="#10292f" opacity="0.95"/>
        <rect x="690" y="250" width="300" height="36" rx="18" fill="#f0b35f" opacity="0.96"/>
        <rect x="690" y="315" width="220" height="20" rx="10" fill="#d7ece7"/>
        <rect x="690" y="352" width="260" height="20" rx="10" fill="#d7ece7"/>
        <rect x="690" y="390" width="180" height="20" rx="10" fill="#d7ece7"/>
      </svg>
    `)
  },
  {
    title: "Creative Balance",
    description: "An abstract scene with strong contrast that scales neatly on mobile.",
    image: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f3ede4"/>
            <stop offset="100%" stop-color="#d5ece6"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#g1)"/>
        <circle cx="370" cy="235" r="135" fill="#d77c3d" opacity="0.9"/>
        <circle cx="700" cy="300" r="220" fill="#145f57" opacity="0.88"/>
        <rect x="120" y="500" width="360" height="120" rx="30" fill="#ffffff" opacity="0.9"/>
        <rect x="150" y="530" width="220" height="18" rx="9" fill="#145f57"/>
        <rect x="150" y="564" width="160" height="18" rx="9" fill="#9db7b5"/>
        <rect x="620" y="500" width="460" height="120" rx="30" fill="#0f2f33" opacity="0.94"/>
        <rect x="670" y="532" width="260" height="20" rx="10" fill="#f3ede4"/>
        <rect x="670" y="566" width="200" height="20" rx="10" fill="#d6ebe8"/>
      </svg>
    `)
  },
  {
    title: "Motion Layout",
    description: "A mobile-friendly composition designed to stay readable in every viewport.",
    image: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#10282d"/>
            <stop offset="100%" stop-color="#1d6670"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#g1)"/>
        <path d="M130 560 C260 360, 410 360, 560 520 S880 700, 1060 410" fill="none" stroke="#f0b35f" stroke-width="34" stroke-linecap="round"/>
        <circle cx="270" cy="350" r="90" fill="#f5f1ea" opacity="0.94"/>
        <circle cx="620" cy="410" r="110" fill="#d6ebe8" opacity="0.9"/>
        <circle cx="940" cy="300" r="80" fill="#d77c3d" opacity="0.92"/>
        <rect x="120" y="620" width="960" height="84" rx="26" fill="#f5f1ea" opacity="0.16"/>
      </svg>
    `)
  }
];

const quizQuestions = [
  {
    question: "Which tool helps a page adapt to mobile, tablet, and desktop?",
    options: ["Media queries", "REST endpoints", "Local storage", "SVG filters"],
    answer: 0,
    explanation: "Media queries let CSS respond to screen width and device changes."
  },
  {
    question: "What does the carousel in this page primarily use?",
    options: ["Only CSS animations", "JavaScript state and event handlers", "Server-side rendering", "A database query"],
    answer: 1,
    explanation: "The slide position is controlled by JavaScript and buttons."
  },
  {
    question: "Why fetch from a public API?",
    options: ["To make the page static", "To display live data dynamically", "To remove all JavaScript", "To stop responsive layouts"],
    answer: 1,
    explanation: "API data changes at runtime and keeps the UI dynamic."
  }
];

const carouselImage = document.getElementById("carouselImage");
const carouselTitle = document.getElementById("carouselTitle");
const carouselDescription = document.getElementById("carouselDescription");
const slideDots = document.getElementById("slideDots");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const questionCounter = document.getElementById("questionCounter");
const scoreCounter = document.getElementById("scoreCounter");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const quizNext = document.getElementById("quizNext");
const quizRestart = document.getElementById("quizRestart");
const quizFeedback = document.getElementById("quizFeedback");

const jokeText = document.getElementById("jokeText");
const refreshJoke = document.getElementById("refreshJoke");
const apiStatus = document.getElementById("apiStatus");

let currentSlide = 0;
let slideTimer;
let currentQuestion = 0;
let score = 0;
let chosenAnswer = null;
let locked = false;

function renderSlide(index) {
  const slide = carouselSlides[index];
  carouselImage.src = slide.image;
  carouselImage.alt = slide.title;
  carouselTitle.textContent = slide.title;
  carouselDescription.textContent = slide.description;

  [...slideDots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
    dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
  });
}

function setSlide(index) {
  currentSlide = (index + carouselSlides.length) % carouselSlides.length;
  renderSlide(currentSlide);
}

function startSlideTimer() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => setSlide(currentSlide + 1), 5000);
}

function buildDots() {
  slideDots.innerHTML = "";
  carouselSlides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to ${slide.title}`);
    dot.addEventListener("click", () => {
      setSlide(index);
      startSlideTimer();
    });
    slideDots.appendChild(dot);
  });
}

function renderQuestion() {
  const question = quizQuestions[currentQuestion];
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  scoreCounter.textContent = `Score: ${score}`;
  questionText.textContent = question.question;
  answerList.innerHTML = "";
  quizFeedback.textContent = "";
  chosenAnswer = null;
  locked = false;
  quizNext.disabled = true;
  quizNext.textContent = "Check answer";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, button));
    answerList.appendChild(button);
  });
}

function selectAnswer(index, button) {
  if (locked) {
    return;
  }

  chosenAnswer = index;
  [...answerList.children].forEach((optionButton) => optionButton.classList.remove("selected"));
  button.classList.add("selected");
  quizNext.disabled = false;
}

function revealAnswer() {
  if (chosenAnswer === null) {
    quizFeedback.textContent = "Choose an answer before continuing.";
    return;
  }

  const question = quizQuestions[currentQuestion];
  const buttons = [...answerList.children];
  locked = true;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) {
      button.classList.add("correct");
    }
    if (index === chosenAnswer && chosenAnswer !== question.answer) {
      button.classList.add("wrong");
    }
  });

  if (chosenAnswer === question.answer) {
    score += 1;
    quizFeedback.textContent = `Correct. ${question.explanation}`;
  } else {
    quizFeedback.textContent = `Not quite. ${question.explanation}`;
  }

  scoreCounter.textContent = `Score: ${score}`;
  quizNext.textContent = currentQuestion === quizQuestions.length - 1 ? "See result" : "Next question";
}

function nextQuestion() {
  if (!locked) {
    revealAnswer();
    return;
  }

  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion += 1;
    quizNext.textContent = "Next question";
    renderQuestion();
    return;
  }

  questionText.textContent = `Quiz complete. You scored ${score} of ${quizQuestions.length}.`;
  answerList.innerHTML = "";
  quizFeedback.textContent = "Restart to try again or revisit any section above.";
  quizNext.disabled = true;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  chosenAnswer = null;
  locked = false;
  quizNext.disabled = true;
  renderQuestion();
}

async function fetchJoke() {
  apiStatus.textContent = "Loading fresh content...";

  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    jokeText.textContent = data.value;
    apiStatus.textContent = `Updated at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`;
  } catch (error) {
    jokeText.textContent = "Could not load a joke right now.";
    apiStatus.textContent = "API request failed. Try again in a moment.";
    console.error(error);
  }
}

prevSlide.addEventListener("click", () => {
  setSlide(currentSlide - 1);
  startSlideTimer();
});

nextSlide.addEventListener("click", () => {
  setSlide(currentSlide + 1);
  startSlideTimer();
});

quizNext.addEventListener("click", nextQuestion);
quizRestart.addEventListener("click", restartQuiz);
refreshJoke.addEventListener("click", fetchJoke);

buildDots();
renderSlide(0);
startSlideTimer();
renderQuestion();
fetchJoke();
