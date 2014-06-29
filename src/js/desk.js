
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
	};
	
	AK.Desk.Const =
			{ LinesConf :
				{ crewCount :
					{ icon : 'small-sailor'
					, label : 'Mannschaft:'
					, position : 0
					}
				, strength :
					{ icon : 'small-soldier'
					, label : 'Waffenstärke:'
					, position : 1
					}
				, food :
					{ icon : 'food-icon'
					, label : 'Nahrung:'
					, position : 2
					}
				, gold :
					{ icon : 'gold-icon'
					, label : 'Gold:'
					, position : 3
					}
				}
			};
		
	
	AK.Desk.prototype.preload = function ()
	{
		this.game.load
			.image('wood', 'assets/textures/wood.jpg')
			.image('paper', 'assets/ui/ui-paper.png')
			.image('food-icon', 'assets/icons/ui-food.png')
			.image('gold-icon', 'assets/icons/ui-gold.png')
			.image('small-sailor', 'assets/chars/sailor-simple.png')
			.image('small-soldier', 'assets/chars/soldier-spanish-simple.png')
			.image('captain-spanish', 'assets/chars/captain-placeholder-large.png')
			.image('captain-portuguese', 'assets/chars/captain-portugese-large.png')
			.image('captain-british', 'assets/chars/captain-british-large.png')
			.image('decor-board', 'assets/ui/ui-board-decorated.png')
			.image('ship-avatar', 'assets/ui/visual-ship.png')
			.image('ship-avatar-bg', 'assets/textures/ship-background.png')
			.image('captains-bg', 'assets/ui/ui-avatarbox.png')
			.image('morale-bg', 'assets/ui/ui-moralmeter.png')
			.image('morale-bar', 'assets/ui/ui-moralmeter-bar.png')
			this.game.load.spritesheet('almanach', 'assets/icons/ui-almanach.png', 64, 64)
			this.game.load.spritesheet('wheel','assets/icons/ui-options.png',64,64)
			;
	};

	AK.Desk.prototype.create = function ()
	{
		var deskGrp = this.game.add.group()
			;
		deskGrp.position.set(Config.Left, 0);
		//desktop wood texture
		deskGrp.add(this.game.make.tileSprite(
				0, 0,
				this.game.width - Config.Left, this.game.height,
				'wood'));

		this.createStatPaper(deskGrp);
		this.createCaptainsPanel(deskGrp);
		this.createShipAvatar(deskGrp);

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
	{};
	
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
		
		grp.create(10, 20, 'captain-'+this.stats.get('player.nationality'));
		grp.add(this.game.make.text(82, 17, 'Captain', Config.CptPanel.TextStyle));
		grp.add(this.game.make.text(82, 40, this.stats.get('player.name'), Config.CptPanel.TextStyle));
		
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
		var grp = this.game.make.group()
			;
		
		deskGrp.add(grp);
		grp.position.set(13, 250);
		grp.create(0, 0, 'ship-avatar-bg');
		grp.create(10, 10, 'ship-avatar');
	};
	
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