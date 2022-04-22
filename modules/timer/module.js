loadHTMLTemplate("modules/timer/templates.html");

function getSWStart(which) {
    var myStart = getBlockSetting(which, "swstart");
    return myStart;
}

function getSWStop(which) {
    var myStop = getBlockSetting(which, "swstop");

    if(myStop == undefined || isNaN(myStop) || !myStop) { // If we don't have a stop timestamp
        // This temporarily sets the stop timestamp to the current time.
        // We want this because we want to see the elapsed time without needing to stop the stopwatch
        myStop = time.getTime();
    }

    return myStop;
}

function setSWStart(which, when) {
    which = getBlockByChild(which);
    setBlockSetting(which, "swstart", when);
}

function setSWStop(which, when = time.getTime()) {
    // Stops the timer
    // which = timer / child of timer
    // when = stop time; Default: Right now
    which = getBlockByChild(which);
    setBlockSetting(which, "swstop", when);
}

function getSWTime(which, raw = false) {
    // Returns the elapsed stopwatch time
    // Returns either timestamp or new Date()
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
    // Resets the stopwatch
    which = getBlockByChild(which);
    removeBlockSetting(which, "swstart", true);
    removeBlockSetting(which, "swstop", true);
}

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
            var myMS = getSWTime(mySW).getMilliseconds();
            myMS = fillEmptyChars(myMS, 3, "0", "prepend");
            myFullTime += "." + myMS;
        }

        mySW.innerHTML = myFullTime;
    }
}

registerTicker(renderSWs);