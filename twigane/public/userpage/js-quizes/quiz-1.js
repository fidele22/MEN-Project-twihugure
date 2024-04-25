// arry which contains a questions and its answers
const questions = [

    {
        question: "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:?",
        image:"",
        answers: [
            {text: "(a) Umuyobozi", correct: true},
            {text: "(b) Umuherekeza",correct: false},
            {text: "(c)A na B ni ibisubizo by’ukuri",correct: false},
            {text: "(d) Nta gisubizo cy’ukuri kirimo" ,correct: false},
        ]
    },
    { 
        question: "Ijambo “akayira” bivuga inzira nyabagendwa ifunganye yagenewe gusa:?",
        answers:[

            {text:"(A).Abanyamaguru" ,correct: false},
            {text:"(B).Ibinyabiziga bigendera ku biziga bibiri" ,correct: false},
            {text:"(C).A na B ni ibisubizo by’ukuri" ,correct: true},
            {text:"(D).Nta gisubizo cy’ukuri kirimo" ,correct: false},
        ]
    },
    {
        question: "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n’uturanga gukata tw’ibara ryera utwo turanga cyerekezo tumenyesha :?",
        answers:[

            {text:"(A).fIgisate cy’umuhanda abayobozi bagomba gukurikira" ,correct: false},
            {text:"(B).Ahegereye umurongo ukomeje" ,correct: false},
            {text:"(C).Igabanurwa ry’umubare w’ibisate by’umuhanda mu cyerekezo bajyamo" ,correct: true},
            {text:"(D).A na C nibyo" ,correct: false},
        ]
    },
    {
        question: "Ahantu ho kugendera mu muhanda herekanwa n’ibimenyetso bimurika ibinyabiziga ntibishobora kuhagenda :?",
        image:"",
        answers: [
            {text: "(a). Biteganye", correct: false},
            {text: "(b). Ku murongo umwe",correct: false},
            {text: "(c). A na B nibyo",correct: false},
            {text: "(d). Nta gisubizo cy’ukuri kirimo" ,correct: true},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
    {
        question: "?",
        image:"",
        answers: [
            {text: "(a) ", correct: true},
            {text: "(b) ",correct: false},
            {text: "(c)",correct: false},
            {text: "(d) " ,correct: false},
        ]
    },
];






// declaration and calling element from htlm where question , answers and button will be displayed

const questionElement = document.getElementById("question");
const imageElement = document.getElementById('question-image');
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
// first page of starting button

let currentQuestionIndex = 0; // declation counting number of question and initialize that it must start from index 0, and same to score
let score = 0;

function startQuiz(){ //
  
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "komeza";    
    showQuestion();
}

function showQuestion(){ //function that start to display question and button on site
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "."+currentQuestion.question;
    imageElement.src = currentQuestion.image ? currentQuestion.image : '';//displaying image

    // show image where is there and remove its space where is none
    // style based on whether the current question has an image
    if (currentQuestion.image) {
        imageElement.style.display ='block';
    } else {
        imageElement.style.display = 'none';
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){  
    nextButton.style.display ="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}

function showScore(){
    clearInterval(timerInterval);
    resetState();
    questionElement.innerHTML = `You have completed the quiz , you got ${score} / ${questions.length}`;
    nextButton.innerHTML = "subiramo"
    nextButton.style.display ="block";
    nextButton.addEventListener("click", () => { // this addeventlistener used to reflesh the page inorder to start the quiz when u click on subiramo button
        window.location.reload();
    });
}
 startQuiz();

 // codes which let if you click on next button it proceed to next question

 nextButton.addEventListener("click", () => {
    
 currentQuestionIndex++;
 if(currentQuestionIndex < questions.length){
     showQuestion();
    } else if (currentQuestionIndex === questions.length) {
        showScore();
    } else {
        // Reset the quiz to play again
        currentQuestionIndex = 0;
        score = 0;
        startQuiz();
 }});

 // codes which makes timing for test / making duration of exam

 let timeLimit = 20 * 60; // 20 minutes in seconds
 let timerElement = document.getElementById("timer");
 
 let timerInterval = setInterval(() => {
     if (timeLimit <= 0) {
         clearInterval(timerInterval);
         showScore(); // Display score when time is up
     } else {
         let minutes = Math.floor(timeLimit / 60);
         let seconds = timeLimit % 60;
         timerElement.innerHTML = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
         timeLimit--;
     }
 }, 1000);
 