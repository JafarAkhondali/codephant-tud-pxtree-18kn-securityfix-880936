namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.Events;
	
	/**
	 * This Dialog type allows the user to select one of a range of choices.
	 * To this end it displays a descriptive text concerning the object of the choice
	 * and lists the options at the lower end of the dialog.
	 */
	AK.Events.SingleSelectDialog = function SingleSelectDialog (game, parent)
	{
		AK.Events.TaskDialog.call(this, game, parent);
		this._buttons = [];
		this.buttonPanel = this.game.make.group();
		this.descriptionPanel = this.game.make.group();
		
		this.content.add(this.descriptionPanel);
		this.content.add(this.buttonPanel);
		
		this.buttonPanel.position.set(
				Config.Button.PanelOffset[0], Config.Button.PanelOffset[1]);
		
		this._btnFactory = TextButtonFactory(this.game,
				{ key: 'eventbox-btn'
				, normalStyle: Config.Button.TextStyle
				, overStyle: Config.Button.HoverTextStyle
				, normalFrame: 0
				, overFrame: 1
				, textOffset: Config.Button.LabelOffset
				, textAlign: [0, .5]
				});
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
				def.choice = function choice (label, callback, callbackContext)
				{
					var btn = this._btnFactory.create(label)
						;
					
					btn.onInputUp.add(this.destroy, this);
					btn.onInputUp.add(callback, callbackContext);
					
					btn.position.set(
							0, this._buttons.length * (Config.Button.Height + Config.Button.Spacing));
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
					text.position.set(Config.Description.Offset[0], Config.Description.Offset[1]);
					text.x = Math.floor((Config.Dialog.Width - text.width) / 2);
					if ((c = this.descriptionPanel.getAt(0)) !== -1)
							this.descriptionPanel.remove(c, true);
					this.descriptionPanel.add(text);
					
					return this;
				};
				
				return def;
			});
});
