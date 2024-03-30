/**
 * @module core-edit
 */

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
        "x": Math.floor(config.gridCols / 2),
        "y": Math.floor(config.gridLines / 2),
        "w": 1,
        "h": 1,
        "id": config.myWatchface.length,
        "align": "middle center",
        "f-s": "1em",
        "f-lh": "1"
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
        if(session.mouseDownOn?.parentElement?.parentElement && isSelectedBlock(session.mouseDownOn.parentElement.parentElement)) {
            setBlockSetting(which, "x", (gridifyValue(((myMovingBlockOffsetX / config.gridCols) + (session.mouseX - session.mouseXinitial) - session.mouseDownOn?.parentElement?.parentElement.offsetWidth / 2), false)));
            setBlockSetting(which, "y", (gridifyValue(((myMovingBlockOffsetY / config.gridLines) + (session.mouseY - session.mouseYinitial) - (10)), true)));
        }
    } else {
        document.body.classList.remove("mousedown");
    }
}


/**
* Rounds a value to be within the grid system
* @param {number} value desired value to be converted
* @param {boolean} yinsteadofx - calculate y instead of default x
* @returns {number} gridified value
*/
function gridifyValue(value, yinsteadofx = false) {
    if(yinsteadofx) {
        return (Math.round(+value / (+document.body.offsetHeight / +config.gridLines)));
    }
    return (Math.round(+value / (+document.body.offsetWidth / +config.gridCols)));
}


/**
* Initializes event listeners of edit mode
*/
function initEventListeners_edit() {
    if(!config.edit_mode) {
        return;
    }

    document.addEventListener("mousemove", function(event) {
        session.mouseX = event.clientX;
        session.mouseY = event.clientY;
        dragBlock(session.selectedBlock);
    });

    document.addEventListener("touchmove", function(event) {
        session.mouseX = event.changedTouches[0].clientX;
        session.mouseY = event.changedTouches[0].clientY;
        dragBlock(session.selectedBlock);
    });

    document.addEventListener("touchstart", function(event) {
        session.mouseX = event.changedTouches[0].clientX;
        session.mouseY = event.changedTouches[0].clientY;
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
        myMovingBlockOffsetX = session.mouseDownOn.parentElement.parentElement.offsetLeft + session.mouseDownOn.parentElement.parentElement.offsetWidth / 2;
        myMovingBlockOffsetY = session.mouseDownOn.parentElement.parentElement.offsetTop + session.mouseDownOn.parentElement.parentElement.offsetHeight / 2;
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
    which.getElementsByClassName("hb-f-lh")[0].value = +(getBlockSetting(which, "f-lh"));
    which.getElementsByClassName("hb-f-lh")[0].setAttribute("title", getBlockSetting(which, "f-lh"));

    which.getElementsByClassName("hb-custom")[0].innerHTML = getTemplateSettings(which); // Custom settings defined in each templates <settings> section (optional)
}


/**
* Saves desired setting found within the headbar of desired block. Can prepend and append to the value
* @param which desired block
* @param prepend prepend this to the value
* @param append append this to the value
*/
function headbar_saveEditExpandSettings(which, prepend = "", append = "") {

    var myBlockId = returnBlockElement(which);
    var myBlock = config.myWatchface[myBlockId];
    var attribute = which.getAttribute("issetting");
    var value = which.value;

    setBlockSetting(myBlockId, attribute, (prepend + value + append));
    renderBlockSetting(myBlockId, attribute);

    saveConfig();


    function returnBlockElement(which) {
        if(which?.parentElement?.classList && which.parentElement.classList.contains("block")) {
            return which.parentElement.id;
        } else {
            return returnBlockElement(which.parentElement);
        }
    }
}


/**
* Toggles visibility of the settings block / menu
* @param {boolean} value display: true or false
*/
function toggleSettings(value) {
    // TODO: Fix this function - visibility is weird
    var myBlock = getBlocksByType('core-settings/settings')[0];
    var myBlock2 = getBlocksByType('core-settings/settings-out')[0];
    if(!value) {
        var currentStatus = getBlockSetting(myBlock, 'visibility');
    } else {
        currentStatus = !value;
    }
    var value;
    if(currentStatus != true) {
        value = true;
    } else {
        value = "false";
    }
    setBlockSetting(myBlock, 'visibility', value);

    if(currentStatus == true && config.edit_mode == true) {
        myBlock.classList.remove("hide");
        myBlock2.classList.remove("hide");
    } else {
        myBlock.classList.add("hide");
        myBlock2.classList.add("hide");
    }
}


/**
* Hides the settings menu by default
*/
window.addEventListener("load", function() {
    toggleSettings(!getBlockSetting(getBlocksByType("core-settings/settings")[0],"visibility"));
    toggleSettings(!getBlockSetting(getBlocksByType("core-settings/settings")[0],"visibility"));
})
