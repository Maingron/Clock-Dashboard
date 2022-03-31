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