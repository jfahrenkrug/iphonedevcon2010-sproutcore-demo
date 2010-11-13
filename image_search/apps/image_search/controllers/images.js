// ==========================================================================
// Project:   ImageSearch.imagesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
ImageSearch.imagesController = SC.ArrayController.create(
/** @scope ImageSearch.imagesController.prototype */ {

  // TODO: Add your own code here.
  searchTerm: null,
  
  summary: function() {
    var len = this.get('length'), ret ;

    if (len && len > 0) {
      ret = len === 1 ? "1 image" : "%@ images".fmt(len);
    } else ret = "No images";

    return ret;
  }.property('length').cacheable(),
  
  performSearch: function() {
    console.log(this.get('searchTerm'));
    
    var imageQuery = SC.Query.remote(ImageSearch.GoogleImage, {query: this.get('searchTerm')});
    console.log('before');
    var images = ImageSearch.store.find(imageQuery);
    console.log('after');
    
    console.log(images);
    
    ImageSearch.imagesController.set('content', images);
  },
  
    
    

}) ;
