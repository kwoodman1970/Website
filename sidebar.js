// ============================================================================================
//
// sidebar.js -- Implements a Sidebar
//
// ============================================================================================

/*
A sidebar, as implemented with this script and the "sidebar.css" & "sidebarie.css" stylesheets,
is a UI panel that appears on the side of the browser's display area when the mouse moves over
the bit that protrudes, and disappears again when the mouse moves off of it.

There can be only one sidebar per page.

This script will execute on browsers that comply with the W3C DOM and ECMAScript standards, and
supports non-standards-compliant versions of Internet Explorer (comments indicate how).
*/

// ============================================================================================
// HOW TO USE
// ============================================================================================

/*
In the HTML code's <HEAD> section, add the following lines (note the "DEFER" attribute in the
<SCRIPT> tag):

  <LINK REL="stylesheet" TYPE="text/css" HREF="sidemenu.css">
  <SCRIPT TYPE="text/javascript" SRC="sidemenu.js" DEFER></SCRIPT>

In the HTML code's <BODY> section, create a block element (perhaps a <DIV>) whose ID is
"Sidebar".  An optional inner block element whose ID is "SidebarTab" can be used to put
something on the part of the sidebar that's visible -- a word or an image, perhaps.  For
example:

  <DIV ID="Sidebar">
    <DIV ID="SidebarTab">Menu</DIV>

    <P>Donuts:</P>

    <UL>
      <LI>Plain</LI>
      <LI>Chocolate</LI>
      <LI>Maple Glazed</LI>
      <LI>Chocolate Glazed</LI>
      <LI>Frosted</LI>
      <LI>Coconut</LI>
      <LI>Cruller</LI>
      <LI>Mmmm, Forbidden</LI>
    </UL>

    <P>Mmmm... forbidden donut...</P>
  </DIV>
*/

// ============================================================================================
// DESIGN NOTES
// ============================================================================================

/*
This script implements the event handlers needed to display the sidebar when the mouse moves
over it, and hide it again when the mouse moves off of it.

The sidebar is implemented as a block element -- perhaps a <DIV> -- whose position is fixed at
mostly past the left edge of the browser's display area.  The "Sidebar_show()" and
"Sidebar_hide()" event handlers are attached to the element's "mouseover" and "mouseout"
events.

When the mouse moves over the part that's visible, the "Sidebar_show()" event handler moves the
whole element into view by adjusting its "style.left" DOM property.  When the mouse moves off
of it, the ""Sidebar_hide()" event handler shifts it back again by the same means.
*/

// ============================================================================================
// EVENT HANDLERS
// ============================================================================================

/*********************************************************************************************/

function Sidebar_show(eventInfo)

/*
This function shows the sidebar.  "eventInfo" is the event that triggers this function.
*/

{
  /*
  This function works by changing the sidebar's "style.left" DOM property to 0 pixels, thus
  bringing it into view.  The element is retrieved from "eventInfo".
  */

  var sidebarElement;                                         // the element to shift into view

  /*
  Some versions of Internet Explorer use "sidebarElement.srcElement" instead of
  "sidebarElement.currentTarget".
  */

  sidebarElement = (eventInfo.currentTarget ? eventInfo.currentTarget : eventInfo.srcElement);
  sidebarElement.style.left = "0px";

  return;
}

/*********************************************************************************************/

function Sidebar_hide(eventInfo)

/*
This function hides the sidebar.  "eventInfo" is the event that triggers this function.
*/

{
  /*
  This function works by removing the sidebar's "style.left" DOM property, thus returning it to
  the position specified in "sidebar.css" and/or "sidebarie.css".  The element is retrieved
  from "eventInfo".
  */

  var sidebarElement;                                       // the element to shift out of view

  /*
  Some versions of Internet Explorer use "sidebarElement.srcElement" instead of
  "sidebarElement.currentTarget".
  */

  sidebarElement = (eventInfo.currentTarget ? eventInfo.currentTarget : eventInfo.srcElement);
  sidebarElement.style.left = null;

  return;
}

// ============================================================================================
// FUNCTIONS
// ============================================================================================

/*********************************************************************************************/

function Sidebar_addEventHandlers(sidebarElement)

/*
This function attaches the event handlers to the element "sidebarElement".
*/

{
  if (sidebarElement != null)
  {
    /*
    "Sidebar_show()" is attached to the "mouseover" event and "Sidebar_hide()" is attached to
    the "mouseout" event so that they can move the sidebar element into view  when the mouse is
    moved over the sidebar and move it back again when the mouse is moved out.

    Some versions of Internet Explorer use "sidebarElement.attachEvent()" instead of
    "eventInfo.addEventListener()".
    */

    if (sidebarElement.addEventListener != null)
    {
      sidebarElement.addEventListener("mouseover", Sidebar_show, false);
      sidebarElement.addEventListener("mouseout", Sidebar_hide, false);
    }
    else
    {
      sidebarElement.attachEvent("onmouseover", Sidebar_show, false);
      sidebarElement.attachEvent("onmouseout", Sidebar_hide, false);
    }
  }

  return;
}

// ============================================================================================
// MAIN BODY
// ============================================================================================

/*
This section can only be executed AFTER the document tree has been parsed by the browser,
which is why the "DEFER" attribute MUST be included in the <SCRIPT> tag that imports this file.

The only thing that needs to be done is to attach the event handlers to the sidebar element --
then it's good to go!
*/

Sidebar_addEventHandlers(document.getElementById("SideBar"));
