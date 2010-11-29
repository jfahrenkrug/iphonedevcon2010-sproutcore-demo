@import <Foundation/CPObject.j>
@import "GoogleImage.j"
@import "DemoData.j"
@import "ImageListView.j"

@implementation ImagesController : CPObject
{
    CPArray images;
    ImageListView imageListView @accessors;
    CPImageView imageView @accessors;
}

- (void)setImages:(CPArray)someImages {
    images = someImages;
}

- (CPArray)images {
    return images;
}

- (void)loadExampleImages {
    //var json = [[DemoData exampleJSONString] objectFromJSON];
    var json = [DemoData exampleJSON];
    console.log(json);
    [self setImages:[GoogleImage imagesFromJSONObjects:json]];
}

- (Image)selectedImage {
    return [images objectAtIndex:[[imageListView selectionIndexes] firstIndex]];
}

// Delegate method for the imageListView
- (void)collectionViewDidChangeSelection:(CPCollectionView)aCollectionView
{
  [imageView setImage:[[CPImage alloc] initWithContentsOfFile:[[self selectedImage] unescapedUrl]]];
}

@end