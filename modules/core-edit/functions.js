
/**
* Deletes a block
* @param which desired block
*/
function deleteBlock(which) {
    config.myWatchface.splice(which.id,1);
    saveConfig();
    initBlocks();
    initEventListeners_edit();
    if(config.tps != 0) {
        tick();
    }
}


/**
* Toggles the edit mode
* @param {boolean} edittruefalse
*/
function toggleEditMode(edittruefalse = !config.edit_mode) {
    config.edit_mode = edittruefalse;
    saveConfig();
    window.location.reload();
}


/**
* Creates a new block
* @param type desired type
*/
function createNewBlock(type) {
    var myNewBlock = {
        "type": type,
        "x": (config.gridX * (Math.floor((document.body.offsetWidth / config.gridX) / 2))) + "px",
        "y": (config.gridX * (Math.floor((document.body.offsetHeight / config.gridX) / 2))) + "px",
        "w": "auto",
        "h": "auto",
        "id": config.myWatchface.length,
        "f-s": "1em"
        // "f-c": ""
    }
    config.myWatchface.push(myNewBlock);
    saveConfig();
    initBlocks();
    initEventListeners_edit();
    if(config.tps != 0) {
        tick();
    }
}


/**
* Initializes edit mode
*/
function initEdit() {
    document.body.classList.add("edit_mode");
    e.moveoverlay = document.getElementById("moveoverlay");
    initEventListeners_edit();
    initEditRegisterJSRenderers();
}


/**
* Drags a desired block
* @param which desired block
*/
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


/**
* Rounds a value to be within the grid system
* @param {number} value desired value to be converted
* @returns {number} gridified value
*/
function gridifyValue(value) {
    return Math.round(value / config.gridX) * config.gridX;
}


/**
* Initializes event listeners of edit mode
*/
function initEventListeners_edit() {
    if(!config.edit_mode) {
        return;
    }

    document.addEventListener("mousemove", function(event) {
        session.mouseX = gridifyValue(event.clientX);
        session.mouseY = gridifyValue(event.clientY);
        dragBlock(session.selectedBlock);
    });

    document.addEventListener("touchmove", function(event) {
        session.mouseX = gridifyValue(event.changedTouches[0].clientX);
        session.mouseY = gridifyValue(event.changedTouches[0].clientY);
        dragBlock(session.selectedBlock);
    });

    document.addEventListener("touchstart", function(event) {
        session.mouseX = gridifyValue(event.changedTouches[0].clientX);
        session.mouseY = gridifyValue(event.changedTouches[0].clientY);
        dragBlock(session.selectedBlock);
    });

    document.addEventListener("touchend", function(event) {
        session.mouseDown = false;
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

        myBlock.addEventListener("touchstart", function() {
            selectBlock(this);
        });

        myBlock.addEventListener("mousedown", function() {
            selectBlock(this);
        });
    }
}


/**
* Adds the edit bar to desired block
* @param which desired block
*/
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

    which.getElementsByClassName("move")[0].addEventListener("touchstart", function(event) {
        if(session.mouseDown != true) {
            session.mouseX = gridifyValue(event.changedTouches[0].clientX);
            session.mouseY = gridifyValue(event.changedTouches[0].clientY);
        }
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


/**
* Updates the settings within the headbar of desired block
* @param which desired block
*/
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


/**
* Saves desired setting found within the headbar of desired block. Can prepend and append to the value
* @param which desired block
* @param prepend prepend this to the value
* @param append append this to the value
*/
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


/**
* Toggles visibility of the settings block / menu
*/
function toggleSettings() {
    var myBlock = getBlocksByType('core-settings/settings')[0];
    var currentStatus = getBlockSetting(myBlock, 'visibility');
    var value;
    if(currentStatus != true) {
        value = true;
    } else {
        value = "false";
    }
    setBlockSetting(myBlock, 'visibility', value);

    if(currentStatus == true && config.edit_mode == true) {
        myBlock.classList.remove("hide");
    } else {
        myBlock.classList.add("hide");
    }
}


/**
* Hides the settings menu by default
*/
window.addEventListener("load", function() {
    getBlocksByType("core-settings/settings")[0].style.opacity = 0;
    toggleSettings();
    window.setTimeout(function() {
        getBlocksByType("core-settings/settings")[0].style.opacity = 1;
        toggleSettings();
    },config.tps);
})
