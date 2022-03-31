if(config.debug) {
    function tickDebug() {
        console.log("yes debug");
    }
    
    registerTicker(tickDebug);
}