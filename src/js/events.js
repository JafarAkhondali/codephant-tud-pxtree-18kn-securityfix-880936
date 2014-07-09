namespace("PXTree.AchtzehnKnoten", function (AK)
{ "use strict";
	
	var Config = AK.Config.Events;
	
	/**
	 * 
	 */
	AK.Events = function Events (parentCtrl)
	{
		this.parent = parentCtrl;
		this.top = parentCtrl.top;
		this.game = parentCtrl.game;

		this._dialogQueue = [];
		this._dialogParent = null;
		this._popTextParent = null;
		this._afterEvent = new Phaser.Signal();
		this._afterEvent.memorize = true;
		this._afterEvent.dispatch();

		AK.Events.button = TextButtonFactory(this.game,
				{ key: 'eventbox-btn'
				, normalStyle: Config.Button.TextStyle
				, overStyle: Config.Button.HoverTextStyle
				, normalFrame: 0
				, overFrame: 1
				, textOffset: Config.Button.LabelOffset
				, textAlign: [0, .5]
				});
	};

	AK.Events.button = null;

	on(AK.Events, function (def)
	{
		def._inferType = function (task)
		{
			if ('type' in task) { return; }
			else if ('choices' in task) //SingleSelection
			{
				task.type = "single-select";
			}
			else if ('description' in task) //Message
			{
				task.type = "message";
			}
			else throw new TypeError('Could not figure out task\'s type: ' + JSON.stringify(def));
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
			this._popTextParent = this.game.add.group();
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
			if (typeof(opts) === 'object' && opts !== null)
			{
				if ('name' in opts)
					evt = this._selectEventByName(opts.name);
				else if ('tags' in opts)
					evt = this._selectEventByTags(opts.tags);
				else
					evt = opts;
			}

			if (!evt)
			{
				console.log("events: falling back due to failed event selection at event start.");
				evt = this._selectFallbackEvent();
			}

				this._processOutcome(Config.MoveCosts);

			try
			{
				AK.Events._inferType(evt);
				this.top.taskLog.startEvent(evt);
				this._afterEvent.forget();
				this._makeDialogFromTask(evt).show();
			}
			catch(err)
			{
				if (err instanceof TypeError)
				{
					console.log("events: falling back due to failed type inference.");
					this.startEvent(this._selectFallbackEvent());
				}
				else throw err;
			}
			
		};

		/**
		 * Add a listener which will be fire either immediately when no event is running
		 */
		def.afterCurrentEvent = function (callback, context)
		{
			return this._afterEvent.addOnce(callback, context);
		};
		
		
		/**
		 * Generates a dialog according to the tasks 'type' property.
		 * 
		 * @todo This currently only generates 'SingleSelectDialog's.
		 */
		def._makeDialogFromTask = function _makeDialogFromTask (task)
		{
			var dialogName = AK.Events.hyphenizedToUpperCamelCase(task.type)
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
						function () { this._resolveTask(task, idx); }, this);
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

			dial.ok(function () { this._resolveTask(task, dial.order); }, this);
			
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
				try
				{
					AK.Events._inferType(nextTask);
					this.top.taskLog.startTask(nextTask);
					this._makeDialogFromTask(nextTask).show();
				}
				catch(err)
				{
					if (err instanceof TypeError)
					{
						this.top.taskLog.completeEvent();
						this._afterEvent.dispatch(); }
					else throw err;
				}
			}
			else
			{
				this.top.taskLog.completeEvent();
				this._afterEvent.dispatch();
			}

		};

		/**
		 *
		 */
		def._resolveMessageTask = function (task)
		{
			this.top.taskLog.completeTask(true);
			if (task.hasOwnProperty('ok') && task.ok.hasOwnProperty('outcome'))
				this._processOutcome(task.ok.outcome);

			return task.hasOwnProperty('ok') ? task.ok : null;
		};

		/**
		 *
		 */
		def._resolveSingleSelectTask = function (task, idx)
		{
			var choice = task.choices[idx]
				;
			this.top.taskLog.completeTask(idx);

			if (choice.hasOwnProperty('outcome'))
				this._processOutcome(choice.outcome);

			
			return choice;
		};

		/**
		 *
		 */
		def._resolveDragToOrderTask = function (task, order)
		{
			var correctOrder = task.order
				, isCorrect = order.length === correctOrder.length
				, next = null
				, i
				;
			if (isCorrect)
				for (i = 0; i < correctOrder.length; i++)
				{
					isCorrect = order[i] === correctOrder[i]
					if (!isCorrect) break;
				}

			this.top.taskLog.completeTask(order);

			next = task[isCorrect ? "correct" : "wrong"];
			this._processOutcome(next.outcome);
			return next;
		};
		
		/**
		 * 
		 */
		def._processOutcome = function _processOutcome (outcome)
		{
			var stat, statDiff, delay = 0
				, poptext = null
				, text, style
				;
			for (stat in outcome) if (outcome.hasOwnProperty(stat))
			{
				statDiff = outcome[stat];
				if (statDiff instanceof Array)
				{
					statDiff = Math.floor(Math.random() * (statDiff[1] - statDiff[0] + 1) + statDiff[0]);
				}
				if (statDiff !== 0)
				{
					text = Config.StatLabels[stat] + ' ' + ((statDiff < 0) ? '' : '+') + statDiff;
					style = Config.PopStyles[(statDiff < 0) ? 'malus' : 'bonus'];
					
					this.top.stats.set(stat, this.top.stats.get(stat) + statDiff);
					if (poptext)
						poptext.chain(text, style);
					else
						poptext = this.game.add.popText(
								this.game.input.mousePointer.x + 20,
								this.game.input.mousePointer.y + 20,
								text, style, this._popTextParent);
				}
			}

			if (poptext) poptext.pop();
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
			if (!found)
			{
				console.log("events: falling back due to missing named event ("
						+ name + ").");
				found = this._selectFallbackEvent();
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
				, containedInTags = function (t) { return tags.indexOf(t) >= 0; }
				, suitableEvents = function (ev)
						{
							return ('tags' in ev) //events without tags are not suitable for selection by tags
									&& !this.top.taskLog.isInEventNameCache(ev.name) //don't select events that have been run recently
									&& ev.tags.every(containedInTags); //are the event's tags a subset of the search tags
						}
				;
			matching = AK.Data.Events.filter(suitableEvents, this);
			if (0 < matching.length)
				selected = matching[Math.floor(matching.length * Math.random())];

			if (!selected)
			{
				console.log("events: falling back due to failed tag ("
						+ tags.join(', ')
						+ ") matching.");
				selected = this._selectFallbackEvent();
			}
			return selected;
		};

		/**
		 * Randomly select one of the events which bear the tag 'fallback'.
		 * This ignores the task-log.
		 */
		def._selectFallbackEvent = function _selectFallbackEvent ()
		{
			var filter = null //TODO !!!
				, matching = AK.Data.Events.filter(__filterFallbackEvents)
				, selected = matching[Math.floor(matching.length * Math.random())]
				;
			return selected;
		};
		/**
		 * Helper function which provides the filter condition for fallback events.
		 */
		function __filterFallbackEvents (ev)
		{ return ('tags' in ev) && ev.tags.indexOf('fallback') >= 0; }
	});
});
