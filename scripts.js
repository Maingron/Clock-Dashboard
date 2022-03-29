function returnValue(which, isjs = false) {
    for(var i = 0; session.availableBlocks.length > i; i++) {
        var myAvailableBlock = session.availableBlocks[i];
        if(isjs) {
            return(eval(which));
        }
        if(which == myAvailableBlock) {
            return document.getElementById(myAvailableBlock).innerHTML;
        }
    }
    return "<error>"+ which + " not found in available blocks</error>";
}
