
namespace("PXTree.AchtzehnKnoten", function()
{
	var Config = PXTree.AchtzehnKnoten.Config;
	
	function Spots (sea)
	{
		this.parent = sea;
		this.sea = sea;
		this.top = sea.top;
		this.game = sea.game;
		this.spot = [];
		this.start = {};
		this.end = {};
		this._spotLayer = null;
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
	
	Spots.getOppositeDirection = function getOppositeDirection (dir)
	{
		return this._oppositeDirections[dir];
	};
	
	Spots._oppositeDirections =
			{ north: "south"
			, east: "west"
			, south: "north"
			, west: "east"
			};
	
	Spots.prototype =
	{ preload: function ()
		{
			this.game.load
				.spritesheet('cross', 'assets/icons/map-kreuz.png', 32, 32)
				.image('island', 'assets/islands/normal-1.png')
				.image('atoll', 'assets/islands/normal-2.png')
				.image('line', 'assets/linedot-8x8.png')
				;
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
				var periSpot
					, peripheral
					;
				if ('end' in spot)
				{
					peripheral = spot.peripheral;
					periSpot = this.game.make.sprite(0, 0, 'cross');
					periSpot.position.set(
							peripheral.port.x - periSpot.width/2,
							peripheral.port.y - periSpot.height/2);
					periSpot.inputEnabled = true;
					periSpot.events.onInputDown.add(
							function ()
							{ 
								if (this.parent.currentSpotNr === this.spotNr)
									this.parent.loadLevel(
										this.spot.end.to,
										Spots.getOppositeDirection(this.spot.end.dir));
							}, { parent: this.parent, spotNr: i, spot: spot });
					this._spotLayer.add(periSpot);
				}
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
					var start = this._getPeripheralSpot(map.start.dir, map.port);
					start.reachable = [map];
					map.peripheral = start;
					spots.start[map.start.dir] = map;
				}
				
				// register end
				if ('end' in map)
				{
					var end = this._getPeripheralSpot(map.end.dir, map.port);
					map.peripheral = end;
					spots.end[map.end.dir] = map;
				}
				
				if ('event' in spot)
					map.event = spot.event;

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
				port = new Phaser.Point(Config.Desk.Left, pt.y); break;
			case 'north':
				port = new Phaser.Point(pt.x, 0); break;
			case 'west':
				port = new Phaser.Point(0, pt.y); break;
			case 'south':
				port = new Phaser.Point(pt.x, Config.Game.Height); break;
			}
			
			return Spots.make(port, { type: 'water' });
		}
	
	, removeAll: function ()
		{
			this._spotLayer.removeAll(true);
		}
	
	}; // Spots.prototype
	
	this.Spots = Spots;
}); // namespace(PXTree.AchtzehnKnoten)