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

	on(AK.Events, function (def)
	{
		def._inferType = function (task)
		{
			if ('choices' in task) //SingleSelection
			{
				task.type = "single-select";
			}
			else if ('description' in task) //Message
			{
				task.type = "message";
			}
		}

		def.hyphenizedToUpperCamelCase = function (str)
		{
			return str.replace(/(^|-)[a-z]/g, def._lastCharUp);
		};

		def._lastCharUp = function (str) { return str[str.length-1].toUpperCase(); };
	});
	
	on(AK.Events.prototype, function (def)
	{
		def.preload = function preload ()
		{
			this.game.load
					.image('wood', 'assets/textures/wood.jpg')
					.image('eventbox-bg', 'assets/ui/ui-eventbox.png')
					//.image('eventbox-btn', 'assets/ui/ui-eventbox-button.png')
					.spritesheet(
						'eventbox-btn', 'assets/ui/ui-eventbox-button.png', 386, 28)
					;
		};
		
		def.create = function create ()
		{
			this._dialogParent = this.game.add.group();
		};
		
		def.update = function update ()
		{};
		
		/**
		 * Run an event depending on the given information. When given tags the event
		 * is randomly picked among the events satisfying all tags.
		 * @param opts:Object This can either contain a specific event name as 'name'
		 * 		property or an series of tags given via 'tags' in form of an array or
		 * 		whitespace separated list.
		 */
		def.startEvent = function startEvent (opts)
		{
			var evt = null
				;
			if ('name' in opts)
				evt = this._selectEventByName(opts.name);
			else if ('tags' in opts)
				evt = this._selectEventByTags(opts.tags);
			else
				evt = opts;
			this._processOutcome(Config.MoveCosts);
			this._makeDialogFromTask(evt).show();
		};
		
		
		
		/**
		 * Generates a dialog according to the tasks 'type' property.
		 * 
		 * @todo This currently only generates 'SingleSelectDialog's.
		 */
		def._makeDialogFromTask = function _makeDialogFromTask (task)
		{
			// infer type if not present. NOTE: this will soon be removed!
			if (!('type' in task))
			{
				AK.Events._inferType(task);
			}
			if (!("type" in task)) return null;
			
			var dial = null
				, dialogName = AK.Events.hyphenizedToUpperCamelCase(task.type)
				, makeFuncName = "_make" + dialogName + "Dialog";
				;
			
			return this[makeFuncName](task);
		};
		
		/**
		 * 
		 */
		def._makeMessageDialog = function (task)
		{
			var dial = new AK.Events.MessageDialog(this.game, this._dialogParent);
			dial.message(task.description);
			dial.ok(function ()
			{
				this._resolveTask(task);
			}, this);
			return dial;
		};
		
		/**
		 * 
		 */
		def._makeSingleSelectDialog = function (task)
		{
			var dial = new AK.Events.SingleSelectDialog(this.game, this._dialogParent);
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
		def._makeDragToOrderDialog = function (task)
		{
			var dial = new AK.Events.DragToOrderDialog(this.game, this._dialogParent, task.itemType)
				, iname, item
				;
			dial.description(task.description);
			for (iname in task.items)
			{
				item = task.items[iname];
				dial.item(iname, item);
			}
			
			return dial;
		};
		
		/**
		 * 
		 */
		def._resolveTask = function _resolveTask (task)
		{
			if (!('type' in task))
			{
				AK.Events._inferType(task);
			}
			
			var taskName = AK.Events.hyphenizedToUpperCamelCase(task.type)
				, funcName = "_resolve" + taskName + "Task"
				, nextTask = null
				;

			nextTask = this[funcName].apply(this, arguments);
			if (nextTask)
			{
				dial = this._makeDialogFromTask(nextTask);
				if (dial) dial.show();
			}

		};

		/**
		 *
		 */
		def._resolveMessageTask = function (task)
		{
			if (task.hasOwnProperty('outcome'))
				this._processOutcome(task.ok.outcome);

			return task.ok || null;
		};

		/**
		 *
		 */
		def._resolveSingleSelectTask = function (task, idx)
		{
			var choice = task.choices[idx]
				;

			if (choice.hasOwnProperty('outcome'))
				this._processOutcome(choice.outcome);

			
			return choice;
		};

		/**
		 *
		 */
		def._resolveDragToOrderTask = function (task, order)
		{
			//TODO
		};
		
		/**
		 * 
		 */
		def._processOutcome = function _processOutcome (outcome)
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
		def._selectEventByName = function _selectEventByName (name)
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
		def._selectEventByTags = function _selectEventByTags (tags)
		{
			var matching = []
				, selected = null
				, testTags = function (ev)
						{
							if (!('tags' in ev)) return false;
							return tags.every(function (t) { return ev.tags.indexOf(t) >= 0; });
							return ev.tags.every(function (t) { return tags.indexOf(t) >= 0; });
						}
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
	});

});
