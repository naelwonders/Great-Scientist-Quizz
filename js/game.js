let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 640,
    backgroundColor: '#a52fbc',
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    autoCenter: true
};

let game = new Phaser.Game(config);
let currentIndex = 0;
let answerPanel = [];
let answerText = [];
let fists = [];
let score = 0;


function preload() {
    //attention un folder qui s'appelle Sprite ne marchera pas sur ichio (je sais pas pourquoi though)
    //this.load.image('background', '../assets/Sprites/background.png');
    this.load.image('question', '../assets/Sprites/Label1.png');
    this.load.image('answer', '../assets/Sprites/Label4.png');
    this.load.image('fist', '../assets/Sprites/fist.png');
    this.load.image('playButton', '../assets/Sprites/Play.png');

    //telecharger le fichier JSON
    this.load.json('questions', './assets/data/Questions.json');
   
}

function create() {

    // faire le lien avec le fichier JSON et cette page
    questionJSON = this.cache.json.get('questions');

    //background = this.add.image(0,0,'background');
    
    title = this.add.text(50, 60, "WHO AM I ??", 
        {fontfamily: 'Arial', 
        fontSize: 90, 
        fontStyle: 'bold',
        color: '#000000'});
    //visuel et texte pour la question

    // questionImage = this.add.image(config.width / 2, config.height * 0.2, 'question');
    // questionImage.setScale(0.6);
    
    questionText = this.add.text(50,config.height / 3 -50, questionJSON.questions[currentIndex].title, 
        {fontfamily: 'Arial', 
        fontSize: 30, 
        fontStyle: 'bold',
        color: '#000000'});
    
    //le bouton pour passer à la prochaine question
    playButton = this.add.image(config.width - 80, config.height / 2, 'playButton').setInteractive();
    playButton.on('pointerdown', nextQuestion)
    playButton.setScale(0.4)
    playButton.setVisible(false)
    
    
    //console.log(questionJSON.questions [2].answer[0]); // premiere question
    //answers = this.add.group();
    for (let i = 0; i < 3; i++) {
        
        choice = questionJSON.questions[currentIndex].answer[i]
        
        answerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.25) + (120 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        
        //answers.add(answerPanel);
        answerText[i] = this.add.text(170,(config.height * 0.23) + (120 *(i + 1)), choice, {fontfamily: 'Arial', fontSize: 24, color: '#000000'});
    }   
    
    //les etoiles
    for (let i = 0; i < 5; i++) {
        fist = this.add.image((config.width / 7) + (i * 110) - 5, config.height - 50, 'fist');
        fist.setScale(0.1);
        fist.alpha = 0;
        fists[i] = fist;
    }
    
}


function update() {
// on a pas eu besoin de l'update car on est sur de l'evenementiel
}

//mettre des couleurs en fonction des bonnes/mauvaises reponses
function checkAnswer(indexAnswer) {
    for (let i = 0; i < 3; i++) {
        
        //tt mettre en rouge, puis rendre pas interactif
        answerText[i].setColor("#ff0000");
        // on desactive les 3
        answerPanel[i].disableInteractive();
        }

        if (indexAnswer == questionJSON.questions[currentIndex].goodAnswer) {
            fists[currentIndex].alpha = 1;
            score += 1;
            }
        else {
            fists[currentIndex].alpha = 0.3;
            }
        
        answerText[questionJSON.questions[currentIndex].goodAnswer].setColor("#00ff00")
        playButton.setVisible(true)
    }


function nextQuestion () {
    
    currentIndex ++;
    if (currentIndex < 5) {
        questionText.text = questionJSON.questions[currentIndex].title; // questionText est un objet, on change la propriété de l'objet ".text"; cette propriété pour aller changer le texte meme
        
        for (let i = 0; i < 3; i++) {
            answerText[i].text = questionJSON.questions[currentIndex].answer[i];
            answerText[i].setColor("#000000");
            answerPanel[i].setInteractive();
        }
    }
    else {
        questionImage.setVisible(false);
        questionText.text = "Vous avez un score de "+score+"/5";
        for (let i = 0; i < 3; i++) {
            answerText[i].text = "";
            answerPanel[i].setVisible(false);
        }
    }
    playButton.setVisible(false)
}
