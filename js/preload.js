function preload() {
    //attention un folder qui s'appelle Sprite ne marchera pas sur ichio (je sais pas pourquoi though)
    this.load.image('question', '../assets/Sprites/Label1.png');
    this.load.image('answer', '../assets/Sprites/tile.png');
    this.load.image('rightanswer', '../assets/Sprites/greenTile.png');
    this.load.image('wronganswer', '../assets/Sprites/redTile.png');

    this.load.image('blackstar', '../assets/Sprites/blackstar.png');
    this.load.image('yellowstar', '../assets/Sprites/yellowstar.png');
    this.load.image('playButton', '../assets/Sprites/cat.png');
    this.load.image('soundOn', '../assets/Sprites/soundOn.png');
    this.load.image('previousButton', '../assets/Sprites/PlayOFF.png');
    this.load.image('crystalBall', '../assets/Sprites/crystalBall2.png');
    this.load.image('moon', '../assets/Sprites/moon.png');
    this.load.image('broom', '../assets/Sprites/broom.png');
    this.load.image('cauldron', '../assets/Sprites/cauldron.png');

    //images and assets for the more info file page
    this.load.image('moreInfoCat', '../assets/Sprites/cat.png');
    this.load.image('curie', '../assets/Sprites/curie.png');
    this.load.image('franklin', '../assets/Sprites/franklin.png');
    this.load.image('johnson', '../assets/Sprites/johnson.png');
    this.load.image('lovelace', '../assets/Sprites/lovelace.png');
    this.load.image('lamarr', '../assets/Sprites/lamarr.png');
    this.load.image('wu', '../assets/Sprites/wu.jpg');
    this.load.image('kovalevskaya', '../assets/Sprites/kovalevskaya.jpg');
    this.load.image('hypatia', '../assets/Sprites/hypatia.jpg');
    this.load.image('mirzakhani', '../assets/Sprites/mirzakhanis.jpg');
    this.load.image('chatterjee', '../assets/Sprites/chatterjee.jpg');  
    
    //Audio files preloaded
    this.load.audio('applause', 'assets/Sound/applause.wav');
    this.load.audio('cackle', 'assets/Sound/cackle.ogg');
    this.load.audio('background', 'assets/Sound/background.ogg');
    this.load.audio('sheep', 'assets/Sound/sheep.ogg');
    
    this.load.audio('meow', 'assets/Sound/meow.ogg');
    
    //telecharger le fichier JSON
    this.load.json('questions', '/assets/data/Questions.json');
      
}