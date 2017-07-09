// if old object exists use it, else make a new one
var Sidewinder = InfiniteScroller || {};

// create the main area, WebGL will be used first, then CANVAS
Sidewinder.game = new Phaser.Game(746, 420, Phaser.AUTO, '');

 // adding states to the game, see the index.html page
Sidewinder.game.state.add('Boot', InfiniteScroller.Boot);
Sidewinder.game.state.add('Preload', InfiniteScroller.Preload);
Sidewinder.game.state.add('Game', InfiniteScroller.Game);

// starting the game
Sidewinder.game.state.start('Boot');
