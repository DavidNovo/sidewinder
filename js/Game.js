var Sidewinder = Sidewinder || {};
// this is the actual start of the game

// the openning screen
Sidewinder.Game = function() {};
// this is declaring a variable as a function
// something that is not done in java

// since there are no classes, we use prototypes
// even a function() has a prototype
Sidewinder.Game.prototype = {
    create: function() {
        // set the game world dimensions
        this.game.world.setBounds(0, 0, 3564, 2005);

        // make the star field
        this.background = this.game.add.tileSprite(0, 0,
            this.game.world.width, this.game.world.height, 'space');

        // make the player
        this.player = this.game.add.sprite(this.game.world.centerX,
            this.game.world.centerY, 'playership');
        this.player.scale.setTo(2);
        //// animate the player
        this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
        this.player.animations.play('fly');
        ////the camera will follow the player in the world
        this.game.camera.follow(this.player);

        this.generateCollectables();
        this.generateAsteriods();

        //// initial score of the player
        this.playerScore = 0;
        //// enable player physics
        this.game.physics.arcade.enable(this.player);
        this.playerSpeed = 120;
        this.player.body.collideWorldBounds = true;

        // load sounds
        this.explosionSound = this.game.add.audio('explosion');
        this.collectSound = this.game.add.audio('collect');

        //show score
        this.showLabels();
    },
    update: function() {
        //move on the direction of the input
        if (this.game.input.activePointer.justPressed()) {
            this.game.physics.arcade.moveToPointer(this.player,
                this.playerSpeed);
        }
        //collision between player and asteroids
        this.game.physics.arcade.collide(this.player, this.asteroids,
            this.hitAsteroid, null, this);
        //overlapping between player and collectables
        this.game.physics.arcade.overlap(this.player, this.collectables,
            this.collect, null, this);
    },
    generateAsteriods: function() {
        this.asteroids = this.game.add.group();

        //enable physics in them
        this.asteroids.enableBody = true;

        //phaser's random number generator
        var numAsteroids = this.game.rnd.integerInRange(150, 200)
        var asteriod;

        for (var i = 0; i < numAsteroids; i++) {
            //add sprite
            asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
            asteriod.scale.setTo(this.game.rnd.integerInRange(10, 40) / 10);

            //physics properties
            asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
            asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
            asteriod.body.immovable = true;
            asteriod.body.collideWorldBounds = true;
            // this is so the asteroids bounce off the edge of the world
            asteriod.body.bounce.set(1);
        }
    },
    hitAsteroid: function(player, asteroid) {
        //play explosion sound
        this.explosionSound.play();

        //make the player explode
        var emitter = this.game.add.emitter(this.player.x,
            this.player.y, 100);
        emitter.makeParticles('playerParticle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        emitter.start(true, 1000, null, 100);
        this.player.kill();

        this.game.time.events.add(800, this.gameOver, this);
    },
    generateCollectables: function() {
        this.collectables = this.game.add.group();

        //enable physics in them
        this.collectables.enableBody = true;
        this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

        //phaser's random number generator
        var numCollectables = this.game.rnd.integerInRange(100, 150)
        var collectable;

        for (var i = 0; i < numCollectables; i++) {
            //add sprite
            collectable = this.collectables.create(this.game.world.randomX,
                this.game.world.randomY, 'power');
            collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
            collectable.animations.play('fly');
        }
    },
    collect: function(player, collectable) {
        //play collect sound
        this.collectSound.play();

        //update score
        this.playerScore++;
        this.scoreLabel.text = this.playerScore;

        //remove sprite
        collectable.kill();
    },
    gameOver: function() {
        //pass it the score as a parameter
        this.game.state.start('MainMenu', true, false, this.playerScore);
    },
    showLabels: function() {
        //score text
        var text = "0";
        var style = {
            font: "20px Arial",
            fill: "#fff",
            align: "center"
        };
        this.scoreLabel = this.game.add.text(this.game.width - 50,
            this.game.height - 50,
            text, style);
        this.scoreLabel.fixedToCamera = true;
    }
};