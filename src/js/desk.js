
namespace("PXTree.AchtzehnKnoten", function (AK)
{
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
					, label : 'Soldaten'
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
			//.image('small-sailor', 'assets/chars/sailor-simple.png')
			.image('small-soldier', 'assets/chars/soldier-spanish-simple.png')
			.spritesheet('small-captain-british', 'assets/chars/captain-british-simple.png',32,32)
			.image('small-captain-spanish', 'assets/chars/captain-spanish-simple.png')
			.image('large-captain-spanish', 'assets/chars/captain-spanish-large.png')
			.image('large-captain-british', 'assets/chars/captain-british-large.png')
			.image('decor-board', 'assets/ui/ui-board-decorated.png')
			.image('ship-avatar', 'assets/ui/visual-ship.png')
			.image('ship-avatar-bg', 'assets/textures/ship-background.png')
			.image('ship-avatar-border', 'assets/ui/visual-box.png')
			.spritesheet('ship-gischt', 'assets/ui/visual-gischt.png', 300,32)
			.image('captains-bg', 'assets/ui/ui-avatarbox.png')
			.image('morale-bg', 'assets/ui/ui-moralmeter.png')
			.image('morale-bar', 'assets/ui/ui-moralmeter-bar.png')
			.spritesheet('small-sailor','assets/chars/sailor-simple.png',32,32)
			.spritesheet('almanach', 'assets/icons/ui-almanach.png', 64, 64)
			.spritesheet('wheel','assets/icons/ui-options.png',64,64)
			.audio('audio-ambient-ship', ['assets/audio/ship-at-sea.wav']);
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
		//this.createShipAvatar(deskGrp);

		// START SHIP AVATAR
		
		var shipgrp = this.game.make.group();
		deskGrp.add(shipgrp);
		shipgrp.position.set(20, 240);
		shipgrp.create(0, 0, 'ship-avatar-bg');
		if (this.captain === null){
			this.captain = shipgrp.create(70,180,'small-captain-'+this.stats.get('player.nationality'));
			this.captain.animations.add('idle',[0],8,true);
			this.captain.animations.add('idle_telescope',[0,1,2,3,4,5,6,7,8,9,10,11,12,13],4,true);
			this.game.time.events.loop(2000, function(){
				if (Math.random() <= 0.5){
					this.captain.animations.play('idle');
				} else {
					this.captain.animations.play('idle_telescope');
				}
			}, this);
		}
		
		//init sailors
		if (this.sailors === null) {		
			this.sailors = this.game.make.group();
			shipgrp.add(this.sailors);
			this.sailors.position.set(120,200);
		}
		
		shipgrp.create(10, 10, 'ship-avatar');
		var gischt = shipgrp.create(110, 285, 'ship-gischt');
		gischt.animations.add('play', [0, 1, 3, 4], 4, true);
		gischt.animations.play('play');
		
		shipgrp.create(0, 0, 'ship-avatar-border');
		
		this.updateSailors(this.stats.get('player.crewCount'),0);
		
		// END SHIP AVATAR
		
		//PLAY AUDIO
		var music_ambient = this.game.sound.play('audio-ambient-ship');
		
		/**
		 * Nur übergangsweise zu Testzwecken
		 */
		var image1 = this.game.add.sprite(Config.CptPanel.Origin.x+Config.Left+20, Config.CptPanel.Origin.y + 200, 'almanach');
	    image1.anchor.set(0.5);
	    imagefunction = function(){
	    	this.parent.openAlmanach();
	    }
	    image1.inputEnabled = true;
	    image1.events.onInputDown.add(
	    		imagefunction,this);
	    
		var wheel = this.game.add.sprite(Config.CptPanel.Origin.x+Config.Left+100, Config.CptPanel.Origin.y + 200, 'wheel');
	    wheel.anchor.set(0.5);
	    optionWheel = function(){
	    	this.game.state.start(AK.MainMenu.key, true, false, this);
	    }
	    wheel.inputEnabled = true;
	    wheel.events.onInputDown.add(
	    		optionWheel,this);

		
	};

	AK.Desk.prototype.update = function ()
	{
		
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
		grp.add(this.game.make.text(85, 24, 'Captain', Config.CptPanel.TextStyle));
		grp.add(this.game.make.text(85, 40, this.stats.get('player.name'), Config.CptPanel.TextStyle));
		
		//captain morale
		grp = this.game.make.group();
		deskGrp.add(grp);
		
		grp.position.set(Config.CptPanel.Morale.Offset[0], Config.CptPanel.Morale.Offset[1]);
		
		morale.bar = this.game.make.sprite(87, 17, 'morale-bar');
		moraleHandler = (function (newVal) { this.scale.x = newVal; })
				.bind(morale.bar);
		grp.add(morale.bar);
		grp.create(0, 0, 'morale-bg');
		grp.add(this.game.make.text(65, 35, 'Moral', Config.CptPanel.TextStyle));
		this.top.stats.registerValueChangedHandler('player.morale', moraleHandler);
		moraleHandler(this.top.stats.get('player.morale'));
		
		//document navigation
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.set(Config.CptPanel.Origin.x-40, Config.CptPanel.Origin.y + 170);
		grp.create(0, 0, 'decor-board').scale.set(0.9);

	};//Desk.createCaptainsPanel
	
	AK.Desk.prototype.createShipAvatar = function (deskGrp)
	{
		//deprecated
	};
	
	AK.Desk.prototype.updateSailors = function(new_sailors, old_sailors)
	{
		var diff = new_sailors - old_sailors;
		
		if (diff < 0) {
			for (var i = 0; i < Math.abs(diff); i++) {
				this.sailors.getBottom().destroy();
			}
		} else if (diff > 0 ) {
			for (var i = 0; i < diff; i++) {
				var x_pos_start = Math.floor((Math.random() * 150));
				var x_pos_end = Math.floor((Math.random() * 150));
				
				var s = this.sailors.create(x_pos_start,0, 'small-sailor');
				s.animations.add('left', [0, 1, 2, 3], 8, true);
				s.animations.add('right', [4, 5, 6, 7], 8, true);
				
				if (x_pos_end - x_pos_start > 0 ){
					s.animations.play('right');
				} else {
					s.animations.play('left');
				}
				
				var dur = (Math.floor((Math.random() * 2000) + 1)+4000);
				var tw = this.game.add.tween(s).to( { x: x_pos_end }, dur , Phaser.Easing.Linear.None).yoyo(true).repeat(Number.MAX_VALUE).start();
				tw.onLoop.add(function() {
					if (this.animations.currentAnim.name == 'right'){
						this.animations.play('left');
						//console.log('now going left');
					} else {
						this.animations.play('right');
						//console.log('now going right');
					}
				}.bind(s));
			}
		}
				
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