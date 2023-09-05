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

let questionJSON;
let numberOfQuestions;
let currentIndex;
let score;

function loadQuestions() {
    // faire le lien avec le fichier JSON et cette page (on a deja preloadé dans preload)
    questionJSON = this.cache.json.get('questions');
    shuffleArray(questionJSON.questions);
    numberOfQuestions = questionJSON.questions.length;
}

function create() {

    currentIndex = 0;
    score = 0;

    loadQuestions.call(this);
    
    // Initialize and display UI elements
    createUIElements.call(this);  // "this" refers to the current scene
    
    displayQuestion(this, questionJSON.questions[currentIndex].title);
    
    //dans le display answers, il y a un lien vers le gamelogic (check answer pour l'instant)
    displayAnswers(this,shuffleArray(questionJSON.questions[currentIndex].answer)); 

    
}

