(function($){
	$.thinboxRemove = function() {
		$('#thinboxModalBG').remove();
		return false;
	};
	$.fn.thinbox = function(options) {
		defaults = {
			width: '500px',
			height: '500px',
			margin: '0 auto',
			top: '100px',
			clickClose: true
		};
		this.settings = $.extend(defaults,options);
		var self = this;

		
		$.each(this,function(){
			$(this).bind('click',function() {
				if ($(this).attr("href").substr(0, 1) == "#") {
					var windowHeight = $(this.hash).find('div:first').css('height');
					var windowWidth = $(this.hash).find('div:first').css('width');
					windowHeight = ((windowHeight=='auto')?self.settings.height:windowHeight);
					windowWidth = ((windowWidth=='auto')?self.settings.width:windowWidth);
					var thinboxContent = $(this.hash).html();
				}
				else {
					var windowHeight = self.settings.height;
					var windowWidth = self.settings.width;
					var thinboxContent = $("<iframe height='100%' width='100%' style='border:0'></iframe>");
					thinboxContent.attr("src", $(this).attr("href"));
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
					'height': windowHeight,
					'width': windowWidth,
					'margin': self.settings.margin,
					'top': self.settings.top,
					'position': 'relative',
					'zIndex': '999'
				}).html(thinboxContent).appendTo(thinboxBG);
				
				if(self.settings.clickClose) {
					$(thinboxBG).bind('click',function(event){
						$.thinboxRemove(); 
					 });
				}
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
