
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Ship = function Ship (sea)
	{
		this.parent = sea;
		this.sea = sea;
		this.top = sea.top;
		this.game = sea.game;
		this.sprite = null;
		this.model = {speed: 0.2};
		this.yOffset = { v: 0, up: true };
		this.idling = true;
		this._coordDelta = new Phaser.Point();
	};
	
	AzK.Ship.prototype =
			{ FLOAT_SPEED_FACTOR: 2.5
			
			, preload: function ()
				{
					this.game.load.image('ship', 'assets/schiff-64x64-2x.png');
				}
	
			, create: function ()
				{
					this.sprite = this.game.add.sprite(0, 0, 'ship');
					this._coordDelta.set(
							this.sprite.width * (4/5),
							this.sprite.height * (4/5));
				}
			
			, update: function ()
				{
					this._floatStep();
				}
			
			, move: function (toPort, instantOrCallback, callbackContext)
				{
					var dest = new Phaser.Point.subtract(toPort, this._coordDelta)
						, instant = instantOrCallback === true
						, callback = instantOrCallback instanceof Function
								? instantOrCallback : null
						, tween
						;
					
					if (instant)
						this.sprite.position.copyFrom(dest);
					else
					{
						this.idling = false;
						tween = this.game.add.tween(this.sprite)
								.to(dest,
									this.sprite.position.distance(dest) / this.model.speed,
										Phaser.Easing.Quadratic.InOut);
						tween.onComplete.add(function(){ this.idling = true; }, this);
						if (callback) tween.onComplete.add(callback, callbackContext);
						tween.start();
					}
				}
			

			, _floatStep: function ()
				{
					//the floating motion is reverse after sqrt(16)=4 pixels.
					if (this.yOffset.v * this.yOffset.v >= 16)
						this.yOffset.up = !this.yOffset.up;
					
					if (this.yOffset.up)
					{
						this.yOffset.v += this.FLOAT_SPEED_FACTOR * this.model.speed;
						this.sprite.y -= this.FLOAT_SPEED_FACTOR * this.model.speed;
					}
					else
					{
						this.yOffset.v -= this.FLOAT_SPEED_FACTOR * this.model.speed;
						this.sprite.y += this.FLOAT_SPEED_FACTOR * this.model.speed;
					}
				}
			};
});