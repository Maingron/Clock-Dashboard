function tick() {
    time = new Date();
    for(var i = 0; e.blocks.length > i; i++) {
        var myBlock = e.blocks[i];
        var myContent = myBlock.getElementsByTagName("content")[0];

        myContent.innerHTML = returnValue(myBlock.getAttribute("type"));
    }

    if(session.mode == "edit") {
        tickEdit();
    }

    if(config.debug) { // If debug mode is enabled
        tickDebug();
    }
}

setInterval(function() {
    tick();
}, 1000 / config.tps);
tick(); // Initial tick; Happens virtually instantly
