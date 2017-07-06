var InfiniteScroller = InfiniteScroller || {};

// create the main canvas
InfiniteScroller.game = new Phaser.Game(746, 420, Phaser.CANVAS, '');

 // adding states to the game, see the index.html page
InfiniteScroller.game.state.add('Boot', InfiniteScroller.Boot);
InfiniteScroller.game.state.add('Preload', InfiniteScroller.Preload);
InfiniteScroller.game.state.add('Game', InfiniteScroller.Game);

// starting the game
InfiniteScroller.game.state.start('Boot');
