
//--INITIALISATION DE TOUTES LES VARIABLES
let title;
let answerPanel = [];
let justifiedQuestion;
let answerList;
let fists = [];
let panel;
let moreInfoCat;
let questionText = "";
let next;
let playButton;
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


function displayQuestion(context){
    //QUESTION : do I use function that return the current question in gamelogic??
    //print the question of the current index
    questionTextObject = context.add.text(50, config.height / 3 - 50, "", textStyle);
    justifiedQuestion = justifyText(questionTextObject, getCurrentQuestion(), config.width - 100);
    questionTextObject.setText(justifiedQuestion);

}

function displayAnswers(context){
    
    answerList = getCurrentAnswerList()

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
function displayNextButtonCat(context) {
        
        //Playbutton set interactive to the nextQuestion function
        playButton = context.add.image(config.width - 70, config.height / 2 + 65, 'playButton').setInteractive();
        // place the button that allows the player to switch to the next quesition
        playButton.on('pointerdown', () => {nextQuestion}); // attention, si tu ne passe rien en parametre, il ne faut pas mettre les parentheses (je ne comprend pas pourquoi)
        
        playButton.setScale(0.25);
        //playButton.setVisible(false) //invisible tant que pas repondu

        next = context.add.text(config.width - 70, config.height / 2 + 35, "N\nE\nX\nT", nextStyle);

        next.setVisible(false)

}


