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
				.image('wood', 'assets/textures/wood.jpg')
				.image('eventbox-bg', 'assets/ui/ui-eventbox.png')
				.image('eventbox-btn', 'assets/ui/ui-eventbox-button.png')
				.spritesheet(
					'dialog-button', 'assets/ui/ui-eventbox-button.png', 4, 16, 3)
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

		this._processOutcome(Config.MoveCosts);
		this._makeDialogFromTask(evt).show();
	};
	
	
	
	/**
	 * Generates a dialog according to the tasks 'type' property.
	 * 
	 * @todo This currently only generates 'SingleSelectDialog's.
	 */
	AK.Events.prototype._makeDialogFromTask = function _makeDialogFromTask (task)
	{
		var dial = null
			;
		if ('choices' in task) //SingleSelection
		{
			dial = new AK.Events.SingleSelectDialog(this.game, this._dialogParent);
			dial.description(task.description);
			task.choices.forEach(function (choice, idx)
			{
				dial.choice(choice.label,
						(function () { this._resolveTask(task, idx); }).bind(this));
			}, this);
		}
		else if ('description' in task) //Message
		{
			dial = new AK.Events.MessageDialog(this.game, this._dialogParent);
			dial.message(task.description);
		}
		return dial;
	};
	
	/**
	 * 
	 */
	AK.Events.prototype._resolveTask = function _resolveTask (task, idx)
	{
		var choice = task.choices[idx]
			, dial = null
			;

		if (choice.hasOwnProperty('outcome'))
			this._processOutcome(choice.outcome);

		
		dial = this._makeDialogFromTask(choice);
		if (dial) dial.show();
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
					{ return ev.tags.every(function (t) { return tags.indexOf(t) >= 0; }); }
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
