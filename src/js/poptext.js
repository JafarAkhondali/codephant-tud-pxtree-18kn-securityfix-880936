
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.PopText
		;

	function PopText (game, x, y, text, style)
	{
		var self = Object.create(PopText.prototype);
		Phaser.Text.call(self, game, x, y, text, style);
		self.visible = false;
		self._next = null;
		self._last = null;
		return self;
	};

	PopText.prototype = derive(Phaser.Text,
	{ pop: function ()
		{
			this._last = null;
			this.visible = true;
			this.game.add.tween(this)
					.to(
						{ y: this.y - Config.Distance, alpha: 0 },
						Config.Duration,
						Config.Easing)
					.start()
					.onComplete.add(this.destroy, this);
			if (this._next)
			{
				var timer = this.game.time.create(true);
				timer.add(Config.SingleDelay, this._popNext, this);
				timer.start();
			}
		}
	, next: function (text, style)
		{
			var popt = PopText(
						this.game, this.position.x, this.position.y,
						text, style || this.style)
				;
			if (this._last)
			{
				this._last._next = popt;
				this._last = popt;
			}
			else if (!this._next)
			{
				this._last = this._next = popt;
			}
			
			return this;
		}
	, _popNext: function ()
		{
			this.parent.add(this._next);
			this._next.pop();
		}
	});

	//patch the Phaser factories
	Phaser.GameObjectCreator.prototype.popText = function (x, y, text, style)
	{
		return PopText(this.game, x, y, text, style);
	};
	
	Phaser.GameObjectFactory.prototype.popText = function (x, y, text, style, group)
	{
		if (typeof group === 'undefined') { group = this.world; }
		return group.add(PopText(this.game, x, y, text, style));
	};

	//publish
	AK.PopText = PopText;
	
});
