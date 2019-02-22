// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv= document.getElementById("scoreContainer");

// create questions
let questions = [
    {
        question : "",
        imgSrc : base_url+"/images/koreanA.jpg",  
        choiceA : "D",
        choiceB : "Z",
        choiceC : "T",
        choiceD : "R",
        correct : "A",
    },{
        question : "",
        imgSrc : "img/koreanB.jpg",
        choiceA : "S",
        choiceB : "B",
        choiceC : "U",
        choiceD : "M",
        correct : "B",
    },{
        question : "",
        imgSrc : "img/koreanA.jpg",
        choiceA : "X",
        choiceB : "G",
        choiceC : "A",
        choiceD : "L",
        correct : "C",  
    },{
       question : "",
        imgSrc : "img/koreanC.jpg",
        choiceA : "J",
        choiceB : "N",
        choiceC : "Y",
        choiceD : "C",
        correct : "D",  
    },{
       question : "",
        imgSrc : "img/",
        choiceA : "Z",
        choiceB : "T",
        choiceC : "V",
        choiceD : "M",
        correct : "A",  
    },{
       question : "",
        imgSrc : "img/",
        choiceA : "L",
        choiceB : "P",
        choiceC : "D",
        choiceD : "G",
        correct : "D",  
    },{
        question : "",
        imgSrc : "img/",
        choiceA : "P",
        choiceB : "A",
        choiceC : "K",
        choiceD : "N",
        correct : "B",  
    },{
        question : "",
        imgSrc : "img/",
        choiceA : "A",
        choiceB : "G",
        choiceC : "H",
        choiceD : "S",
        correct : "C",  
    },{
        question : "",
        imgSrc : "img/",
        choiceA : "H",
        choiceB : "A",
        choiceC : "K",
        choiceD : "D",
        correct : "B",  
    },{
        question : "",
        imgSrc : "img/",
        choiceA : "U",
        choiceB : "O",
        choiceC : "P",
        choiceD : "Y",
        correct : "C",  
    }
    
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render question 
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question + "</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,800);
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; 
        qIndex++){
            progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }    
}

//counter render 

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }    
}

// checkAnswer

function checkAnswer(answer){
    if ( answer == questions[runningQuestion].correct){
         // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
        
    }
}

// answer is Correct
function answerIsCorrect(){
    
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePercent = Math.round(10 * score/questions.length);
    
    //choose the image based on the scorePerCent
    let img = (scorePercent >= 8) ? "img/5.png" :
              (scorePercent >= 6) ?  "img/4.png" :
              (scorePercent >= 4) ? "img/3.png" :
              (scorePercent >= 2) ? "img/2.png" :
              "img/1.png";
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>Your Score is : "+ scorePercent +"</p>"

}