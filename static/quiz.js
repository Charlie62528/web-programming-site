// ======================================================
// QUESTIONS
// ======================================================
const questions = [ // Populate this array with question objects as needed.
// Each question object should have the following structure:
 {
    question:
   "Which country hosted the first FIFA World Cup?",
   choices: ["Brazil", "Uruguay", "Argentina", "France"],
   answer: 1,
   explanation:
     "Uruguay hosted the first FIFA World Cup in 1930",
 },
 
{
  question:
  "How many FIFA World Cup tournaments were held from 1930 through 2026?",
   choices: ["20", "21", "22", "23"],
   answer: 3,
   explanation:
   "The FIFA  World Cup is normally held every four years , making the 2026 tournament the 23rd edition. However, the tournaments scheduled for 1942 and 1946 were cancelled because of World War II."
},
{
 question:
 "Which country became the first African nation to reach the FIFA World Cup quarter-finals?",
 choices:["Senegal","Ghana","Cameroon","Morocco"],
 answer:2,
 explanation:
 "In 1990, Cameroon became the first African team to reach the World Cup quarter-finals."
},

{
 question:
 "Who hold the record for the most goals scored in a single FIFA World Cup tournament?",
 choices:["Gerd Müller","Ronaldo Nazário","Miroslav Klose","Just Fontaine"],
 answer:3,
 explanation:
 "Just Fontaine scored 13 goals for France during the 1958 FIFA World Cup , a record that still stands.",
},

{
 question:
 "Who scored the fastest goal in FIFA World Cup history?",
 choices:["Hakan Şükür","Pelé","David Villa","Maradona"],
 answer:0,
 explanation:
 "Hakan Şükür scored for Turkey after approximately 11 seconds against South Korea in the 2002 World Cup.",
},

{
 question:
 "Which player became the first male footballer to score in five differrent FIFA World Cups?",
 choices:["Lionel Messi","Cristiano Ronaldo","Miroslav Klose","Neymar"],
 answer:1,
 explanation:
 "Cristiano Ronaldo scored in the 2006,2010,2014,2018,2022 FIFA World Cups.",
},

{
 question:
 "Which country was the most recent to win two consecutive FIFA World Cups?",
 choices:["Argentina","Spain","Germany","Brazil"],
 answer:3,
 explanation:
 "Brazil won consecutive FIFA World Cups in 1958 and 1962. No country has repeated the achievement since.",
},

{
 question:
 "Which player has made the most appearances in FIFA World Cup matches?",
 choices:["Paolo Maldini","Lionel Messi","Miroslav Klose","Cafu"],
 answer:1,
 explanation:
 "Lionel Messi holds the record for the most FIFA World Cup match appearances with 34 matches played accros five tournaments,", 
},

{
 question:
 "Who scored the winning goal in the 2026 FIFA World Cup Final?",
 choices:["Lamine Yamal","Lionel Messi","Ferran Torres","Pedri"],
 answer:2,
 explanation:
 "Ferran Torres scored in extra time as Spain defeated Argentina 1-0 to win the 2026 FIFA World Cup.",  
},

{
 question:
 "Who is the youngest player to win the FIFA World Cup?",
 choices:["Pelé","Kylian Mbappé","Lamine Yamal","Gilberto Mora"],
 answer:0,
 explanation:
 "Pelé became the youngest player to win the FIFA World Cup when Brazil won the 1958 tournament. He was only 17 years and 249 days old",  
},



];
// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
  //   Save the user's answer for the current question.
  userAnswers[currentQuestion]=choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
  //   Move to the next question if not at the last question.
  if(currentQuestion < questions.length -1 )
  {currentQuestion++;
     renderQuestion();
  }
}

function goPrevious() {
  //   Move to the previous question if not at the first question.
    if(currentQuestion > 0 )
  {currentQuestion--;
     renderQuestion();
  }
}

function goFirst() {
  //   Move to the first question.
  currentQuestion=0;
   renderQuestion();

}
function goLast() {
  //   Move to the last question.
  currentQuestion=questions.length-1;
   renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
  //   Calculate the user's score based on their answers.
let score=0;

for (let i =0 ; i <questions.length; i++)
{if ( userAnswers[i]===questions[i].answer)
{score++;}
}
return score;
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
  //   Calculate the percentage score based on the total number of questions.
  let percentage =( score / questions.length)*100;
  return percentage;
}

// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
  //   Return a performance message based on the percentage score.
  if (percentage>= 80)
    return "Excellent"
   else if (percentage>= 60 && percentage<=79)
    return "Good"
  else if (percentage>= 50 && percentage<=59)
    return "Pass"
  else 
    return "Needs improvement"
}

// ======================================================
// BUILD CORRECTION
// ======================================================
function buildCorrection() {
  let correction = "";

  //   Build a correction string that includes the question, the user's answer,
  //   the correct answer, and an explanation for each question.
for(let i = 0 ; i< questions.length ; i++)
{
  let question = questions[i];
  let userAnswer;
  if(userAnswers[i]== undefined)
    userAnswer="Not Answered";
  else 
    userAnswer=question.choices[userAnswers[i]];
  let correctAnswer=question.choices[question.answer];

  let result ;

  if(userAnswers[i]=== question.answer)
    result="Correct";
  else
    result="Incorrect";

  correction +="Question " + (i+1) + ": "+ question.question + "\n\n";
  correction +="Your answer: " + userAnswer + "\n";
  correction +="Correct answer: " + correctAnswer + "\n";
  correction +="Result: " + result + "\n";
  correction +="Explanation: " + question.explanation + "\n\n";
  
  if( i< questions.length-1)
  {
     correction +="----------------------------------------------\n\n";
  }
 
}
  return correction;
}

// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------
  document.getElementById("questionText").textContent = q.question;

  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();
