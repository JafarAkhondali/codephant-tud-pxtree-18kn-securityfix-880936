
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Sea = function Sea (parent)
	{
		this.parent = parent;
		this.game = this.parent.game;
		this.ship = new AzK.Ship(this);
		this.spots = new AzK.Spots(this);
		this.currentSpotNr = null;
		this.currentLevel = null;
	};
	
	AzK.Sea.prototype = 
			{ preload : function ()
				{
					this.game.load.image('water', 'assets/water-64x64-2x.jpg');
					this.spots.preload();
					this.ship.preload();
				}
			, create: function ()
				{
					this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'water');
					this.spots.create();
					this.ship.create();
					this.loadLevel(0, 'west');
					
				}
			, update: function ()
				{
					this.spots.update();
					this.ship.update();
				}
			
			, loadLevel: function (levelnr, enteringFrom)
				{
					var leveldat = AzK.Levels[levelnr];
					this.spots.loadLevel(leveldat, this.events);
					this.currentLevel = levelnr;
					this.ship.move(
							this.spots.start[enteringFrom].peripheral.port,
							true);
					this.ship.move(
							this.spots.start[enteringFrom].port);
					this.currentSpotNr = this.spots.spot.indexOf(this.spots.start[enteringFrom]);
				}
			
			, unloadLevel: function ()
				{
					if ('end' in this.spots.spot[this.currentSpotNr])
					{
						this.ship.move(this.spots.spot[this.currentSpotNr].peripheral.port);
					}
				}
			
			, moveShip: function (port, onComplete, onCompleteContext)
				{
					this.ship.move(port, onComplete, onCompleteContext);
				}
			
			, moveShipToSpot: function (spotNr, onComplete, onCompleteContext)
				{
					var spot = this.spots.spot[spotNr];
					if (this.spots.spotIsReachable(spotNr,
							this.currentSpotNr))
					{
						this.currentSpotNr = spotNr;
						this.moveShip(spot.port, onComplete, onCompleteContext);
					}
					
				}
			};
});