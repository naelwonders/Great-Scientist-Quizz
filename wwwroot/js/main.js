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

let currentIndex;
let score;

function create() {

    currentIndex = 0;
    score = 0;

    // Initialize and display UI elements

    let context = this;

    createUIElements(context, currentIndex, score);  // "this" refers to the current scene
    
}

