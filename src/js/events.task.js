namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.Events;
	
	/**
	 * This is the base class for any dialog, that provides exercises to the player.
	 */
	AK.Events.TaskDialog = function TaskDialog (game, parent)
	{
		this.game = game;
		this.content = this.game.make.group();
		this.displayObject = this.game.make.group();
		this._parent = parent;
		
		this.displayObject.visible = false;

		this.displayObject.position.set(Config.Dialog.Margin[0], Config.Dialog.Margin[1]);
		this.displayObject.add(this.game.make.sprite(0, 0, 'eventbox-bg'));
		
		this.content.position.set(0, 0);
		this.displayObject.add(this.content);
		
		this._parent.add(this.displayObject);
	};
	
	AK.Events.TaskDialog.prototype.show = function show ()
	{
		this.displayObject.visible = true;
	};
	
	AK.Events.TaskDialog.prototype.hide = function hide ()
	{
		this.displayObject.visible = false;
	};
	
	AK.Events.TaskDialog.prototype.destroy = function destroy ()
	{
		this.hide();
//		this._parent.removeChild(this.displayObject);
		this.displayObject.destroy();
	};
	
	AK.Events.TaskDialog.prototype.makeButton = function makeButton (labelText, clickHandler)
	{
		var btn = this.game.make.group()
			, bg = this.game.make.sprite(0, 0, "eventbox-btn")
			, label = this.game.make.text(
					Config.Button.LabelOffset[0], Config.Button.LabelOffset[1],
					labelText, Object.create(Config.Button.TextStyle))
			, mouseInHandler = function ()
					{
						label.fill = Config.Button.HoverTextStyle.fill;
						bg.frame = 1;
					}
			, mouseOutHandler = function ()
					{
						label.fill = Config.Button.TextStyle.fill;
						bg.frame = 0;
					}
			;

			//setup input handlers
			label.inputEnabled = true;
			label.events.onInputOver.add(mouseInHandler);
			label.events.onInputOut.add(mouseOutHandler);
			if (clickHandler) label.events.onInputDown.add(clickHandler);
			
			bg.inputEnabled = true;
			if (clickHandler) bg.events.onInputDown.add(clickHandler);
			bg.events.onInputOver.add(mouseInHandler);
			bg.events.onInputOut.add(mouseOutHandler);
			
			//put all in place
			bg.y = .5 * (Config.Button.Height - bg.height);
			btn.add(bg);

			label.y = .5 * (Config.Button.Height - label.height);
			btn.add(label);
			
			btn.bg = bg;
			btn.label = label;
			return btn;
	};
});