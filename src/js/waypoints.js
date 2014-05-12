
namespace("PXTree.AchtzehnKnoten", function(AzK){
	AzK.Waypoints = function Waypoints (game, sea)
	{
		this.game = game;
		this.sea = sea;
		this.spots = [];
	};
	
	AzK.Waypoints.prototype =
	{ preload: function ()
		{
			this.game.load.image('cross', 'assets/kreuz-16x16-2x.png');
			this.game.load.image('island', 'assets/insel1-64x64-2x.png');
			this.game.load.image('atoll', 'assets/insel2-64x64-2x.png');
			this.game.load.image('line', 'assets/linedot-8x8.png');
		}
	
	, create: function ()
		{
			var ps =
					[ {x:50,  y:275, start:true}
					, {x:105, y:123}
					, {x:175, y:486}
					, {x:317, y:317}
					, {x:408, y:105}
					, {x:487, y:337}
					]
				;
			ps.forEach(function (p)
			{
				var type = this.TYPES[p.start ? 0
								: Math.floor(Math.random() * this.TYPES.length)]
					, wp = new AzK.Waypoint(this, type, p)
					;
				this.spots.push(wp);
				wp.sprite.forEach(function (part)
				{
					part.inputEnabled = true;
					part.events.onInputDown = new Phaser.Signal();
					part.events.onInputDown.add(
							function (){ 
								this.parent.sea.ship.move(this.port.x, this.port.y);
							}, wp);
				}, this);
				this.game.world.add(wp.sprite);
			}, this);
			
			on(this.spots, function(spots)
			{
				spots[0].addNeighbor(spots[1]);
				spots[0].addNeighbor(spots[2]);
				spots[1].addNeighbor(spots[3]);
				spots[2].addNeighbor(spots[3]);
				spots[3].addNeighbor(spots[4]);
				spots[3].addNeighbor(spots[5]);
				spots[4].addNeighbor(spots[5]);
				
			});
		}

	, update: function ()
		{}
	
	, TYPES:
		[ { name: 'water', key: false, portAt:[0,0] }
		, { name: 'island', key: 'island', portAt:[25,110] }
		, { name: 'atoll', key: 'atoll', portAt:[80,70] }
		]
	};
	
	AzK.Waypoint = function Spot (parent, type, port)
	{
		this.parent = parent;
		this.type = type;
		this.port = new Phaser.Point();
		this._neighbors = [];
		this.sprite = null;
		this.linesDrawn = false;

		if (port) this.port.copyFrom(port);
		this.initSprite();
	};
	
	AzK.Waypoint.prototype =
		{ initSprite: function ()
			{
				if (!this.sprite)
				{
					var part;
					this.sprite = this.parent.game.add.group();
					if (this.type.key)
					{
						part = this.parent.game.make.sprite(
								this.port.x - this.type.portAt[0],
								this.port.y - this.type.portAt[1],
								this.type.key);
						this.sprite.add(part);
					}
					part = this.sprite.cross = 
							this.parent.game.make.sprite(this.port.x, this.port.y, 'cross');
					part.position.set(
							this.port.x - part.width / 2,
							this.port.y - part.height / 2);
					this.sprite.add(part);
					
				}
			}
		, drawLine: function (neigh)
			{
				var diff = Phaser.Point.subtract(neigh.port, this.port)
					, dist = diff.getMagnitude()
					, line = this.parent.game.add.tileSprite(
							0, -4,
							dist, 8,
							'line');
				line.angle = Math.atan(diff.y/diff.x) * 180 / Math.PI;
				line.position.copyFrom(this.port);
				this.linesDrawn = true;
			}
		, addNeighbor: function (wp)
		{
			this._neighbors.push(wp);
			this.drawLine(wp);
		}
		};
});