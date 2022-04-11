meta["core-debug"] = {
    "color": "fuchsia",
    "name": "Debug"
}

if(config.debug) {
    function tickDebug() {
        console.log("yes debug");
    }
    
    registerTicker(tickDebug);
}