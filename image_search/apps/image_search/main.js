// ==========================================================================
// Project:   ImageSearch
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
ImageSearch.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  ImageSearch.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: ImageSearch.contactsController.set('content',ImageSearch.contacts);
  
  var query = SC.Query.remote(ImageSearch.GoogleImage, {query: 'ren and stimpy'});
  var images = ImageSearch.store.find(query);
  ImageSearch.imagesController.set('content', images);
} ;

function adjustLayoutToOrientation() {
  var or = SC.device.get("orientation");
  var splitView = ImageSearch.getPath('mainPage.mainPane.middleView');
  var imagesButton = ImageSearch.getPath('mainPage.mainPane.topView.imagesButton');
  var labelView = ImageSearch.getPath('mainPage.mainPane.topView.labelView');
  var newLabelViewLayout = SC.clone(labelView.get('layout'));
  
  splitView.collapseTopLeftView(or === 'portrait');
  imagesButton.set("isVisible", or === 'portrait');
  
  newLabelViewLayout.left = (or !== 'portrait') ? 8 : 213;
  labelView.set('layout', newLabelViewLayout);
}

function main() { 
  ImageSearch.main(); 

  SC.device.addObserver("orientation", this, adjustLayoutToOrientation);
  adjustLayoutToOrientation();
}
