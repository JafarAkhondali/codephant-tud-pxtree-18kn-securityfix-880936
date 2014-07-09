
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	Play = function Play (parentCtrl)
	{
		var self = Object.create(Play.prototype);
		Phaser.State.call(self);
		self.parent = parentCtrl;
		self.top = self.parent.top;
		return self;
	};
	
	Play.key = 'play';
	

	Play.prototype = derive(Phaser.State,
			{ init : function (parentCtrl)
				{
					this.events = new AK.Events(this); //TODO make extra event layer
					this.sea = new AK.Sea(this);
					this.desk = new AK.Desk(this);
					this.almanach = new AK.Almanach(this);
					this.tutorial = new AK.Tutorial(this);
					}
				
			, preload : function preload ()
				{
				this.preloadBar = this.add.sprite(500, 250, 'preloaderBar');
				this.load.setPreloadSprite(this.preloadBar);
				this.game.load
				.audio('audio0', 'assets/audio/323835_PiratesThemeEastWes.mp3')
				.audio('audio1','assets/audio/431140_PvPdownbeatV2.mp3')
				.audio('audio2','assets/audio/521394_DT-Eastern-Sun.mp3')
				.audio('audio3','assets/audio/529570_DT-Sunset.mp3')
				.audio('audio4','assets/audio/529909_DT-After-the-Storm.mp3')
				.audio('audio5','assets/audio/539679_DT-Shiver-Me-Timber.mp3')
				.audio('audio6','assets/audio/539870_DT-Crimson-Tide.mp3')
				.audio('audio7','assets/audio/541384_DT-Eastern-Sunrise.mp3')
				.audio('audio8','assets/audio/560624_DT-Duel-on-the-Cari.mp3')
				.audio('audio-ambient-ship', 'assets/audio/ship-at-sea.mp3');
					this.sea.preload();
					this.desk.preload();
					this.events.preload();
					this.almanach.preload();
					this.tutorial.preload();
				}
			, create: function create ()
				{
					this.sea.create();
					this.desk.create();
					this.events.create();
					this.sea.loadLevel(this.top.currentLevel, this.top.enteringFrom);
					this.almanach.create();
					this.tutorial.create();
					if(!this.top.completedTutorial) this.openTutorial();
					//PLAY AUDIO
					var music_ambient = this.game.sound.play('audio-ambient-ship', 1, true);
					var key = 'audio' + Math.floor(Math.random()*9)
					var music = this.game.sound.play(key, 0.5, false);
					var i = 1;
					var self =this;
					music.onStop.add(function(){
						i++;
						var key = 'audio' + i;
						if(i>=8) i=0;
						nextSong(key);
					})
					nextSong = function(key){
						music = self.game.sound.play(key, 0.5, false);
					}
				}
			, update: function create ()
				{
					this.sea.update();
					this.desk.update();
					this.events.update();
					
				}
			, shutdown: function shutdown()
				{
					this.game.sound.stopAll();
				}
			
			, startEvent: function startEvent (opts)
				{
					this.events.startEvent(opts);
				}
			, openAlmanach: function openAlmanach() {this.almanach.openAlmanach(); }
			, openTutorial: function openTutorial() {this.tutorial.openTutorial(0); }
			});
	
	AK.Play = Play;
});
