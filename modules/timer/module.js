loadHTMLTemplate("modules/timer/templates.html");

function getTimerStart(which) {
    var myStart = getBlockSetting(which, "timerstart");
    return myStart;
}

function getTimerStop(which) {
    var myStop = getBlockSetting(which, "timerstop");

    if(myStop == undefined || isNaN(myStop) || !myStop) { // If we don't have a stop timestamp
        // This temporarily sets the stop timestamp to the current time.
        // We want this because we want to see the elapsed time without needing to stop the timer
        myStop = time.getTime();
    }

    return myStop;
}

function setTimerStart(which, when) {
    which = getBlockByChild(which);
    setBlockSetting(which, "timerstart", when);
}

function setTimerStop(which, when = time.getTime()) {
    // Stops the timer
    // which = timer / child of timer
    // when = stop time; Default: Right now
    which = getBlockByChild(which);
    setBlockSetting(which, "timerstop", when);
}

function getTimerTime(which, raw = false) {
    // Returns the elapsed timer time
    // Returns either timestamp or new Date()
    which = getBlockByChild(which);

    var myTimerStart = getTimerStart(which);
    var myTimerStop = getTimerStop(which);

    var result = myTimerStop - myTimerStart;
    if(isNaN(result)) {
        result = 0;
    }
    if(!raw) {
        result = new Date(result);
    }
    return result;
}

function resetTimer(which) {
    // Resets the timer
    which = getBlockByChild(which);
    removeBlockSetting(which, "timerstart", true);
    removeBlockSetting(which, "timerstop", true);
}

function renderTimers() {
    var myTimers = document.getElementsByClassName("timer-time");

    for(myTimer of myTimers) {
        var myHours = getTimerTime(myTimer).getHours() - 1;
        myHours = fillEmptyChars(myHours, 2, "0", "prepend");

        var myMinutes = getTimerTime(myTimer).getMinutes();
        myMinutes = fillEmptyChars(myMinutes, 2, "0", "prepend");

        var mySeconds = getTimerTime(myTimer).getSeconds();
        mySeconds = fillEmptyChars(mySeconds, 2, "0", "prepend");

        var myFullTime = myHours + ":" + myMinutes + ":" + mySeconds;
        
        if(getBlockSetting(getBlockByChild(myTimer), "showMS") == true) {
            var myMS = getTimerTime(myTimer).getMilliseconds();
            myMS = fillEmptyChars(myMS, 3, "0", "prepend");
            myFullTime += "." + myMS;
        }

        myTimer.innerHTML = myFullTime;
    }
}

registerTicker(renderTimers);