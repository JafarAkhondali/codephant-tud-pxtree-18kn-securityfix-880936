
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	AK.Desk = function Desk (play)
	{
		this.play = play;
		this.game = play.game;
		this._stats = {};
	};
	
	AK.Desk.Const = (function defineConst ()
	{
		var PosX = 576
			, C = { PosX : PosX
					
					, StatOrigin : { x : PosX + 50, y : 50}
					
					, PaperOffset : { x : -40, y : -40 }
					
					, StatLineOffsetY : 50
					
					, StatLabelOffset : { x : 42, y : 10 }
					
					, StatValueOffsetX : 145
					
					, CptPanelOffset : { x : 230, y : 0 }
					
					, Font : { font : 'normal 12pt Sans-Serif' }
				
					, StatLinesConf :
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
					}
			;
		return C;
	})();
		
	
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
		});
		
	};

	AK.Desk.prototype.create = function ()
	{
		var Const = AK.Desk.Const;
		//desktop wood texture
		this.game.add.tileSprite(
				Const.PosX, 0,
				this.game.width - Const.PosX, this.game.height,
				'wood');
		//stat paper on the desk
		this.game.add.sprite(
				Const.StatOrigin.x + Const.PaperOffset.x,
				Const.StatOrigin.y + Const.PaperOffset.y,
				'paper');
		//different stats on the paper
		this.createStatLines();
		//show captains board
		this.createCaptainsPanel();
	};

	AK.Desk.prototype.update = function ()
	{};
	
	AK.Desk.prototype.createStatLines = function ()
	{
		var dat, grp, stat, y
			, Const = AK.Desk.Const
			, StatConf = Const.StatLinesConf
			;
		for (stat in StatConf) if (StatConf.hasOwnProperty(stat))
		{
			dat = StatConf[stat];
			y = Const.StatOrigin.y + dat.position * Const.StatLineOffsetY;
			
			grp = this.game.add.group();
			//create stat icon
			grp.create(Const.StatOrigin.x, y, dat.icon);
			//create and add stat label to the group
			grp.add(this.game.add.text(
					Const.StatOrigin.x + Const.StatLabelOffset.x,
					y + Const.StatLabelOffset.y,
					dat.label,
					AK.Desk.Const.Font));
			// create the stat-value text and store it for future modification, ...
			this._getOrMakeStatData(stat).valueText = this.game.make.text(
					Const.StatOrigin.x + Const.StatValueOffsetX,
					y + Const.StatLabelOffset.y,
					'0',
					Const.Font);
			//... then add it to the group
			grp.add(this._stats[stat].valueText);
		}
	};
	
	AK.Desk.prototype.createCaptainsPanel = function ()
	{
		var Const = AK.Desk.Const
			, grp = null
			, font = Object.create(Const.Font)
			, morale = this._getOrMakeStatData('morale')
			;
		//captain avatar and name
		grp = this.game.add.group();
		font.fill = 'white';
		grp.create(
				Const.StatOrigin.x + Const.CptPanelOffset.x,
				Const.StatOrigin.y,
				'captain-spanish');
		grp.add(this.game.make.text(
				Const.StatOrigin.x + Const.CptPanelOffset.x + 60,
				Const.StatOrigin.y + 10,
				'Captain',
				font));
		grp.add(this.game.make.text(
				Const.StatOrigin.x + Const.CptPanelOffset.x + 60,
				Const.StatOrigin.y + 40,
				'Paddington',
				font));
		//captain morale
		grp = this.game.add.group();
		morale.valueText = this.game.make.text();
		//TODO add the morale stat interface
		
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