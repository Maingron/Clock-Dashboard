loadHTMLTemplate("modules/timer/templates.html");

function getSWStart(which) {
    /**
    * Returns time of when desired stopwatch started
    * @param which block of desired stopwatch
    * @returns {number} time of when desired stopwatch started
    */

    var myStart = getBlockSetting(which, "swstart");
    return myStart;
}

function getSWStop(which) {
    /**
    * Returns time of when desired stopwatch stopped or how late it is right now
    * @param which block of desired stopwatch
    * @returns {number} time of when desired stopwatch stopped or how late it is right now
    */

    var myStop = getBlockSetting(which, "swstop");

    if(myStop == undefined || isNaN(myStop) || !myStop) { // If we don't have a stop timestamp
        // This temporarily sets the stop timestamp to the current time.
        // We want this because we want to see the elapsed time without needing to stop the stopwatch
        myStop = time.getTime();
    }

    return myStop;
}

function setSWStart(which, when) {
    /**
    * Sets time of when desired stopwatch starts / Starts the stopwatch
    * @param which block of desired stopwatch
    * @param when timestamp of desired start
    */

    which = getBlockByChild(which);
    setBlockSetting(which, "swstart", when);
}

function setSWStop(which, when = time.getTime()) {
    /**
    * Sets time of when desired stopwatch stops / Stops the stopwatch
    * @param which block of desired stopwatch or a child of it
    * @param when timestamp of desired stop
    */

    which = getBlockByChild(which);
    setBlockSetting(which, "swstop", when);
}

function getSWTime(which, raw = false) {
    /**
    * Returns elapsed time of desired stopwatch
    * @param which block of desired stopwatch
    * @param {boolean} raw return raw output?
    * @returns either timestamp or new Date()
    */

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

function resetSW(which) {
    /**
    * Resets desired stopwatch
    * ! Resets stopwatch
    * @param which block of desired stopwatch
    */
    
    which = getBlockByChild(which);
    removeBlockSetting(which, "swstart", true);
    removeBlockSetting(which, "swstop", true);
}

function renderSWs() {
    /**
    * Renders all stopwatch blocks
    */
    
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
