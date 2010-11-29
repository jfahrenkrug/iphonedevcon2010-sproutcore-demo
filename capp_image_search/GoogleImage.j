@import <Foundation/CPObject.j>
 
@implementation GoogleImage : CPObject
{
    CPString title @accessors;
    CPString unescapedUrl @accessors;
    CPString tbUrl @accessors;
}
 
- (id)init
{
    self = [super init];
    
    if (self)
    {
        title = @"";
        unescapedUrl = @"";
        tbUrl = @"";
    }
    
    return self;
}

/*!
    Initializes it with the data from a JSON Object
*/
- (id)initFromJSONObject:(id)aJSONObject
{
    self = [self init];
    
    if (self)
    {  
        title = aJSONObject.titleNoFormatting;
        unescapedUrl = aJSONObject.unescapedUrl;
        tbUrl = aJSONObject.tbUrl;
    }
    
    return self;
}

/*!
    Returns an array of images built from an array of JSON objects
*/
+ (CPArray)imagesFromJSONObjects:(id)someJSONObjects
{
    var images = [[CPArray alloc] init];
    
    if (someJSONObjects) {
        for (var i=0; i < someJSONObjects.length; i++) {
            var image = [[GoogleImage alloc] initFromJSONObject:someJSONObjects[i]];
            [images addObject:image];
        };
    }
    
    return images;
}

@end
