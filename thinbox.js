var ThinBox = { };
(function($){
	$.ux.behavior("ThinBox", {
		initialize: function() {
			/* Probably preload images here */
		},
		onclick: function() {
			this.showModal(this.element);
			return false;
		},
		showModal: function(element) {
			var self = this;
			if ($(element).attr("href").substr(0, 1) == "#") {
				var thinboxContent = $($(element).attr("href")).html();
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
				'background': this.options.thinboxModalContentBGColor,
				'opacity': '.'+this.options.thinboxModalContentBGOpacity,
				'filter': 'alpha(opacity='+this.options.thinboxModalContentBGOpacity+')',
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
					self.remove(); 
				 });
			
				$(thinboxModalContent).bind('click',function(event){  
					if( event.stopPropagation ) { event.stopPropagation(); }
					else { event.cancelBubble = true; }
				});
			}
			
			if(this.options.fullHeight) {
				this.resizeHeight();
			}
			
			$('.jsThinboxClose').bind('click', function() {
				self.remove();
				return false;
			});
			
			$(window).bind('resize',function(){
				self.resizeBG();
				self.resizeBG(); /* Dirty hack for scrollbars */
				if(self.options.fullHeight) {
					self.resizeHeight();
				}
			});
			return false;
		},
		remove: function() {
			$('#'+this.options.thinboxModalBG).remove();
			return false;
		},
		resizeBG: function() {
			$('#'+this.options.thinboxModalBG).css({
				'height':$(window).height(),
				'width': $(window).width()
			});
			$('#'+this.options.thinboxModalContentBG).css({
				'height':$(window).height(),
				'width': $(window).width()
			});
		},
		resizeHeight: function() {
			var height = parseInt($(window).height())-(parseInt(this.options.fullHeightPadding)*2);
			$('#'+this.options.thinboxModalContent).css({
				'height': height,
				'top': this.options.fullHeightPadding+'px'
			})
		}
	});
	
	//init thinbox
	$(document).ready(function(){
		ThinBox = $("a[rel='thinbox']").attachAndReturn("ThinBox", {
			/* Default Settings */
			width: '500px',
			height: '300px',
			margin: '0 auto',
			top: '10%',
			clickClose: true,
			fullHeight: true,
			fullHeightPadding: '30',
			thinboxModalBG: 'thinboxModalBG',
			thinboxModalContent: 'thinboxModalContent',
			thinboxModalContentBG: 'thinboxModalContentBG',
			thinboxModalContentBGColor: '#000',
			thinboxModalContentBGOpacity: '30'
		});
	});
})(jQuery);