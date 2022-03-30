function initEdit() {
    document.body.classList.add("edit_mode");
    e.moveoverlay = document.getElementById("moveoverlay");
    initEventListeners_edit();
}

function dragBlock(which) {
    if(session.mouseDown) {
        document.body.classList.add("mousedown");
        if(session.mouseDownOn && session.mouseDownOn.parentElement.parentElement && isSelectedBlock(session.mouseDownOn.parentElement.parentElement)) {
            setBlockPosition(which, (session.mouseX - myMovingBlockOffsetX) + "px", (session.mouseY - myMovingBlockOffsetY + session.one_rem) + "px");
        }
    } else {
        document.body.classList.remove("mousedown");
    }
}