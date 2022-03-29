function tick() {
    time = new Date();
    for(var i = 0; e.blocks.length > i; i++) {
        var myBlock = e.blocks[i];
        var myContent = myBlock.getElementsByTagName("content")[0];

        myContent.innerHTML = returnValue(myBlock.getAttribute("type"));
    }

    for(var i = 0; tickFunctionArray.length > i; i++) {
        tickFunctionArray[i](); // Run 3rd-party registered functions
    }

    for(var i = 0; e.renders.length > i; i++) {
        var myRender = e.renders[i];
        console.log(myRender.getAttribute("type"));
        if(myRender.getAttribute("type") == "js") {
            myRender.innerHTML = returnValue(myRender.innerHTML, true);
        } else {
            myRender.innerHTML = returnValue(myRender.getAttribute("type"));
        }
    }

    if(session.mode == "edit") {
        tickEdit();
    }

    if(config.debug) { // If debug mode is enabled
        tickDebug();
    }
}

if(config.tps != 0) {
    setInterval(function() {
        tick();
    }, 1000 / config.tps);
}
tick(); // Initial tick; Happens virtually instantly
