// ============================================================================================
//
// slideshow.js -- Implements a slideshow on a web page
//
// ============================================================================================

/*
This script implements a slideshow on a web page.  Each image can have an optional hyperlink to
another URI.  The images in the slideshow rotate appearance at a fixed rate.  When the cursor
moves over an image, the slideshow pauses until the cursor is removed.  There are pips below
the images which, when the cursor moves over them, select which image in the slideshow to
display.

Only one slideshow per web page can exist.

This script depends on the "slideshow.css" file.

Ideally, all images should be the same size (which can be set in "slideshow.css"), but they
should at least all have the same aspect ratio.
*/

// ============================================================================================
// HOW TO USE
// ============================================================================================

/*
First, include both this file and the "slideshow.css" file in the <HEAD> section of the HTML
file.

Next, at the desired spot in the <BODY> section, add a <SCRIPT></SCRIPT> tag pair that includes
calls "slideshow.add(<imageURI>[, linkURI]);" for each image to include, followed by a call to
"slideshow.write(<interval_ms>);".  That's it!

Example:

  <SCRIPT TEXT="text/javascript">
    <!--
      slideshow.add("alpha.jpg");
      slideshow.add("beta.png", "/beta.html");
      slideshow.add("contact.svg", "mailto:null@null.com");

      slideshow.write(5000);  // 5000 ms = 5 second intervals
    //-->
  </SCRIPT>

*/

// ============================================================================================
// DESIGN NOTES
// ============================================================================================

/*
This script defines a class called "Slideshow" and declares a global variable called --
oddly enough -- "slideshow".  This object contains all of the information needed to run a
slideshow -- an array of image URI's and optional link URI's, the interval to wait before
showing the next slide, etc.

Each image is generated with class "Slideshow", which sets the "display" style attribute to
"none".  Images are displayed and hidden by changing their DOM ".style.display" attributes to
"inline-block" and null, respectively.

Pips are generated as empty "<DIV>" elements with class "Slideshow_Pip", and their appearance
is defined by that class's style sheet.  The pip that represents the image that's currently
displayed will have its DOM ".className" attribute changed to "Slideshow_Pip_Current".
*/

// ============================================================================================
// GLOBAL VARIABLES
// ============================================================================================

var slideshow = new Slideshow();                             // the slideshow management object

// ============================================================================================
// SLIDESHOW PUBLIC METHODS
// ============================================================================================

/*********************************************************************************************/

function Slideshow()

/*
This is the constructor.  "uid" is a unique slideshow identifier (one -- and only one -- can be
null).
*/

{
  // Public members:

  this.interval = 0;              // period (in ms) to display an image before switching

  // Private members:

  this._slides   = new Array;     // array of image and hyperlink URI's
  this._current  = 0;             // index into slides array of image currently being displayed
  this._timer    = null;          // handle to system interval manager

  return;
}

/*********************************************************************************************/

Slideshow.prototype.addSlide = function(imageUrl, linkUrl)

/*
This method adds an image and optional hyperlink to the slideshow.  Images will be displayed in
the order in which they're added.

"imageUrl" is the URI for the image, and "linkUrl" is the URI for the hyperlink.
*/

{
  var newSlideIndex = this._slides.length;    // index into slides array of next unused element

  this._slides[newSlideIndex]          = new Object;
  this._slides[newSlideIndex].imageUrl = imageUrl;
  this._slides[newSlideIndex].linkUrl  = linkUrl;

  return;
}

/*********************************************************************************************/

Slideshow.prototype.write = function(interval)

/*
This method writes the slideshow's HTML code into the document body and starts the slideshow.
"interval" is the amount of time (in ms) that an image will be displayed before the next image
is displayed.

The generated HTML code will look like this:

  <DIV CLASS="Slideshow">
  <IMG ID="slideshow_0" CLASS="Slideshow" STYLE="display:inline-block;" SRC="alpha.jpg" ALT=""
    ONMOUSEOVER="javascript:slideshow._pause(); return;"
    ONMOUSEOUT="javascript:slideshow._play(); return;">
  <IMG ID="slideshow_1" CLASS="Slideshow" SRC="beta.png" ALT=""
    ONMOUSEOVER="javascript:slideshow._pause(); return;"
    ONMOUSEOUT="javascript:slideshow._play(); return;"
    ONCLICK="window.open('/beta.html); return;">
  <IMG ID="slideshow_2" CLASS="Slideshow" SRC="contact.svg" ALT=""
    ONMOUSEOVER="javascript:slideshow._pause(); return;"
    ONMOUSEOUT="javascript:slideshow._play(); return;"
    ONCLICK="window.open('mailto:null@null.com'); return;">
  <BR>
  <DIV ID="slideshow_pip_0" CLASS="Slideshow_Pip_Current"
    ONMOUSEOVER="slideshow._pause(); slideshow._select(0); return;"
    ONMOUSEOUT="slideshow._play(); return;"></DIV>
  <DIV ID="slideshow_pip_1" CLASS="Slideshow_Pip"
    ONMOUSEOVER="slideshow._pause(); slideshow._select(1); return;"
    ONMOUSEOUT="slideshow._play(); return;"></DIV>
  <DIV ID="slideshow_pip_2" CLASS="Slideshow_Pip"
    ONMOUSEOVER="slideshow._pause(); slideshow._select(2); return;"
    ONMOUSEOUT="slideshow._play(); return;"></DIV>
  </DIV>
*/

{
  document.write("<DIV CLASS=\"Slideshow\">\n");

  if (this._slides.length > 0)
  {
    /*
    This loop generates the HTML code for the images.  Image 0 (the first image) is displayed.
    */

    for (var i = 0; i < this._slides.length; ++i)
    {
      document.write("<IMG ID=\"slideshow_" + i + "\" CLASS=\"Slideshow\"");

      if (i == 0)
        document.write(" STYLE=\"display:inline-block;\"");

      document.write(" SRC=\"" + this._slides[i].imageUrl + "\" ALT=\"\" " +
        "ONMOUSEOVER=\"javascript:slideshow._pause(); return;\" " +
        "ONMOUSEOUT=\"javascript:slideshow._play(); return;\"");

      if (this._slides[i].linkUrl != null)
        document.write(" ONCLICK=\"javascript:window.open(\'" + this._slides[i].linkUrl +
          "\', \'_self\'); return;\"");

       document.write(">");
    }

    document.write("<BR>\n");

    /*
    This loop generates the HTML code for the pips.  Pip 0 (the first pip) is marked as the
    current pip.
    */

    for (var i = 0; i < this._slides.length; ++i)
    {
      document.write("<DIV ID=\"slideshow_pip_" + i + "\" CLASS=\"Slideshow_Pip" +
        (i == 0 ? "_Current" : "") +
        "\" ONMOUSEOVER=\"slideshow._pause(); slideshow._select(" + i +
        "); return;\" ONMOUSEOUT=\"slideshow._play(); return;\"></DIV>");
    }

    document.write("\n");

    /*
    Now that all of the images and pips have been generated, it's time to start the slideshow!
    */

    this.interval = interval;
    this._play();
  }

  document.write("</DIV>");

  return;
}

// ============================================================================================
// SLIDESHOW PRIVATE METHODS
// ============================================================================================

/*********************************************************************************************/

Slideshow.prototype._play = function()

/*
This method starts creates a system timer that calls "Slideshow._next()" at the interval
specified when "Slideshow.write()" was called.
*/

{
  /*
  This function works by passing an anonymous function that calls "slideshow._next()" (that's a
  method of the global "Slideshow" object) to "window.setInterval()".
  */

  //this._timer = window.setInterval(function(slideshow){slideshow._next();}, this.interval,
  //  this);

  this._timer = window.setInterval(function(){slideshow._next();}, this.interval);
}

/*********************************************************************************************/

Slideshow.prototype._pause = function()

/*
This method stops the slideshow.  It's typically called when the cursor is moved over an image
or a pip.
*/

{
  /*
  This method works by clearing the system interval timer.
  */

  window.clearInterval(this._timer);
}

/*********************************************************************************************/

Slideshow.prototype._next = function()

/*
This method hides the current slide and displays the next slide.  It's typically called by a
system timer (created by "Slideshow._play()") at the interval specified when
"Slideshow.write()" was called.
*/

{
  /*
  Code re-use at its finest -- let the "Slideshow._select()" method do all the work!
  */

  this._select((this._current + 1) % this._slides.length);

  return;
}

/*********************************************************************************************/

Slideshow.prototype._select = function(slideNo)

/*
This method hides the current image and displays the image specified by "slideNo".  Images are
in the same order as "Slideshow.add()" was called.
*/

{
  var element;                // an HTML image or division element that's part of the slideshow

  /*
  The algorithm is straightforward enough:  hide the current image by nullifying its
  "style.display" attribute (letting the "none" value from the "IMG.Slideshow" CSS rule cascade
  through) and changing the current pip's CSS class to "Slideshow_Pip", then show the new image
  by setting its "style.display" attribute to "inline-block" and changing the new pip's CSS
  class to "Slideshow_Pip_Current".
  */

  element = document.getElementById("slideshow_" + this._current);

  if (element.style.removeAttribute != null)
    element.style.removeAttribute("display");               // Microsoft HAS to be different...
  else
    element.style.display = null;

  element = document.getElementById("slideshow_pip_" + this._current);
  element.className = "Slideshow_Pip";

  this._current = slideNo;

  element = document.getElementById("slideshow_" + this._current);
  element.style.display = "inline-block";

  element = document.getElementById("slideshow_pip_" + this._current);
  element.className = "Slideshow_Pip_Current";

  return;
}
