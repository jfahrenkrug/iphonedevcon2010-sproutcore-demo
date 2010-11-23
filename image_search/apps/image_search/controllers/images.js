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
    var imageQuery = SC.Query.remote(ImageSearch.GoogleImage, {query: this.get('searchTerm')});
    var images = ImageSearch.store.find(imageQuery);
    
    ImageSearch.imagesController.set('content', images);
  },
  
  showPopover: function(view) {
    console.log("view = "+view);
    var pane = SC.PickerPane.create({
      layout: { width: 200, height: 500 },
      contentView: SC.View.design({
        layout: { top: 0, bottom: 0, width: 200 },
        childViews: 'textField scrollView'.w(),
        textField: SC.TextFieldView.design({
          layout: { top: 2, height: 24, left: 5, right: 5 },
          controlSize: SC.LARGE_CONTROL_SIZE,
          fontWeight: SC.BOLD_WEIGHT,
          hint: 'type your search here',
          valueBinding: 'ImageSearch.imagesController.searchTerm',
          target: "ImageSearch.imagesController",
          action: "performSearch",
          keyDown: function(evt) {
            sc_super(); // necessary to guarantee regular handling of keyDown events, 
                         // want to avoid that this overwrite messes everything up     	   
            if (evt.keyCode === 13) {
              // trigger the search after we've seen an "enter"
              ImageSearch.imagesController.performSearch(); 
              return YES;
            } else {
              return NO;
            }
          }}),
          scrollView: SC.ScrollView.design({
            hasHorizontalScroller: NO,
            layout: { top: 28, bottom: 0, left: 5, right: 5 },
            backgroundColor: 'white',
            //Here is the original list view, which is bound to the tasksController
            contentView: SC.ListView.design({
              contentBinding: 'ImageSearch.imagesController.arrangedObjects',
              selectionBinding: 'ImageSearch.imagesController.selection',
              contentValueKey: "content",
              contentIconKey: "tbUrl",
              exampleView: ImageSearch.ImageThumbListItemView,
              hasContentIcon:  YES,
              escapeHTML: NO,
              rowHeight: 70,
            })
          })
      })
    });
    pane.popup(view, SC.PICKER_POINTER);
  },
  
    
    

}) ;
