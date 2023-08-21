//SMALL PROJECT IN MY LEARNING JOURNEY (add learning objectives)

//To do:
//faire une fonction current question pour faciliter l'ajout d'un hint (back and forth made easier)
//add a button to go back after pressing the hint (instead of next question)
//fontFamily: 'Old English Text MT' not supported in all browsers
//take care of the esthetics (chat GTP)

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
let hint, bioHint;
let previousButton

let textColor = "#F4E3D7" // Ethereal Parchment
let backgroundColor = "#322E4F" //Dark Enigma
let purpleColor = "#655872" //Mystic Purple
let buttonColor = "#9D8AA5" //Twilight Lavender
let accentColor = "#D4AF37" //Golden Alchemy


function preload() {
    //attention un folder qui s'appelle Sprite ne marchera pas sur ichio (je sais pas pourquoi though)
    //this.load.image('background', '../assets/Sprites/background.png');
    this.load.image('question', '../assets/Sprites/Label1.png');
    this.load.image('answer', '../assets/Sprites/marble_brick_curved.png');
    this.load.image('fist', '../assets/Sprites/fist.png');
    this.load.image('playButton', '../assets/Sprites/Play.png');
    this.load.image('previousButton', '../assets/Sprites/Back.png');

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
    title = this.add.text(config.width / 2, 100, "Great Scientists", 
        {fontFamily: 'Old English Text MT', 
        fontSize: 70, 
        fontStyle: 'bold',
        color: purpleColor});
    title.setOrigin(0.5,0.5);
    
    //texte pour la question
    let textStyle = {
        fontFamily: 'Oswald',
        fontSize: '30px',
        fontStyle: 'bold',
        color: textColor
    };

    // Create a placeholder Text object.
    let questionText = this.add.text(50, config.height / 3 - 50, '', textStyle);

    // Extract the question title from your JSON and justify it.
    let rawQuestion = questionJSON.questions[currentIndex].title;
    let justifiedQuestion = justifyText(rawQuestion, config.width - 100, questionText);  // Subtracting 100 to account for the 50px padding on both sides.

    // Set the justified content to the Text object.
    questionText.setText(justifiedQuestion);
           
        
    for (let i = 0; i < 3; i++) 
    {
        choice = questionJSON.questions[currentIndex].answer[i]
        
        //les panneaux de reponse sont interactives
        answerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.3) + 40+ (80 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        answerPanel[i].alpha = 0.5;
        answerPanel[i].setScale(0.7);
        
        //le texte de reponse est ajouté en fonction du fichier JASON et du current Index
        answerText[i] = this.add.text(config.width/2,(config.height * 0.3)+ 40 + (80 *(i + 1)), choice, {fontFamily: 'Oswald', fontSize: 24, color: textColor});
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
    moreInfoCat = this.add.image(100,(config.height / 2) + 70, 'moreInfoCat').setInteractive();  //hide it by putting it far
    //moreInfoCat.setVisible(false);
    moreInfoCat.setScale(0.3);
    //when I click on the moreInfo cat, the bio will appear on screen
    moreInfoCat.on('pointerdown',()=> { getHint() })
    
    hint = this.add.text(70, (config.height / 2) + 50, "Click here\n for a hint", 
        {fontFamily: 'Impact', 
        fontSize: 20, 
        color: accentColor});
    title.setOrigin(0.5,0.5);

    
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
    // Draw a rectangle shape using the fill style
    rectangle.fillStyle(0x000000, 1); // Set fill color to red, alpha 1
    // The arguments are (x, y, width, height, radius of the rounded edges)
    let widthRectangle = 400;
    let lengthRectangle = 150;
    rectangle.fillRoundedRect((config.width/2) - (widthRectangle / 2), 450, widthRectangle, lengthRectangle, 20); //setOrigin does not work with rect so use the size of the rect to determine its position
    rectangle.setVisible(false);
    
    //TO DO: place the bioHinT better
    bioText = questionJSON.questions[currentIndex].bio
    bioHint = this.add.text((config.width/2) - (widthRectangle / 2) + 30, 450 + 30, '' , 
    {fontFamily: 'Impact', 
        fontSize: '20px', 
        color: '#fac70b'});
        
        let justifiedContent = justifyText(bioText, widthRectangle - 40, bioHint);
        bioHint.setText(justifiedContent);
        bioHint.setVisible(false);
    }
    //le bouton pour revenir à la question (sortir du hint)
    previousButton = this.add.image(config.width - 80, config.height / 2, 'previousButton').setInteractive();
    previousButton.on('pointerdown', removeHint)
    previousButton.setScale(0.4)
    previousButton.setVisible(false) //tant que le hint n'est pas cliqué

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

    moreInfoCat.setVisible(false);
    hint.setVisible(false)
    answerText[questionJSON.questions[currentIndex].goodAnswer].setColor("#00ff00");
    playButton.setVisible(true);
}

function nextQuestion () {
    
    currentIndex ++;
    playButton.setVisible(false)
    scientistImage.setVisible(false);
    rectangle.setVisible(false);
    bioHint.setVisible(false);
    
    //that code is repeated !!
    if (currentIndex < numberOfQuestions) {
        moreInfoCat.setVisible(true);
        hint.setVisible(true);

        questionText.text = questionJSON.questions[currentIndex].title; // questionText est un objet, on change la propriété de l'objet ".text"; cette propriété pour aller changer le texte meme (voir JSON file)
        
        // C'ETAIT ICI MON ERREUR: il fallait ajouter le to string
        scientistImage.setTexture('scientist' + currentIndex.toString());   
        bioHint.text = questionJSON.questions[currentIndex].bio;     
        
        //ajout des prochaines réponses
        for (let i = 0; i < numberOfQuestions; i++) {
            answerText[i].text = questionJSON.questions[currentIndex].answer[i];
            answerText[i].setColor(textColor);
            answerPanel[i].setInteractive();
        }

    }
}
// PREVIOUS QUESTION : to do

function getHint() {
    scientistImage.setVisible(true);
    rectangle.setVisible(true);
    bioHint.setVisible(true);
    moreInfoCat.setVisible(false);
    playButton.setVisible(false);
    previousButton.setVisible(true)
 }

function removeHint() {
    scientistImage.setVisible(false);
    rectangle.setVisible(false);
    bioHint.setVisible(false);
    moreInfoCat.setVisible(true);
    playButton.setVisible(true);
    previousButton.setVisible(false)
}

//this is a computationnally heavy and imperfect method for justification of text, but considering the scope of the project, this methods will do just fine
function justifyText(text, maxWidth, phaserTextObject){
    const words = text.split(' ');
    let currentLine = words[0];
    let justifiedText = "";

    for (let i = 1; i < words.length; i++) {
        
        let potentialLine = currentLine + " " + words[i];

        phaserTextObject.setText(potentialLine);
        let lineWidth = phaserTextObject.width;

        if (lineWidth <= maxWidth) {
            currentLine = potentialLine;
        } else {
            // Calculate the extra spaces needed to fill the maxWidth
            phaserTextObject.setText(" ");
            let spaceWidth = phaserTextObject.width;

            let extraSpaces = Math.floor((maxWidth - lineWidth) / spaceWidth);
            
            // Distribute the extra spaces evenly among the spaces in currentLine
            // Calculate the number of spaces to add between each word
            let spacesToAdd = Math.floor(extraSpaces / (currentLine.split(' ').length - 1));
            //let spacesToAdd = Math.floor((maxWidth - lineWidth) / spaceWidth); ??
            
            // Create a string of spaces including the original space + the additional spaces
            let spaceString = ' '.repeat(1 + Math.max(0, spacesToAdd)); //avoid negative values
            
            // "/ /": This is a regular expression pattern that matches a single space character.
            //g: This stands for "global". It's a flag that indicates the regular expression should match all occurrences in the string, not just the first one.
            currentLine = currentLine.replace(/ /g, spaceString);
            justifiedText += currentLine + "\n";
            currentLine = words[i];
        }
    }
    justifiedText += currentLine;  // add the last line

    return justifiedText;
}
