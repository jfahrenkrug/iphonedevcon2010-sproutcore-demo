// ==========================================================================
// Project:   ImageSearch.currentImageController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
ImageSearch.currentImageController = SC.ObjectController.create(
/** @scope ImageSearch.currentImageController.prototype */ {

  contentBinding: SC.Binding.single('ImageSearch.imagesController.selection'),

}) ;
