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
    result += "\<optgroup hidden\>";
    for(myItem of session.availableBlocks) {
        var myColor = "";

        if(meta[myItem.split("/")[0]]) {
            myColor = meta[myItem.split("/")[0]].color;
        }

        if(myItem.split("/")[0] != lastItemModule) {
            result += "\</optgroup\>";
            result += "\<optgroup style='color:" + myColor + "' label='" + myItem.split("/")[0] + "'>";
        }

        if(document.getElementById(myItem).getAttribute("internal") != "internal") {
            result += "\<option title='" + returnValue(myItem) + "' value="+myItem+"\>";
            result += myItem.split("/")[1];
            result += "\</option\>";
            result += "\n";
        }

        var lastItemModule = myItem.split("/")[0];
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
            myBlock.innerHTML = document.getElementById("core-edit/headbar").innerHTML + myBlock.innerHTML;
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