
namespace("PXTree.AchtzehnKnoten", function (AK)
{ "use strict";

	var Config = AK.Config.Desk;

	AK.Desk = function Desk (play)
	{
		this.parent = play;
		this.play = play;
		this.top = play.top;
		this.game = play.game;
		this._statData = {};
		this.stats = this.top.stats;
		this.sailors = null;
		this.captain = null;
		this.strength = null;
		this.temp_old_strength = 0;
		this.temp_old_sailors = 0;
	};
	
	AK.Desk.Const =
			{ LinesConf :
				{ crewCount :
					{ icon : 'small-sailor'
					, label : 'Mannschaft'
					, position : 0
					}
				, strength :
					{ icon : 'small-soldier'
					, label : 'Bewaffnung'
					, position : 1
					}
				, food :
					{ icon : 'food-icon'
					, label : 'Nahrung'
					, position : 2
					}
				, gold :
					{ icon : 'gold-icon'
					, label : 'Gold'
					, position : 3
					}
				}
			};
		
	
	AK.Desk.prototype.preload = function ()
	{
		this.game.load
			.image('desk-bg', 'assets/ui/ui-bg.png')
			.image('paper', 'assets/ui/ui-paper.png')
			.image('food-icon', 'assets/icons/ui-food.png')
			.image('gold-icon', 'assets/icons/ui-gold.png')
			.spritesheet('small-captain-british', 'assets/chars/captain-british-simple.png',32,32)
			.image('small-captain-spanish', 'assets/chars/captain-spanish-simple.png')
			.image('large-captain-spanish', 'assets/chars/captain-spanish-large.png')
			.image('large-captain-british', 'assets/chars/captain-british-large.png')
			.image('menu-board', 'assets/ui/ui-menuitems.png')
			.image('ship-avatar', 'assets/ui/visual-ship.png')
			.image('ship-avatar-bg', 'assets/textures/ship-background.png')
			.image('ship-avatar-border', 'assets/ui/visual-box.png')
			.spritesheet('ship-gischt', 'assets/ui/visual-gischt.png', 300,32)
			.image('captains-bg', 'assets/ui/ui-avatarbox.png')
			.image('morale-bg', 'assets/ui/ui-moralmeter.png')
			.image('morale-bar-bg', 'assets/ui/ui-moralmeter-bg.png')
			.image('morale-bar', 'assets/ui/ui-moralmeter-bar.png')
			.spritesheet('small-sailor','assets/chars/sailor-simple.png',32,32)
			.spritesheet('small-soldier','assets/chars/soldier-spanish-simple.png',32,32)
			.spritesheet('almanach', 'assets/icons/ui-almanach.png', 32, 32)
			.spritesheet('wheel','assets/icons/ui-options.png', 32, 32)
			.spritesheet('map','assets/icons/ui-map.png', 32, 32)
			.spritesheet('mute','assets/icons/ui-bell.png', 32, 32)
			.spritesheet('cross', 'assets/icons/map-kreuz.png', 32, 32)
			;
			
		
	};

	AK.Desk.prototype.create = function ()
	{
		var deskGrp = this.game.add.group()
			;
		deskGrp.position.set(Config.Left, 0);
		//desktop wood texture
		deskGrp.add(this.game.make.sprite(
				0, 0,
				'desk-bg'));

		this.createStatPaper(deskGrp);
		this.createCaptainsPanel(deskGrp);
		
		// START SHIP AVATAR
		
		var shipgrp = this.game.make.group();
		deskGrp.add(shipgrp);
		shipgrp.position.set(20, 240);
		shipgrp.create(0, 0, 'ship-avatar-bg');
		
		if (this.captain === null){
			this.captain = shipgrp.create(70,185,'small-captain-'+this.stats.get('player.nationality'));
			this.captain.animations.add('idle_breath',[14,15,16,17,18,19],4,false);
			this.captain.animations.add('idle_telescope',[0,1,2,3,4,5,6,7,8,9,10,11,12,13],4,false);
			this.captain.animations.play('idle_breath');
		}
		
		//init sailors
		if (this.sailors === null) {		
			this.sailors = this.game.make.group();
			shipgrp.add(this.sailors);
			this.sailors.position.set(120,205);
			
			//Sailor Handler
			this.top.stats.registerValueChangedHandler('player.crewCount', this.updateSailors, this);
		}
		
		//init soldiers
		if (this.strength === null) {		
			this.strength = this.game.make.group();
			shipgrp.add(this.strength);
			this.strength.position.set(120,205);
			
			//Sailor Handler
			this.top.stats.registerValueChangedHandler('player.strength', this.updateStrength, this);
		}
		
		shipgrp.create(10, 10, 'ship-avatar');
		var gischt = shipgrp.create(110, 285, 'ship-gischt');
		gischt.animations.add('play', [0, 1, 3, 4], 4, true);
		gischt.animations.play('play');
		
		shipgrp.create(0, 0, 'ship-avatar-border');
		
		this.updateSailors(this.stats.get('player.crewCount'),0);
		this.updateStrength(this.stats.get('player.strength'),0);
		
		// END SHIP AVATAR
		
		
	};

	AK.Desk.prototype.update = function ()
	{
			
		if (this.captain.animations.currentAnim.isFinished) {
			if (Math.random() <= 0.7){
				this.captain.animations.play('idle_breath');
			} else {
				this.captain.animations.play('idle_telescope');
			}
		}
		
	};
	
	AK.Desk.prototype.createStatPaper = function (deskGrp)
	{
		var dat, grp, stat, text, y
			, paperGrp = this.game.make.group()
			, StatConf = AK.Desk.Const.LinesConf
			;
		
		deskGrp.add(paperGrp);
		
		paperGrp.position.copyFrom(Config.StatPaper.Offset);
		paperGrp.add(this.game.make.sprite(0, 0, 'paper'));

		for (stat in StatConf) if (StatConf.hasOwnProperty(stat))
		{
			dat = StatConf[stat];
			y = Config.StatPaper.Lines.Origin.y
					+ dat.position * Config.StatPaper.Lines.LineHeight;
			
			grp = this.game.make.group();
			grp.position.set(Config.StatPaper.Lines.Origin.x, y);
			paperGrp.add(grp);
			//create stat icon
			grp.create(0, 0, dat.icon);
			//create and add stat label to the group
			grp.add(this.game.make.text(
					Config.StatPaper.Lines.LabelOffset.x,
					Config.StatPaper.Lines.LabelOffset.y,
					dat.label,
					Config.StatPaper.TextStyle));
			// create the stat-value text and store it for future modification, ...
			text = this._getOrMakeStatData(stat).valueText = this.game.make.text(
					Config.StatPaper.Lines.LabelOffset.x + Config.StatPaper.Lines.ValueXOffset,
					Config.StatPaper.Lines.LabelOffset.y,
					this.stats.get("player." + stat),
					Config.StatPaper.TextStyle);
			//... then add it to the group
			grp.add(text);

			this.stats.registerValueChangedHandler('player.' + stat,
					(function (newVal) { this.text = newVal; }).bind(text));
		}
	};//Desk.createStatPaper
	
	AK.Desk.prototype.createCaptainsPanel = function (deskGrp)
	{
		var grp = null
			, morale = this._getOrMakeStatData('morale')
			, moraleHandler = null
			;
		
		//captain avatar and name
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.copyFrom(Config.CptPanel.Origin);
		
		grp.add(this.game.make.sprite(0, 0, 'captains-bg'));
		
		grp.create(8, 24, 'large-captain-'+this.stats.get('player.nationality'));
		grp.add(this.game.make.text(100, 24, 'Captain', Config.CptPanel.TextStyle));
		grp.add(this.game.make.text(87, 50, this.stats.get('player.name'), Config.CptPanel.TextStyle));
		
		//captain morale
		grp = this.game.make.group();
		deskGrp.add(grp);
		
		grp.position.set(Config.CptPanel.Morale.Offset[0], Config.CptPanel.Morale.Offset[1]);
		
		grp.create(6, 16, 'morale-bar-bg');
		
		morale.bar = this.game.make.sprite(87, 16, 'morale-bar');
		moraleHandler = (function (newVal) { this.scale.x = newVal; })
				.bind(morale.bar);
		grp.add(morale.bar);
				
		grp.create(0, 0, 'morale-bg');
		grp.add(this.game.make.text(65, 38, 'Moral', Config.CptPanel.TextStyle));
		this.top.stats.registerValueChangedHandler('player.morale', moraleHandler);
		moraleHandler(this.top.stats.get('player.morale'));
		
		//document navigation
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.set(Config.CptPanel.Origin.x, Config.CptPanel.Origin.y + 165);
		grp.create(0, 0, 'menu-board');

		grp.add(this.game.make.button(
				5, 10, 'almanach',
				this.parent.openAlmanach, this.parent,
				1, 0));
		grp.add(this.game.make.button(
				45, 10, 'map',
				this.parent.openWorldMap, this.parent,
				1, 0));
		var bell_cross = this.game.make.sprite(1, 1, 'cross');
		bell_cross.visible = this.game.sound.mute;
		grp.add(this.game.make.button(
				85, 10, 'mute',
				function () {	this.game.sound.mute = !this.game.sound.mute; bell_cross.visible = !bell_cross.visible;}, this,
				1, 0))
			.addChild(bell_cross);
		grp.add(this.game.make.button(
				125, 10, 'wheel',
				function () {	this.top.startState(AK.MainMenu.key); }, this,
				1, 0));
	};//Desk.createCaptainsPanel
	
	AK.Desk.prototype.createShipAvatar = function (deskGrp)
	{
		//deprecated
	};
	
	/*
	* Updated die Anzahl von Seglern auf dem Schiff
	*/
	AK.Desk.prototype.updateSailors = function(new_sailors)
	{
		var diff = Math.floor((new_sailors - this.temp_old_sailors) / 3);
		
		if (diff < 0) {
			for (var i = 0; i < Math.abs(diff); i++) {
				if (this.sailors.length > 0)
					this.sailors.getAt(this.sailors.length-1).destroy();
			}
		} else if (diff > 0 ) {
			for (var i = 0; i < diff; i++) {
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
		}
		this.temp_old_sailors = new_sailors;
	}
	
	/*
	* Updated die Anzahl von Soldaten auf dem Schiff
	*/
	AK.Desk.prototype.updateStrength = function(new_strength)
	{
		var diff = Math.floor((new_strength - this.temp_old_strength)/2);
		
		if (diff < 0) {
			for (var i = 0; i < Math.abs(diff); i++) {
				if (this.strength.length > 0)
					this.strength.getAt(this.strength.length-1).destroy();
			}
		} else if (diff > 0 ) {
			for (var i = 0; i < diff; i++) {
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
		}
		this.temp_old_strength = new_strength;
	}
	
	AK.Desk.prototype.setStat = function (name, value)
	{
		var statdat = this._getOrMakeStatData(name);
		statdat.valueText.text = String(value);
	};
	
	AK.Desk.prototype._getOrMakeStatData = function (name)
	{
		return this._statData[name] || (this._statData[name] = {});
	};

});
