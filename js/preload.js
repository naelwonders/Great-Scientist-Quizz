function preload() {
    //attention un folder qui s'appelle Sprite ne marchera pas sur ichio (je sais pas pourquoi though)
    //this.load.image('background', '../assets/Sprites/background.png');
    this.load.image('question', '../assets/Sprites/Label1.png');
    this.load.image('answer', '../assets/Sprites/tile.png');
    this.load.image('rightanswer', '../assets/Sprites/greenTile.png');
    this.load.image('wronganswer', '../assets/Sprites/redTile.png');

    this.load.image('fist', '../assets/Sprites/fist.png');
    this.load.image('playButton', '../assets/Sprites/cat.png');
    this.load.image('previousButton', '../assets/Sprites/Back.png');
    this.load.image('crystalBall', '../assets/Sprites/crystalBall2.png');

    //images and assets for the more info file page
    this.load.image('moreInfoCat', '../assets/Sprites/cat.png');
    this.load.image('scientist0', '../assets/Sprites/curie.png');
    this.load.image('scientist1', '../assets/Sprites/franklin.png');
    this.load.image('scientist2', '../assets/Sprites/johnson.png');
    this.load.image('scientist3', '../assets/Sprites/lovelace.png');
    this.load.image('scientist4', '../assets/Sprites/lamarr.png');
    
    //telecharger le fichier JSON
    this.load.json('questions', '/assets/data/Questions.json');

    
   
}