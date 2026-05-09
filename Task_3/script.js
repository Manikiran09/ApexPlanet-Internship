const carouselSlides = [
  {
    title: "Sunrise",
    description: "A simple slide with warm colors.",
    image: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <rect width="1200" height="800" fill="#f0b35f"/>
        <circle cx="870" cy="210" r="150" fill="#fff3cf" opacity="0.9"/>
        <rect x="120" y="180" width="380" height="400" rx="24" fill="#ffffff" opacity="0.9"/>
        <rect x="170" y="250" width="220" height="28" rx="8" fill="#173f45"/>
        <rect x="170" y="300" width="280" height="16" rx="8" fill="#9db7b5"/>
        <rect x="170" y="335" width="240" height="16" rx="8" fill="#9db7b5"/>
        <rect x="170" y="370" width="200" height="16" rx="8" fill="#9db7b5"/>
        <rect x="650" y="220" width="410" height="250" rx="24" fill="#173f45"/>
        <rect x="700" y="270" width="260" height="30" rx="8" fill="#f5f1ea"/>
        <rect x="700" y="320" width="190" height="16" rx="8" fill="#d7ece7"/>
        <rect x="700" y="355" width="240" height="16" rx="8" fill="#d7ece7"/>
      </svg>
    `)
  },
  {
    title: "Balance",
    description: "A clean layout with simple shapes.",
    image: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <rect width="1200" height="800" fill="#f3ede4"/>
        <circle cx="360" cy="260" r="150" fill="#d77c3d"/>
        <circle cx="760" cy="300" r="220" fill="#145f57" opacity="0.92"/>
        <rect x="120" y="500" width="350" height="110" rx="18" fill="#ffffff"/>
        <rect x="150" y="530" width="200" height="18" rx="6" fill="#145f57"/>
        <rect x="150" y="560" width="150" height="16" rx="6" fill="#9db7b5"/>
        <rect x="640" y="500" width="420" height="110" rx="18" fill="#0f2f33"/>
        <rect x="670" y="530" width="230" height="18" rx="6" fill="#f3ede4"/>
        <rect x="670" y="560" width="180" height="16" rx="6" fill="#d6ebe8"/>
      </svg>
    `)
  },
  {
    title: "Motion",
    description: "A mobile-friendly slide with simple contrast.",
    image: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <rect width="1200" height="800" fill="#10282d"/>
        <path d="M120 550 C250 380, 410 360, 560 510 S880 680, 1060 420" fill="none" stroke="#f0b35f" stroke-width="30" stroke-linecap="round"/>
        <circle cx="270" cy="330" r="90" fill="#f5f1ea"/>
        <circle cx="620" cy="410" r="110" fill="#d6ebe8"/>
        <circle cx="940" cy="300" r="80" fill="#d77c3d"/>
        <rect x="120" y="620" width="960" height="70" rx="20" fill="#ffffff" opacity="0.12"/>
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
