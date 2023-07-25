//SMALL PROJECT IN MY LEARNING JOURNEY

//BUGG: when the last picture is shown, the score does not appear when I press the play button (should show the score)

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 640,
    backgroundColor: '#F70776', //C3195D for darker pink; for a bordeauish; and black go well together
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
let numberOfQuestions;


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
    this.load.image('scientist1', '../assets/Sprites/franklin.png');
    this.load.image('scientist2', '../assets/Sprites/johnson.png');
    this.load.image('scientist3', '../assets/Sprites/lovelace.png');
    this.load.image('scientist4', '../assets/Sprites/lamarr.png');
    
    //telecharger le fichier JSON
    this.load.json('questions', './assets/data/Questions.json');
   
}

function create() {

    // faire le lien avec le fichier JSON et cette page
    questionJSON = this.cache.json.get('questions');
    numberOfQuestions = questionJSON.questions.length;
    
    //titre en haut de chaque question
    title = this.add.text(config.width / 2, 100, "GUESS WHO", 
        {fontFamily: 'Impact', 
        fontSize: 80, 
        fontStyle: 'bold',
        color: '#000000'});
    title.setOrigin(0.5,0.5);
    
    //texte pour la question
    //SOLUTION pour  avoir la question instalée dynamiquement: splitter la chaine de character en tous les x character et set origin au centre (0.5,0.5)
    questionText = this.add.text(50,config.height / 3 -50, questionJSON.questions[currentIndex].title, 
        {fontFamily: 'Oswald', 
        fontSize: 30, 
        fontStyle: 'bold',
        color: '#000000'}
        );
    
        
        
        for (let i = 0; i < 3; i++) 
        {
            choice = questionJSON.questions[currentIndex].answer[i]
            
            //les panneaux de reponse sont interactives
            answerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.3) + (100 *(i + 1)), 'answer').setInteractive();
            answerPanel[i].on('pointerdown', () => {checkAnswer(i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
            answerPanel[i].alpha = 0.3;
            answerPanel[i].setScale(0.9);
            
            //le texte de reponse est ajouté en fonction du fichier JASON et du current Index
            answerText[i] = this.add.text(config.width/2,(config.height * 0.3) + (100 *(i + 1)), choice, {fontFamily: 'Oswald', fontSize: 24, color: '#000000'});
            answerText[i].setOrigin(0.5, 0.5);
        }   
    
    //les signes qui indiquent l'overview des bonnes/mauvaises reponses en bas du jeu
    for (let i = 0; i < numberOfQuestions; i++) {
        fist = this.add.image((config.width / 7) + (i * 110) - 5, config.height - 50, 'fist');
        fist.setScale(0.1);
        fist.alpha = 0;
        fists[i] = fist;
    }
    
    //when you click on the cat, the picture of the correct scientist appears
    //add an interactive information car icon for clicking and getting more info on the scientist (picture and text)
    moreInfoCat = this.add.image(1000,1000, 'moreInfoCat').setInteractive();  //hide it by putting it far
    moreInfoCat.setScale(0.2);
    //when I click on the moreInfo cat, the bio will appear on screen
    moreInfoCat.on('pointerdown',()=> { getBio() })
    
    scientistImage = this.add.image(0,0,'scientist'+currentIndex.toString()); //
    scientistImage.setOrigin(0,0);
    scientistImage.setVisible(false);
    
    //le bouton (invisible tant que pas repondu) pour passer à la prochaine question avec la fonction: nextQuestion
    playButton = this.add.image(config.width - 80, config.height / 2, 'playButton').setInteractive();
    playButton.on('pointerdown', nextQuestion)
    playButton.setScale(0.4)
    playButton.setVisible(false)
    // A REVOIR
    rectangle = this.add.graphics();
    rectangle.fillStyle(0x000000, 1); // Set fill color to red
    //rectangle.setOrigin(0.5,0.5);
    rectangle.setVisible(false);
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
    scientistImage.setVisible(false);

    //that code is repeated !!
    if (currentIndex < numberOfQuestions) {
        questionText.text = questionJSON.questions[currentIndex].title; // questionText est un objet, on change la propriété de l'objet ".text"; cette propriété pour aller changer le texte meme (voir JSON file)
        
        // C'ETAIT ICI MON ERREUR !!!
        scientistImage.setTexture('scientist' + currentIndex.toString());
        scientistImage.setVisible(false);
        
        //ajout des prochaines réponses
        for (let i = 0; i < numberOfQuestions; i++) {
            answerText[i].text = questionJSON.questions[currentIndex].answer[i];
            answerText[i].setColor("#000000");
            answerPanel[i].setInteractive();
        }

    }
    //après la derniere question
    else {
        //set everything invisible and annouce the score
        questionText.text = "Vous avez un score de "+score+"/"+numberOfQuestions+"!";
        questionText.setPosition(config.width/ 2, config.height / 2);
        questionText.setOrigin(0.5, 0.5);
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