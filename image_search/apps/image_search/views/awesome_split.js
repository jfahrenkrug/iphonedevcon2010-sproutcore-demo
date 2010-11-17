// ==========================================================================
// Project:   ImageSearch.AwesomeSplitView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
ImageSearch.AwesomeSplitView = SC.SplitView.extend(
/** @scope ImageSearch.AwesomeSplitView.prototype */ {
  
  collapseTopLeftView: function(yn) {
    if (yn) {
      return this.collapseView(this._topLeftView);
    } else {
      return this.uncollapseView(this._topLeftView);
    }
  },
  
  collapseBottomRightView: function(yn) {
    if (yn) {
      return this.collapseView(this._bottomRightView);
    } else {
      return this.uncollapseView(this._bottomRightView);
    }
  },

  collapseView: function(view) {
    if (view !== this._topLeftView && view !== this._bottomRightView) {
      return NO;
    }
    
    this._cacheCurrentDimensions();
    
    var isCollapsed = view.get('isCollapsed') || NO ;
    
    if (!isCollapsed && this.canCollapseView(view)) {
      // remember thickness in it's uncollapsed state
      this._uncollapsedThickness = this.thicknessForView(view)  ;
      this._uncollapsedDividerThickness = this.get('dividerThickness');
      
      if (view === this._topLeftView) {
        this._updateTopLeftThickness(this.topLeftThickness()*-1) ;
      } else {
        this._updateBottomRightThickness(this.bottomRightThickness()*-1) ;
      }
      
      // if however the splitview decided not to collapse, clear:
      if (!view.get("isCollapsed")) {
        this._uncollapsedThickness = null;
        return NO;
      }
      
      this.set('dividerThickness', 0);
      this.updateChildLayout();
      return YES;
    } 
    
    return NO;
  },
  
  uncollapseView: function(view) {
    if (view !== this._topLeftView && view !== this._bottomRightView) {
      return NO;
    }
    
    var isCollapsed = view.get('isCollapsed') || NO ;

    if (isCollapsed) {
      this.set('dividerThickness', (this._uncollapsedDividerThickness || 7));
      this._cacheCurrentDimensions();
      // uncollapse to the last thickness in it's uncollapsed state
      if (view === this._topLeftView) {
        this._updateTopLeftThickness(this._uncollapsedThickness) ;
      } else {
        this._updateBottomRightThickness(this._uncollapsedThickness) ;
      }
      view._uncollapsedThickness = null ;
      
      this.updateChildLayout();
    }
    
    return true;
  },
  
  /** @private */
  _cacheCurrentDimensions: function() {
    this._topLeftView = this.get('topLeftView') ;
    this._bottomRightView = this.get('bottomRightView') ;
    this._topLeftViewThickness = this.thicknessForView(this.get('topLeftView'));
    this._bottomRightThickness = this.thicknessForView(this.get('bottomRightView'));
    this._dividerThickness = this.get('dividerThickness') ;
    this._layoutDirection = this.get('layoutDirection') ;
  },
  
});
