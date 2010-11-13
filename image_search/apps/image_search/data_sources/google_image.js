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
    console.log('in fetch');
    SC.Request.getUrl('ajax/services/search/images?v=1.0&rsz=large&imgtype=photo&q='+query.query).json()
      .notify(this, 'didFetchImages', store, query)
      .send();
    return YES;
  },
  
  didFetchImages: function(response, store, query) {
    console.log('in didfetch');
    var data;
    if (SC.ok(response)) {
      data = response.get('body').responseData.results;
      
      console.log(data);
      
      
      
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
