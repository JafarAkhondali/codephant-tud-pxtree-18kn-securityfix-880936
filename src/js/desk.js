
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
		on(this.game.load, function(load)
		{
			load.image('wood', 'assets/wood.png');
			load.image('paper', 'assets/papier-256x256-2x.png');
			load.image('food-icon', 'assets/icon-food-32x32-2x.png');
			load.image('gold-icon', 'assets/icon-gold-32x32-2x.png');
			load.image('small-sailor', 'assets/sailor-32x32-2x.png');
			load.image('small-soldier', 'assets/soldier-32x32-1x.png');
			load.image('captain-spanish', 'assets/captain-64x64-2x.png');
			load.image('captain-portuguese', 'assets/captain-portugese-64x64-2x.png');
			load.image('captain-british', 'assets/captain-british-64x64-2x.png');
			load.image('decor-board', 'assets/board-decorated-256x64-2x.png');
			load.image('ship-avatar', 'assets/visual-ship-400x300-2x.png');
		});
		
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
			;
		
		//captain avatar and name
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.copyFrom(Config.CptPanel.Origin);
		
		grp.create(0, 0, 'captain-'+this.stats.get('player.nationality'));
		grp.add(this.game.make.text(60, 10, 'Captain', Config.CptPanel.TextStyle));
		grp.add(this.game.make.text(60, 40, this.stats.get('player.name'), Config.CptPanel.TextStyle));
		
		//captain morale
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.set(Config.CptPanel.Origin.x, Config.CptPanel.Origin.y + 80);
		morale.valueText = this.game.make.text(
				70, 0,
				this.stats.get("player.morale"),
				Config.CptPanel.TextStyle);
		grp.add(morale.valueText);
		grp.add(this.game.make.text(70, 30, 'Moral', Config.CptPanel.TextStyle));
		this.top.stats.registerValueChangedHandler('player.morale',
				(function (newVal) { this.text = newVal; }).bind(morale.valueText));
		
		//document navigation
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.set(Config.CptPanel.Origin.x, Config.CptPanel.Origin.y + 130);
		grp.create(0, 0, 'decor-board').scale.set(0.6);
	};//Desk.createCaptainsPanel
	
	AK.Desk.prototype.createShipAvatar = function (deskGrp)
	{
		var grp = this.game.make.group()
			;
		
		deskGrp.add(grp);
		grp.position.set(20, 270);
		grp.create(0, 0, 'ship-avatar');
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