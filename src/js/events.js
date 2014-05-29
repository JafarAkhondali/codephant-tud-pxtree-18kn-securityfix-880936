namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var ButtonTextStyle = { fill:'white', font:'normal 12pt sans-serif' }
		;
	
	/**
	 * 
	 */
	AK.Events = function Events (parentCtrl, dialogParent)
	{
		this.parent = parentCtrl;
		this.game = parentCtrl.game;

		this._dialogQueue = [];
		this._dialogParent = null;
		this._currentDialog = null;
	};
	
	AK.Events.prototype.preload = function preload ()
	{
		on(this.game.load, function (load)
		{
			load.image('wood', 'assets/wood.png');
			load.image('dialog-button', 'assets/board-decorated-256x64-2x.png');
		});
	};
	
	AK.Events.prototype.create = function create ()
	{
		this._dialogParent = this.game.add.group();
		this._dialogParent.position.set(10,10);
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
	};
	
	/**
	 * 
	 */
	AK.Events.Dialog = function Dialog (game, bounds, parent)
	{
		this.game = game;
		this.bounds = bounds;
		this.content = this.game.make.group();
		this.displayObject = this.game.make.group();
		this._parent = parent;
		
		this.displayObject.visible = false;

		this.displayObject.position.set(bounds.x, bounds.y);
		this.displayObject.add(this.game.make.tileSprite(
				0, 0, bounds.width, bounds.height, 'wood'));
		
		this.content.position.set(10, 10);
		this.displayObject.add(this.content);
		
		this._parent.add(this.displayObject);
	};
	
	AK.Events.Dialog.prototype.show = function show ()
	{
		this.displayObject.visible = true;
	};
	
	AK.Events.Dialog.prototype.hide = function hide ()
	{
		this.displayObject.visible = false;
	};
	
	AK.Events.Dialog.prototype.destroy = function destroy ()
	{
		this.hide();
		this._parent.removeChild(this.displayObject);
	};
	
	/**
	 * 
	 */
	AK.Events.SingleSelectDialog = function SingleSelectDialog (game, bounds, parent)
	{
		AK.Events.Dialog.call(this, game, bounds, parent);
		this._buttons = [];
		this.buttonPanel = this.game.make.group();
		this.descriptionPanel = this.game.make.group();
		
		this.content.add(this.descriptionPanel);
		this.content.add(this.buttonPanel);
		
		this.buttonPanel.y = this.bounds.height - 20;
	};
	
	AK.Events.SingleSelectDialog.prototype =
			on(Object.create(AK.Events.Dialog.prototype), function (def)
			{
				/**
				 * Adds a new choice/button to the dialog.
				 * @param label:string Descriptive text for the choice.
				 * @param callback:Function Called when the corresponding choice is selected.
				 * @returns this For chaining.
				 */
				def.choice = function choice (label, callback)
				{
					var btn = this.game.make.button(
								.5 * (this.bounds - 256),
								this._buttons.length * 64,
								'dialog-button',
								callback)
						, text = this.game.make.text(20, 0, label, ButtonTextStyle)
						;
					text.wordWrap = true;
					text.wordWrapWidth = 236;
					btn.addChild(text);
					text.y = .5 * (64-text.height);
					this.buttonPanel.y -= 64;
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
					var text = this.game.make.text(0, 0, desc, ButtonTextStyle)
						, c
						;
					text.wordWrap = true;
					text.wordWrapWidth = this.bounds.width - 20;
					if ((c = this.descriptionPanel.getAt(0)) !== -1)
							this.descriptionPanel.remove(c, true);
					this.descriptionPanel.add(text);
					
					return this;
				};
				
				return def;
			});
});