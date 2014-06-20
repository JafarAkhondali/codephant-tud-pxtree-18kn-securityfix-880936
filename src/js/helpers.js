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
 * Allows to place text with regards to certain parameters to ease working with
 * indented text, grid-like text and alike.
 */
function TextPlacer (game, into, defaultStyle, options)
{
	var self = (this instanceof TextPlacer)
				? this : Object.create(TextPlacer.prototype)
		;
	/**
	 * The default text-style which will either be used for placing or will merge
	 * with the at placing given style. This uses the same object as Phaser.Text#style().
	 * @property defaultStyle:object
	 */
	self.defaultStyle = defaultStyle;
	/**
	 * The Coordinates where the next text is placed.
	 */
	self.position = { x: 0, y: 0 };
	/**
	 * Used for creating the text display objects.
	 */
	self._game = game;
	/**
	 * The display object to which the new texts are appended as children.
	 */
	self._parentDisplayObj = into;
	/**
	 * Reference to the last placed text display object. Used for calculation of
	 * line feed with spacing.
	 */
	self._lastPlaced = null;
	/**
	 * Keeps track of the level of indentation.
	 */
	self._indentCount = 0;
	/**
	 * Different parameters, that influence text placing.
	 */
	self._options = options || {};
	
	return self;
};

/**
 * If not defined in the instance options, use the values of this one.
 */
TextPlacer.DefaultOptions =
		{ lineSpace: 5
		, indentWidth: 100
		};

TextPlacer.prototype = (function (def)
{
	/**
	 * Place the text cursor at the given position.
	 * @param xOrPt:number,object Either the X-component of the coordinates or an
	 * 	object which has the properties "x" and "y".
	 * @param y:number The Y-component of the coordinates. This is not needed if an
	 * 	object is given for xOrPt.
	 * @returns this
	 */
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
	/**
	 * Move the text cursor by adding the given position to the current.
	 * @param xOrPt:number,object Either the X-component of the coordinates or an
	 * 	object which has the properties "x" and "y".
	 * @param y:number The Y-component of the coordinates. This is not needed if an
	 * 	object is given for xOrPt.
	 * @returns this
	 */
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
	
	/**
	 * Moves the text cursor to simulate a line feed, which will only happen, if
	 * the lineHeight options is set. This does not reset indentation.
	 * @returns this
	 */
	def.feedLine = function ()
	{
		var deltaY = ('lineHeight' in this._options) ? this._options.lineHeight : 0;
		this.position.y += deltaY;
		return this;
	};
	
	/**
	 * Alias of feedLine().
	 */
	def.feed = def.feedLine;
	
	/**
	 * Moves the text cursor to simulate a ile feed, but other than 'feedLine' it
	 * uses line spacing which does rely on the last text placed. It adds the
	 * height of the last placed text to the Y-component of the current position
	 * plus extra "lineSpace" pixels.
	 * @returns this
	 */
	def.spaceLine = function ()
	{
		if (this._lastPlaced)
		{
			this.position.y += this._lastPlaced.height + this._options.lineSpace;
		}
		return this;
	};
	
	/**
	 * Alias of spaceLine().
	 */
	def.space = def.spaceLine;
	
	/**
	 * Raises the preceding whitespace (empty space) in front of following texts.
	 * This can be used to create tables.
	 * @param level:number=1 Number of levels by which the indentation is raised
	 * 	or lowered, if negative.
	 * @returns this
	 */
	def.indent = function (level)
	{
		if (typeof(level) === 'undefined') level = 1;
		this._indentCount += level;
		this.position.x += this._options.indentWidth * level;
		
		return this;
	};
	
	/**
	 * Indent by one level.
	 * @returns this
	 */
	def.tab = function ()
	{
		return this.indent(1);
	};
	
	/**
	 * Lower the level of indentation by given amount.
	 * @returns this
	 */
	def.exdent = function (level)
	{
		if (typeof(level) === 'undefined') level = 1;
		
		return this.indent(-level);
	};
	
	/**
	 * Exdent by one level.
	 * @returns this
	 */
	def.untab = function ()
	{
		return this.exdent(1);
	};
	
	/**
	 * Remove any indentation and return to the original X value.
	 * @returns this
	 */
	def.clearIndent = function ()
	{
		this.exdent(this._indentCount);
		this._indentCount = 0;
		
		return this;
	};
	
	/**
	 * Alias of clearIndent().
	 */
	def.clear = def.clearIndent;
	
	/**
	 * Positions a new text at the current coordinate.
	 * @param text:string The character string to place.
	 * @param style:object Text style description as used by Phase.Text#style().
	 * @returns this
	 */
	def.place = function (text, style)
	{
		style = this._getMergedStyle(style);
		this._lastPlaced = this._game.make.text(this.position.x, this.position.y, text, style);
		this._parentDisplayObj.addChild(this._lastPlaced);
		return this;
	};
	
	/**
	 * Get or set a text placing option.
	 * # Options
	 * lineHeight:number Pixels between one base line and the next. Used by feedLine().
	 * lineSpace:number Pixels between the bottom of one line and the top of the next. Used by spaceLine().
	 * indentWidth:number Pixels the text is shifted when "tab()"-ing and "untab()"-ing.
	 * @param name:string Option's name.
	 * @param value:any The new value for the option. If not given, this method
	 * 	acts as getter.
	 * @returns this on setting and the option value on getting.
	 */
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
	
	/**
	 * Set multiple options at once.
	 * @param optsToSet:object The option names and their values.
	 * @returns this
	 * @see TextPlacer#option
	 */
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
	
	/**
	 * Merge a given style with the default style.
	 * @param style:object Styles as accepted by Phaser.Text#style().
	 * @returns :object The merge Style.
	 */
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

/**
 * Creates custom Buttons with the ability to show Text. Those buttons are given
 * as a Phaser.Group with some special properties, like event handlers.
 */
function TextButtonFactory (game, opts)
{
	var me = Object.create(TextButtonFactory.prototype)
		;
	me._game = game;
	me._options = opts;
	
	return me;
};

TextButtonFactory.prototype = (function ()
{
	
	this.create = function create (text, clickHandler, clickContext)
	{
		var grp = this._game.make.group()
			, txt = this._game.make.text(0, 0, text, Object.create(this._getNormalStyle()))
			, btn = this._game.make.sprite(0, 0, this._options.key)
			;
		
		//piece stuff together
		grp.add(btn);
		grp.add(txt);
		
		//setup positions
		if ('textAlign' in this._options)
		{
			txt.anchor.set(
					this._options.textAlign[0] || 0,
					this._options.textAlign[1] || 0);
		}
		txt.position.copyFrom(this._getTextPosition(btn));
		
		//setup input handling
		btn.inputEnabled = true;
		txt.inputEnabled = true;
		btn.input.useHandCursor = true;
		txt.input.useHandCursor = true;
		
		grp.onInputDown = new Phaser.Signal();
		grp.onInputUp = new Phaser.Signal();
		grp.onInputOver = new Phaser.Signal();
		grp.onInputOut = new Phaser.Signal();
		
		btn.events.onInputDown.add(grp.onInputDown.dispatch);
		txt.events.onInputDown.add(grp.onInputDown.dispatch);
		btn.events.onInputUp.add(grp.onInputUp.dispatch);
		txt.events.onInputUp.add(grp.onInputUp.dispatch);
		btn.events.onInputOver.add(function (_, mouse)
		{
			if (Phaser.Rectangle.containsRaw(
					btn.x, btn.y, btn.width, btn.height,
					mouse.x, mouse.y))
			{
				grp.onInputOver.dispatch.call(null, arguments);
			}
		});
		btn.events.onInputOut.add(function (_, mouse)
		{
			if (!Phaser.Rectangle.containsRaw(
					btn.x, btn.y, btn.width, btn.height,
					mouse.x, mouse.y))
			{
				grp.onInputOut.dispatch.call(null, arguments);
			}
		});
		
		//setup hover effects
		grp.onInputOver.add(function ()
		{
			var style = this._getMergedStyle('overStyle')
				;
			if (style)
				txt.setStyle(style);
			
			if ('overFrame' in this._options)
				btn[(typeof(this._options.overFrame) === 'string')
						? 'frameName'
						: 'frame'] = this._options.overFrame;
		}, this);
		grp.onInputOut.add(function ()
		{
			var style = this._getNormalStyle()
				;
			if (style)
				txt.setStyle(style);
			
			btn[(typeof(this._options.normalFrame) === 'string')
					? 'frameName'
					: 'frame'] = ('normalFrame' in this._options)
							? this._options.normalFrame
							: 0;
		}, this);
		grp.onInputDown.add(function ()
		{}, this);
		grp.onInputUp.add(function ()
		{}, this);
		
		//link up clickHandler
		if (clickHandler)
		{
			grp.onInputUp.add(clickHandler, clickContext);
		}
		
		//there it goes!
		return grp;
	}; //TextButtonFactory#create
	
	/**
	 * Merge a given style with the default style.
	 * @param style:object Styles as accepted by Phaser.Text#style().
	 * @returns :object The merge Style.
	 */
	this._getMergedStyle = function (style)
	{
		var parent = this._getNormalStyle()
			, merged = null
			, key
			;
		if (style in this._options)
		{
			style = this._options[style];
			
			if (parent)
			{
				merged = parent;
				for (key in style)
					if (style.hasOwnProperty(key) && typeof(style[key]) !== 'undefined')
					{
						merged[key] = style[key];
					}
			}
			else
			{
				merged = Object.create(style);
			}
		}
		
		return merged;
	}; //TextButtonFactory#_getMergedStyle
	
	this._getNormalStyle = function ()
	{
		return ('normalStyle' in this._options)
				? Object.create(this._options.normalStyle)
				: null;
	};
	
	this._getTextPosition = function (dimensions)
	{
		var xFactor = 0
			, yFactor = 0
			, xOffset = 0
			, yOffset = 0
			;
		if ('textAlign' in this._options)
		{
			xFactor = this._options.textAlign[0] || 0;
			yFactor = this._options.textAlign[1] || 0;
		}
		if ('textOffset' in this._options)
		{
			if (xFactor === 0) xOffset = this._options.textOffset[0];
			else if (xFactor === 0) xOffset = -this._options.textOffset[0];
			if (yFactor === 0) yOffset = this._options.textOffset[1];
			else if (yFactor === 0) yOffset = -this._options.textOffset[1];
		}
		return	{ x: xFactor * dimensions.width + xOffset
						, y: yFactor * dimensions.height + yOffset};
	};
	
	return this;
}).call(TextButtonFactory.prototype);