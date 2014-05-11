
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
			this.game.load.image('cross', 'assets/cross.png');
			this.game.load.image('island', 'assets/island.png');
			this.game.load.image('atoll', 'assets/atoll.png');
		}
	
	, create: function ()
		{
			var ps = [{x:105, y:80}, {x:234, y:303}, {x:251, y:134}, {x:408, y:75}, {x:500, y:237}]
				, types = ['island', 'atoll']
				, game = this.game
				, sea = this.sea
				;
			ps.forEach(function (p)
			{
				var type = types[Math.floor(Math.random() * 2)]
					, wp = game.add.sprite(p.x, p.y, type)
					;
				wp.scale.setTo(0.5, 0.5);
				wp.inputEnabled = true;
				wp.events.onInputDown = new Phaser.Signal();
				wp.events.onInputDown.add(function (waypoint, pointer)
				{
					sea.ship.moveShip(waypoint.x, waypoint.y);
				});
			});
		}

	, update: function ()
		{}
	};
});