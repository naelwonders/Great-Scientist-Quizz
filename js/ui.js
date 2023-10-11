
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
    fontFamily: 'UnifrakturMaguntia', 
    fontSize: 75, 
    fontStyle: 'bold',
    color: titleColor}

let subStyle = {
    fontFamily: 'Garamond', 
    fontSize: 35, 
    fontStyle: 'bold',
    color: titleColor}

let textStyle = {
    fontFamily: 'Garamond',
    fontSize: 25,
    //fontStyle: 'bold',
    color: textColor}


let nextStyle = {   
    fontFamily: 'Garamond',
    fontSize: 15,
    fontStyle: 'bold',
    color: accentColor}

let answerStyle = {
    fontFamily: textFont, 
    fontSize: 24, 
    color: textColor}

let endGameStyle = {
    fontFamily: 'Garamond',
    fontSize: 40,
    fontStyle: 'bold',
    color: textColor}

// ***LOAD FONT *** Ensure the font is loaded before creating text
WebFont.load({
    google: {
        families: ['UnifrakturMaguntia']
    },
    active: () => {
        var googleFont = 'UnifrakturMaguntia';
    }
});

//ELEMENTS TO REMOVE WHEN GAME IS OVER
function removeGameAssets(){

    //STATUS IS A BOOLEAN
    //remove quesion
    questionTextObject.setVisible(false);
    //remove answers
    for (let i = 0; i < 3; i++) {
        answerTextObject[i].setVisible(false);
        answerPanel[i].setVisible(false);
    }

    for (let i = 0; i < numberOfQuestions; i++) {
        stars[i].setVisible(false);
    }

    //remove other elements?
    hintCrystal.setVisible(false);
    hintText.setVisible(false);
    subtitle.setVisible(false);
}
//***HINT ASSETS: DISPLAY AND REMOVAL ***/
function displayHintAssets(){
    cackleSound.play();
    scientistImage.setTexture(questionJSON.questions[currentIndex].image);
    scientistImage.setVisible(true);
    rectangle.setVisible(true);
    previousButton.setVisible(true);
    bioHint.setText(questionJSON.questions[currentIndex].bio);
    bioHint.setVisible(true);
    
}

function removeHintAssets(){
    scientistImage.setVisible(false);
    rectangle.setVisible(false);
    previousButton.setVisible(false);
    bioHint.setVisible(false);
}



function displayEndGameAssets(){
    
    cauldron.setVisible(true);
    subtitle.setScale(1.8);
    subtitle.setPosition(config.width / 2, config.height / 3)
    
    scoreMessage.setText("Your score is " + score + "/" + numberOfQuestions);
}