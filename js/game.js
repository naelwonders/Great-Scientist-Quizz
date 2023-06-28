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

//TO DO: create an init and separate the initialisation vs the declaration
let game = new Phaser.Game(config);
let currentIndex = 0;
let answerPanel = [];
let answerText = [];
let fists = [];
let score = 0;
let moreInfoCat;
let scientistImage;
let rectangle;
let numberOfQuestions = 5;


function preload() {
    //attention un folder qui s'appelle Sprite ne marchera pas sur ichio (je sais pas pourquoi though)
    //this.load.image('background', '../assets/Sprites/background.png');
    this.load.image('question', '../assets/Sprites/Label1.png');
    this.load.image('answer', '../assets/Sprites/Label4.png');
    this.load.image('fist', '../assets/Sprites/fist.png');
    this.load.image('playButton', '../assets/Sprites/Play.png');

    //images and assets for the more info file page
    this.load.image('moreInfoCat', '../assets/Sprites/cat.png');
    this.load.image('scientist0', '../assets/Sprites/curie.png');
    this.load.image('scientist1', '../assets/Sprites/lamarr.png');
    this.load.image('scientist2', '../assets/Sprites/franklin.png');
    this.load.image('scientist3', '../assets/Sprites/lovelace.png');
    //telecharger le fichier JSON
    this.load.json('questions', './assets/data/Questions.json');
   
}

function create() {

    // faire le lien avec le fichier JSON et cette page
    questionJSON = this.cache.json.get('questions');
    
    //titre en haut de chaque question
    title = this.add.text(50, 60, "WHO AM I ??", 
        {fontfamily: 'Arial', 
        fontSize: 80, 
        fontStyle: 'bold',
        color: '#000000'});
    
    //texte pour la question
    questionText = this.add.text(50,config.height / 3 -50, questionJSON.questions[currentIndex].title, 
        {fontfamily: 'Arial', 
        fontSize: 30, 
        fontStyle: 'bold',
        color: '#000000'}
        );
    
    //le bouton pour passer à la prochaine question, le currentIndex est incrémenté
    playButton = this.add.image(config.width - 80, config.height / 2, 'playButton').setInteractive();
    playButton.on('pointerdown', nextQuestion)
    playButton.setScale(0.4)
    playButton.setVisible(false)
        
    for (let i = 0; i < 3; i++) 
        {
        choice = questionJSON.questions[currentIndex].answer[i]
        
        //les panneaux de reponse sont interactives
        answerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.25) + (110 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        answerPanel[i].alpha = 0.3;
        
        //le texte de reponse est ajouté en fonction du fichier JASON et du current Index
        answerText[i] = this.add.text(170,(config.height * 0.23) + (110 *(i + 1)), choice, {fontfamily: 'Arial', fontSize: 24, color: '#000000'});
        }   
    
    //les signes qui indique l'overview des bonne/mauvais reponse en bas du jeu
    for (let i = 0; i < 5; i++) {
        fist = this.add.image((config.width / 7) + (i * 110) - 5, config.height - 50, 'fist');
        fist.setScale(0.1);
        fist.alpha = 0;
        fists[i] = fist;
    }
    
    //the picture of the scientist is already there but invisible
    scientistImage = this.add.image(0,0,"scientist"+[currentIndex])
    scientistImage.setOrigin(0,0);
    scientistImage.setVisible(false);

    rectangle = this.add.graphics();
    rectangle.fillStyle(0x000000, 1); // Set fill color to red
    //rectangle.setOrigin(0.5,0.5);
    rectangle.setVisible(false);

    //add an interactive information car icon for clicking and getting more info on the scientist (picture and text)
    moreInfoCat = this.add.image(1000,1000, 'moreInfoCat').setInteractive();  //hide it by putting it far
    moreInfoCat.setScale(0.2);
    //when I click on the moreInfo cat, the bio will appear on screen
    moreInfoCat.on('pointerdown',()=> { getBio() })
    
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
    moreInfoCat.setVisible(true)
    moreInfoCat.setPosition(answerPanel[questionJSON.questions[currentIndex].goodAnswer].x - 210, answerPanel[questionJSON.questions[currentIndex].goodAnswer].y);
    answerText[questionJSON.questions[currentIndex].goodAnswer].setColor("#00ff00")
    playButton.setVisible(true)
    }


function nextQuestion () {
    
    currentIndex ++;
    playButton.setVisible(false)
    moreInfoCat.setVisible(false)
    if (currentIndex < numberOfQuestions) {
        questionText.text = questionJSON.questions[currentIndex].title; // questionText est un objet, on change la propriété de l'objet ".text"; cette propriété pour aller changer le texte meme
        
        for (let i = 0; i < numberOfQuestions; i++) {
            answerText[i].text = questionJSON.questions[currentIndex].answer[i];
            answerText[i].setColor("#000000");
            answerPanel[i].setInteractive();
        }
    }
    else {
        //set everything invisible and annouce the score
        questionText.text = "Vous avez un score de "+score+"/"+numberOfQuestions+"!";
        for (let i = 0; i < numberOfQuestions; i++) {
            answerText[i].text = "";
            answerPanel[i].setVisible(false);
        }
    }
}

function getBio() {
    //add the photo on top of the game
    scientistImage.setVisible(true);
    rectangle.setVisible(true);
    moreInfoCat.setVisible(false);
    
}

