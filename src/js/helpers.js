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
 * @returns mixed Whatever the function returns.
 */
function on (obj, func)
{
	return func.call(obj, obj);
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
		var segments = name.split('.')
		, ns = this;

		segments.forEach(function(seg)
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