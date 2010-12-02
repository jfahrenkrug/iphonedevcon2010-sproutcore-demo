/*
 * AppController.j
 * Images
 *
 * Created by Johannes Fahrenkrug on Nov 29, 2010.
 * Copyright 2010, Springenwerk All rights reserved.
 */

@import <Foundation/CPObject.j>
@import "GoogleImage.j"
@import "ImagesController.j"
@import "ImageListView.j"

@implementation AppController : CPObject
{
    ImagesController imagesController;
    ImageListView    imageListView;
    CPTextField         coordinatesLabel;
    CPTextField         searchField;
    CPSplitView verticalSplitter;
    CPImageView imageView;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
        contentView = [theWindow contentView],
        bounds = [contentView bounds];
        
    verticalSplitter = [[CPSplitView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([contentView bounds]), CGRectGetHeight([contentView bounds]))];
[verticalSplitter setDelegate:self];
[verticalSplitter setVertical:YES]; 
[verticalSplitter setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ]; 
[contentView addSubview:verticalSplitter];

    var leftView = [[CPView alloc] initWithFrame:CGRectMake(0, 0, 250, CGRectGetHeight([verticalSplitter bounds]))];
  	[leftView setAutoresizingMask:CPViewHeightSizable ]; 
  	var rightView = [[CPView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([verticalSplitter bounds]) - 250, CGRectGetHeight([verticalSplitter bounds]))];
  	[rightView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ]; 

  	[verticalSplitter addSubview:leftView];
  	[verticalSplitter addSubview:rightView];
        
    // Make the background blue-ish.
    [contentView setBackgroundColor:[CPColor colorWithRed:212.0 / 255.0 green:221.0 / 255.0 blue:230.0 / 255.0 alpha:1.0]];

    
    //Create the ImagesController
    imagesController = [[ImagesController alloc] init];
    
    /* ------------ Images --------------- */
    imageListView = [[ImageListView alloc] initWithFrame:CGRectMake(0.0, 0.0, 250.0, 400.0)];
    [imageListView setContent:[imagesController images]];
    [imageListView setDelegate:imagesController];
    [imagesController setImageListView:imageListView];

    /* --------- Images ScrollView ---------- */
    var imageScrollView = [[CPScrollView alloc] initWithFrame:CGRectMake(0.0, 35.0, 250.0, CGRectGetHeight([verticalSplitter bounds]) - 35.0)];
    [imageScrollView setDocumentView:imageListView];
    [imageScrollView setAutohidesScrollers:YES];
    [[imageScrollView contentView] setBackgroundColor:[CPColor whiteColor]];
    [imageScrollView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ]; 
    [leftView addSubview:imageScrollView];

    /* ------------- Image View ----------------- */
    imageView = [[CPImageView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([rightView bounds]), CGRectGetHeight([rightView bounds]))];
    [imageView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ]; 
    [imageView setImageScaling:CPScaleProportionally];
    [imagesController setImageView:imageView];
    [rightView addSubview:imageView];
        
    /* ------------ Search Field ------------- */
    searchField = [CPTextField roundedTextFieldWithStringValue:@"" placeholder:@"Search Term" width:250.0];
    [searchField setFrameOrigin:CGPointMake(0.0, 5.0)];
    [searchField setDelegate:self];
    [searchField setAutoresizingMask:CPViewWidthSizable]; 
    [leftView addSubview:searchField];

    [theWindow orderFront:self];
}

- (void)controlTextDidEndEditing:(id)sender {
    if ([sender object] == searchField) {
        [self searchImage];
    } 
}

- (void)searchImage {
    if ([searchField stringValue]) {
      console.log('search');
      [imagesController search:[searchField stringValue]];
    }
}

@end
