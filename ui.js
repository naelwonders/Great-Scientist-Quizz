
let title;

let answerPanel = [];
let rightAnswerPanel = [];
let answerText = [];
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
    
}

function displayQuestion(context,question) {

    //texte pour la question
    let textStyle = {
        fontFamily: 'Garamond',
        fontSize: '30px',
        fontStyle: 'bold',
        color: textColor};
    
    questionTextObject = context.add.text(50, config.height / 3 - 50, "", textStyle);

    let justifiedQuestion = justifyText(questionTextObject, question, config.width - 100);
    questionTextObject.setText(justifiedQuestion);
    
    // // Display the answer choices
    // for (let i = 0; i < question.answer.length; i++) {
    //     answerText[i].text = question.answer[i];
    //     answerText[i].setColor(textColor);
    //     rightAnswerPanel[i].setVisible(false);
    //     answerPanel[i].setInteractive();
    // }
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

