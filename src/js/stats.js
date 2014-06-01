
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	AK.Stats = function Stats (values)
	{
		this._values = values || {};
		this._valueChangedHandlers = new Phaser.Signal();
		this._valueChangedIndividualHandlers = {};
	};
	
	on(AK.Stats.prototype, function ()
	{
		this._splitFullName = function (fullname)
		{
			return fullname.split('.');
		};
		
		this._ensurePath = function (names)
		{
			var cur = this._values
				, name, i
				;
			for (i=0; i < names.length-1; i++)
			{
				name = names[i];
				
				if (!(name in cur))
					cur[name] = {};
				
				cur = cur[name];
			}
			
			cur[names[names.length-1]] = null;
			
			return cur;
		};
		
		this._getByNames = function (names)
		{
			var cur = this._values
				, name
				;
			names = names.concat();
			while (name = names.shift())
			{
				if (!(name in cur))
					return null;
				cur = cur[name];
			}
			
			return cur;
		};
		
		this.get = function (fullname)
		{
			return this._getByNames(this._splitFullName(fullname));
		};
		
		this.set = function (fullname, value)
		{
			var names = this._splitFullName(fullname)
				, parent = this._ensurePath(names)
				, name = names.pop()
				;
			parent[name] = value;
			
			if ('fullname' in this._valueChangedIndividualHandlers)
				this._valueChangedIndividualHandlers[fullname].dispatch(value);
			this._valueChangedHandler.dispatch(value);
		};
		
		this.registerValueChangedHandler = function (fullnameOrHandler, handlerOrContext, context)
		{
			var signal, handler
				;
			if (typeof(fullnameOrHandler) === 'string')
			{
				signal = this._valueChangedIndividualHandlers[fullnameOrHandler]
						|| (this._valueChangedIndividualHandlers[fullnameOrHandler] = new Phaser.Signal);
				handler = handlerOrContext;
			}
			else
			{
				signal = this._valueChangedHandlers;
				handler = fullnameOrHandler;
				context = handlerOrContext;
			}
			signal.add(handler, context);
		};
		
		
	});
});