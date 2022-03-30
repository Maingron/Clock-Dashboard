function isSelectedBlock(which) {
    return document.getElementsByClassName("selected")[0] == which; // Returns true or false
}

function initEdit() {
    document.body.classList.add("edit_mode");
    e.moveoverlay = document.getElementById("moveoverlay");
    initEventListeners_edit();
}

function selectBlock(which) {
    session.selectedBlock = which;
    for(var i = 0; document.getElementsByClassName("selected").length > i; i++) {
        document.getElementsByClassName("selected")[document.getElementsByClassName("selected").length - 1].classList.remove("selected");
    }
    document.getElementById(which).classList.add("selected");
}

function moveBlock() {
    if(session.mouseDown) {
        document.body.classList.add("mousedown");
        if(session.mouseDownOn && session.mouseDownOn.parentElement.parentElement && session.mouseDownOn.parentElement.parentElement.classList.contains("selected")) {
            var myMovingBlock = session.mouseDownOn.parentElement.parentElement;
            config.myWatchface[myMovingBlock.id - 1].x = (session.mouseX - myMovingBlockOffsetX) + "px";
            config.myWatchface[myMovingBlock.id - 1].y = (session.mouseY - myMovingBlockOffsetY + session.one_rem) + "px";
            myMovingBlock.style.left = config.myWatchface[myMovingBlock.id - 1].x;
            myMovingBlock.style.top = config.myWatchface[myMovingBlock.id - 1].y;
            saveConfig();
        }
    } else {
        document.body.classList.remove("mousedown");
    }
}