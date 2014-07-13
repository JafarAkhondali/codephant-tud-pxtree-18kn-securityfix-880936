namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.Events;
	
	/**
	 * This is the base class for any dialog, that provides exercises to the player.
	 */
	function TaskDialog (game, parent)
	{
		this.game = game;
		this.content = this.game.make.group();
		this.displayObject = this.game.make.group();
		this._parent = parent;
		this._picture = null
		
		this.displayObject.visible = false;

		this.displayObject.position.set(Config.Dialog.Margin[0], Config.Dialog.Margin[1]);
		this.displayObject.add(this.game.make.sprite(0, 0, 'eventbox-bg'));
		
		this.content.position.set(0, 0);
		this.displayObject.add(this.content);

		this._parent.add(this.displayObject);
	};
	AK.Events.TaskDialog = TaskDialog;
	
	TaskDialog.prototype.show = function show ()
	{
		this.displayObject.visible = true;
	};
	
	TaskDialog.prototype.hide = function hide ()
	{
		this.displayObject.visible = false;
	};
	
	TaskDialog.prototype.destroy = function destroy ()
	{
		this.hide();
		this.displayObject.destroy();
	};

	TaskDialog.prototype.picture = function picture (key)
	{
		if (arguments.length === 0)
		{
			if (typeof(this._picture) === 'string')
			{
				this._picture = this.game.make.sprite(0, 0, this._picture);
				this._picture.position.copyFrom(Config.Picture.Offset);
			}
			return this._picture;
		}
		else
		{
			this._picture = key;
			return this;
		}
	};
});
