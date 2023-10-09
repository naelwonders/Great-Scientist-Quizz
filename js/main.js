//SMALL PROJECT IN MY LEARNING JOURNEY (add learning objectives)
//eventdriven architecture
//first trial at refactoring code into multiple files

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
        //update: update I removed this part because I do not need it (event based program)
    },
    autoCenter: true
};

let game = new Phaser.Game(config);

//*** PRELOAD all game assets in preload.js ***/

function create() {
    //Get all the the elements from the JSON
    getQuestionsFromJSON(this);

    //*** CREATE ALL SOUNDS ***
    backgroundSound = this.sound.add('background');
    cackleSound = this.sound.add('cackle');
    meowSound = this.sound.add('meow');
    applauseSound = this.sound.add('applause');
    sheepSound = this.sound.add('sheep');

    //*** CREATE TITLE & SUBTITLE OF THE GAME ***
    title = this.add.text(config.width / 2, 70, "Great scientists", titleStyle);
    title.setOrigin(0.5, 0.5);

    subtitle = this.add.text(config.width / 2, 127, "Quizz - question " + (currentIndex + 1).toString() + "", subStyle);
    subtitle.setOrigin(0.5, 0.5);

    //*** PROGRESS BAR MADE OF STARS ***/
    for (let i = 0; i < numberOfQuestions; i++) {
        star = this.add.image((config.width / 5)+ 70 + (i * 25), 160, 'blackstar');
        star.setScale(0.007);
        star.setOrigin(0.5, 0.5);
        stars[i] = star;
    }

    //*** DISPLAY CURRENT QUESTION ***
    questionTextObject = this.add.text(55, config.height / 3 - 25, " ", textStyle);
    questionTextObject.setText(questionJSON.questions[currentIndex].title);
    
    //*** DISPLAY CURRENT ANSWERS ***
    answerList = shuffleArray(questionJSON.questions[currentIndex].answer);
    
    for (let i = 0; i < answerList.length; i++) {
        
        //Place the planel and make it interactive to checkAnswer(answer, index)
        answerPanel[i] = this.add.image((config.width / 2) , (config.height * 0.32) + 40+ (80 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(answerList[i], i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        
        answerPanel[i].alpha = 0.5;
        answerPanel[i].setScale(0.6);
        
        //Place the answers on the panels
        answerTextObject[i] = this.add.text(config.width/2,(config.height * 0.32)+ 40 + (80 *(i + 1)), answerList[i], answerStyle);
        answerTextObject[i].setColor(textColor);
        answerTextObject[i].setOrigin(0.5, 0.5);
    }
    
    //*** BUTTON TO ACCESS THE NEXT QUESTION (2 SPRITES + TEXT) ***/
    //Playbutton set interactive to the nextQuestion function
    nextButton = this.add.image(config.width - 80, config.height / 2 + 80, 'playButton').setInteractive();
    
    nextButton.on('pointerdown', () => {nextQuestion();}); 
    nextButton.setScale(0.2);
    nextButton.setVisible(false);
    
    broom = this.add.image(config.width - 95, config.height / 2 + 125, 'broom');
    broom.setScale(0.25);
    broom.setVisible(false);

    nextText = this.add.text(config.width - 80, config.height / 2 + 52, "N\nE\nX\nT", nextStyle);
    nextText.setVisible(false);

    
    moon = this.add.image(config.width/2, config.height *0.9, "moon");
    moon.setScale(0.2);
    moon.setAlpha(0.95);
    
    //*** BUTTON TO REACH THE HINT SECTION ***/
    hintCrystal = this.add.image(80, config.height - 80, 'crystalBall').setInteractive();
    hintCrystal.on('pointerdown', () => {displayHint();});
    hintCrystal.setScale(0.35);
    
    hintText = this.add.text(80, config.height - 80, "H I N T", nextStyle);
    hintText.setOrigin(0.5, 0.5);
    
    // Fade out tween
    function teleport() {
        // Fade out tween
        this.tweens.add({
            targets: [hintCrystal, hintText],
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                console.log('Fade Out Complete');
                
                // Change position
                let randomX = Phaser.Math.Between(50, 600);
                let randomY = Phaser.Math.Between(50, 550);
                hintCrystal.setPosition(randomX, randomY);
                hintText.setPosition(randomX,randomY);
    
                // Fade in tween
                this.tweens.add({
                    targets: [hintCrystal, hintText],
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        console.log('Fade In Complete');
                        
                        // Call teleport again to create a loop
                        teleport.call(this);
                    }
                });
            }
        });
    }
    
    // Call teleport to start the loop
    teleport.call(this);
    
    //*** HINT SECTION WITH THE SCIENTIST IMAGE***/
    scientistImage = this.add.image(0,0,questionJSON.questions[currentIndex].image); //
    scientistImage.setOrigin(0,0);
    scientistImage.setVisible(false);
    
    rectangle = this.add.graphics();
    rectangle.fillStyle(0x000000, 1); // Set fill color to red, alpha 1
    // The arguments are (x, y, width, height, radius of the rounded edges)
    
    rectangle.fillRoundedRect((config.width/2) - 225, 450, 450, 150, 20);
    rectangle.setVisible(false);
    
    
    //*** BUTTON TO GET BACK TO THE QUESTION ***/
    previousButton = this.add.image(80, 80, 'previousButton').setInteractive();
    previousButton.on('pointerdown', removeHint);
    previousButton.setScale(0.4);
    previousButton.setVisible(false);

    bioHint = this.add.text(90, 460 , '' ,
            {fontFamily: 'Garamond', 
            fontSize: '20px', 
            color: textColor,
            fontStyle: 'bold'
            }
        ); 
    
    //*** BUTTON TO TURN ON OR OFF THE SOUNDS ** */
    soundButton = this.add.image(35, config.height - 35, 'soundOn').setInteractive();
    soundButton.setOrigin(0.5, 0.5);
    soundButton.setScale(0.2);
    soundButton.setAlpha(this.sound.mute ? 0.4 : 0.7);
    soundButton.on('pointerdown', () => {
        // Inversez l'état mute du son
        this.sound.mute = !this.sound.mute;
        // Ajustez l'alpha pour indiquer si le son est activé ou désactivé
        soundButton.setAlpha(this.sound.mute ? 0.3 : 0.7);
    });
         
    //*** END OF GAME DISPLAY:score && cauldron ***
    cauldron = this.add.image(config.width/2, config.height/2 + 30, 'cauldron');
    cauldron.setVisible(false);
    
    scoreMessage = this.add.text(config.width/2, config.height / 2 + 30, "", endGameStyle);
    //scoreMessage.setPosition(config.width / 2, height/2 + 30);
    scoreMessage.setOrigin(0.5, 0.5);
    
}
