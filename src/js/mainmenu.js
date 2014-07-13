namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.MainMenu;
	
	function MainMenu (parentCtrl)
	{
		var self = Object.create(MainMenu.prototype);
		Phaser.State.call(self);
		self.parent = parentCtrl;
		self.top = self.parent.top;
		self.sailors = null;
		self.captain = null;
		self.strength = null;
		return self;
	}
	
	MainMenu.key = "mainmenu";
	
	MainMenu.prototype = on(Object.create(Phaser.State.prototype), function (def)
	{
	
		def.preload = function ()
		{
			this.game.load
			.image('mainmenu-bg', 'assets/textures/mm-bg.png')
			.image('button', 'assets/ui/ui-board-decorated.png')
			.image('logo', 'assets/textures/mm-logo.png')
			.image('preloaderBar','assets/icons/map-schiff.png')
			.image('ship-avatar', 'assets/ui/visual-ship.png')
			.image('ship-avatar-bg', 'assets/textures/ship-background.png')
			.spritesheet('ship-gischt', 'assets/ui/visual-gischt.png', 300,32)
			.spritesheet('small-sailor','assets/chars/sailor-simple.png',32,32)
			.spritesheet('small-soldier','assets/chars/soldier-spanish-simple.png',32,32)
			.spritesheet('small-captain-british', 'assets/chars/captain-british-simple.png',32,32);
		;
		};
		
		def.create = function ()
		{
			var btnFactory = TextButtonFactory(this.game,
						{ key: 'button'
							, normalStyle: Config.TextStyle
							, overStyle: { fill: 'gold'}
							, textAlign: [.5,.5]
						})
			, start = btnFactory.create(Config.Labels.NewGame)
			, fortsetzen = btnFactory.create(Config.Labels.LoadGame)
			, credits = btnFactory.create(Config.Labels.Credits)
			, self = this
			;
			
			this.game.add.sprite(0, 0, 'mainmenu-bg');
			
			/*
			var mmGrp = this.game.add.group();
						
			// ***** START SHIP AVATAR *****
		
				var shipgrp = this.game.make.group();
				mmGrp.add(shipgrp);
				shipgrp.position.set(70,200);
				
				if (this.captain === null){
					this.captain = shipgrp.create(70,175,'small-captain-british');
					this.captain.animations.add('idle_breath',[14,15,16,17,18,19],4,false);
					this.captain.animations.add('idle_telescope',[0,1,2,3,4,5,6,7,8,9,10,11,12,13],4,false);
					this.captain.animations.play('idle_breath');
				}
				
				//init sailors
				if (this.sailors === null) {		
					this.sailors = this.game.make.group();
					shipgrp.add(this.sailors);
					this.sailors.position.set(120,195);
				}
				
				//init soldiers
				if (this.strength === null) {		
					this.strength = this.game.make.group();
					shipgrp.add(this.strength);
					this.strength.position.set(120,195);
				}
				
				shipgrp.create(0,0, 'ship-avatar');
				var gischt = shipgrp.create(110, 285, 'ship-gischt');
				gischt.animations.add('wave', [0, 1, 3, 4], 4, true);
				gischt.animations.play('wave');
				
				this.updateSailors(10);
				this.updateStrength(3);
			
			// END SHIP AVATAR
			*/
			var logo = this.game.add.sprite(700,90,'logo');
			logo.anchor.set(0.5);
			logo.scale.set(1.2);
		
			start.position.set(570, 205);
			start.onInputUp.add(function()
			{
				if(confirm('Hierbei werden alle vorhanden Daten gelöscht! \n Sind Sie sicher, dass Sie ein neues Spiel starten wollen?') == false)
					return;

				self.top.resetSaveData();
				self.top.startState(AK.Intro.key);
			}, this);
			this.game.world.add(start);
			
			fortsetzen.position.set(570, 295);
			fortsetzen.onInputUp.add(function()
			{
				if(!self.top.completedTutorial) {
					alert('Auf diesem PC wurde kein Spielstand gefunden. Bitte starten Sie ein neues Spiel.');
					return;
				}
				//self.top.loadSaveData();
				self.top.startState(AK.Play.key);
			}, this);
			this.game.world.add(fortsetzen);
		
			credits.position.set(570, 385);
			credits.onInputUp.add(function()
			{
				self.top.startState(AK.Credits.key);
			}, this);
			this.game.world.add(credits);
		};
		
			return def;
	});
	
	/*
	* Updated die Anzahl von Seglern auf dem Schiff
	*/
	MainMenu.prototype.updateSailors = function(new_sailors)
	{
		for (var i = 0; i < new_sailors; i++) {
				var x_pos_start = Math.floor((Math.random() * 150));
				var x_pos_end = Math.floor((Math.random() * 150));
				
				var s = this.sailors.create(x_pos_start,0, 'small-sailor');
				s.animations.add('left', [0, 1, 2, 3], 4, true);
				s.animations.add('right', [4, 5, 6, 7], 4, true);
				
				if (x_pos_end - x_pos_start > 0 ){
					s.animations.play('right');
				} else {
					s.animations.play('left');
				}
				
				var dur = (Math.floor((Math.random() * 2000) + 1)+4000);
				var tw = this.game.add.tween(s).to( { x: x_pos_end }, dur , Phaser.Easing.Linear.None).yoyo(true).repeat(Number.MAX_VALUE).start();
				tw.onLoop.add(function() {
					if (this.animations.currentAnim === null) {
						
					} else {
					
						if (this.animations.currentAnim.name == 'right'){
							this.animations.play('left');
							//console.log('now going left');
						} else {
							this.animations.play('right');
							//console.log('now going right');
						}
						
					}
				}.bind(s));
			}
		
		this.temp_old_sailors = new_sailors;
	}
	
	/*
	* Updated die Anzahl von Soldaten auf dem Schiff
	*/
	MainMenu.prototype.updateStrength = function(new_strength)
	{
		for (var i = 0; i < new_strength; i++) {
				var x_pos_start = Math.floor((Math.random() * 150));
				var x_pos_end = Math.floor((Math.random() * 150));
				
				var s = this.strength.create(x_pos_start,0, 'small-soldier');
				s.animations.add('left', [0, 1, 2, 3, 4], 4, true);
				s.animations.add('right', [5, 6, 7, 8, 9], 4, true);
				
				if (x_pos_end - x_pos_start > 0 ){
					s.animations.play('right');
				} else {
					s.animations.play('left');
				}
				
				var dur = (Math.floor((Math.random() * 2000) + 1)+4000);
				var tw = this.game.add.tween(s).to( { x: x_pos_end }, dur , Phaser.Easing.Linear.None).yoyo(true).repeat(Number.MAX_VALUE).start();
				tw.onLoop.add(function() {
					if (this.animations.currentAnim === null) {
						
					} else {
					
						if (this.animations.currentAnim.name == 'right'){
							this.animations.play('left');
						} else {
							this.animations.play('right');
						}
						
					}
				}.bind(s));
			}
		
		this.temp_old_strength = new_strength;
	}
	
	MainMenu.prototype.update = function ()
	{
		/*
		if (this.captain.animations.currentAnim != null && this.captain.animations.currentAnim.isFinished) {
			if (Math.random() <= 0.7){
				this.captain.animations.play('idle_breath');
			} else {
				this.captain.animations.play('idle_telescope');
			}
		}
		*/
	};

	AK.MainMenu = MainMenu;
});
