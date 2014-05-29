
namespace("PXTree.AchtzehnKnoten", function(){
	
	function Spots (sea, leveldat)
	{
		this.game = sea.game;
		this.sea = sea;
		this.spot = [];
		this._group = [];
		this.start = {};
		this.end = {};
	};
	
	Spots.Types =
		{ water: { name: 'water', key: false, portAt:[0,0] }
		, island: { name: 'island', key: 'island', portAt:[25,110] }
		, atoll: { name: 'atoll', key: 'atoll', portAt:[80,70] }
		};

	Spots.TypeNames = ['water', 'island', 'atoll'];
	
	Spots.make = function spot (pt, opts)
	{
		var typename
			, spot
			;

		opts || (opts = {});
		typename = opts.type || ('start' in opts
					? 'water'
					: Spots.TypeNames[Math.floor(Math.random() * Spots.TypeNames.length)]);
		
		spot =
				{ port: pt
				, type: Spots.Types[typename]
				, reachable: opts.reachable || null
				};
		
		opts.start && (spot.start = opts.start);
		opts.end && (spot.end = opts.end);
		return spot;
	};
	
	Spots.prototype =
	{ preload: function ()
		{
			this.game.load.image('cross', 'assets/kreuz-16x16-2x.png');
			this.game.load.image('island', 'assets/insel1-64x64-2x.png');
			this.game.load.image('atoll', 'assets/insel2-64x64-2x.png');
			this.game.load.image('line', 'assets/linedot-8x8.png');
		}
	
	, create: function ()
		{
			this._spotLayer = this.game.add.group();
		}

	, update: function ()
		{}
	
	, loadLevel: function (leveldat, events)
		{
			this.spot = this.parseLevelData(leveldat).spots;
			this.spot.forEach(function (spot)
			{
				if ('peripheral' in spot)
				{
					this.createConnector(spot.peripheral, spot);
				}
				
				spot.reachable.forEach(function (to)
				{
					this.createConnector(spot, to);
				}, this);
			}, this);
			
			this.spot.forEach(function (spot, i)
			{
				this.createSpotGroup(i);
			}, this);
		}
	
	, createConnector: function (from, to)
		{
			var diff = Phaser.Point.subtract(to.port, from.port)
				, dist = diff.getMagnitude()
				, line = this.game.make.tileSprite(0, 0, dist, 8, 'line')
				;
			line.angle = Math.atan2(diff.y, diff.x) * 180 / Math.PI;
			line.position.copyFrom(from.port);
			
			this._spotLayer.add(line);
			
			return line;
		}
	
	, createSpotGroup: function (spotNr)
		{
			var props = this.spot[spotNr]
				, port = props.port
				, type = props.type
				, grp = this.game.make.group()
				, cross = this.game.make.sprite(0, 0, 'cross')
				;
			this._spotLayer.add(grp);
			
			if (type.key)
			{
				grp.create(
						port.x - type.portAt[0],
						port.y - type.portAt[1],
						type.key)
						.spotNr = spotNr;
			}
			cross.position.set(
					port.x - cross.width / 2,
					port.y - cross.height / 2);
			cross.spotNr = spotNr;
			
			grp.add(cross);
			
			grp.spotNr = spotNr;
			
			grp.forEach(function (part)
			{
				part.inputEnabled = true;
				part.events.onInputDown.add(
						function (clicked)
						{
							this.sea.moveShipToSpot(clicked.spotNr);
						},
						this);
			}, this);
			
			this._group[spotNr] = grp;
			
			return grp;
		}
	
	, parseLevelData: function (leveldat)
		{
			var spots = this
				, nu = {spots: null}
				;
			
			// process spots
			nu.spots = leveldat.spots.map(function (spot)
			{
				var map = Spots.make(new Phaser.Point(spot.x, spot.y), spot);
					;
				//register start
				if ('start' in map)
				{
					var start = this._getPeripheralSpot(map.start, map.port);
					start.reachable = [map];
					map.peripheral = start;
					spots.start[map.start] = map;
				}
				
				// register end
				if ('end' in map)
				{
					var end = this._getPeripheralSpot(map.end, map.port);
					map.peripheral = end;
					spots.end[map.end] = map;
				}

				return map;
			}, this);
			
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

			return nu;
		}
	
	, spotIsReachable: function (spot, from)
	{
		var reachable = false;
		spot = this.spot[spot];
		from = this.spot[from];
		reachable = (from.reachable.indexOf(spot) >= 0);
		return reachable;
	}
	
	, _getPeripheralSpot: function (dir, pt)
		{
			var port = null
				;
			switch(dir)
			{
			case 'east':
				port = new Phaser.Point(this.game.world.width + 100, pt.y); break;
			case 'north':
				port = new Phaser.Point(pt.x, -100); break;
			case 'west':
				port = new Phaser.Point(-100, pt.y); break;
			case 'south':
				port = new Phaser.Point(pt.x, this.game.world.height + 100); break;
			}
			
			return Spots.make(port, { type: 'water' });
		}
	
	}; // Spots.prototype
	
	this.Spots = Spots;
}); // namespace(PXTree.AchtzehnKnoten)