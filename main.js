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

function loadQuestions() {
    // faire le lien avec le fichier JSON et cette page (on a deja preloadé dans preload), puis on shuffle the questions 
    questionJSON = this.cache.json.get('questions');
    numberOfQuestions = questionJSON.questions.length;
}

function create() {
    // Initialize and display UI elements
    createUIElements.call(this);  // "this" refers to the current scene

    loadQuestions.call(this);
    
    // Shuffle answers for each question
    questionJSON.questions.forEach(q => {
        shuffleArray(q.answer);
    });

    // Display the first question
    displayQuestion(questionJSON.questions[currentIndex]);

    // ... other initialization logic ...
}

