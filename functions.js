function spawnBlock(attributes) {
    var myNewElement = document.createElement("div");
    for(myItem_attribute of Object.keys(attributes)) {
        myNewElement.setAttribute(myItem_attribute, attributes[myItem_attribute])
    }
    myNewElement.classList.add("block");
    myNewElement.innerHTML = "<content></content>";
    myNewElement.id = attributes.id;
    e.blockContainer.append(myNewElement);
    return(myNewElement);
}

function setBlockPosition(which, x, y) {
    if(typeof(which) == "object") {
    } else {
        which = document.getElementById(which);
    }

    if(!x && !y) {
        x = which.getAttribute("x");
        y = which.getAttribute("y");
    }

    which.setAttribute("x",x);
    which.setAttribute("y",y);

    config.myWatchface[which.id].x = x;
    config.myWatchface[which.id].y = y;

    // Negative value means calculate from right:
    if(x.charAt(0) == "-") {
        which.style.left = "";
        which.style.right = x.replace("-","");
    } else {
        which.style.left = x;
        which.style.right = "";
    }

    if(y.charAt(0) == "-") {
        which.style.top = "";
        which.style.bottom = y.replace("-","");
    } else {
        which.style.top = y;
        which.style.bottom = "";
    }

    saveConfig();
}

function registerTicker(which) {
    session.tickFunctionArray.push(which);
}

function getAvailableBlocks() {
    for(var i = 0; e.templates.length > i; i++) {
        session.availableBlocks.push(e.templates[i].id);
    }
}

function returnValue(which, isjs = false) {
    for(var i = 0; session.availableBlocks.length > i; i++) {
        var myAvailableBlock = session.availableBlocks[i];
        if(isjs) {
            return(eval(which));
        }
        if(which == myAvailableBlock) {
            return document.getElementById(myAvailableBlock).innerHTML;
        }
    }
    return "<error>"+ which + " not found in available blocks</error>";
}


function loadScriptFile(path) {
    document.write("<script src=\""+path+"\"></script>");
}


function toggleEditMode(edittruefalse = !config.edit_mode) {
    config.edit_mode = edittruefalse;
    saveConfig();
    window.location.reload();
}

function isSelectedBlock(which) {
    return session.selectedBlock == which; // Returns true or false
}

function selectBlock(which) {
    session.selectedBlock = which;
    for(var i = document.getElementsByClassName("selected").length; i > 0; i--) {
        document.getElementsByClassName("selected")[i - 1].classList.remove("selected");
    }
    if(!which) {
        return;
    }
    which.classList.add("selected");
}

// Storage functions

function reset() {
    config = {};
    localStorage.clear();
    window.location.reload();
}