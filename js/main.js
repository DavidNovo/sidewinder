// if old object exists use it, else make a new one
var Sidewinder = Sidewinder || {};

// create the main area, WebGL will be used first, then CANVAS
Sidewinder.game = new Phaser.Game(window.innerWidth,
  window.innerHeight, Phaser.AUTO, '');

// adding states to the game, see the index.html page
// the Boot phase is the initial startup of the game
//general game settings are defined, and the assets of the preloading
//screen are loaded (example the loading bar). Nothing is shown to the user.
Sidewinder.game.state.add('Boot', Sidewinder.Boot);


// the Preload game
//the game assets(images, spritesheets, audio, textures, etc)
//are loaded into the memory (from the disk). The preloading
//screen is shown to the user, which usually includes a loading
//bar to show the progress.
Sidewinder.game.state.add('Preload', Sidewinder.Preload);

//MainMenu State: your game’s welcome screen. After the preload state,
//all the game images are already loaded into the memory, so they can quickly accessed.
Sidewinder.game.state.add('MainMenu', Sidewinder.MainMenu);

Sidewinder.game.state.add('Game', Sidewinder.Game);

// starting the game
Sidewinder.game.state.start('Boot');
