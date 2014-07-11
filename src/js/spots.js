
namespace("PXTree.AchtzehnKnoten", function(AK)
{ "use strict";
	var Config = AK.Config
		, SpotConf = AK.Config.Spots
		;
	
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

	AK.Spots = Spots;
	
	Spots.IslandPorts =
			[ [-3, 24]
			, [0, 30]
			, [45, 1]
			, [9, 63]
			];

	//this is mainly for backwards compatibility preceding unified island type
	Spots.AdditionalTypes =
			{ atoll: { name: 'island', key: 'island2', portAt: Spots.IslandPorts[1] }
			};

	Spots.make = function spot (pt, opts)
	{
		var typename
			, spot
			, key = false
			, portAt = [0, 0]
			, islandType
			;

		opts || (opts = {});
		//if no typename is given, it might be water, when this is a starting spot
		// or simply select randomly from ['water', 'island']
		typename = opts.type || ('start' in opts || !Math.floor(Math.random() * 2)
					? 'water'
					: 'island');

		if (typename === 'island')
		{
			islandType = Math.floor(Math.random() * 4);
			key = "island" + (islandType + 1);
			portAt = Spots.IslandPorts[islandType];
		}
		else if (typename !== 'water') //maybe the type is one preceding unified island type
		{
			key = Spots.AdditionalTypes[typename].key;
			portAt = Spots.AdditionalTypes[typename].portAt;
			typename = Spots.AdditionalTypes[typename].name;
		}
		
		
		spot =
				{ port: pt
				, type: { name: typename, key: key, portAt: portAt }
				, reachable: opts.reachable || null
				};
		
		if ('start' in opts) spot.start = opts.start;
		if ('end' in opts) spot.end = opts.end;
		if ('event' in opts) spot.event = opts.event;

		if (!('event' in spot))
			spot.event = { tags: [typename] };
		else if ('tags' in spot.event)
			spot.event.tags.push(typename);
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
	
	Spots.getAngle = function getAngle (dir)
	{
		return this._dirAngleMap[dir];
	};
	
	Spots.getPeripheralSpritePos = function getPeripheralSpritePos (port, dir)
	{
		var p = (new Phaser.Point()).copyFrom(port);
			;
		switch (dir)
		{
		case 'north': p.y += 16; break;
		case 'east': p.x -= 16; break;
		case 'south': p.y -= 16; break;
		case 'west': p.x += 16; break;
		}
		return p;
	}
	
	Spots._dirAngleMap =
			{ north: 0
			, east: 90
			, south: 180
			, west: 270
			};
	
	Spots.prototype =
	{ preload: function ()
		{
			this.game.load
				.spritesheet('cross', 'assets/icons/map-kreuz.png', 32, 32)
				.spritesheet('arrow', 'assets/icons/map-arrow.png', 32, 32)
				.image('line', 'assets/textures/line-dot.png')
				.image('island1-temperate', 'assets/islands/normal-1.png')
				.image('island2-temperate', 'assets/islands/normal-2.png')
				.image('island3-temperate', 'assets/islands/normal-3.png')
				.image('island4-temperate', 'assets/islands/normal-4.png')
				.image('island1-arid', 'assets/islands/desert-1.png')
				.image('island2-arid', 'assets/islands/desert-2.png')
				.image('island3-arid', 'assets/islands/desert-3.png')
				.image('island4-arid', 'assets/islands/desert-4.png')
				.image('island1-tropic', 'assets/islands/tropical-1.png')
				.image('island2-tropic', 'assets/islands/tropical-2.png')
				.image('island3-tropic', 'assets/islands/tropical-3.png')
				.image('island4-tropic', 'assets/islands/tropical-4.png')
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
			var connect = null
				;
			this.spot = this.parseLevelData(leveldat).spots;
			this.spot.forEach(function (spot)
			{
				spot.connectors = [];
				if ('peripheral' in spot)
				{
					connect = this.createConnector(spot, spot.peripheral);
					if ('end' in spot)
						spot.connectors.push(connect);
				}
				
				spot.reachable.forEach(function (to)
				{
					spot.connectors.push(this.createConnector(spot, to));
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
					periSpot = this.game.make.button(
							0, 0, 'arrow',
							function ()
							{ 
								if (this.parent.currentSpotNr === this.spotNr)
									if ('found' in this.spot.end)
										this.parent.unloadLevel(function()
										{
											this.top.startState(
												AK.Endscreen.key,
												false,
												this.spot.end.found);
										}, this);
						
									else
										this.parent.loadLevel(
											this.spot.end.to,
											Spots.getOppositeDirection(this.spot.end.dir));
							},
							{ parent: this.parent, spotNr: i, spot: spot, top: this.top });
					periSpot.anchor.set(.5, .5);
					periSpot.angle = Spots.getAngle(spot.end.dir);
					periSpot.position.copyFrom(Spots.getPeripheralSpritePos(
									peripheral.port,
									spot.end.dir));
					periSpot.events.onInputOver.add(function (p)
					{
						if (this.parent.currentSpotNr === i)
						{
							p.frame = 1;
						}
					}, this);
					periSpot.events.onInputOut.add(function (p) { p.frame = 0; });
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
			line.anchor.set(0, .5);
			line.angle = Math.atan2(diff.y, diff.x) * 180 / Math.PI;
			line.position.copyFrom(from.port);
			line.alpha = SpotConf.NotActiveAlpha;
			
			this._spotLayer.add(line);
			
			return line;
		}
	
	, createSpotGroup: function (spotNr)
		{
			var props = this.spot[spotNr]
				, port = props.port
				, type = props.type
				, grp = this.game.make.group()
				, clickHandler = function() { this.sea.moveShipToSpot(spotNr); }
				, cross = this.game.make.button(
						port.x, port.y, 'cross',
						clickHandler, this)
				, addTex = null
				, overHandler = function ()
					{
						if (this.spotIsReachable(spotNr, this.parent.currentSpotNr))
						{
							cross.frame = 1;
						}
					}
				, outHandler = function () { cross.frame = 0; }
				;
			this._spotLayer.add(grp);
			
			if (type.key)
			{
				addTex = grp.add(this.game.make.button(
						port.x - type.portAt[0],
						port.y - type.portAt[1],
						type.key + '-' + this.sea.climaticZone(),
						clickHandler, this));
				addTex.events.onInputOver.add(overHandler, this);
				addTex.events.onInputOut.add(outHandler, this);
			}
			cross.anchor.set(.5, .5);
			cross.spotNr = spotNr;
			cross.events.onInputOver.add(overHandler, this);
			cross.events.onInputOut.add(outHandler, this);
			
			grp.add(cross);
			
			grp.spotNr = spotNr;
			
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

	, setActiveSpot: function (spotNr)
		{
			this.spot.forEach(function(spot, nr)
			{
				var alpha = (spotNr === nr) ? SpotConf.ActiveAlpha : SpotConf.NotActiveAlpha
					;
				spot.connectors.forEach(function(connector)
				{
					connector.alpha = alpha;
				});
			});
		}
	
	}; // Spots.prototype
}); // namespace(PXTree.AchtzehnKnoten)
