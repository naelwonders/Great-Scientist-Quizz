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

    //***DISPLAY CURRENT QUESTION***
    questionTextObject = this.add.text(50, config.height / 3 - 50, " ", textStyle);
    
    sizeTextObject = questionTextObject.width;
    //let justifiedText = justifyText(, sizeTextObject);

    questionTextObject.setText(questionJSON.questions[currentIndex].title);

    //Playbutton set interactive to the nextQuestion function
    nextButton = this.add.image(config.width - 70, config.height / 2 + 65, 'playButton').setInteractive();
    // place the button that allows the player to switch to the next quesition
    nextButton.on('pointerdown', () => {nextQuestion();}); // attention, si tu ne passe rien en parametre, il ne faut pas mettre les parentheses (je ne comprend pas pourquoi)
    
    nextButton.setScale(0.25);
    //playButton.setVisible(false) //invisible tant que pas repondu
    
    nextText = this.add.text(config.width - 70, config.height / 2 + 35, "N\nE\nX\nT", nextStyle);
    
    nextText.setVisible(false);

    //***DISPLAY CURRENT ANSWERS***
    answerList = questionJSON.questions[currentIndex].answer;

    // Display panels and the answers in the list
    for (let i = 0; i < answerList.length; i++) {
        
        //Place the planel and make it interactive to checkAnswer(answer, index)
        answerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.3) + 40+ (80 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(answerList[i], i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        
        answerPanel[i].alpha = 0.5;
        answerPanel[i].setScale(0.7);
        
        //Place the answers on the panels
        answerTextObject[i] = this.add.text(config.width/2,(config.height * 0.3)+ 40 + (80 *(i + 1)), answerList[i], answerStyle);
        answerTextObject[i].setColor(textColor);
        answerTextObject[i].setOrigin(0.5, 0.5);}

        scoreMessage = this.add.text(config.width/2, config.height / 3 - 50, "", textStyle);
        scoreMessage.setOrigin(0.5, 0.5);
    
    
}

