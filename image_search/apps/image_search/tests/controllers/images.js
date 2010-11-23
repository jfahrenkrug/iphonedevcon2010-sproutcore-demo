// ==========================================================================
// Project:   ImageSearch.imagesController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch module test ok equals same stop start */

module("ImageSearch.imagesController", {
  setup: function() {
    store = SC.Store.create().from(SC.Record.fixtures);
  },
  
  teardown: function() {
    store = null;
  }
});

// TODO: Replace with real unit test for ImageSearch.imagesController
test("the summary method", function() {
  var expected = "No images";
  var result   = ImageSearch.imagesController.get('summary');
  equals(result, expected, "summary should equal No images");
  
  var query = SC.Query.local(ImageSearch.GoogleImage);
  var images = store.find(query);
  ImageSearch.imagesController.set('content', images);
  expected = "8 images";
  result   = ImageSearch.imagesController.get('summary');
  equals(result, expected, "summary should equal 8 images");
});

