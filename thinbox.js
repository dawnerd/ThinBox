var ThinBox = {
	default: {
		thinboxModalBG: '#thinboxModalBG',
		width: '500px',
		height: '500px',
		margin: '0 auto',
		top: '100px', /* This should be dynamic */
		clickClose: true
	},
	settings: { }, /* Overridden by $.extend */
	
	remove: function() {
		$(this.settings.thinboxModalBG).remove();
		return false;
	},
	center: function() {

	},
	createModal: function(elem) {
		if ($(elem).attr("href").substr(0, 1) == "#") {
			var thinboxContent = $(elem.hash).html();
		} else {
			var thinboxContent = $("<iframe height='100%' width='100%' style='border:0'></iframe>").attr("src", $(elem).attr("href"));
		}
		var thinboxBG = $('<div></div>').attr('id','thinboxModalBG');
		var thinboxModalContent = $('<div></div>').attr('id','thinboxModalContent').addClass('thinboxModalContent');
		var thinboxModalContentBG = $('<div></div>').attr('id','thinboxModalContentBG');
		$(thinboxBG).css({
			'height': $(window).height(),
			'width': $(window).width(),
			'position': 'absolute',
			'top': '0',
			'left': '0'
		}).appendTo('body');
		
		$(thinboxModalContentBG).css({
			'height': $(window).height(),
			'width': $(window).width(),
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'background': '#585862',
			'opacity': '.25',
			'filter': 'alpha(opacity=25)'
		}).appendTo(thinboxBG);
		
		$(thinboxModalContent).css({
			'height': this.settings.height,
			'width': this.settings.width,
			'margin': this.settings.margin,
			'top': this.settings.top,
			'position': 'relative',
			'zIndex': '999'
		}).html(thinboxContent).appendTo(thinboxBG);
		
		if(this.settings.clickClose) {
			$(thinboxBG).bind('click',function(event){
				ThinBox.remove();
			 });
		}
	}
};

(function($){
	$.fn.thinbox = function(options) {
		ThinBox.settings = $.extend(ThinBox.default,options);
		var self = this;
		
		$.each(this,function(){
			$(this).bind('click',function() {
				ThinBox.createModal(this);
				
				$(thinboxModalContent).bind('click',function(event){  
					if( event.stopPropagation ) { event.stopPropagation(); }
					else { event.cancelBubble = true; }
				});
				
				$(window).bind('resize',function(){
					$(thinboxBG).css({
						'height':$(window).height(),
						'width': $(window).width()
					});
				});
				return false;
			});
		});
	};
})(jQuery);