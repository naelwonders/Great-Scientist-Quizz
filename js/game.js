//SMALL PROJECT IN MY LEARNING JOURNEY (add learning objectives)

//TO DO:
//BUGG: the answers don't update anymore
// BUGG: fix the panels for the wanted effect
//BUGG: the back button in the hint goes to the next hint directly xD
//BUGG: the bio does not appear (for non of the questions), but is correctly justified
//find a way to change the panel for the right answer (rightAnswer)
//fontFamily: 'Old English Text MT' not supported in all browsers
//randomize the questions and the answers
//add juiciness (noises and visual effects)
//create an init and separate the initialisation vs the declaration
//take care of the esthetics

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

let game = new Phaser.Game(config);

let currentIndex = 0;
let answerPanel = [];
let rightAnswerPanel = [];
let answerText = [];
let fists = [];
let score = 0;
let moreInfoCat;
let rectangle;
let numberOfQuestions;
let hint, bioHint;
let previousButton;
let questionText;
let widthRectangle = 400;
let lengthRectangle = 150;
let panel;

let textColor = "#F4E3D7" // Ethereal Parchment
let titleColor = "#655872" //Mystic Purple
let buttonColor = "#9D8AA5" //Twilight Lavender
let accentColor = "#D4AF37" //Golden Alchemy
let rightColor = "#006400";// Dark Green
let wrongColor = "#800020"; // Bordeaux

let textFont = "Garamond"


function preload() {
    //attention un folder qui s'appelle Sprite ne marchera pas sur ichio (je sais pas pourquoi though)
    //this.load.image('background', '../assets/Sprites/background.png');
    this.load.image('question', '../assets/Sprites/Label1.png');
    this.load.image('answer', '../assets/Sprites/tile.png');
    this.load.image('rightanswer', '../assets/Sprites/greenTile.png');

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

    //this.load.json('questions', 'http://127.0.0.1:8000/questions'); si on veut faire un lien avec le webservice en lien avec notre mongo db
   
}

function create() {

    // faire le lien avec le fichier JSON et cette page
    questionJSON = this.cache.json.get('questions');
    numberOfQuestions = questionJSON.questions.length;
    
    //titre en haut de chaque question
    title = this.add.text(config.width / 2, 100, "Great Scientists", 
        {fontFamily: 'Old English Text MT', 
        fontSize: 80, 
        fontStyle: 'bold',
        color: titleColor});
    title.setOrigin(0.5,0.5);
    
    //texte pour la question
    let textStyle = {
        fontFamily: 'Garamond',
        fontSize: '30px',
        fontStyle: 'bold',
        color: textColor
    };

    // Create a placeholder Text object (empty for now).
    this.questionText = this.add.text(50, config.height / 3 - 50, "", textStyle);
    
    // Extract the question title from your JSON and justify it.
    let justifiedQuestion = justifyText(this.questionText,questionJSON.questions[currentIndex].title, config.width - 100);  // Subtracting 100 to account for the 50px padding on both sides.

    // Set the justified content to the Text object.
    this.questionText.setText(justifiedQuestion);
           
        
    for (let i = 0; i < 3; i++) 
    {
        choice = questionJSON.questions[currentIndex].answer[i]
        
        panel = 'answer';
        
        //this green panel is hidden behind the other panel, it will be made visible when the user will choose an answer : only for the right answer
        rightAnswerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.3) + 40+ (80 *(i + 1)), 'right' + panel)
        rightAnswerPanel[i].alpha = 0.5;
        rightAnswerPanel[i].setScale(0.7);
        rightAnswerPanel[i].setVisible(false);

        //les panneaux de reponse sont interactives
        answerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.3) + 40+ (80 *(i + 1)), panel).setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(i).bind(this)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        answerPanel[i].alpha = 0.5;
        answerPanel[i].setScale(0.7);
        
        //le texte de reponse est ajouté en fonction du fichier JSON et du current Index
        answerText[i] = this.add.text(config.width/2,(config.height * 0.3)+ 40 + (80 *(i + 1)), choice, {fontFamily: textFont, fontSize: 24, color: textColor});
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
    moreInfoCat.on('pointerdown', getHint().bind(this));

    this.getHint = getHint.bind(this);
    
    hint = this.add.text(70, (config.height / 2) + 50, "Click here\n for a hint", 
    {fontFamily: textFont, 
        fontSize: 25, 
        color: accentColor});
        title.setOrigin(0.5,0.5);
        
    this.scientistImage = this.add.image(0,0,'scientist'+currentIndex.toString()); //
    this.scientistImage.setOrigin(0,0);
    this.scientistImage.setVisible(false);
    
    // A REVOIR
    rectangle = this.add.graphics();
    // Draw a rectangle shape using the fill style
    rectangle.fillStyle(0x000000, 1); // Set fill color to red, alpha 1
    // The arguments are (x, y, width, height, radius of the rounded edges)
    
    rectangle.fillRoundedRect((config.width/2) - (widthRectangle / 2), 450, widthRectangle, lengthRectangle, 20); //setOrigin does not work with rect so use the size of the rect to determine its position
    rectangle.setVisible(false);
    
    //le bouton pour revenir à la question (sortir du hint)
    previousButton = this.add.image(config.width - 80, config.height / 2, 'previousButton').setInteractive();
    previousButton.on('pointerdown', removeHint)
    previousButton.setScale(0.5)
    previousButton.setVisible(false) //tant que le hint n'est pas cliqué
    
    //HINT SECTION
    this.bioHint = this.add.text((config.width/2) - (widthRectangle / 2) + 30, 450 + 30, '' ,
        {fontFamily:        
        textFont, 
        fontSize: '20px', 
        color: textColor}); 

    
    let justifiedContent = justifyText(this.bioHint, questionJSON.questions[currentIndex].bio, widthRectangle - 40);
    this.bioHint.setText(justifiedContent);
    
    this.bioHint.setVisible(false);

    //le bouton pour passer à la prochaine question avec la fonction: nextQuestion
    playButton = this.add.image(config.width - 80, config.height / 2, 'playButton').setInteractive();
    playButton.on('pointerdown', nextQuestion.bind(this));
    playButton.setScale(0.4)
    playButton.setVisible(false) //invisible tant que pas repondu
    
    
}

function update() {
    // on a pas eu besoin de l'update car on est sur de l'evenementiel
}

//mettre des couleurs en fonction des bonnes/mauvaises reponses
function checkAnswer(indexAnswer) {
    
    for (let i = 0; i < 3; i++) {
    //what happens when the answer is right vs wrong
    if (indexAnswer == questionJSON.questions[currentIndex].goodAnswer) {
        fists[currentIndex].alpha = 1;
        rightAnswerPanel[currentIndex].setVisible(true);
        score += 1;
    }
    else {
        fists[currentIndex].alpha = 0.3;
    }
    
    //display the following answerPanels (before the question because we are putting different answerPanel for the right answer)
        
    //answerPanel[i].setVisible(false);
    }

    rightAnswerPanel[questionJSON.questions[currentIndex].goodAnswer].setTexture("rightanswer");
    
    playButton.setVisible(true);
    moreInfoCat.setVisible(false);
    hint.setVisible(false)
}

function nextQuestion () {
    
    currentIndex ++;
    playButton.setVisible(false)
    
    if (currentIndex < numberOfQuestions) {
        moreInfoCat.setVisible(true);
        hint.setVisible(true);
        this.scientistImage.setTexture('scientist' + currentIndex.toString());   
        
        //function justifyText for both question and bio
        let justifiedContent = justifyText(this.questionText,questionJSON.questions[currentIndex].title, config.width - 100);
        this.questionText.setText(justifiedContent); 

        let justifiedBio = justifyText(this.bioHint, questionJSON.questions[currentIndex].bio, rectangle.with - 40)
        this.bioHint.setText(justifiedBio); 
        this.biohint.setVisible(false);

        //ajout des prochaines réponses avec les panels
        for (let i = 0; i < 3; i++) {
            answerText[i].text = questionJSON.questions[currentIndex].answer[i];
            answerText[i].setColor(textColor);
            rightAnswerPanel[i].setVisible(false);
            answerPanel[i].setInteractive();
        }
    }

    else if (currentIndex >= numberOfQuestions) {
        //replace the question with the score
        this.questionText.text = "Your final score is " + score.toString() + " / " + numberOfQuestions;
        this.questionText.setPosition(config.width/2, config.height/2)
        this.questionText.setOrigin(0.5,0.5)

        //make the answers and pannels dissappear
        for (let i = 0; i < 3; i++) {
            answerText[i].setVisible(false);
            answerPanel[i].setVisible(false);
        }
        
        //remove hint option
        moreInfoCat.setVisible(false);
        hint.setVisible(false);

    }
}

function getHint() {
    console.log(this);  // Should log the Phaser scene context

    //display the scientist and the biography
    this.scientistImage.setVisible(true);
    rectangle.setVisible(true);
    //BUGG HERE
    this.bioHint.setVisible(true);
    previousButton.setVisible(true)

    //hide more info and the next question button (playbutton)
    // all that is interactive should be made invisible (it inactivates too), the others will be hidden by the scientist image
    moreInfoCat.setVisible(false);
    playButton.setVisible(false);
 }

function removeHint() {
    //hide the scientist and the biography
    this.scientistImage.setVisible(false);
    rectangle.setVisible(false);
    this.bioHint.setVisible(false);
    previousButton.setVisible(false)
    
    moreInfoCat.setVisible(true);
    playButton.setVisible(true);
}

//this is a computationnally heavy and imperfect method for justification of text, but considering the scope of the project, this methods will do just fine
function justifyText(textObject, text, maxWidth){
    const words = text.split(' ');
    let space = " "
    let currentLine = words[0];
    let justifiedText = "";

    //measure space width
    textObject.setText(' ');
    const spaceWidth = textObject.width;

    for (let i = 1; i < words.length; i++) {
        let potentialLine = currentLine + space + words[i];
        textObject.setText(potentialLine)
        //si la longueure en pixels de la chaine de characters (potential)

        if (textObject.width <= maxWidth) {
            currentLine = potentialLine;
        } 
        else {
            textObject.setText(currentLine)
            let extraSpacePixels = maxWidth - textObject.width; 

            let numSpacesInLine = currentLine.split(' ').length - 1;
            let spacesToAdd = Math.floor(extraSpacePixels / (spaceWidth * numSpacesInLine));
            let remainingSpaces = extraSpacePixels - (spacesToAdd * spaceWidth * numSpacesInLine);

            let newWords = currentLine.split(' ');

            currentLine = newWords[0];
            for (let j = 1; j < newWords.length; j++) {
                let additionalSpace = spacesToAdd;
                if (remainingSpaces > 0) {
                    additionalSpace++;
                    remainingSpaces -= spaceWidth;
                }
                currentLine += ' '.repeat(1 + additionalSpace) + newWords[j];
            }

            justifiedText += currentLine + "\n";
            currentLine = words[i];
        }
    }
    justifiedText += currentLine;  // add the last line

    return justifiedText;
}