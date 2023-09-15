
//--INITIALISATION DE TOUTES LES VARIABLES
let title;
let questionTextObject;
let answerPanel = [];
let answerTextObject = [];
let justifiedQuestion;
let answerList;
let fists = [];
let panel;
let moreInfoCat;
let questionText;
let nextText;
let nextButton;
let scoreMessage;
let hintText;
//let rectangle;
//let bioHint;
//let previousButton;

// Colors & Fonts
let textColor = "#F4E3D7";
let titleColor = "#655872";
let buttonColor = "#9D8AA5";
let accentColor = "#D4AF37";
let rightColor = "#006400";
let wrongColor = "#800020";
let textFont = "Garamond";

//texte pour la question et rep
let titleStyle = {
    fontFamily: 'Old English Text MT', 
    fontSize: 80, 
    fontStyle: 'bold',
    color: titleColor}

let subStyle = {
    fontFamily: 'Old English Text MT', 
    fontSize: 40, 
    fontStyle: 'bold',
    color: titleColor}

let textStyle = {
    fontFamily: 'Garamond',
    fontSize: 24,
    fontStyle: 'bold',
    color: textColor}


let nextStyle = {   
    fontFamily: 'Garamond',
    fontSize: 20,
    fontStyle: 'bold',
    color: accentColor}

let answerStyle = {
    fontFamily: textFont, 
    fontSize: 24, 
    color: textColor}


    
//ELEMENTS TO REMOVE WHEN GAME IS OVER
function removeGameAssets(){

    //remove quesion
    questionTextObject.setVisible(false);
    //remove answers
    for (let i = 0; i < 3; i++) {
        answerTextObject[i].setVisible(false);
        answerPanel[i].setVisible(false);
    }

    //remove other elements?
    // moreInfoCat.setVisible(false);
    // hint.setVisible(false);
}

// //this is a computationnally heavy and imperfect method for justification of text, but considering the scope of the project, this methods will do just fine
// function justifyText(context,text){
//     const words = text.split(' ');
//     let space = " "
//     let currentLine = words[0];
//     let justifiedText = "";
//     let maxWidth = config.width - 100;

//     //ICI BEUFFF
//     let textObject = context.add.text(50, config.height / 3 - 50, " ", textStyle);
    
//     //to get the size of a space of the gameobject
//     textObject.setText(' ');
//     const spaceWidth = textObject.width;
    
//     for (let i = 1; i < words.length; i++) {
//         let potentialLine = currentLine + space + words[i];
//         textObject.setText(potentialLine);
        
//         if (textObject.width <= maxWidth) {
//             currentLine = potentialLine;
//         } 
//         else {
//             textObject.setText(currentLine)
//             let extraSpacePixels = maxWidth - textObject.width; 
            
//             let numSpacesInLine = currentLine.split(' ').length - 1;
//             let spacesToAdd = Math.floor(extraSpacePixels / (spaceWidth * numSpacesInLine));
//             let remainingSpaces = extraSpacePixels - (spacesToAdd * spaceWidth * numSpacesInLine);
            
//             let newWords = currentLine.split(' ');
            
//             currentLine = newWords[0];
//             for (let j = 1; j < newWords.length; j++) {
//                 let additionalSpace = spacesToAdd;
//                 if (remainingSpaces > 0) {
//                     additionalSpace++;
//                     remainingSpaces -= spaceWidth;
//                 }
//                 currentLine += ' '.repeat(1 + additionalSpace) + newWords[j];
//             }
            
//             justifiedText += currentLine + "\n";
//             //return a chain on characters with the added spaces
//             currentLine = words[i];
//         }
//     }
//     justifiedText += currentLine;  // add the last line
    
    
//     return justifiedText;
// }


