
let title;

let answerPanel = [];
let rightAnswerPanel = [];
let answerText = [];
let textStyle;
let fists = [];
let moreInfoCat;
let rectangle;
let previousButton;
let questionText = "";
let panel;
let hint, bioHint;

// Colors & Fonts
let textColor = "#F4E3D7";
let titleColor = "#655872";
let buttonColor = "#9D8AA5";
let accentColor = "#D4AF37";
let rightColor = "#006400";
let wrongColor = "#800020";
let textFont = "Garamond";

//texte pour la question et rep
textStyle = {
    fontFamily: 'Garamond',
    fontSize: 24,
    fontStyle: 'bold',
    color: textColor};

function createUIElements() {
    // Display the game's title
    title = this.add.text(config.width / 2, 100, "Great Scientists", 
    {
        fontFamily: 'Old English Text MT', 
        fontSize: 80, 
        fontStyle: 'bold',
        color: titleColor
    });
    title.setOrigin(0.5, 0.5);

    //le bouton pour passer à la prochaine question avec la fonction: nextQuestion
    playButton = this.add.image(config.width - 70, config.height / 2 + 55, 'playButton').setInteractive();
    playButton.on('pointerdown', nextQuestion.bind(this));
    playButton.setScale(0.25);
    playButton.setVisible(false) //invisible tant que pas repondu

    next = this.add.text(config.width - 90, config.height / 2 + 55, "NEXT", 
    {   fontFamily: 'Garamond',
        fontSize: 24,
        fontStyle: 'bold',
        color: accentColor});

    next.setVisible(false)

}

function displayQuestion(context,questionTitle) {
    questionTextObject = context.add.text(50, config.height / 3 - 50, "", textStyle);

    let justifiedQuestion = justifyText(questionTextObject, questionTitle, config.width - 100);
    questionTextObject.setText(justifiedQuestion);
    
}

function displayAnswers(context, answerList) {
    
    // Display the answer choices
    for (let i = 0; i < answerList.length; i++) {
        answerPanel[i] = context.add.image((config.width / 2) , (config.height * 0.3) + 40+ (80 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(answerList[i]).bind(this)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        answerPanel[i].alpha = 0.5;
        answerPanel[i].setScale(0.7);

        //Texte
        answerTextObject = context.add.text( config.width/2,(config.height * 0.3)+ 40 + (80 *(i + 1)), answerList[i], {fontFamily: textFont, fontSize: 24, color: textColor});
        answerTextObject.setColor(textColor);
        answerTextObject.setOrigin(0.5, 0.5);

    }
}

//this is a computationnally heavy and imperfect method for justification of text, but considering the scope of the project, this methods will do just fine
function justifyText(textObject, text, maxWidth){
    const words = text.split(' ');
    let space = " "
    let currentLine = words[0];
    let justifiedText = "";
    
    //measure space width: BUGG
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

