var ThinBox = {
	modals: [],
	remove: function() {
		this.modals[0].remove();
		return false;
	},
	resize: function(width,height) {
		this.modals[0].resize(width,height);
		return false;
	},
	onShow: function() {}
};
(function($){
	$.ux.behavior("ThinBox", {
		initialize: function() {
			/* Probably preload images here */
		},
		onclick: function() {
			this.showModal(this.element);
			return false;
		},
		getContentElement: function() {
			return $("#" + this.options.thinboxModalContent);
		},
		showModal: function(element) {
			var self = this;
			var href = $(element).attr("href")||$(element).attr("alt");
			var imageUrl = /\.(jpe?g|png|gif|bmp)/gi;
			var isImage = false;
			if (href.substr(0, 1) == "#") {
				var thinboxContent = $($(element).attr("href")).html();
				var inIframe = false;
			} else if(href.match(imageUrl)) {
				var thinboxImage = new Image();
				thinboxImage.src = href;
				var thinboxContent = $("<img>").attr("src",href);
				var imageDesc = $($(element).attr("title")).html();
				var inIframe = false;
				var isImage = true;
			}
			else {
				var thinboxContent = $("<iframe height='100%' width='100%' frameborder='0' style='border:0'></iframe>");
				thinboxContent.attr("src", href);
				var inIframe = true;
			}
			
			var thinboxBG = $('<div></div>').attr('id',this.options.thinboxModalBG);
			var thinboxModalContent = $('<div></div>').attr('id',this.options.thinboxModalContent).addClass(this.options.thinboxModalContent);
			var thinboxModalContentBG = $('<div></div>').attr('id',this.options.thinboxModalContentBG);
			
			$(thinboxBG).css({
				'height': $(window).height(),
				'width': $(window).width(),
				'position': 'fixed',
				'display': 'none',
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
				'zIndex': '999999'
			}).appendTo(thinboxBG);
			
			boxHeight = this.options.height;
			boxWidth = this.options.width;
			if(isImage) {
				boxHeight = '';
				boxWidth = thinboxImage.width;
			}
			
			$(thinboxModalContent).css({
				'height': boxHeight,
				'width': boxWidth,
				'margin': this.options.margin,
				'top': this.options.top,
				'position': 'relative',
				'zIndex': '9999999'
			}).html(thinboxContent).appendTo(thinboxBG);
			
			if(isImage) {
				$(imageDesc).appendTo(thinboxModalContent);
			}
			
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
			$(thinboxBG).show();
			this.dispatchEvent("Show");
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
		},
		resize: function(width,height) {
			var newSizes = {
				'height': height+'px',
				'width': width+'px'
			};
			if(this.options.animateResize) {
				$('#'+this.options.thinboxModalContent).animate(newSizes);
			} else {
				$('#'+this.options.thinboxModalContent).css(newSizes);
			}
		}
	}, {
		width: '600px',
		height: '350px',
		margin: '0 auto',
		top: '10%',
		clickClose: true,
		fullHeight: false,
		animateResize: true,
		fullHeightPadding: '30',
		thinboxModalBG: 'thinboxModalBG',
		thinboxModalContent: 'thinboxModalContent',
		thinboxModalContentBG: 'thinboxModalContentBG',
		thinboxModalContentBGColor: '#000',
		thinboxModalContentBGOpacity: '30',
		onShow: function() { }
	});
	
	//init thinbox
	$(document).ready(function(){
		ThinBox.modals = $("a[rel*='thinbox'],input.thinbox").attachAndReturn("ThinBox", {
			onShow: function() { ThinBox.onShow.call(this); }
		});
	});
})(jQuery);

