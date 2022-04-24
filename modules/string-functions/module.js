meta["string-functions"] = {
    "color": "lightgray",
    "name": "String Functions",
    "required": true
}


/**
* Returns desired String with minimal desired length
* @param {string|number} myString desired string or number
* @param {number} lengthOfString desired length of string. Will be this long, or longer if it's already longer
* @param {char} char desired char
* @param {boolean} prependAppend prepend or append desired char to input String?
* @returns {string} input, but longer
*/
function fillEmptyChars(myString, lengthOfString, char = "0", prependAppend = "prepend") {
    myString = "" + myString; // Make sure we're working with a string and not a number
    char = "" + char; // Make sure our char is also handled as a string
    if(myString.length < lengthOfString) {
        while(lengthOfString > myString.length) {
            if(prependAppend == "prepend") {
                myString = "" + char + myString;
            } else if(prependAppend == "append") {
                myString = "" + myString + char;
            }
        }
    }

    return myString;
}
