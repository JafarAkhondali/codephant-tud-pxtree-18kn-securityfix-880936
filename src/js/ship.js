
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Ship = function Ship (game)
	{
		this.game = game;
		this.sprite = null;
		this.model = {speed: 0.1};
		this.idling = null;
		this.currentTween = null;
		this.yOffset = { v: 0, up: true };
	};
	
	AzK.Ship.prototype =
			{ preload: function ()
				{
					this.game.load.image('ship', 'assets/schiff-64x64-2x.png');
				}
	
			, create: function ()
				{
					this.sprite = this.game.make.sprite(0, 0, 'ship');
					this.game.world.add(this.sprite);
					this.idle();
				}
			
			, update: function ()
				{
				}
			
			, move: function (toPort, withoutTween)
				{
					var ship = this.sprite
						, dest = new Phaser.Point(toPort.x, toPort.y)
								.subtract(ship.width * (3/4), ship.height * (3/4))
						, tween
						;
					this.currentTween && this.currentTween.stop();
					if (withoutTween)
					{
						this.sprite.position.copyFrom(dest);
					}
					else
					{
						tween = this.game.add.tween(this.sprite);
						this.currentTween = tween;
						
						tween.to({x: dest.x, y:dest.y},
								dest.distance({x:toPort.x, y:toPort.y}) / this.model.speed,
								Phaser.Easing.Quadratic.InOut);
						tween.onComplete.add(function(){ this.idle(); }, this);
						tween.start();
					}
					
					this.idling = false;
				}
			
			, idle: function ()
				{
					this.idling = true;
				}
			};
});