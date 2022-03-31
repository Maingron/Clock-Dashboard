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
    session.availableBlocks = [];
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


function loadScriptFile(path, onload) {
    var myNewElement = document.createElement("script");
    myNewElement.src = path;
    if(onload) {
        myNewElement.setAttribute("onload",onload);
    }
    document.body.append(myNewElement);
}

function loadCSSFile(path) {
    var myNewElement = document.createElement("link");
    myNewElement.href = path;
    myNewElement.rel = "stylesheet";
    myNewElement.type = "text/css";
    document.head.append(myNewElement);
}

function loadHTMLTemplate(path, onload) {
    var myNewElement = document.createElement("iframe");
    myNewElement.src = path;
    myNewElement.id = "loader";
    // myNewElement.style.display = "none";
    if(!onload) {
        onload = "";
    }
    myNewElement.setAttribute("onload", "appendHTMLTemplateFromIframe(this, '" + path.split("/")[1] + "'); " + onload);
    document.body.append(myNewElement);
    getAvailableBlocks();
}

function appendHTMLTemplateFromIframe(which, belongsToModule) {
    for(myItem_iframeTemplate of which.contentWindow.document.getElementsByTagName("template")) {
        var myNewElement = document.createElement("template");
        myNewElement.innerHTML = myItem_iframeTemplate.innerHTML;
        myNewElement.id = belongsToModule + "/" + myItem_iframeTemplate.id;
        myNewElement.setAttribute("module", belongsToModule);
        document.body.append(myNewElement);
    }
    which.outerHTML = ""; // Despawns iframe
    getAvailableBlocks();
}

function isSelectedBlock(which) {
    return session.selectedBlock == which; // Returns true or false
}

function isChildOfSelectedBlock(which) {
    if(which.classList.contains("selected")) {
        return true;
    }
    if(which.parentElement) {
        if(isChildOfSelectedBlock(which.parentElement)) { // Call function again unless there's no parentElement anymore
            return true;
        };
    }
    return false;
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

function initBlocks() {
    // Remove all Blocks
    if(e.blocks) {
        for(myItem_Block of e.blocks) {
            myItem_Block.remove();
        }
    }

    e.blocks = [];

    getAvailableBlocks();

    for(var i = 0; config.myWatchface.length > i; i++) {
        var mySpawnedBlock = spawnBlock(Object.assign(config.myWatchface[i],{"id": i}));
        setBlockPosition(mySpawnedBlock);
        e.blocks.push(mySpawnedBlock);
    }
}

// Storage functions

function reset() {
    config = {};
    localStorage.clear();
    window.location.reload();
}