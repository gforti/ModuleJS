Dom.extend({
	setStyle : function(elem, prop, val) {
			if ( !elem || ! "style" in elem ) return this;
			var nonPXUnits = /(z-?index|font-?weight|opacity|zoom|line-?height)/i ;
			prop = prop.toString().replace(/\-(.)/g, function(m, l){return l.toUpperCase()}); //camelCase
			if ( prop.toString().match(/opacity/gi)) {
				val = parseInt(val, 10);
				val = (val >= 100)?100:(val<=0)? 0: val;
				if ('filter' in elem.style )
					elem.style["filter"] = "alpha(opacity:"+val+")";
				if ('opacity' in elem.style )
					elem.style["opacity"] = (val/100);										 
			} else if (prop in elem.style) {
				elem.style[prop] = ( Dom.oType(val) == "number" && !nonPXUnits.test(prop) ? val+"px" : val); 
			}			
			return this;
		},
		css : function(elem, css) {
			if (Dom.oType(css) !== "object" || !elem) return this;
			for (var prop in css) {
				if(!css.hasOwnProperty(prop)) continue;
				Dom.setStyle(elem, prop, css[prop]); 
			}
			return this;          
		}
});
Dom.func.extend({
	css : function(css) { var func = function(o){ Dom.css(o,css); }; Dom.each(this, func ); return this; }	
});