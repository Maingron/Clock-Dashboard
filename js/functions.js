function spawnBlock(attributes) {
    var myNewElement = document.createElement("div");
    for(myItem_attribute of Object.keys(attributes)) {
        myNewElement.setAttribute(myItem_attribute, attributes[myItem_attribute]);
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

function registerJSRender(name, which) {
    session.jsRenderArray[name] = which;
}

function getAvailableBlocks() {
    session.availableBlocks = [];
    for(var i = 0; e.templates.length > i; i++) {
        session.availableBlocks.push(e.templates[i].id);
    }
}

function returnValue(which) {
    // Todo: More than 1 layer deep
    if(session.availableBlocks.includes(which)) {
        return document.getElementById(which).innerHTML;
    } else {
        // use a jsRender
        if(which.includes("(") && which.includes(")")) {
            // Todo: Allow more than 1 argument
            var myArgument = which.split("(")[1].split(")")[0];
            which = which.split("(")[0];
            return session.jsRenderArray[which](myArgument);
        }
        if(session.jsRenderArray[which]) {
            return session.jsRenderArray[which]();
        }
    }
    // for(var i = 0; session.availableBlocks.length > i; i++) {
    //     var myAvailableBlock = session.availableBlocks[i];
    //     if(isjs) {
    //         return(eval(which));
    //     }
    //     if(which == myAvailableBlock) {
    //         return ;
    //     }
    // }
    // return "<error>"+ which + " not found in available blocks</error>";
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
        if(myItem_iframeTemplate.getAttribute("internal") == "") {
            myNewElement.setAttribute("internal","internal");
        }
        document.body.append(myNewElement);
    }
    which.outerHTML = ""; // Despawns iframe
    getAvailableBlocks();
    initBlocks();
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

    for(myItem_blocks of e.blocks) { // Update all visible blocks

        myItem_blocks_content = myItem_blocks.getElementsByTagName("content")[0];

        if(!isSelectedBlock(myItem_blocks)) { // Don't update currently selected block if in Edit mode
            myItem_blocks_content.innerHTML = returnValue(myItem_blocks.getAttribute("type"));
        }
    }
    if(typeof(initEventListeners_edit) == "function") {
        initEventListeners_edit();
    }

    e.renders = document.getElementsByTagName("render");
}

// Storage functions

function reset() {
    config = {};
    localStorage.clear();
    window.location.reload();
}