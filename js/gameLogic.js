
function getQuestionsFromJSON(context){
    
    // faire le lien avec le fichier JSON et cette page (on a deja preloadé dans preload)
    questionJSON = context.cache.json.get('questions');
    shuffleArray(questionJSON.questions);
    numberOfQuestions = questionJSON.questions.length;
    
}

//returns the current question in string format from the JSON 
function getCurrentQuestion() {
    if (questionJSON) {
        return questionJSON.questions[currentIndex].title;
    } else {
        console.error("questionJSON is undefined");
    }
}

//returns the list of answers in string format from the JSON
function getCurrentAnswerList() {
    if (questionJSON) {
        return questionJSON.questions[currentIndex].answer;
    } else {
        console.error("questionJSON is undefined");
    }
}


function checkAnswer(answerText, answerIndex) {
    
    stars[currentIndex].setTexture("yellowstar");

    //logic if answer is right
    if (answerText == questionJSON.questions[currentIndex].goodAnswer) {
        //fists[currentIndex].alpha = 1;
        answerPanel[answerIndex].setTexture("rightanswer");
        score += 1;
        meowSound.play();
    }
    //logic if answer is wrong
    else {
        //fists[currentIndex].alpha = 0.3;
        answerPanel[answerIndex].setTexture("wronganswer");
        stars[currentIndex].setAlpha(0.3);
        sheepSound.play();
    }
    //remove the interactiity of the panel so the player can choose only once
    for (let i = 0; i < 3; i++) {
        answerPanel[i].removeInteractive();
    }
    
    nextButton.setVisible(true);
    nextText.setVisible(true);
    broom.setVisible(true);
    }


function nextQuestion() {
    //we increase the currentIndex to display the next question from the JSON
    currentIndex ++;

    subtitle.setText("Quizz - Question " + (currentIndex + 1).toString());
    
    //remove the next button until checkAnswer
    nextText.setVisible(false);
    nextButton.setVisible(false);
    broom.setVisible(false);

    //what happens when the QUIZZ is not finished: 
    if (currentIndex < numberOfQuestions) {
        
        // 1. the next question & answers are displayed (text and panel)
        questionTextObject.setText(questionJSON.questions[currentIndex].title);
        
        answerList = shuffleArray(questionJSON.questions[currentIndex].answer);

        for (let i = 0; i < 3; i++) {
            answerPanel[i].setTexture("answer");
            answerPanel[i].setInteractive();
            answerTextObject[i].setText(answerList[i]);
        }
        
        //2. adapt the scientist image
        scientistImage.setTexture('scientist' + currentIndex.toString());     
    }
    
    //if QUIZZ finished: display end game assets
    else if (currentIndex >= numberOfQuestions) {
        applauseSound.play();
        removeGameAssets();
        displayEndGameAssets()
    }
}


