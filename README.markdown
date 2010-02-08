## About

ThinBox was built as a lightweight alternative to the now deprecated Thickbox.

## Features

* Loading of content form hidden elements based on id.
* Iframed content.
* Ability to dynamically resize an iframe with animation.
* Image loading with image caption loaded from hidden element.
* Settings for everything, including id's used on thinbox elements.
* Setting to make the thinbox 100% of the browser height.

## Dependencies 

* jQuery 1.3

## Usage

To get basic functionality working, just include the correct javascript files on the page. Thinbox will work right out of the box without any configuration changes.

### Content loaded from elements

	<a href="#elementID" rel="thinbox">This link will load the content in an element with the class of elementID</a>
	
### iFramed content
	<a href="iframepage.html" rel="thinbox">This link will load the file iframepage.html into an iframe</a>
	
### Closing Thinbox from inside of an iFrame

	<script>
		parent.ThinBox.remove();
	</script>
	
### Resize Thinbox from inside of an iFrame

	<script>
		parent.ThinBox.resize(400,500); // order: width, height
	</script>
	
### Custom configurations

All configuration for Thinbox is right in the thinbox.js file.
