// ==========================================================================
// Project:   ImageSearch.ResizableImageView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
ImageSearch.ResizableImageView = SC.ImageView.extend(
/** @scope ImageSearch.ResizableImageView.prototype */ {
    
    currentImageSize: {width: 0, height: 0},

    imageDidLoad: function(url, imageOrError) {
        sc_super();
        if (SC.$ok(imageOrError)) {
            console.log ('image did load' + imageOrError);
            // Cache the width and height from imageOrError which will be an Image object
            this.currentImageSize.width = imageOrError.width;
            this.currentImageSize.height = imageOrError.height;
            
            this._aspectSizeToFit();
        } 
    },
    
    sizeToFit: function() {
        this._aspectSizeToFit();
    }.observes('.parentView.frame'),
    
    _aspectSizeToFit: function() {
        // Calculate and resize based on parent frame and cached dimensions
        var f = this.parentView.get('frame');
        theGlobalF = f;
        console.log(f);
        var w = this.currentImageSize.width;
        var h = this.currentImageSize.height;
        
        var newWidth = w;
        var newHeight = h;
        
        if (w >= f.width || h >= f.height) {
            if (f.height >= (h * (f.width/w))) {
                newWidth = f.width;
                newHeight = h * (f.width/w);
            } else {
                newHeight = f.height;
                newWidth = w * (f.height/h);
            }              
        }
        
        if (this.get('layer')) {
            var imageStyle = this.get('layer').style;

            imageStyle.width = newWidth + 'px';
            imageStyle.height = newHeight + 'px';
            imageStyle.top = ((f.height - newHeight) / 2) + 'px';
            imageStyle.left = ((f.width - newWidth) / 2) + 'px';
        }
    }

});