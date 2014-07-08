namespace("PXTree.AchtzehnKnoten", function (AK)
{
	function Intro ()
	{
		var self = Object.create(Intro.prototype);
		Phaser.State.call(self);
		return self;
	}
	
	Intro.key = 'intro';
	
	var img1, img2, img3;
	var i=0; j=0;
	var txtGrp, text;
	var Config = AK.Config;
	var textstyle = Object.create(Config.TextStyle);
	
	Intro.prototype = on(Object.create(Phaser.State.prototype), function (def)
			{
				def.init = function (parentCtrl)
			{
					this.parent = parentCtrl;
					this.top = this.parent.top;
			};
		
		def.preload = function(){
			this.game.load.image('img1','assets/textures/ship-background.png');
			this.game.load.image('img2','assets/textures/mm-bg.png');
			this.game.load.image('img3','assets/textures/mm-logo.png');		
		};
		
		def.create = function(){
			var self = this;
			
			img1 = this.game.add.sprite(200, 250, 'img1');
			img1.anchor.set(0.5);
			img1.scale.x = 4;
			img1.scale.y = 2.7;
			this.game.physics.enable(img1, Phaser.Physics.ARCADE);
			
			img2 = this.game.add.sprite(800,250,'img2');
			img2.anchor.set(0.5);
			img2.scale.set(1.8);
			img2.visible = false;
			this.game.physics.enable(img2, Phaser.Physics.ARCADE);
			
			img3 = this.game.add.sprite(200, 250, 'img3');
			img3.anchor.set(0.5);
			img3.scale.set(8);
			img3.visible = false;
			this.game.physics.enable(img3, Phaser.Physics.ARCADE);
			
		    img1.body.velocity.x=10;
		    img1.body.velocity.y=-5;
		    
		    textstyle.font = "normal 28pt GameFont"
		    textstyle.strokeThickness = 6;
		    textstyle.stroke = 'white';
		    
		    txtGrp =this.game.add.group();
		    text = this.game.add.text(150, 250, 'Hier könnte Ihre Werbung stehen', textstyle);
		    txtGrp.add(text);
		    text = this.game.add.text(150, 290, 'Ganz im Ernst, könnte sie wirklich. Ist auch nicht teuer', textstyle);
		    txtGrp.add(text);
		    
		    textstyle2 = Object.create(textstyle);
		    textstyle2.font = "normal 14pt GameFont"
		    var skip = this.game.add.text(10, 550, 'Überspringen', textstyle2);
		    var textbutton = this.game.add.tileSprite(10, 550,skip.length*10, 560, null);
			var self = this;
			textbutton.inputEnabled = true;
			textbutton.events.onInputDown.add(function() {
				txtGrp.removeAll();
				self.game.state.start(AK.Play.key, true, false, self.top);
					});
		};
		
		def.update = function (){
			i++;
			if(i>60*15 && j==0){
				j=1;
				
				img1.visible = false;
				img2.visible = true;
				img2.body.velocity.x=-10;
				img2.body.velocity.y=-5;
				

				txtGrp.removeAll();
			    text = this.game.add.text(150, 250, 'Wollten Sie nicht schon immer präsent für die zock-', textstyle);
			    txtGrp.add(text);
			    text = this.game.add.text(150, 290, 'süchtige Jugend sein? Tja, dann ist das Ihre große Chance', textstyle);
			    txtGrp.add(text);
			}
			if(i>60*30 && j==1){
				j=2;
				
				img2.visible = false;
				img3.visible = true;
				img3.body.velocity.x=10;
				img3.body.velocity.x=5;
				txtGrp.removeAll();
			    text = this.game.add.text(150, 250, 'Das "Adblocker sind für mich Abfall" Werbespecial', textstyle);
			    txtGrp.add(text);
			    text = this.game.add.text(150, 290, 'Für sensationelle 89,-€ im Monat!', textstyle);
			    txtGrp.add(text);
			}
			if(i>60*40 && j==2) {
				txtGrp.removeAll();
				this.game.state.start(AK.Play.key, true, false, this.top);
			}
		};
	
		return def;
		});

		AK.Intro = Intro;

});