
namespace("PXTree.AchtzehnKnoten", function(AzK){
	AzK.Spots = function Spots (game, sea, leveldat)
	{
		this.game = game;
		this.sea = sea;
		this.leveldat = leveldat || null;
		this.spot = [];
		this.start = {};
	};
	
	AzK.Spots.prototype =
	{ TYPES:
		{ water: { name: 'water', key: false, portAt:[0,0] }
		, island: { name: 'island', key: 'island', portAt:[25,110] }
		, atoll: { name: 'atoll', key: 'atoll', portAt:[80,70] }
		}
	
	, TYPENAMES: ['water', 'island', 'atoll'] 
	
	, preload: function ()
		{
			this.game.load.image('cross', 'assets/kreuz-16x16-2x.png');
			this.game.load.image('island', 'assets/insel1-64x64-2x.png');
			this.game.load.image('atoll', 'assets/insel2-64x64-2x.png');
			this.game.load.image('line', 'assets/linedot-8x8.png');
		}
	
	, create: function ()
		{
			this._spotLayer = this.game.add.group();
			this.leveldat && this.loadLevel(this.leveldat);
		}

	, update: function ()
		{}
	
	, loadLevel: function (leveldat)
		{
			var _me = this;
			this.parseLevelData(leveldat);
			this.leveldat.spots.forEach(function (spot)
			{
				spot.reachable.forEach(function (to)
				{
					_me.createConnector(spot, to);
				});
			});
			this.leveldat.spots.forEach(function (spot)
			{
				_me.createSpotGroup(spot);
			});
		}
	
	, createConnector: function (from, to)
		{
			var diff = Phaser.Point.subtract(to.port, from.port)
			, dist = diff.getMagnitude()
			, line = this.game.make.tileSprite(0, 0, dist, 8, 'line');
			line.angle = Math.atan2(diff.y, diff.x) * 180 / Math.PI;
			line.position.copyFrom(from.port);
			
			this._spotLayer.add(line);
			
			return line;
		}
	
	, createSpotGroup: function (props)
		{
			var port = props.port
				, type = props.type
				, grp = this.game.make.group()
				, cross = this.game.make.sprite(0, 0, 'cross')
				;
			this._spotLayer.add(grp);
			
			if (type.key)
			{
				grp.create(port.x - type.portAt[0], port.y - type.portAt[1], type.key);
			}
			cross.position.set(
					port.x - cross.width / 2,
					port.y - cross.height / 2);
			grp.add(cross);
			
			grp.port = port;
			grp.spottype = type;
			
			grp.forEach(function (part)
			{
				part.inputEnabled = true;
				part.events.onInputDown = new Phaser.Signal();
				part.events.onInputDown.add(
						function () { this.sea.moveShip(grp.port); },
						this);
			}, this);
			
			return grp;
		}
	
	, parseLevelData: function (leveldat)
		{
			var spots = this
				, nu = {spots: null}
				;
			nu.spots = leveldat.spots.map(function (spot)
			{
				var typename = (spot.type || ('start' in spot
									? 'water'
									: spots.TYPENAMES[
										Math.floor(Math.random() * spots.TYPENAMES.length)])
								)
					, map =
						{ port: new Phaser.Point(spot.x, spot.y)
						, type: spots.TYPES[typename]
						, reachable: spot.reachable
						}
					;

				//register start
				if ('start' in spot)
					spots.start[spot.start] = map;

				return map;
			});
			
			// replace the numeric references in "reachable" with the actual object
			nu.spots.forEach(function (spot)
			{
				if (spot.reachable)
					spot.reachable = spot.reachable.map(function (r)
					{
						return nu.spots[r];
					});
				else
					spot.reachable = [];
			});
			
			this.leveldat = nu;
			return this.leveldat;
		}
	
	};
});