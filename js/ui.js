
//--INITIALISATION DE TOUTES LES VARIABLES
let title;
let questionTextObject;
let answerPanel = [];
let justifiedQuestion;
let answerList;
let fists = [];
let panel;
let moreInfoCat;
let questionText;
let nextText;
let nextButton;
//let rectangle;
//let hint, bioHint;
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

//DISPLAY TITLE OF THE GAME, THROUGHOUT THE GAME
function displayTitle(context){
    // Display the game's title
    title = context.add.text(config.width / 2, 80, "Great Scientists", titleStyle);
    title.setOrigin(0.5, 0.5);

    subtitle = context.add.text(config.width / 2, 130, "<<<   Quizz - Question " + (currentIndex + 1).toString() + "   >>>", subStyle);
    //+ (currentIndex + 1).toString() a ajouter pour le no de la question
    subtitle.setOrigin(0.5, 0.5);
}


function displayInteractiveAnswers(context){
    
    answerList = questionJSON.questions[currentIndex].answer;
    
    // Display panels and the answers in the list
    for (let i = 0; i < answerList.length; i++) {
        
        //Place the planel and make it interactive to checkAnswer(answer, index)
        answerPanel[i] = context.add.image((config.width / 2) , (config.height * 0.3) + 40+ (80 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(answerList[i], i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        
        answerPanel[i].alpha = 0.5;
        answerPanel[i].setScale(0.7);
        
        //Place the answers on the panels
        answerTextObject = context.add.text(config.width/2,(config.height * 0.3)+ 40 + (80 *(i + 1)), answerList[i], answerStyle);
        answerTextObject.setColor(textColor);
        answerTextObject.setOrigin(0.5, 0.5);}
        
    }
    
    //next button is a cat :)
    function displayQuestionAndNextButton(context) {
        

        //PLAN:
        // il faut que je puissechanger la texture du gameobject avec la forme justifiée du texte de la prochaine question
        //questionTextObject.setText(justifyText(questionJSON.questions[currentIndex].title));

        // ICI 
        //je dois chercher le texte qu'il faut mtn : questionJSON.questions[currentIndex].title
        // le justifier:
            //on entre une chaine de caractères et on ajoute un espace à la fin de la chaine
            //on creer un faut gameobject pour mesurer la taille d'un empty comme ref (textObject)
            //on sort un chaine de caractères
        
        //the question is added, the question logic is linked to the next question
        questionTextObject = context.add.text(50, config.height / 3 - 50, " ", textStyle);
        
        questionTextObject.setText(justifyText(questionJSON.questions[currentIndex].title));
        
        //Playbutton set interactive to the nextQuestion function
        nextButton = context.add.image(config.width - 70, config.height / 2 + 65, 'playButton').setInteractive();
        // place the button that allows the player to switch to the next quesition
        nextButton.on('pointerdown', () => {nextQuestion();}); // attention, si tu ne passe rien en parametre, il ne faut pas mettre les parentheses (je ne comprend pas pourquoi)
        
        nextButton.setScale(0.25);
        //playButton.setVisible(false) //invisible tant que pas repondu
        
        nextText = context.add.text(config.width - 70, config.height / 2 + 35, "N\nE\nX\nT", nextStyle);
        
        nextText.setVisible(false);
        
    }
    //ELEMENTS TO REMOVE WHEN GAME IS OVER
function removeGameAssets(){

    //remove quesion
    questionTextObject.setVisible(false);
    //remove answers
    for (let i = 0; i < 3; i++) {
        answerText[i].setVisible(false);
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


