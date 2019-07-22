//set score and questions to 0
  let scoreCount = 0;
  let questNum = 0;

//these are the questions the users will be asked
const QUESTIONBANK = [ 
  {
    question: "What is ethereum?",
    answers: [
      "A turing complete AI",
      "A cryptocurrency with a fixed price",
      "A programming language",
      "An open software platform built on blockchain technology"
    ],
    correctAnswer: "An open software platform built on blockchain technology",
  },
  {
    question: "Who is known as the creator of ethereum?",
    answers: [
      "Satoshi Nakamoto",
      "Vitalik Buterin",
      "David Chaum",
      "Craig Wright"
    ],
    correctAnswer: "Vitalik Buterin",
  },
  {
    question: "Which year was the ethereum white paper released?",
    answers: [
      "2013",
      "2009",
      "2014",
      "2008"
    ],
    correctAnswer: "2014", 
  },
  {
    question: "Which option best describes how ethereum might be used?",
    answers: [
      "As a computing platform for decentralized applications",
      "For validating bitcoin blocks",
      "For verifying transations, specifically for banks",
      "For buying lambos"
    ],
    correctAnswer: "As a computing platform for decentralized applications",   
  },
  {
    question: "What is an ethereum smart contract?",
    answers: [
      "An agreement between two bitcoin nodes",
      "An agreement between ethereum users and ethereum lawyers",
      "A digital agreement that is programmed to execute only if certain conditions are met",
      "A quantum computer running on solar and wind"
    ],
    correctAnswer: "A digital agreement that is programmed to execute only if certain conditions are met",
  },
  {
    question: "What is an ethereum token?",
    answers: [
      "A cryptocurrency which always appreciates over time",
      "A digital asset built on top of ethereum",
      "A digital asset for investment only",
      "A J.R.R Tolkien collectable"
    ],
    correctAnswer: "A digital asset built on top of ethereum", 
  },
  {
    question: "What is the name of ethereum's annual conference?",
    answers: [
      "Ethcon",
      "Devcon",
      "DevLearn",
      "The Puppy Bowl"
    ],
    correctAnswer: "Devcon",
  },
  {
    question: "Which option best describes how bitcoin and ethereum are different?",
    answers: [
      "Bitcoin is anonymous, but ethereum requires one's identity for use",
      "There is no difference",
      "Bitcoin miners earn ETH, while ethereum miners earn BTC",
      "Bitcoin is a peer-to-peer electronic cash system, Ethereum allows for scripts of code to be run as a global computational network"
    ],
    correctAnswer: "Bitcoin is a peer-to-peer electronic cash system, Ethereum allows for scripts of code to be run as a global computational network", 
  },
  {
    question: "Where can you store your cryptocurrency, such as ETH?",
    answers: [
      "On a floppy disk",
      "In a digital wallet",
      "Typically always on a microchip embedded within your credit card",
      "In a piggy bank"
    ],
    correctAnswer: "In a digital wallet", 
  },
  {
    question: "What is the best way to learn more about ethereum?",
    answers: [
      "Visit ethereum.org",
      "Follow the ethereum community on \"crypto\" Twitter",
      "Find a local ethereum meetup or hackathon/conference",
      "All of the above!"
    ],
    correctAnswer: "All of the above!",
  }
];

//generate the HTML to later render in the DOM via generateQuestion function
function generateQuestion () {
  return `
    <section role= "question-page">
      <header role = "banner">
          <h2 id="question">${QUESTIONBANK[questNum].question}</h2>
      </header>
      <form>
        <fieldset>
          <label class="answerOption">
          <input type="radio" value="${QUESTIONBANK[questNum].answers[0]}" name="answer" required>
          <span>${QUESTIONBANK[questNum].answers[0]}</span>
          </label>
          <label class="answerOption">
          <input type="radio" value="${QUESTIONBANK[questNum].answers[1]}" name="answer" required>
          <span>${QUESTIONBANK[questNum].answers[1]}</span>
          </label>
          <label class="answerOption">
          <input type="radio" value="${QUESTIONBANK[questNum].answers[2]}" name="answer" required>
          <span>${QUESTIONBANK[questNum].answers[2]}</span>
          </label>
          <label class="answerOption">
          <input type="radio" value="${QUESTIONBANK[questNum].answers[3]}" name="answer" required>
          <span>${QUESTIONBANK[questNum].answers[3]}</span>
          </label>
          <button type="submit" class="submitButton"> SUBMIT </button>
        </fieldset>
      </form>
      <div class= "status-bar">
        <div>Question: ${questNum + 1}/10</div>
        <div>Your score: ${scoreCount}</div>
      </div>
    </section>`
}

//click on the start button, hide the start page to make way for first question
function startQuiz() {
  $(".startButton").on("click", function(event) {
    $(".start-page").remove();
    $(".initialTitle").remove();
    renderQuestion();
    selectAnswer();
  });
}

//render the question in the DOM
function renderQuestion() {
  $(".questionDiv").html(generateQuestion());
}

//this will determine if the user"s answer selection is correct and add 1 to their score
//either correct or incorrect, the user receives feedback on their answer
function selectAnswer() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log("submit button works");
    let selected = $("input:checked");
    let answer = selected.val();
    let correctAnswer = `${QUESTIONBANK[questNum].correctAnswer}`;
    if (answer === correctAnswer) {
      feedbackIfCorrect();
      interateScore();
    }
    else {
      feedbackIfIncorrect();
    };
  });
}

//if the user answers correctly, show them this
function feedbackIfCorrect() {
  $(".questionDiv").html(`<div class="next-page">
    <img src="http://www.20cents-video.com/userdata/animated-gif/library/source.gif" alt="magical unicorn" class = "unicorn"/>
    <div class= "correct">Correct!</div>
    <button type= button class= "nextButton"> NEXT </button>
    </div>`);
}

//if the user answers incorectly, show them this
function feedbackIfIncorrect() {
  let correctAnswer = `${QUESTIONBANK[questNum].correctAnswer}`;
  $(".questionDiv").html(`<div class="next-page">
    <img src="https://carwad.net/sites/default/files/fat-narwhal-cliparts-127048-7580430.png" alt="sad narwhal" class = "narwhal"/>    
    <p>Ah sorry, the correct answer is:</p>
    <div class = "pad"> ${correctAnswer} </div>
    <button type= button class= "nextButton"> NEXT </button>
    </div>`);
}

//show the user the next question when the user clicks the NEXT button
//if the user is on the last question, display the results page
function advanceQuestion () {
  $(".questionDiv").on("click", ".nextButton", function (event) {
    console.log("next button works");
    if (questNum === (QUESTIONBANK.length - 1)) {
      displayResults();
    }
    else {
      iterateQuestion();
      renderQuestion();
      selectAnswer();
    };
  });
}

//this function adds one to each question number
function iterateQuestion () {
  questNum ++;
}

//this function adds one to each score
function interateScore () {
  scoreCount ++;
}

//this will show the user their final score and give them the option to retake the quiz
function displayResults() {
  let percentageScore = (scoreCount/10) * 100;
  $(".questionDiv").html(`<div class="results-page">
    <img src="https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmfAPKiG2VKHXnBrLa8AvDjJH1UnoXsuGgFeRhXm6nqYK6/unnamed%20(4).gif" alt="cat" class = "cat"/>
    <p>It was a <span class = "m">magical</span> run - you scored ${scoreCount}/10 (${percentageScore}%)!</p>
    <button type= button class= "retakeButton"> RETAKE QUIZ </button>
    </div>`);
}

//this function reloads the page for the user, upon click of the RETAKE QUIZ button
function retakeQuiz() {
  $(".questionDiv").on("click", ".retakeButton", function (event) {
    console.log("retake button works");
    location.reload();
  });
}

//run the functions, be ready for user actions
$(startQuiz);
$(selectAnswer);
$(advanceQuestion);
$(retakeQuiz);
