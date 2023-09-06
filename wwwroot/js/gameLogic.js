
function checkAnswer(selectedAnswer) {
    // Check if the answer is correct: score
    for (let i = 0; i < 3; i++) 
    {
        //what happens when the answer is right vs wrong
        if (selectedAnswer == questionJSON.questions[currentIndex].goodAnswer) {
            //fists[currentIndex].alpha = 1;
            score += 1;
            //FIX : all the panels turn green when you click the right answer
            answerPanel[i].setTexture("rightanswer");
        }
        // else {
        //     fists[currentIndex].alpha = 0.3;
        // }
        
        playButton.setVisible(true);
        next.setVisible(true);
    }
}

function nextQuestion() {
    currentIndex ++;
    playButton.setVisible(false);
    next.setVisible(false);
    
    if (currentIndex < numberOfQuestions) {
        
        //HINT SECTION TO DO
        // moreInfoCat.setVisible(true);
        // hint.setVisible(true);
        //this.scientistImage.setTexture('scientist' + currentIndex.toString());   
        // let justifiedBio = justifyText(this.bioHint, questionJSON.questions[currentIndex].bio, rectangle.with - 40)
        // this.bioHint.setText(justifiedBio); 
        // this.biohint.setVisible(false);
        
        //display next question:BUGG HERE because we don't want to display, we want to add another question (not all on top of one another)
        displayQuestion(this, questionJSON.questions[currentIndex].title);

        displayAnswers(this,shuffleArray(questionJSON.questions[currentIndex].answer));
    }

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