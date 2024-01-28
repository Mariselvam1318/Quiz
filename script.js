const questions =[
    {
        question:"What does HTML stand for?",
        answers:[
            {text:" Hyper Text Markup Language",correct:true},
            {text:"High-level Text Machine Language",correct:false},
            {text:"Hyperlink and Text Markup Language",correct:false},
            {text:"Hyper Transfer Markup Language",correct:false},
        ]
    },
    {
        question:"What is the primary purpose of CSS in web development?",
        answers:[
            {text:"Handling server-side logic",correct:false},
            {text:"Creating and styling web page content",correct:true},
            {text:"Managing databases",correct:false},
            {text:"Creating animations",correct:false},
        ]
    },
    {
        question:"Which of the following is not a programming language?",
        answers:[
            {text:"JavaScript",correct:false},
            {text:"Python",correct:false},
            {text:"HTML",correct:true},
            {text:" Java",correct:false},
        ]
    },
    {
        question:"Which of the following data types is not used in JavaScript?",
        answers:[
            {text:"String",correct:false},
            {text:"Integer",correct:true},
            {text:"Boolean",correct:false},
            {text:"Object",correct:false},
        ]
    },
    {
        question:"What does API stand for in web development?",
        answers:[
            {text:"Application Programming Interface",correct:true},
            {text:"Advanced Programming Instructions",correct:false},
            {text:"Automated Program Interaction",correct:false},
            {text:" Application Program Interaction",correct:false},
        ]
    },
];

const questionElement=document.getElementById("question");
const options=document.getElementById("options");
const nextbtn=document.getElementById("nxt-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz(){
    currentQuestionindex = 0;
    score = 0;
    nextbtn.innerHTML="Next";
    const resultGIF = document.getElementById("resultGIF");
     resultGIF.src = "";
    resultGIF.style.display = "none";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion =questions[currentQuestionindex];
    let questionNo = currentQuestionindex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        options.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        
         
    });
}
 function resetState(){
    nextbtn.style.display="none";
    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
 }

function selectAnswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct ==="true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(options.children).forEach(button => {
    if (button.dataset.correct === "true") {
        button.classList.add("Correct");
    }
    button.disabled = true;
});

nextbtn.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
    
    
    const resultGIF = document.getElementById("resultGIF");
    resultGIF.style.display = "block";

    if (score >= 3) {
        resultGIF.src = "https://media.tenor.com/JY2fRmOGB1UAAAAC/cheer-happy.gif"; 
    } else if (score >= 0) {
        resultGIF.src = "https://gifdb.com/images/high/cute-sad-peach-cat-crying-on-floor-mw6mm7hhecp53cs5.gif"; 
    } 

}

function handlenextbtn(){
    currentQuestionindex++;
    if(currentQuestionindex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }

}
nextbtn.addEventListener("click",()=>{
    if(currentQuestionindex<questions.length){
        handlenextbtn();
    }
    else{
        startQuiz();
    }
})
startQuiz();