// ============================================================================================
//
// quoteserver.js -- serves the requested number of quotes
//
// ============================================================================================

/*
This script works in conjunction with an <INPUT> element and a block element.  The idea is that
the user selects the number of quotes that they'd like in with <INPUT> element, then that
number of quotes is placed in the block element.

The <INPUT> element must be TYPE="NUMBER".  "MIN" must be 1; "MAX" must also be specified, and
can be any reasonable maximum number of quotes (100000, perhaps).

The "showQuotes()" function does all of the work -- it just needs to be called when needed.

This script requires that a CSS class called "Quotes" be provided separately to set the style
of the quotes -- a large font size is recommended.
*/

// ============================================================================================
// FUNCTIONS
// ============================================================================================

/*********************************************************************************************/

function showQuotes(numQuotesElementID, quotesZoneElementID)

/*
This function retrieves the number of quotes requested, then puts the quotes in the specified
block element.

"numQuotesElementID" is the ID of the <INPUT> element that contains the number of quotes.
"quotesZoneElementID" is the ID of the block eleement that will contain the quotes.

An exception is thrown if the specified elements aren't found in the document tree.
*/

{
  /*
  First, the specified elements are retrieved from the document tree.  Next, the number of
  quotes requested is retrieved from the <INPUT> element.
  */

  var numQuotesElement = document.getElementById(numQuotesElementID);
  var quotesZoneElement = document.getElementById(quotesZoneElementID);

  if ((numQuotesElement == null) || (quotesZoneElement == null))
    throw "Unable to find \"NumQuotes\" and/or \"QuotesZone\" in document tree.";
  else
  {
    var numQuotes = parseInt(numQuotesElement.value);
    var maxNumQuotes = parseInt(numQuotesElement.getAttribute("MAX"));

    if ((numQuotes < 1) || (numQuotes > maxNumQuotes))
      quotesZoneElement.innerHTML = "<P>You must specify a number between 1 and " +
        maxNumQuotes + "</P>";
    else
    {
      /*
      Finally, the quotes are generated and stuffed inside the block element.

      Here's the joke -- the quotes are just quotation marks!
      */

      var quotes = "\"";

      for (var i = 1; i < numQuotes; ++i)
        quotes += " \"";

      quotesZoneElement.innerHTML = "<P>You asked for " + numQuotes +
        " quote" + (numQuotes == 1 ? "... and here it is" : "s... and here they are") +
        "!</P><P CLASS=\"Quotes\">" + quotes + "</P>";
    }
  }

  return;
}