namespace("PXTree.AchtzehnKnoten", function (AK)
{
	function Intro (parentCtrl)
	{
		var self = Object.create(Intro.prototype);
		Phaser.State.call(self);
		self.parent = parentCtrl;
		self.top = self.parent.top;
		return self;
	}
	
	Intro.key = 'intro';
	
	var img1, img2, img3;
	var i=0; j=0;
	var txtGrp, text;
	var Config = AK.Config;
	var textstyle = Object.create(Config.TextStyle);
	var sound;
	
	Intro.prototype = on(Object.create(Phaser.State.prototype), function (def)
	{
		
		def.preload = function(){
			this.preloadBar = this.add.sprite(500, 250, 'preloaderBar');
			this.load.setPreloadSprite(this.preloadBar);
			this.game.load.image('img1','assets/textures/intro-1.png');
			this.game.load.image('img2','assets/textures/intro-2.png');
			this.game.load.image('img3','assets/textures/intro-3.png');	
			this.game.load.audio('audio-ambient-ship', 'assets/audio/small/323835_PiratesThemeEastWes.mp3');
		};
		
		def.create = function(){
			var self = this;
			
			sound = this.game.sound.play('audio-ambient-ship');
			
			img1 = this.game.add.sprite(-512, 0, 'img1');
			//img1.anchor.set(0.5);
			//img1.scale.x = 1;
			//img1.scale.y = 1;
			this.game.physics.enable(img1, Phaser.Physics.ARCADE);
			
			img2 = this.game.add.sprite(-256, 0,'img2');
			//img2.anchor.set(0.5);
			//img2.scale.set(1.2);
			img2.visible = false;
			this.game.physics.enable(img2, Phaser.Physics.ARCADE);
			
			img3 = this.game.add.sprite(-512, 0, 'img3');
			//img3.anchor.set(0.5);
			//img3.scale.set(1.5);
			img3.visible = false;
			this.game.physics.enable(img3, Phaser.Physics.ARCADE);
			
		    img1.body.velocity.x=10;
		    img1.body.velocity.y=0;
		    
		    textstyle.font = "normal 24pt GameFont"
		    textstyle.strokeThickness = 2;
		    textstyle.stroke = '#bf9218';
			textstyle.fill = '#e0ab1b';
			//textstyle.shadowColor = '#000000';
			//textstyle.shadowBlur = '2';
		    
		    txtGrp =this.game.add.group();
		    text = this.game.add.text(50, 50, 'Willkommen in der Zeit der großen Entdecker,', textstyle);
		    txtGrp.add(text);
		    text = this.game.add.text(50, 100, 'einer Welt voller Gefahren, Schätzen und Abenteuer!', textstyle);
		    txtGrp.add(text);
		    
		    textstyle2 = Object.create(textstyle);
		    textstyle2.font = "normal 16pt GameFont"
		    var skip = this.game.add.text(10, 550, 'Überspringen', textstyle2);
		    var textbutton = this.game.add.tileSprite(10, 550,skip.length*10, 560, null);
			var self = this;
			textbutton.inputEnabled = true;
			textbutton.events.onInputDown.add(function() {
				txtGrp.removeAll();
				self.game.sound.stopAll();
				self.top.startState(AK.Play.key);
					});
		};
		
		def.update = function (){
			i++;
			if(i>60*10 && j==0){
				j=1;
				
				img1.visible = false;
				img2.visible = true;
				img2.body.velocity.x=-25;
				img2.body.velocity.y=0;
				

				txtGrp.removeAll();
			    text = this.game.add.text(50, 50, 'Ausgestattet mit dem tüchtigsten Schiff des Königreichs', textstyle);
			    txtGrp.add(text);
			    text = this.game.add.text(50, 90, 'machst du, Captain Cumberdale vom British Empire, dich auf, ', textstyle);
			    txtGrp.add(text);
			    text = this.game.add.text(50, 130, 'um unentdeckte Routen zu befahren und neue Welten zu erobern.', textstyle);
			    txtGrp.add(text);
			}
			if(i>60*20 && j==1){
				j=2;
				
				img2.visible = false;
				img3.visible = true;
				img3.body.velocity.x=20;
				img3.body.velocity.y=0;
				
				
				txtGrp.removeAll();
			    text = this.game.add.text(50, 50, 'Wirst du deiner Mannschaft durch deinen', textstyle);
			    txtGrp.add(text);			    
			    text = this.game.add.text(50, 90, 'Scharfsinn zu Ruhm und Ehre verhelfen?', textstyle);
			    txtGrp.add(text);
			    text = this.game.add.text(50, 130, 'Wirst du es schaffen, dein Wissen über', textstyle);
			    txtGrp.add(text);
			    text = this.game.add.text(50, 170, 'die Zeit der Entdecker zu vermehren?', textstyle);
			    txtGrp.add(text);
			    text = this.game.add.text(50, 250, 'Finde es heraus in der Welt von 18 Knoten!', textstyle);
			    txtGrp.add(text);
			}
			if(i>60*30 && j==2) {
				txtGrp.removeAll();
				this.game.sound.stopAll();
				this.top.startState(AK.Play.key);
			}
		};
	
		return def;
	});

	AK.Intro = Intro;

});
