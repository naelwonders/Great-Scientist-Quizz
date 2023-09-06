

//--INITIALISATION DE TOUTES LES VARIABLES
let title;
let answerPanel = [];
let rightAnswerPanel = [];
let answerText = [];
let justifiedQuestion;
let fists = [];
let panel;
let moreInfoCat;
let questionText = "";
let next;
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
    color: titleColor
};

let textStyle = {
    fontFamily: 'Garamond',
    fontSize: 24,
    fontStyle: 'bold',
    color: textColor};
    
let questionJSON;
let numberOfQuestions;

function createUIElements(context, currentQuestionIndex, currentScore) {
    // Display the game's title
    title = context.add.text(config.width / 2, 100, "Great Scientists", titleStyle);
    title.setOrigin(0.5, 0.5);

    // faire le lien avec le fichier JSON et cette page (on a deja preloadé dans preload)
    questionJSON = context.cache.json.get('questions');
    shuffleArray(questionJSON.questions);
    numberOfQuestions = questionJSON.questions.length;

    //print the question of the current index
    questionTextObject = context.add.text(50, config.height / 3 - 50, "", textStyle);
    justifiedQuestion = justifyText(questionTextObject, questionJSON.questions[currentQuestionIndex].title, config.width - 100);
    questionTextObject.setText(justifiedQuestion);

    let answerList = questionJSON.questions[currentQuestionIndex].answer;

    // Display the answer choices
    for (let i = 0; i < answerList.length; i++) {
        answerPanel[i] = context.add.image((config.width / 2) , (config.height * 0.3) + 40+ (80 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(answerList[i], currentQuestionIndex)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        answerPanel[i].alpha = 0.5;
        answerPanel[i].setScale(0.7);

        //Texte
        answerTextObject = context.add.text( config.width/2,(config.height * 0.3)+ 40 + (80 *(i + 1)), answerList[i], {fontFamily: textFont, fontSize: 24, color: textColor});
        answerTextObject.setColor(textColor);
        answerTextObject.setOrigin(0.5, 0.5);}

        //le bouton pour passer à la prochaine question avec la fonction: nextQuestion
        playButton = context.add.image(config.width - 70, config.height / 2 + 65, 'playButton').setInteractive();
        playButton.on('pointerdown', nextQuestion);
        playButton.setScale(0.25);
        playButton.setVisible(false) //invisible tant que pas repondu

        next = context.add.text(config.width - 70, config.height / 2 + 35, "N\nE\nX\nT", 
        {   fontFamily: 'Garamond',
        fontSize: 20,
        fontStyle: 'bold',
        color: accentColor});

        next.setVisible(false)


}


