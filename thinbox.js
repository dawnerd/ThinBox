var ThinBox = { };
(function($){
	$.ux.behavior("ThinBox", {
		initialize: function() {
			console.log("loaded");
			/* Probably preload images here */
		},
		onclick: function() {
			this.showModal(this.element);
		},
		showModal: function(element) {
			if ($(element).attr("href").substr(0, 1) == "#") {
				var thinboxContent = $(element.hash).html();
			}
			else {
				var thinboxContent = $("<iframe height='100%' width='100%' style='border:0'></iframe>");
				thinboxContent.attr("src", $(element).attr("href"));
			}
			
			var thinboxBG = $('<div></div>').attr('id',this.options.thinboxModalBG);
			var thinboxModalContent = $('<div></div>').attr('id',this.options.thinboxModalContent).addClass(this.options.thinboxModalContent);
			var thinboxModalContentBG = $('<div></div>').attr('id',this.options.thinboxModalContentBG);
			
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
				'filter': 'alpha(opacity=25)',
				'zIndex': '999999999999999'
			}).appendTo(thinboxBG);
			
			$(thinboxModalContent).css({
				'height': this.options.height,
				'width': this.options.width,
				'margin': this.options.margin,
				'top': this.options.top,
				'position': 'relative',
				'zIndex': '9999999999999999'
			}).html(thinboxContent).appendTo(thinboxBG);
			
			if(this.options.clickClose) {
				$(thinboxBG).bind('click',function(event){
					this.remove(); 
				 });
			}
		},
		remove: function() {
			$('#'+this.options.thinboxModalBG).remove();
			return false;
		}
	});
	
	
	$.fn.thinbox = function(options) {
		
		$.each(this,function(){
			$(this).bind('click',function() {
				
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
	
	
	//init thinbox
	ThinBox = $("a[rel='thinbox']").attachAndReturn("ThinBox", {
		/* Default Settings */
		width: '500px',
		height: '500px',
		margin: '0 auto',
		top: '100px',
		clickClose: true,
		thinboxModalBG: 'thinboxModalBG',
		thinboxModalContent: 'thinboxModalContent',
		thinboxModalContentBG: 'thinboxModalContentBG'
	});
})(jQuery);
