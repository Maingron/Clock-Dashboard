/**
 * @module timer
 * @package
 */

loadHTMLTemplate("modules/timer/templates.html");


/**
* Returns time of when desired stopwatch started
* @param which block of desired stopwatch
* @returns {number} time of when desired stopwatch started
*/
function getSWStart(which) {
    var myStart = getBlockSetting(which, "swstart");
    return myStart;
}


/**
* Returns time of when desired stopwatch stopped or how late it is right now
* @param which block of desired stopwatch
* @returns {number} time of when desired stopwatch stopped or how late it is right now
*/
function getSWStop(which) {
    var myStop = getBlockSetting(which, "swstop");

    if(myStop == undefined || isNaN(myStop) || !myStop) { // If we don't have a stop timestamp
        // This temporarily sets the stop timestamp to the current time.
        // We want this because we want to see the elapsed time without needing to stop the stopwatch
        myStop = time.getTime();
    }

    return myStop;
}


/**
* Sets time of when desired stopwatch starts / Starts the stopwatch
* @param which block of desired stopwatch
* @param when timestamp of desired start
*/
function setSWStart(which, when) {
    which = getBlockByChild(which);
    setBlockSetting(which, "swstart", when);
}


/**
* Sets time of when desired stopwatch stops / Stops the stopwatch
* @param which block of desired stopwatch or a child of it
* @param when timestamp of desired stop
*/
function setSWStop(which, when = time.getTime()) {
    which = getBlockByChild(which);
    setBlockSetting(which, "swstop", when);
}


/**
* Returns elapsed time of desired stopwatch
* @param which block of desired stopwatch
* @param {boolean} raw return raw output?
* @returns either timestamp or new Date()
*/
function getSWTime(which, raw = false) {
    which = getBlockByChild(which);

    var mySWStart = getSWStart(which);
    var mySWStop = getSWStop(which);

    var result = mySWStop - mySWStart;
    if(isNaN(result)) {
        result = 0;
    }
    if(!raw) {
        result = new Date(result);
    }
    return result;
}


/**
* Resets desired stopwatch
* ! Resets stopwatch
* @param which block of desired stopwatch
*/
function resetSW(which) {
    which = getBlockByChild(which);
    removeBlockSetting(which, "swstart", true);
    removeBlockSetting(which, "swstop", true);
}


/**
* Renders all stopwatch blocks
*/
function renderSWs() {
    var mySWs = document.getElementsByClassName("sw-time");

    for(mySW of mySWs) {

        var myDays = getSWTime(mySW).getDate() - 1;
        if(myDays == 0) {
            myDays = "";
        } else {
            myDays = myDays + ":";
        }

        var myHours = getSWTime(mySW).getHours() - 1;
        myHours = fillEmptyChars(myHours, 2, "0", "prepend");

        var myMinutes = getSWTime(mySW).getMinutes();
        myMinutes = fillEmptyChars(myMinutes, 2, "0", "prepend");

        var mySeconds = getSWTime(mySW).getSeconds();
        mySeconds = fillEmptyChars(mySeconds, 2, "0", "prepend");

        var myFullTime = myDays + myHours + ":" + myMinutes + ":" + mySeconds;
        
        if(getBlockSetting(getBlockByChild(mySW), "showMS") == true) {
            // If user wants to see milliseconds:
            var myMS = getSWTime(mySW).getMilliseconds();
            myMS = fillEmptyChars(myMS, 3, "0", "prepend");
            myFullTime += "." + myMS;
        }

        mySW.innerHTML = myFullTime;
    }
}

registerTicker(renderSWs);
