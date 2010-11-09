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
  summary: function() {
      var len = this.get('length'), ret ;

      if (len && len > 0) {
        ret = len === 1 ? "1 image" : "%@ images".fmt(len);
      } else ret = "No images";

      return ret;
    }.property('length').cacheable()

}) ;
