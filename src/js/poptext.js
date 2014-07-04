
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.PopText
		;

	/**
	 * This interface element is a specially highlighted text, that performs a
	 * slide-and-fade animation once shown. These can be chained together to
	 * achieve multiple messages popping up one after another.
	 *
	 * After the animation is complete and the text faded, it destroys itself.
	 *
	 * Note, that this is a factory constructor, which must be called without 'new'.
	 * @param game:Phaser.Game
	 * @param x:number start x coordinate
	 * @param y:number start y coordinate
	 * @param text:string
	 * @param style:object Text style.
	 * @return self:PopText The newly created PopText instance.
	 */
	function PopText (game, x, y, text, style, options)
	{
		var self = Object.create(PopText.prototype);
		Phaser.Text.call(self, game, x, y, text, style);

		/**
		 * The next PopText in the chain.
		 * @property _next:PopText=null
		 */
		self._next = null;
		/**
		 * A reference to the last chained PopText for easy access.
		 */
		self._last = null;

		/**
		 *
		 */
		self._options = extend(Object.create(Config.Defaults), options || {});

		/**
		 *
		 */
		self._former = {x: x, y: y, parent: null, game: null};

		//make it invisible until popped.
		self.visible = false;
		return self;
	};

	PopText.prototype = derive(Phaser.Text,
	/**
	 * Start the pop animation and the pop chain. Once this is called, no further
	 * chaining to this is allowed.
	 * @returns this:PopText
	 */
	{ pop: function ()
		{
			//this._last = null;
			this.visible = true;
			this.game.add.tween(this)
					.to(
						{ y: this.y - this._options.difference, alpha: 0 },
						this._options.duration,
						this._options.easing)
					.start()
					.onComplete.add(this.destroy, this);

			//
			var timer = this.game.time.create(true);
			timer.add(this._options.delay, this._popNext, this);
			timer.start();
			return this;
		}
	/**
	 * Creates and appends a new pop-text to the end of the chain. However, this
	 * will not be possible, once the popping on the chain is started.
	 * @param text:string Same as the contructors text parameter. @see PopText
	 * @param style:object Same as the contructors style parameter. If this is not
	 *		given, the style of this pop-text is used. @see PopText
	 * @returns this:PopText
	 */
	, chain: function (text, style)
		{
			var nextPopped = this._next === true;
				;
			if (this._next === null || nextPopped)
			{
				this._next = this._last = PopText(
						this.game || this._former.game, this._former.x, this._former.y,
						 text, style || this.style);
				if (nextPopped)
				{
					this._popNext();
				}
			}
			else
			{
				this._last.chain(text, style);
				this._last._last = null; //last is not needed on not chain heads
				this._last = this._last._next;
			}
			return this;
		}

	/**
	 *
	 */
	, destroy: function (destroyChildren)
		{
			this._former.parent = this.parent;
			this._former.game = this.game;
			Phaser.Text.prototype.destroy.apply(this, arguments); 
		}

	/**
	 * Append the next pop-text in chain to the same parent and trigger the popping.
	 */
	, _popNext: function ()
		{
			if (this._next !== null)
			{
				(this.parent || this._former.parent).add(this._next);
				this._next.pop();
			}
			else
			{
				this._next = true;
			}
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
