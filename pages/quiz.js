// CONSTANTS
const question = document.querySelector("#question");
const questionNum = document.querySelector(".question-count");
const options = document.querySelectorAll(".option");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".submit");
const paginate = document.querySelector(".pagination");

// VARIABLES
let questionsDB = [
  {
    question: "You or I as a child of God,____ to prosper.",
    options: ["is", "has", "are", "am"],
    answer: "am",
  },
  {
    question: "None of you ____ righteous.",
    options: ["is", "was", "has ever been", "are"],
    answer: "are",
  },
  {
    question: "None of them ____ righteous; said Ade.",
    options: ["were", "is", "are", "have ever been"],
    answer: "is",
  },
  {
    question: "Seventy percent of the problem ____ solved.",
    options: ["have been", "has being", "has been", "have being"],
    answer: "has been",
  },
  {
    question: "John welcomed his guests ____ offered them drinks.",
    options: ["and", "while", "until", "as"],
    answer: "and",
  },
];

let totalQuestions = 5;
let score = 0;
let questionNumber = 1;
let Index = 0;

// LOAD QUESTIONS
function getShuffledQuestions(question) {
  if (question.length === 1) return question;
  const rand = Math.floor(Math.random() * question.length);
  return [
    question[rand],
    ...getShuffledQuestions(question.filter((_, i) => i !== rand)),
  ];
}

let randomQuestions = getShuffledQuestions(questionsDB);
let currentQuestion;
let selectedOption;

function loadQuestion(index, btn) {
  index = Index;
  currentQuestion = randomQuestions[index];
  question.innerText = currentQuestion.question;

  let option = currentQuestion.options;
  for (let i = 0; i < options.length; i++) {
    options[i].innerText = option[i];
  }
  questionNum.innerText = `${questionNumber}.`;

  if (questionNumber <= 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (questionNumber == totalQuestions) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  // TODOS: Save selected option to db
  if (btn === "next") {
    console.log(selectedOption);
  }
}

// NAVIGATION >> Next button << Previous button <<>> Pagination
function nextQuestion() {
  questionNumber++;
  Index++;
  loadQuestion(Index, "next");
}

function prevQuestion() {
  questionNumber--;
  Index--;
  loadQuestion(Index);
}

function pagination() {
  let pageNum;
  for (let i = 0; i < totalQuestions; i++) {
    let btns = document.createElement("button");
    btns.innerText = `${i + 1}`;
    btns.classList.add("page-num");
    paginate.appendChild(btns);
    btns.addEventListener("click", (e) => {
      pageNum = e.target.innerText;
      questionNumber = pageNum;
      Index = pageNum - 1;
      loadQuestion(Index);
    });
    // TODO: Change background color of selected option button
  }
}

// SUBMISSION
function endQuiz() {
  // do something
  console.log("Submitted...");
}

// SCORE LOGIC
function getScores() {
  let optionA, optionB, optionC, optionD;

  for (let i = 0; i < options.length; i++) {
    optionA = options[0].parentElement;
    optionB = options[1].parentElement;
    optionC = options[2].parentElement;
    optionD = options[3].parentElement;
  }

  let opts = [optionA, optionB, optionC, optionD];
  let selectedOption;

  opts.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      selectedOption =
        e.target === opt ? e.target.innerText.slice(4) : e.target.innerText;
      // TODO: Compute the score and avoid inaccuracy
      score = selectedOption === currentQuestion.answer ? score + 2 : score;
      console.log(score);
      console.log(e.currentTarget.innerText.slice(4));

      switch (opt) {
        case optionA:
          optionA.classList.add("selected");
          optionB.classList.remove("selected");
          optionC.classList.remove("selected");
          optionD.classList.remove("selected");
          break;
        case optionB:
          optionB.classList.add("selected");
          optionA.classList.remove("selected");
          optionC.classList.remove("selected");
          optionD.classList.remove("selected");
          break;
        case optionC:
          optionC.classList.add("selected");
          optionA.classList.remove("selected");
          optionB.classList.remove("selected");
          optionD.classList.remove("selected");
          break;
        case optionD:
          optionD.classList.add("selected");
          optionA.classList.remove("selected");
          optionC.classList.remove("selected");
          optionB.classList.remove("selected");
          break;

        default:
          opt.classList.remove("selected");
          break;
      }
    });
  });
}

loadQuestion();
pagination();
getScores();

nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);
submitBtn.addEventListener("click", endQuiz);
