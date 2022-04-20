function deleteBlock(which) {
    config.myWatchface.splice(which.id,1);
    saveConfig();
    initBlocks();
    initEventListeners_edit();
    if(config.tps != 0) {
        tick();
    }
}

function toggleEditMode(edittruefalse = !config.edit_mode) {
    config.edit_mode = edittruefalse;
    saveConfig();
    window.location.reload();
}

function createNewBlock(type) {
    var myNewBlock = {
        "type": type,
        "x": (config.gridX * (Math.floor((document.body.offsetWidth / config.gridX) / 2))) + "px",
        "y": (config.gridX * (Math.floor((document.body.offsetHeight / config.gridX) / 2))) + "px",
        "w": "auto",
        "h": "auto",
        "id": config.myWatchface.length
    }
    config.myWatchface.push(myNewBlock);
    saveConfig();
    initBlocks();
    initEventListeners_edit();
    if(config.tps != 0) {
        tick();
    }
}

function initEdit() {
    document.body.classList.add("edit_mode");
    e.moveoverlay = document.getElementById("moveoverlay");
    initEventListeners_edit();
    initEditRegisterJSRenderers();

}

function dragBlock(which) {
    if(session.mouseDown) {
        document.body.classList.add("mousedown");
        if(session.mouseDownOn && session.mouseDownOn.parentElement.parentElement && isSelectedBlock(session.mouseDownOn.parentElement.parentElement)) {
            setBlockSetting(which, "x", (gridifyValue(myMovingBlockOffsetX + (session.mouseX - session.mouseXinitial))) + "px");
            setBlockSetting(which, "y", (gridifyValue(myMovingBlockOffsetY + (session.mouseY - session.mouseYinitial))) + "px");
        }
    } else {
        document.body.classList.remove("mousedown");
    }
}

function gridifyValue(value) {
    return Math.round(value / config.gridX) * config.gridX;
}

function initEventListeners_edit() {
    if(!config.edit_mode) {
        return;
    }

    document.addEventListener("mousemove", function(event) {
        session.mouseX = gridifyValue(event.clientX);
        session.mouseY = gridifyValue(event.clientY);
        dragBlock(session.selectedBlock);
    });
    
    document.addEventListener("mouseup", function(event) {
        session.mouseDown = false;
        dragBlock(session.selectedBlock);
    });

    for(myBlock of e.blocks) {
        if(myBlock.getAttribute("editable") != "false") {
            addEditBar(myBlock);
        }

        myBlock.addEventListener("mousedown", function() {
            selectBlock(this);
        });
    }
}

function addEditBar(which) {
    if(which.getElementsByClassName("headbar").length > 0) { // We need this, else we spend the entire day searching for why it's not eventlistening sometimes
        return;
    }
    which.innerHTML = document.getElementById("core-edit/headbar").innerHTML + which.innerHTML;
    which.getElementsByClassName("move")[0].addEventListener("mousedown", function(event) {
        session.mouseDown = true;
        session.mouseXinitial = gridifyValue(session.mouseX);
        session.mouseYinitial = gridifyValue(session.mouseY);
        session.mouseDownOn = event.srcElement;
        myMovingBlockOffsetX = session.mouseDownOn.parentElement.parentElement.offsetLeft;
        myMovingBlockOffsetY = session.mouseDownOn.parentElement.parentElement.offsetTop;
        selectBlock(this);
        dragBlock(which);
        event.preventDefault();
    });
}

function headbar_updateEditExpandSettings(which) {
    which = getBlockByChild(which);
    which.getElementsByClassName("hb-x")[0].value = getBlockSetting(which, "x");
    which.getElementsByClassName("hb-y")[0].value = getBlockSetting(which, "y");
    which.getElementsByClassName("hb-w")[0].value = getBlockSetting(which, "w");
    which.getElementsByClassName("hb-h")[0].value = getBlockSetting(which, "h");
    which.getElementsByClassName("hb-f-c")[0].value = getBlockSetting(which, "f-c");
    which.getElementsByClassName("hb-f-s")[0].value = parseFloat(getBlockSetting(which, "f-s"));
    which.getElementsByClassName("hb-f-s")[0].setAttribute("step", .25);
    which.getElementsByClassName("hb-f-s")[0].setAttribute("min", .25);
    which.getElementsByClassName("hb-f-s")[0].setAttribute("title", getBlockSetting(which, "f-s"));

    which.getElementsByClassName("hb-custom")[0].innerHTML = getTemplateSettings(which); // Custom settings defined in each templates <settings> section (optional)
}

function headbar_saveEditExpandSettings(which, prepend = "", append = "") {
    var myBlockId = which.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    var myBlock = config.myWatchface[myBlockId];
    var attribute = which.getAttribute("issetting");
    var value = which.value;
    
    // myBlock[mySettingName] = which.value;

    setBlockSetting(myBlockId, attribute, (prepend + value + append));
    renderBlockSetting(myBlockId, attribute);

    saveConfig();
}