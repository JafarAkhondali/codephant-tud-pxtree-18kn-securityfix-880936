/**
 * 
 * @param ctor
 * @param diff
 * @returns
 */
function derive (ctor, diff)
{
	var proto = Object.create(ctor.prototype)
		, key, value;
	for (key in diff) if (diff.hasOwnProperty(key))
	{
		value = diff[key];
		if (typeof(value) !== 'undefined')
			proto[key] = value;
	}
	return proto;
}

/**
 * This is pretty much a amalgamation of ECMAScript's native (discouraged) "with"
 * and the "let"-construct well known from functional programming.
 * 
 * It call the given function with the given object as "this"-context and as sole argument.
 * @param obj : Object
 * @param func : Function
 * @param context : Object If this is given, then obj will not be passed as context to
 * 	the function, but this instead.
 * @returns mixed Whatever the function returns.
 */
function on (obj, func, context)
{
	return func.call(
			typeof(context) !== 'undefined' ? context : obj, obj);
}

/**
 * Introduces a mechanism akin to namespaces in other programming languages.
 * 
 * Since in ECMAScript namespaces for function and object to live in are
 * accomplished by normal objects, i.e. instances of Object which are usually
 * constructed via the object literal ("{prop:value, ...}"). This function
 * checks if all object properties that make up the namespace path exist in
 * their respective super-namespace and if needed creates and initializes those
 * properties accordingly.
 * 
 * When resolving the namespace path it relies on the context it is call on.
 * This means if called as "namespace('MyNS')" it will be called with the global
 * object as context ("window" in browsers) resulting in a global variable/property
 * called "MyNS". However, if called as "MyNS.namespace('SubNS')" the fully
 * 1qualified name will be "MyNS.SubNS".
 * 
 * As a convenience the namespaces constructed by this function contain a reference
 * to their parent namespace via the "nsUp"-property. 
 * 
 * @param spacename : String The namespace with segments/elements separated by
 * dots ("."), e.g. "MyAmICool.AwesomeGame.controllers". 
 * @param definition : Object, Function = null If given a function, that function
 * is called with the namespace object as "this"-context and as a single argument.
 * If given an object (literal) it is considered the namespace definition and
 * @returns Object The namespace object.
 */
function namespace (name, definition)
{
	if (this instanceof namespace)
		this.nsInit(name, definition);
	else
		return namespace.prototype.namespace.call(this, name, definition);
}

on(namespace.prototype, function()
{
	this.namespace = function(name, definition)
	{
		var ns = this;

		name.split('.').forEach(function(seg)
		{
			if (!(seg in ns && ns.hasOwnProperty(seg)))
				ns[seg] = new namespace(seg);

			if (!('nsUp' in ns[seg]))
				ns[seg].nsUp = ns;
			
			if (!('nsName' in ns[seg]))
				ns[seg].nsName = seg;

			ns = ns[seg];
		});

		if (definition)
			if (definition instanceof Function)
				definition.call(ns, ns);
			else
				ns.nsUp[ns.nsName] = definition;
		
		return ns;;
	};
	
	this.nsInit = function nsInit  (name)
	{
		this.nsName = name;
	};
	
	this.nsFQName = function nsFQName ()
	{
		var names = []
			, i = this;
		while ('nsName' in i && i.hasOwnProperty('nsName'))
		{
			names.push(i.nsName);
			i = i.nsUp;
		}
		return names.reverse.join(".");
	};
});

/**
 * Allows two place text freely and in respect to formerly placed text.
 */
function TextPlacer (game, into, defaultStyle, options)
{
	var self = (this instanceof TextPlacer)
				? this : Object.create(TextPlacer.prototype)
		;
	self.defaultStyle = defaultStyle;
	self.position = { x: 0, y: 0 };
	self._game = game;
	self._parentDisplayObj = into;
	self._lastPlaced = null;
	self._indentCount = 0;
	self._options = options || {};
	
	return self;
};

TextPlacer.DefaultOptions =
		{ lineSpace: 5
		, indentWidth: 100
		};

TextPlacer.prototype = (function (def)
{
	def.moveTo = function (xOrPt, y)
	{
		var x = xOrPt
			;
		if (typeof(y) === 'undefined')
		{
			y = xOrPt.y;
			x = xOrPt.x;
		}
		this.position.x = x;
		this.position.y = y;
		
		return this;
	};
	
	def.moveBy = function (xOrPt, y)
	{
		var x = xOrPt
			;
		if (typeof(y) === 'undefined')
		{
			y = xOrPt.y;
			x = xOrPt.x;
		}
		this.position.x += x;
		this.position.y += y;
		
		return this;
	};
	
	def.feedLine = function ()
	{
		var deltaY = this._options.lineHeight;
		this.position.y += deltaY;
		return this;
	};
	
	def.feed = def.feedLine;
	
	def.spaceLine = function ()
	{
		if (this._lastPlaced)
		{
			this.position.y += this._lastPlaced.height + this._options.lineSpace;
		}
		return this;
	};
	
	def.space = def.spaceLine;
	
	def.indent = function (level)
	{
		if (typeof(level) === 'undefined') level = 1;
		this._indentCount += level;
		this.position.x += this._options.indentWidth * level;
		
		return this;
	};
	
	def.tab = function ()
	{
		return this.indent(1);
	};
	
	def.exdent = function (level)
	{
		if (typeof(level) === 'undefined') level = 1;
		this.indent(-level);
		
		return this;
	};
	
	def.clearIndent = function ()
	{
		this.exdent(this._indentCount);
		this._indentCount = 0;
		
		return this;
	};
	
	def.clear = def.clearIndent;
	
	def.place = function (text, style)
	{
		style = this._getMergedStyle(style);
		this._lastPlaced = this._game.make.text(this.position.x, this.position.y, text, style);
		this._parentDisplayObj.addChild(this._lastPlaced);
		return this;
	};
	
	def.option = function (name, value)
	{
		if (typeof(value) === 'undefined')
		{
			return this._options[name];
		}
		else
		{
			this._options[name] = value;
			return this;
		}
	};
	
	def.options = function (optsToSet)
	{
		var key
			;
		for (key in optsToSet) if (optsToSet.hasOwnProperty(key))
		{
			this.option(key, optsToSet[key]);
		}
		return this;
	};
	
	def._getMergedStyle = function (style)
	{
		var merged = Object.create(this.defaultStyle)
			, key
			;
		for (key in style)
		if (style.hasOwnProperty(key) && typeof(style[key]) !== 'undefined')
		{
			merged[key] = style[key];
		}
		
		return merged;
	};
	
	return def;
})(TextPlacer.prototype);