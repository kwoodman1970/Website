// ============================================================================================
//
// mailto.js -- hides e-mail addresses from spam spiders
//
// ============================================================================================

/*
This script contains a function that generates an URL for an e-mail address in such a way that
it's hidden from all but the smartest of spam spiders.
*/

// ============================================================================================
// DESIGN NOTES
// ============================================================================================

/*
All characters in the URL are HTML character references.  All web browsers can deal with them,
but almost all spam spiders can't.
*/

// ============================================================================================
// PUBLIC FUNCTIONS
// ============================================================================================

/*********************************************************************************************/

function mailTo(localPart, domainPart)

/*
This function returns a string consisting of an e-mail address.  "localPart" (see Sec. 3.4.1 of
RFC 5322) is the name part (for example, a user ID) of the address and "domain" is the domain
part of the address.

"localPart" and "domainPart" MUST contain valid characters -- no error-checking is performed.
*/

{
  /*
  Character codes are used to protect agains smart spam spiders.
  */

  var transport = "&#109;&#97;&#105;&#108;&#116;&#111;&#58;";  // character codes for transport
  var at        = "&#64;";                                     // character code for at

  return transport + _MailTo_encode(localPart) + at + _MailTo_encode(domainPart);
}

// ============================================================================================
// PRIVATE FUNCTIONS
// ============================================================================================

/*********************************************************************************************/

function _MailTo_encode(plainText)

/*
This function converts "plainText" to an equivalent string of HTML character references.
*/

{
  /*
  The format of an HTML decimal character reference is "&#D;", where "D" is the decimal number
  of a character code in the document's character set (source:  sec. 5.3.1 of the W3C HTML 4.01
  specification).

  This funcion loops through every character in "plainText", converts it to the aforementioned
  format and appends it to "encodedText".
  */

  var characterReferencesText = "";                      // character references to be returned

  for (var i = 0; i < plainText.length; ++i)
    characterReferencesText = characterReferencesText + "&#" + plainText.charCodeAt(i) + ";";

  return characterReferencesText;
}