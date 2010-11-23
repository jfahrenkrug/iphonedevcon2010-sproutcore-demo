// ==========================================================================
// Project:   ImageSearch.GoogleImageDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

/** @class

  (Document Your Data Source Here)
  
  @"http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=large&imgtype=photo&q=";

  @extends SC.DataSource
*/
ImageSearch.GoogleImageDataSource = SC.DataSource.extend(
/** @scope ImageSearch.GoogleImageDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query, params) {
    var self = this;
    console.log('in fetch');
    if (SC.buildMode === 'debug') {
      SC.Request.getUrl('ajax/services/search/images?v=1.0&rsz=large&imgtype=photo&q='+query.query).json()
        .notify(this, 'didFetchImages', store, query)
        .send();
    } else  {
      // in production we need to use jsonp with jquery to work around cross domain restrictions
      $.getJSON('http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=large&imgtype=photo&q='+query.query+'&callback=?', null, 
        function(data, textStatus, xhr) {
          SC.run(function() {
            var response = SC.Response.create({ request: null, body: data, status: textStatus });
            self.didFetchImages(response, store, query);
          });
        });
    }
    
    return YES;
  },
  
  didFetchImages: function(response, store, query) {
    console.log('in didfetch');
    var data;
    if (SC.ok(response)) {
      console.log('response ok');
      data = response.get('body').responseData.results;

      var storeKeys = store.loadRecords(ImageSearch.GoogleImage, data);
      store.loadQueryResults(query, storeKeys);
      
      store.dataSourceDidFetchQuery(query);
    } 
    else store.dataSourceDidErrorQuery(query, response);
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
