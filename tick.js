function tick() {
    time = new Date();
    for(var i = 0; e.blocks.length > i; i++) {
        var myBlock = e.blocks[i];

        myBlock.innerHTML = returnValue(myBlock.getAttribute("type"));
    }

    if(config.debug) {
        tickDebug();
    }
}

setInterval(function() {
    tick();
}, 1000 / config.tps);
tick(); // Initial tick; Happens virtually instantly
