
namespace("PXTree.AchtzehnKnoten", function(AK)
{ "use strict";

	function TaskLog ()
	{
		if (!(this instanceof TaskLog)) return new TaskLog();
		this._completedEvents = [];
		this._currentEvent = null;
		this._currentTask = null;
	};

	extend(TaskLog,
	{ fromSerializable: function (events)
		{
			var deserialized = TaskLog()
			deserialized._completedEvents = events;
			return deserialized;
		}

	, AlreadyRunningError: function AlreadyRunningError (what)
		{
			if (!(this instanceof AlreadyRunningError))
				return new AlreadyRunningError(what);
			this.what = what;
		}

	, NotRunningError: function NotRunningError (what)
		{
			if (!(this instanceof NotRunningError))
				return new NotRunningError(what);
			this.what = what;
		}
	});

	

	extend(TaskLog.prototype,
	{ startEvent: function (event)
		{
			if (this._currentEvent !== null)
				throw TaskLog.AlreadyRunningError("Event");
			this._currentEvent = [];
			this.startTask(event);
		}

	, completeEvent: function ()
		{
			if (this._currentEvent === null)
				throw TaskLog.NotRunningError("Event");
			this._completedEvents.push(this._currentEvent);
			this._currentEvent = null;
		}

	, startTask: function (task)
		{
			if (this._currentTask !== null)
				throw TaskLog.AlreadyRunningError("Task");
			this._currentTask =
					{ name: task.name
					, result: null
					, startedAt: Date.now()
					, completedAt: null
					};
		}

	, completeTask: function (result)
		{
			if (this._currentTask === null)
				throw TaskLog.NotRunningError("Task");
			this._currentTask.completedAt = Date.now();
			this._currentTask.result = result;
			this._currentEvent.push(this._currentTask);
			this._currentTask = null;
		}

	, isEventRunning: function ()
		{
			return this._currentEvent !== null && this._currentTask !== null;
		}

	, isTaskCompleted: function (name)
		{
			var i = 0, j = 0
				;
			for (i = 0; i < this._completedEvents.length; i++)
				for (j = 0; j < this._completedEvents[i].length; j++)
					if (this._completedEvents[i][j].name === name)
						return true;
			return false;
		}

	, isEventCompleted: function (name)
		{
			return this.isEventInLast(name, this._completedEvents.length);
		}

	, isEventInLast: function (name, number)
		{
			var i = 0
				;
			for (
					i = this._completedEvents.length - number;
					i < this._completedEvents.length;
					i++)
				if (this._completedEvents[i][0].name === name)
					return true;

			return false;
		}

	, getSerializable: function ()
		{
			return this._completedEvents;
		}
	});


	AK.TaskLog = TaskLog;
});
