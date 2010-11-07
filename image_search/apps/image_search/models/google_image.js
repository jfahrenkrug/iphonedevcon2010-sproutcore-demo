// ==========================================================================
// Project:   ImageSearch.GoogleImage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
ImageSearch.GoogleImage = SC.Record.extend(
/** @scope ImageSearch.GoogleImage.prototype */ {   
    content: SC.Record.attr(String),
    contentNoFormatting: SC.Record.attr(String),
    height: SC.Record.attr(Number),
    imageId: SC.Record.attr(String),
    originalContextUrl: SC.Record.attr(String),
    tbHeight: SC.Record.attr(Number),
    tbUrl: SC.Record.attr(String),
    tbWidth: SC.Record.attr(Number),
    title: SC.Record.attr(String),
    titleNoFormatting: SC.Record.attr(String),
    unescapedUrl: SC.Record.attr(String),
    url: SC.Record.attr(String),
    visibleUrl: SC.Record.attr(String),
    width: SC.Record.attr(Number)
}) ;
