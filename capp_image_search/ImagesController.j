@import <Foundation/CPObject.j>
@import "GoogleImage.j"
@import "ImageListView.j"

@implementation ImagesController : CPObject
{
    CPArray images;
    ImageListView imageListView @accessors;
    CPImageView imageView @accessors;
    CPData receivedData;
}

- (void)setImages:(CPArray)someImages {
    images = someImages;
    
    [imageListView setContent:images];
    [imageListView setSelectionIndexes:[CPIndexSet indexSetWithIndex:0]];
}

- (CPArray)images {
    return images;
}

- (Image)selectedImage {
    return [images objectAtIndex:[[imageListView selectionIndexes] firstIndex]];
}

// Delegate method for the imageListView
- (void)collectionViewDidChangeSelection:(CPCollectionView)aCollectionView
{
  [imageView setImage:[[CPImage alloc] initWithContentsOfFile:[[self selectedImage] unescapedUrl]]];
}

- (void)search:(CPString)term {
    if (term && [term length] > 0) {
        var request = [CPURLRequest requestWithURL:'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=large&imgtype=photo&q=' + term];
        [request setHTTPMethod:@"GET"];

        receivedData = nil;
        [CPURLConnection connectionWithRequest:request delegate:self];
    } else {
        alert("Please enter a search term!");
    }
}

/* CPURLConnection delegate methods */ 
 
- (void)connection:(CPURLConnection)connection didReceiveData:(CPString)data
{
    if (!receivedData) {
        receivedData = data;
    } else {
        receivedData += data;
    }
}
 
- (void)connection:(CPURLConnection)connection didFailWithError:(CPString)error
{
    alert("Connection did fail with error : " + error) ;
    receivedData = nil;
}
 
- (void)connectionDidFinishLoading:(CPURLConnection)aConnection
{
    var result = nil;
    
    try {
        result = CPJSObjectCreateWithJSON(receivedData).responseData.results;
    } catch(err) {
        alert("Error while parsing search results: " + err);
    }
    
    if (result) {
        var images = [GoogleImage imagesFromJSONObjects:result]
console.log(images);
        if (images) {
            [self setImages:images];
        } else {
            alert("Nothing found.");
        }
    }
}

@end