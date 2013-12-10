Dom.extend({
	Event : {
			add : function(obj, evt, fn) {
				obj = Dom.$(obj);
				if( !obj ) return this;	
				if (obj.addEventListener) {
					obj.addEventListener(evt, fn, false);
				} else if (obj.attachEvent) {
					obj.attachEvent('on'+evt, fn);
				}
				return this;
			},
			getTarget : function(e) {
				var e = e || window.event;
				var eventTarget = (e.target ? e.target : (e.srcElement ? e.srcElement : document));
				return eventTarget;
			},
			fire : function(obj, evt) {
				obj = Dom.$(obj);
				if( !obj ) return this;						
				if( document.createEvent ) {
					var evnt = document.createEvent('HTMLEvents');
					evnt.initEvent(evt, true, true);
					obj.dispatchEvent(evnt);
				} else if( document.createEventObject ) {
					var evnt = document.createEventObject();
					obj.fireEvent('on'+evt, evnt);
				}
				return this;
			}
		}
});

Dom.func.extend({
	event: function(evt, fn) { var func = function(o){ Dom.Event.add(o,evt, function(){fn(o);} ); }; Dom.each(this, func ); return this; },
	fire : function(evt) { var func = function(o){ Dom.Event.fire(o,evt); }; Dom.each(this, func ); return this; }	
});