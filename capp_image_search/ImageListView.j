@import <AppKit/CPCollectionView.j>
 
@implementation ImageListView : CPCollectionView
{
    CPCollectionViewItem itemPrototype;
}
 
- (id)initWithFrame:(CGRect)aFrame
{
    self = [super initWithFrame:aFrame];
    if (self)
    {
        [self setBackgroundColor:[CPColor colorWithHexString:@"F2F2F2"]];
        [self setMinItemSize:CGSizeMake(226.0, 50.0)];
        [self setMaxItemSize:CGSizeMake(600.0, 50.0)];
        [self setAllowsMultipleSelection:NO];

        itemPrototype = [[CPCollectionViewItem alloc] init];
        [itemPrototype setView:[[ImageItemView alloc] initWithFrame:CGRectMakeZero()]];
        
        [self setItemPrototype:itemPrototype];
        [self setAutoresizingMask:CPViewWidthSizable];
    }
 
    return self;
}
 
- (id)getCurrentObject
{
    return [[self content] objectAtIndex:[self getSelectedIndex]] ;
}
 
- (int)getSelectedIndex
{
    return [[self selectionIndexes] firstIndex] ;
}
 
@end

/* -------- the item view (the view the represents a single image) ---------- */
@implementation ImageItemView : CPView
{
    CPImageView imageView;
    CPTextField descriptionField;
    id representedObject;
}

- (void)setRepresentedObject:(id)anObject
{

    
    if (!imageView)
    {
        imageView = [[CPImageView alloc] initWithFrame:CGRectMake(5.0, 5.0, 40.0, 40.0)];
        
        [imageView setImageScaling:CPScaleProportionally];
      
        [self addSubview:imageView];
    }
    
    [imageView setImage:[[CPImage alloc] initWithContentsOfFile:[anObject tbUrl]]];
    
    if (!descriptionField)
    {
        descriptionField = [[CPTextField alloc] initWithFrame:CGRectMake(50.0, 20.0, 195.0, 20.0)];
        
        [descriptionField setFont:[CPFont boldSystemFontOfSize:12.0]];
        [descriptionField setTextColor:[CPColor blackColor]];
        [descriptionField setAutoresizingMask:CPViewWidthSizable]; 
        [self addSubview:descriptionField];
    }
    
    representedObject = anObject;

    
    [descriptionField setStringValue:[anObject title]];
    
    [self setTextColor:representedObject isSelected:NO];
}

- (void)setSelected:(BOOL)isSelected
{
    [self setBackgroundColor:isSelected ? [CPColor colorWithHexString:@"045FB4"] : nil];
    [self setTextColor:representedObject isSelected:isSelected];
}

- (void)setTextColor:(id)anObject isSelected:(BOOL)isSelected {

        [descriptionField setTextColor:isSelected ? [CPColor whiteColor] : [CPColor blackColor]];
    
}

@end