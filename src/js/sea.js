
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Sea = function Sea (game)
	{
		this.game = game;
		this.ship = new AzK.Ship(game);
		this.waypoints = new AzK.Waypoints(game, this);
	};
	
	AzK.Sea.prototype = 
			{ preload : function ()
				{
					this.game.load.image('water', 'assets/water.jpg');
					this.waypoints.preload();
					this.ship.preload();
				}
			, create: function ()
				{
					this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'water');
					this.waypoints.create();
					this.ship.create();
				}
			, update: function ()
				{
					this.waypoints.update();
					this.ship.update();
				}
			};
});