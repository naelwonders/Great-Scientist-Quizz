let questionJSON;
let numberOfQuestions;
let currentIndex = 0;
let score = 0;

function loadQuestionsFromJSON(context){
    // faire le lien avec le fichier JSON et cette page (on a deja preloadé dans preload)
    questionJSON = context.cache.json.get('questions');
    shuffleArray(questionJSON.questions);
    numberOfQuestions = questionJSON.questions.length;
}


function getCurrentQuestion() {
    return questionJSON.questions[currentIndex].title;
}

function getCurrentAnswerList() {
    //returns the list of answers from the JSON
    return questionJSON.questions[currentIndex].answer;
}


function checkAnswer(answerText, answerIndex) {
    //logic if answer is right
    if (answerText == questionJSON.questions[currentIndex].goodAnswer) {
        //fists[currentIndex].alpha = 1;
        answerPanel[answerIndex].setTexture("rightanswer");
        score += 1;
    }
    //logic if answer is wrong
    else {
        //fists[currentIndex].alpha = 0.3;
        answerPanel[answerIndex].setTexture("wronganswer");
    }
    //remove the interactiity of the panel so the player can choose only once
    for (let i = 0; i < 3; i++) {
        answerPanel[i].removeInteractive();
    }
    
    playButton.setVisible(true);
    next.setVisible(true);
    }


function nextQuestion() {
    currentIndex ++;
    console.log(currentIndex);
    //remove the possibility to skip questions without answering by removing the next button cat
    playButton.setVisible(false);
    next.setVisible(false);
    
    //if QUIZZ not finished
    if (currentIndex < numberOfQuestions) {

        playButton.setVisible(true);
        next.setVisible(true);
        
        for (let i = 0; i < 3; i++) {
            //remettre interactive car desactivé en checkant la réponse
            answerPanel[answerIndex].setTexture("answer");
            answerPanel[i].setInteractive();
        }
        //HINT SECTION TO DO
        //moreInfoCat.setVisible(true);
        // hint.setVisible(true);
        //this.scientistImage.setTexture('scientist' + currentIndex.toString());   
        // let justifiedBio = justifyText(this.bioHint, questionJSON.questions[currentIndex].bio, rectangle.with - 40)
        // this.bioHint.setText(justifiedBio); 
        // this.biohint.setVisible(false);        
    }
    //if QUIZZ finished
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
        
        //REMOVE HINT ELEMENTS
        // moreInfoCat.setVisible(false);
        // hint.setVisible(false);

    }
}