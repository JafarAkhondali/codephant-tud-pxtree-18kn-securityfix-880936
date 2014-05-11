
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Ship = function Ship (game)
	{
		this.game = game;
		this.sprite = null;
		this.model = {speed: 0.5};
		this.floating = false;
	};
	
	AzK.Ship.prototype =
			{ preload: function ()
				{
					this.game.load.image('ship', 'assets/ship.png');
				}
	
			, create: function ()
				{
					var ship = this;
					this.sprite = this.game.make.sprite(0, 200, 'ship');
					this.sprite.scale.setTo(0.5, 0.5);
//					this.game.input.mouse.mouseDownCallback = function (event)
//					{
//						ship.moveShip(event.clientX, event.clientY);
//					};
//					this.floating = this.game.add.tween(this.sprite)
//						.to({y: this.sprite.y - 10}, 500)
//						.to({y: this.sprite.y}, 500)
//						.loop().start();
					this.game.world.add(this.sprite);
				}
			
			, update: function ()
				{}
			
			, moveShip: function (toX, toY)
				{
					var ship = this.sprite
						, dest = new Phaser.Point(toX, toY)
								.subtract(ship.width * (2/3), ship.height * (2/3))
						;
					this.game.add.tween(this.sprite)
						.to({x: dest.x, y:dest.y},
								1000,
								Phaser.Easing.Linear.None)
						.start();
				}
			
			, startFloating: function ()
				{
					this.floating = this.game.add.tween(this.sprite)
					.to({y: this.sprite.y - 10}, 500)
					.to({y: this.sprite.y}, 500)
					.loop().start();
				}
			, stopFloating: function ()
				{
					this.floating
				}
			};
	
	AzK.Ship.sinusoidalInterpolation = function sinusoidalInterpolation (v, k)
	{};
});