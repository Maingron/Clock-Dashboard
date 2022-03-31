function deleteBlock(which) {
    console.log(which);
    config.myWatchface.splice(which.id,1);
    saveConfig();
    initBlocks();
    initEventListeners_edit();
    tick();
}

function toggleEditMode(edittruefalse = !config.edit_mode) {
    config.edit_mode = edittruefalse;
    saveConfig();
    window.location.reload();
}

function buildAvailableBlocksMenu() {
    var result = [];
    result += "<select>";
    for(myItem of session.availableBlocks) {
        result += "\<option value="+myItem+"\>";
        result += myItem;
        result += "\</option\>";
        result += "\n";
    }
    result += "</select>";
    return result;
}

function createBlock(type) {
    var myNewBlock = {
        "type": type,
        "x": "50%",
        "y": "50%",
        "id": config.myWatchface.length
    }
    config.myWatchface.push(myNewBlock);
    saveConfig();
    initBlocks();
    initEventListeners_edit();
    tick();
}

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

function initEventListeners_edit() {
    if(!config.edit_mode) {
        return;
    }

    document.addEventListener("mousemove", function(event) {
        session.mouseX = event.clientX;
        session.mouseY = event.clientY;
        dragBlock(session.selectedBlock);
    });
    
    document.addEventListener("mouseup", function(event) {
        session.mouseDown = false;
        dragBlock(session.selectedBlock);
    });

    for(myBlock of e.blocks) {
        if(myBlock.getAttribute("editable") != "false") {
            myBlock.innerHTML = document.getElementById("headbar").innerHTML + myBlock.innerHTML;
            myBlock.getElementsByClassName("move")[0].addEventListener("mousedown", function(event) {
                session.mouseDown = true;
                session.mouseDownOn = event.srcElement;
                myMovingBlockOffsetX = event.layerX;
                myMovingBlockOffsetY = event.layerY;
                dragBlock();
                event.preventDefault();
            });
        }

    
        myBlock.addEventListener("mousedown", function() {
            selectBlock(this);
        });
    }
}