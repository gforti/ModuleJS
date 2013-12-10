(function (window) {
	var MODULE = (function () {
	
		var module = function() {
			return new module.func.init( arguments );			 
		};
	
		module.func = module.prototype = function () {
		 
			var properties = { length: 0 };
						
			return {
				init : function( selector ) {				
					var elem = null, i = 0, l = selector.length, results = [];					
					for ( var value = selector[i]; i < l ; value = selector[++i] ) {
						elem = module.$( value );
						if ( null != elem ) {
							this[i] = elem; 
							results.push(elem);
						}
					}
					if ( results.length ) { //Array.prototype.push.apply( this, results ); - not used because of IE 7
						this.length = results.length;
						properties.length = this.length;
					}
					return this;
				},
				size: function() {
					return properties.length;
				}
			};
		}();
		 
		//A prototype is an object from which other objects inherit properties
		module.func.init.prototype = module.func;
		
		module.oType = function(o) {
			var objTypes = [], types = "Boolean Number String Function Array Date RegExp Object".split(" ");	
			for (var i = 0, l = types.length; i < l; i++)				
				objTypes[ "[object " + types[i] + "]" ] = types[i].toLowerCase();					
			return objTypes[ Object.prototype.toString.call(o) ] || "object";
		};
		
		module.error = function( msg ) {
			throw new Error( msg );
		};
		
		module.extend = module.func.extend = function() {
			var obj = this, values = arguments[0];
			if ( arguments.length > 1 ) { obj = arguments[0]; values = arguments[1]; }			
			if ( module.oType(values) == "object" ) 
				for ( var name in values ) if( values.hasOwnProperty(name) ) obj[name] = values[name];					
			return obj;
		};
		
		
		module.extend({
			each : function (a, fn) {
				var name, i = 0, l = a.length;
				if ( module.oType(fn) == "function" ) {
					if ( l === undefined ) {
						for ( name in a )
							if( a.hasOwnProperty( name ) ) if ( fn.call( a[ name ], a[ name ] ) === false ) break;							
					} else
						for ( var value = a[i]; i < l && fn.call( value, value ) !== false; value = a[++i] ){}							
				}
				return a;
			},
			$ : function( id ) { 
				var elem = id;
				if( module.oType( id ) == "string" ) {
					elem = document.getElementById( id ); 
					// IE needs this extra check to return the ID and not the name of an element it finds.
					elem = (elem && elem.id && elem.id == id ? elem : null);								
				}
				return elem;
			}
		});
		
		module.func.extend({
			each : function (fn) { return ( this.size() > 0 ? module.each(this, fn) : this ); }
		});
		
		return module;
	}());
	window.Dom = MODULE;
})(window);	