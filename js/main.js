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

    //afficher tous les elements dans la scene
    displayTitle(this);
    displayInteractiveAnswers(this);
    displayQuestionAndNextButton(this);
    
}

