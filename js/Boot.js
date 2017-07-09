// the Boot state is were the loading screen is made
// ams loading of light assets is done for loading screen
// if Sidewinder already exists use that object, else create object
var Sidewinder = Sidewinder || {};

// starting the Boot tate
Sidewinder.Boot = function(){};


// setting game configuration and loading the asets
// for the loading screen
Sidewinder.Boot.prototype = {
  preload: function() {
  // pre load assets, think loading screen
  this.load.image('logo', 'assets/images/logo.png');
  this.load.image('preloadbar', 'assets/images/preloader-bar.jpg');
},
  // create assets
  create: function() {
    // loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    // scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 240;
    this.scale.minHeigth = 170;
    this.scale.maxWidth = 2880;
    this.scale.maxHeight = 1920;

    // have the game centered horizontally
    this.scale.pageAlignHorizontally = true;

    // screen size will be set automatically
    this.scale.setScreenSize(true);

    // physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
};
