namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.Events
		, Labels = AK.Config.Labels
		;
	
	/**
	 * Shows a message to the user and provides an OK-button to close.
	 */
	AK.Events.MessageDialog = function MessageDialog (game, parent)
	{
		AK.Events.TaskDialog.call(this, game, parent);
		this._okBtn = AK.Events.button.create(Labels.accept, this.destroy, this);
		this._message = this.game.make.text(
				Config.Description.Offset[0], Config.Description.Offset[1],
				"", Config.Description.TextStyle);
		this._okBtn.position.set(
				Config.Button.PanelOffset[0], Config.Button.PanelOffset[1]);
		
		this.content.add(this._message);
		this.content.add(this._okBtn);
	};
	
	AK.Events.MessageDialog.prototype =
			on(Object.create(AK.Events.TaskDialog.prototype), function (def)
			{
				def.message = function message (newText)
				{
					this._message.text = newText;
					
					return this;
				};
				
				def.ok = function ok (okHandler, okContext)
				{
					this._okBtn.onInputUp.add(okHandler, okContext);
					return this;
				};

				def.show = function ()
				{
					this.content.add(this.picture());
					return AK.Events.TaskDialog.prototype.show.call(this);
				};
				
				return def;
			});
});
