function tick() {
    time = new Date(); // Update time variable for use in templates and renders

    for(myItem of session.tickFunctionArray) {
        myItem(); // Run 3rd-party registered functions
    }

    for(myItem_renders of e.renders) {
        if(!isChildOfSelectedBlock(myItem_renders)) {
            if(myItem_renders.innerHTML != returnValue(myItem_renders.getAttribute("render"))) { // Only update on changed content
                myItem_renders.innerHTML = returnValue(myItem_renders.getAttribute("render"));
            }
        }
    }
    session.tickcount++;
}
