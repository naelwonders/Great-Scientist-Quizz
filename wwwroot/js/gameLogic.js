
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
        // hint.setVisible(false)
    }
}

function nextQuestion() {
    currentIndex ++;
    playButton.setVisible(false)
    
    if (currentIndex < numberOfQuestions) {
        moreInfoCat.setVisible(true);
        hint.setVisible(true);
        this.scientistImage.setTexture('scientist' + currentIndex.toString());   
        
        //function justifyText for both question and bio
        let justifiedContent = justifyText(this.questionText,questionJSON.questions[currentIndex].title, config.width - 100);
        this.questionText.setText(justifiedContent); 

        let justifiedBio = justifyText(this.bioHint, questionJSON.questions[currentIndex].bio, rectangle.with - 40)
        this.bioHint.setText(justifiedBio); 
        this.biohint.setVisible(false);

        //ajout des prochaines réponses avec les panels
        for (let i = 0; i < 3; i++) {
            answerText[i].text = questionJSON.questions[currentIndex].answer[i];
            answerText[i].setColor(textColor);
            rightAnswerPanel[i].setVisible(false);
            answerPanel[i].setInteractive();
        }
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
        
        //remove hint option
        moreInfoCat.setVisible(false);
        hint.setVisible(false);

    }
}