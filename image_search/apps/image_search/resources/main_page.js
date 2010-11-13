// ==========================================================================
// Project:   ImageSearch - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

// This page describes the main user interface for your application.  
ImageSearch.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
      childViews: 'middleView topView bottomView'.w(),

      topView: SC.ToolbarView.design({
        layout: { top: 0, left: 0, right: 0, height: 36 },
        childViews: 'labelView'.w(),
        anchorLocation: SC.ANCHOR_TOP,
        labelView: SC.LabelView.design({
          layout: { centerY: 0, height: 24, left: 8, width: 200 },
          controlSize: SC.LARGE_CONTROL_SIZE,
          fontWeight: SC.BOLD_WEIGHT,
          valueBinding: "ImageSearch.currentImageController.title"
        })
      }),

      middleView: SC.SplitView.design({
        layout: { left: 0, top: 36, right: 0, bottom: 32 },
        layoutDirection: SC.LAYOUT_HORIZONTAL,
        autoresizeBehavior: SC.RESIZE_TOP_LEFT,
        defaultThickness: 0.8,
        //The list view is nested into the scrollview which is now in the splitview.
        topLeftView: SC.ScrollView.design({
          hasHorizontalScroller: NO,
          layout: { top: 36, bottom: 32, left: 0, right: 0 },
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
        }),
        topLeftMinThickness: 150,
        topLeftMaxThickness: 250,
        dividerView: SC.SplitDividerView.design({
            layout: {}
        }),
        //This view shows up on the right. It is a placeholder, later we will use a formview.
        bottomRightView: SC.ScrollView.design({
          layout: { left: 5, top: 36, right: 5, bottom: 32 },
          horizontalAlign: SC.ALIGN_CENTER,
          verticalAlign: SC.ALIGN_CENTER,
          canScale: YES,
          contentView: SC.ImageView.design({
              layout: { left: 0, top: 0, right: 0, bottom: 0 },
              valueBinding: "ImageSearch.currentImageController.unescapedUrl"
          })
        })
      }),

      bottomView: SC.ToolbarView.design({
        layout: { bottom: 0, left: 0, right: 0, height: 32 },
        anchorLocation: SC.ANCHOR_BOTTOM
      })
    })

});
