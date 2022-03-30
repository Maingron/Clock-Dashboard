function tick() {
    time = new Date(); // Update time variable for use in templates and renders

    for(myItem_blocks of e.blocks) { // Update all visible blocks
        myItem_blocks_content = myItem_blocks.getElementsByTagName("content")[0];

        if(!isSelectedBlock(myItem_blocks)) { // Don't update currently selected block if in Edit mode
            myItem_blocks_content.innerHTML = returnValue(myItem_blocks.getAttribute("type"));
        }
    }

    for(myItem of session.tickFunctionArray) {
        myItem(); // Run 3rd-party registered functions
    }

    for(myItem_renders of e.renders) {
        if(myItem_renders.getAttribute("type") == "js") {
            myItem_renders.innerHTML = returnValue(myItem_renders.innerHTML, true);
        } else {
            myItem_renders.innerHTML = returnValue(myItem_renders.getAttribute("type"));
        }
    }
}

if(config.tps != 0) { // Set tick interval
    setInterval(function() {
        tick();
    }, 1000 / config.tps);
}
tick(); // Initial tick; Happens virtually instantly
