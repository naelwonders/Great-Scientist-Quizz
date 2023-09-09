let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 640,
    backgroundColor: "#322E4F", //Dark Enigma
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create
        //update: update I removed this part because I do not need and upsate for this part
    },
    autoCenter: true
};

let game = new Phaser.Game(config);

let currentQuestion;
let currentAnswerList = [];
//let currentHint = []; pour après

function create() {
    
    loadQuestionsFromJSON(this);

    currentQuestion = getCurrentQuestion();
    currentAnswerList = getCurrentAnswerList();

    displayTitle(this);
    displayQuestion(this);
    displayAnswers(this);// --> set interactive to checkAnswer()
    displayNextButtonCat(this); // --> set interactive to nextQuestion()
    
}

