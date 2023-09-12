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
        create: create
        //update: update I removed this part because I do not need and upsate for this part
    },
    autoCenter: true
};

let game = new Phaser.Game(config);


function create() {
    loadQuestionsFromJSON(this);

    //***DISPLAY TITLE OF THE GAME***
    title = this.add.text(config.width / 2, 80, "Great Scientists", titleStyle);
    title.setOrigin(0.5, 0.5);

    subtitle = this.add.text(config.width / 2, 130, "<<<   Quizz - Question " + (currentIndex + 1).toString() + "   >>>", subStyle);
    //+ (currentIndex + 1).toString() a ajouter pour le no de la question
    subtitle.setOrigin(0.5, 0.5);

    //***DISPLAY CURRENT QUESTION OF THE GAME***
    questionTextObject = this.add.text(50, config.height / 3 - 50, " ", textStyle);
    
    sizeTextObject = questionTextObject.width;
    //let justifiedText = justifyText(, sizeTextObject);

    questionTextObject.setText(questionJSON.questions[currentIndex].title);

    displayQuestionAndNextButton(this);
    
    displayInteractiveAnswers(this);
    
}

