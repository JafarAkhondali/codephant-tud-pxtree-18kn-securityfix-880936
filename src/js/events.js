namespace("PXTree.AchtzehnKnoten", function (AK)
{
	
	var Config = AK.Config.Events;
	
	/**
	 * 
	 */
	AK.Events = function Events (parentCtrl, dialogParent)
	{
		this.parent = parentCtrl;
		this.top = parentCtrl.top;
		this.game = parentCtrl.game;

		this._dialogQueue = [];
		this._dialogParent = null;
	};
	
	AK.Events.prototype.preload = function preload ()
	{
		this.game.load
				.image('wood', 'assets/wood.png')
				.spritesheet(
					'dialog-button', 'assets/dialog-button-8x8on24x8.png', 4, 16, 3)
				;
	};
	
	AK.Events.prototype.create = function create ()
	{
		this._dialogParent = this.game.add.group();
	};
	
	AK.Events.prototype.update = function update ()
	{};
	
	/**
	 * Run an event depending on the given information. When given tags the event
	 * is randomly picked among the events satisfying all tags.
	 * @param opts:Object This can either contain a specific event name as 'name'
	 * 		property or an series of tags given via 'tags' in form of an array or
	 * 		whitespace separated list.
	 */
	AK.Events.prototype.startEvent = function startEvent (opts)
	{
		var evt = null
			;
		if ('name' in opts)
			evt = this._selectEventByName(opts.name);
		else if ('tags' in opts)
			evt = this._selectEventByTags(opts.tags);
		else
			evt = opts;
		this._makeDialogFromTask(evt).show();
	};
	
	
	
	/**
	 * Generates a dialog according to the tasks 'type' property.
	 * 
	 * @todo This currently only generates 'SingleSelectDialog's.
	 */
	AK.Events.prototype._makeDialogFromTask = function _makeDialogFromTask (task)
	{
		var dial = new AK.Events.SingleSelectDialog(
					this.game, this._dialogParent)
			;
		dial.description(task.description);
		task.choices.forEach(function (choice, idx)
		{
			dial.choice(choice.label,
					(function () { this._resolveTask(task, idx); }).bind(this));
		}, this);
		return dial;
	};
	
	/**
	 * 
	 */
	AK.Events.prototype._resolveTask = function _resolveTask (task, idx)
	{
		var choice = task.choices[idx];

		if (choice.hasOwnProperty('outcome'))
			this._processOutcome(choice.outcome);

		if (choice.hasOwnProperty('choices'))
			this._makeDialogFromTask(choice).show();
	};
	
	/**
	 * 
	 */
	AK.Events.prototype._processOutcome = function _processOutcome (outcome)
	{
		var stat, newVal
			;
		for (stat in outcome) if (outcome.hasOwnProperty(stat))
		{
			newVal = this.top.stats.get(stat) + outcome[stat];
			this.top.stats.set(stat, newVal);
		}
	};
	
	/**
	 * @todo Implement proper Event selecting structures and algorithms
	 */
	AK.Events.prototype._selectEventByName = function _selectEventByName (name)
	{
		var found = null
			, i = -1
			, ev = null
			;
		while (!found && AK.Data.Events.length > ++i)
		{
			ev = AK.Data.Events[i];
			if (name === ev.name)
				found = ev;
		}
		return found;
	};
	
	/**
	 * @todo Implement proper Event selecting structures and algorithms
	 */
	AK.Events.prototype._selectEventByTags = function _selectEventByTags (tags)
	{
		var matching = []
			, selected = null
			, testTags = function (ev)
					{ return tags.every(function (t) { return ev.tags.indexOf(t) >= 0; }); }
			;
		AK.Data.Events.forEach(function(ev)
		{
			
			if (testTags(ev))
				matching.push(ev);
		}, this);
		if (0 < matching.length)
			selected = matching[Math.floor(matching.length * Math.random())];
		
		return selected;
	};



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

		this.displayObject.position.set(Config.Dialog.Margin, Config.Dialog.Margin);
		this.displayObject.add(this.game.make.tileSprite(
				0, 0, Config.Dialog.Width, Config.Dialog.Height, 'wood'));
		
		this.content.position.set(Config.Dialog.Padding, Config.Dialog.Padding);
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
		this._parent.removeChild(this.displayObject);
//		this.displayObject.destroy();
	};



	/**
	 * 
	 */
	AK.Events.SingleSelectDialog = function SingleSelectDialog (game, parent)
	{
		AK.Events.TaskDialog.call(this, game, parent);
		this._buttons = [];
		this.buttonPanel = this.game.make.group();
		this.descriptionPanel = this.game.make.group();
		
		this.content.add(this.descriptionPanel);
		this.content.add(this.buttonPanel);
		
		this.buttonPanel.y = Config.Dialog.Height - 2 * Config.Dialog.Padding ;
	};
	
	AK.Events.SingleSelectDialog.prototype =
			on(Object.create(AK.Events.TaskDialog.prototype), function (def)
			{
				/**
				 * Adds a new choice/button to the dialog.
				 * @param label:string Descriptive text for the choice.
				 * @param callback:Function Called when the corresponding choice is selected.
				 * @returns this For chaining.
				 */
				def.choice = function choice (label, callback)
				{
					var dialog = this
						, btn = this.game.make.group()
						, marker = this.game.make.sprite(0, 0, "dialog-button", 0)
						, text = this.game.make.text(
								Config.Button.LabelOffset.x, Config.Button.LabelOffset.y,
								label, Object.create(Config.Button.TextStyle))
						, clickHandler = function ()
								{ dialog.destroy(); callback(); }
						, mouseInHandler = function ()
								{
									text.fill = Config.Button.HoverTextStyle.fill;
									marker.frame = 1;
								}
						, mouseOutHandler = function ()
								{
									text.fill = Config.Button.TextStyle.fill;
									marker.frame = 0;
								}
						;

					//setup input handlers
					text.inputEnabled = true;
					text.events.onInputOver.add(mouseInHandler);
					text.events.onInputOut.add(mouseOutHandler);
					text.events.onInputDown.add(clickHandler);
					
					//put all in place
					marker.y = .5 * (Config.Button.Height - marker.height);
					btn.add(marker);

					text.y = .5 * (Config.Button.Height - text.height);
					btn.add(text);

					btn.position.set(
							0, this._buttons.length * (Config.Button.Height + Config.Button.Spacing));
					this.buttonPanel.y -= (Config.Button.Height + Config.Button.Spacing);
					this.buttonPanel.add(btn);
					this._buttons.push(btn);
					return this;
				};
				
				/**
				 * Sets the descriptions text to the given content.
				 * @param description:string The text shown in the selection dialog.
				 * @returns this
				 */
				def.description = function description (desc)
				{
					var text = this.game.make.text(
								0, 0, desc, Config.Description.TextStyle)
						, c
						;
					text.x = .5 * (Config.Description.TextStyle.wordWrapWidth - text.width);
					if ((c = this.descriptionPanel.getAt(0)) !== -1)
							this.descriptionPanel.remove(c, true);
					this.descriptionPanel.add(text);
					
					return this;
				};
				
				return def;
			});
});