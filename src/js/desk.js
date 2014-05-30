
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	AK.Desk = function Desk (play)
	{
		this.parent = play;
		this.play = play;
		this.top = play.top;
		this.game = play.game;
		this._stats = {};
	};
	
	AK.Desk.Const =
			{ Origin: { x: 576, y: 0 }
			, Font : { font : 'normal 12pt Sans-Serif' }
			, PaperOffset: { x: 10, y: 10 }
			, LinesOriginOffset: { x: 40, y: 40 }
			, LinesHeight: 50
			, LinesLabelOffset: { x: 42, y: 10 }
			, LinesValueXOffset: 105
			, CptPanelOffset : { x : 270, y : 20 }
			, LinesConf :
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
		var Const = AK.Desk.Const
			, deskGrp = this.game.add.group()
			;
		deskGrp.position.copyFrom(Const.Origin);
		//desktop wood texture
		deskGrp.add(this.game.make.tileSprite(
				0, 0,
				this.game.width - Const.Origin.x, this.game.height - Const.Origin.y,
				'wood'));

		this.createStatPaper(deskGrp);
		this.createCaptainsPanel(deskGrp);
		this.createShipAvatar(deskGrp);
	};

	AK.Desk.prototype.update = function ()
	{};
	
	AK.Desk.prototype.createStatPaper = function (deskGrp)
	{
		var dat, grp, stat, y
			, paperGrp = this.game.make.group()
			, Const = AK.Desk.Const
			, StatConf = Const.LinesConf
			;
		
		deskGrp.add(paperGrp);
		
		paperGrp.position.copyFrom(Const.PaperOffset);
		paperGrp.add(this.game.make.sprite(0, 0, 'paper'));

		for (stat in StatConf) if (StatConf.hasOwnProperty(stat))
		{
			dat = StatConf[stat];
			y = Const.LinesOriginOffset.y + dat.position * Const.LinesHeight;
			
			grp = this.game.make.group();
			grp.position.set(Const.LinesOriginOffset.x, y);
			paperGrp.add(grp);
			//create stat icon
			grp.create(0, 0, dat.icon);
			//create and add stat label to the group
			grp.add(this.game.make.text(
					Const.LinesLabelOffset.x,
					Const.LinesLabelOffset.y,
					dat.label,
					Const.Font));
			// create the stat-value text and store it for future modification, ...
			this._getOrMakeStatData(stat).valueText = this.game.make.text(
					Const.LinesLabelOffset.x + Const.LinesValueXOffset,
					Const.LinesLabelOffset.y,
					'0',
					Const.Font);
			//... then add it to the group
			grp.add(this._stats[stat].valueText);
		}
	};//Desk.createStatPaper
	
	AK.Desk.prototype.createCaptainsPanel = function (deskGrp)
	{
		var Const = AK.Desk.Const
			, grp = null
			, font = Object.create(Const.Font)
			, morale = this._getOrMakeStatData('morale')
			;
		
		//captain avatar and name
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.copyFrom(Const.CptPanelOffset);
		font.fill = 'white';
		
		grp.create(0, 0, 'captain-spanish');
		grp.add(this.game.make.text(60, 10, 'Captain', font));
		grp.add(this.game.make.text(60, 40, 'Paddington', font));
		
		//captain morale
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.set(Const.CptPanelOffset.x, Const.CptPanelOffset.y + 80);
		morale.valueText = this.game.make.text(70, 0, '0', font);
		grp.add(morale.valueText);
		grp.add(this.game.make.text(70, 30, 'Moral', font));
		
		//document navigation
		grp = this.game.make.group();
		deskGrp.add(grp);
		grp.position.set(Const.CptPanelOffset.x, Const.CptPanelOffset.y + 130);
		grp.create(0, 0, 'decor-board').scale.set(0.6);
	};//Desk.createCaptainsPanel
	
	AK.Desk.prototype.createShipAvatar = function (deskGrp)
	{
		var Const = AK.Desk.Const
			, grp = this.game.make.group()
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
		return this._stats[name] || (this._stats[name] = {});
	};

});