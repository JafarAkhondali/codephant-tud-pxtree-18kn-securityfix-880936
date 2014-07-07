
namespace("PXTree.AchtzehnKnoten", function(AK)
{ "use strict";

	function TaskLog (eventNameCacheSize)
	{
		if (!(this instanceof TaskLog)) return new TaskLog();
		this._completedEvents = [];
		this._currentEvent = null;
		this._currentTask = null;
		this._nameCacheSize = false;
		this._nameCache = null;
		if (typeof(eventNameCacheSize) !== 'undefined')
			this.startCachingEventNames(eventNameCacheSize);
	};

	extend(TaskLog,
	{ fromSerializable: function (saved)
		{
			var deserialized = TaskLog()
			deserialized._completedEvents = saved.completedEvents;
			if (saved.nameCache !== null)
				deserialized.startCachingEventNames(saved.nameCacheSize);
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
	{ getSerializable: function ()
		{
			var serializable =
						{ completedEvents: this._completedEvents
						, nameCache: this._nameCache
						, nameCacheSize: this._nameCacheSize
						}
				;
			return serializable;
		}
	, startEvent: function (event)
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
			this._addToNameCache(this._currentEvent[0].name);
			this._currentEvent = null;
		}

	, startTask: function (task)
		{
			if (this._currentTask !== null)
				throw TaskLog.AlreadyRunningError("Task");

			this._currentTask =
					{ name: task.name || 'no-name-task'
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
			// iterate over all completed events, if cache is not on or its size is too small
			if (this._cacheSize === false || this._cacheSize < number)
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
			else
			{
				return this.isEventInCache(name);
			}
			
		}

	, isInEventNameCache: function (name)
		{
			return this.cachesEventNames() && this._nameCache.indexOf(name) >= 0;
		}

	, startCachingEventNames: function (size)
		{
			if (this.cachesEventNames()) throw TaskLog.AlreadyRunningError('NameCaching');
			this._nameCacheSize = size;
			this._nameCache = [];
		}

	, stopCachingEventNames: function ()
		{
			if (!this.cachesEventNames()) throw TaskLog.NotRunningError('NameCaching');
			this._nameCacheSize = false;
			this._nameCache = null;
		}

	, cachesEventNames: function ()
		{
			return this._nameCache !== null;
		}

	, _addToNameCache: function (eventName)
		{
			if (!this.cachesEventNames()) return; //Do nothing when not caching
			//remove elements from the head of the cache till we're one less than expected
			while (this._nameCache.length >= this._nameCacheSize)
				this._nameCache.shift();
			this._nameCache.push(eventName);
		}
	});


	AK.TaskLog = TaskLog;
});
