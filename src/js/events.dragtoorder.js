namespace("PXTree.AchtzehnKnoten", function(AK)
{ "use strict";

	var Config = AK.Config.Events;
	
	function DragToOrderDialog (game, parent, itemType)
	{
		AK.Events.TaskDialog.call(this, game, parent);
		this.itemType = itemType;
		this.item = this[DragToOrderDialog._itemDispatcher[this.itemType]];
		
		this.descriptionPanel = this.game.make.group();
		this.content.add(this.descriptionPanel);
		
		this.dragPool = this.game.make.group();
		this.content.add(this.dragPool);
		this.dragPool.position.set(25, 25);
		
		this.dropPool = this.game.make.group();
		this.content.add(this.dropPool);
		this.dropPool.position.set(25, 300);
		
		this._resetPlaceData();
		this._dragObjectData = [];

		this._okBtn = AK.Events.button.create(Config.Button.DefaultLabel, this.destroy, this);
		this.content.add(this._okBtn);
		this._okBtn.position.set(14, Config.Dialog.Height - 10);

		var resetBtn = AK.Events.button.create(Config.Drag.ResetLabel, this._resetDragItems, this);
		this.content.add(resetBtn);
		resetBtn.position.set(14, Config.Dialog.Height - 40);

		this.order = [];
	};
	
	DragToOrderDialog._itemDispatcher =
			{ word: "itemWord"
			, sprite: "itemSprite"
			};
	
	DragToOrderDialog.prototype = Object.create(AK.Events.TaskDialog.prototype);
	on(DragToOrderDialog.prototype, function(def)
	{
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
		
		/**
		 * 
		 */
		def.item = function item ()
		{
			return this[DragToOrderDialog._itemDispatcher[this.itemType]].apply(this, arguments);
		};
		
		/**
		 * 
		 */
		def.itemWord = function itemWord (itemName, text)
		{
			var label = this.game.make.text(0, 0, text, Config.Drag.TextStyle)
				, data =
						{ origin: { x: 0, y: 0 }
						, object: label
						, name: itemName
						}
				;
			this._placeDragItem(label);
			label.position.copyTo(data.origin);
			label._dragItemName = itemName;
			this._dragObjectData[itemName] = data;
			label.inputEnabled = true;
			label.input.enableDrag();
			label.events.onDragStop.add(this._dragStopHandler, this);
			return this;
		};
		
		/**
		 * 
		 */
		def.itemSprite = function itemSprite (itemName, spriteKey)
		{
			return this;
		};

		/**
		 *
		 */
		def.ok = function ok (okHandler, okContext)
		{
			this._okBtn.onInputUp.add(okHandler, okContext);
			return this;
		};

		/**
		 *
		 */
		def._resetPlaceData = function ()
		{
			this._nextDragPos = new Phaser.Point();
			this._nextDropPos = new Phaser.Point();
			this._nextDragLineYOffset = 0;
			this._nextDropLineYOffset = 0;
		};
		
		/**
		 * 
		 */
		def._placeDragItem = function (sprite)
		{
			// reset the line if we reach the end with this sprite
			if(sprite.width > 388 - this._nextDragPos.x)
			{
				this._nextDragPos.y += this._nextDragLineYOffset + 5;
				this._nextDragPos.x = 0;
				this._nextDragLineYOffset = 0;
			}
			
			sprite.position.set(this._nextDragPos.x, this._nextDragPos.y);
			this.dragPool.add(sprite);
			this._nextDragPos.x += sprite.width + 5;
			
			// adjust line offset if needed
			if (sprite.height > this._nextDragLineYOffset)
				this._nextDragLineYOffset = sprite.height;
		};
		
		/**
		 * 
		 */
		def._placeDropItem = function (sprite)
		{
			// reset the line if we reach the end with this sprite
			if(sprite.width > 388 - this._nextDropPos.x)
			{
				this._nextDropPos.y += this._nextDropLineYOffset + 5;
				this._nextDropPos.x = 0;
				this._nextDropLineYOffset = 0;
			}
			
			sprite.position.set(this._nextDropPos.x, this._nextDropPos.y);
			this.dropPool.add(sprite);
			this._nextDropPos.x += sprite.width + 5;
			
			// adjust line offset if needed
			if (sprite.height > this._nextDropLineYOffset)
				this._nextDropLineYOffset = sprite.height;
		};

		/**
		 *
		 */
		def._resetDragItems = function ()
		{
			var name, data
				;
			this.dragPool.removeAll();
			this.dropPool.removeAll();
			this._resetPlaceData();
			for (name in this._dragObjectData) if (this._dragObjectData.hasOwnProperty(name))
			{
				data = this._dragObjectData[name];
				this._placeDragItem(data.object);
				data.object.position.copyFrom(data.origin);
				data.object.input.enableDrag();
			}
		};

		/**
		 * 
		 */
		def._dragStopHandler = function (item)
		{
			if (item.y > Config.Drag.Threshold)
			{
				this._placeDropItem(item);
				item.input.disableDrag();
				this.order.push(item._dragItemName);
			}
			else
			{
				item.position.copyFrom(this._dragObjectData[item._dragItemName].origin);
			}
			
		};
	});

	AK.Events.DragToOrderDialog = DragToOrderDialog;
});
