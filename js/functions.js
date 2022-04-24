function spawnBlock(attributes) {
    /**
    * Spawns an already existing block
    * @param {object} attributes attributes of the block
    * @returns New Block
    */

    var myNewElement = document.createElement("div");
    for(myItem_attribute of Object.keys(attributes)) {
        myNewElement.setAttribute(myItem_attribute, attributes[myItem_attribute]);

        // Remove these attributes from HTML to avoid confusion:
        // TODO: Improve
        myNewElement.removeAttribute("x");
        myNewElement.removeAttribute("y");
        myNewElement.removeAttribute("w");
        myNewElement.removeAttribute("h");
    }

    myNewElement.classList.add("block");
    myNewElement.innerHTML = "<content></content>";
    myNewElement.id = attributes.id;
    e.blockContainer.append(myNewElement);
    return(myNewElement);
}

function setBlockSetting(which, property, value) {
    /**
    * Sets the a setting of a block
    * @param which desired block
    * @param {string} property desired property / setting
    * @param value desired value
    */

    var whichHTML = getBlock(which, false);
    var whichJS = getBlock(which, true);

    // Update config entry
    whichJS[property] = value;

    saveConfig();

    renderBlockSetting(which, property);
}

function getBlockSetting(which, property) {
    /**
    * returns a setting of a block
    * @param which desired block
    * @param {string} property desired property / setting
    * @returns value of desired property
    */

    var whichJS = getBlock(which, true);
    if(whichJS && whichJS[property]) {
        return whichJS[property];
    }
}

function removeBlockSetting(which, property) {
    /**
    * Deletes a setting of a block
    * @param which desired block
    * @param property desired property / setting
    */

    var whichHTML = getBlock(which, false);
    var whichJS = getBlock(which, true);
    if(whichJS && whichJS[property]) {
        delete whichJS[property];
        whichHTML.removeAttribute(property);
    }

    saveConfig();

    renderBlockSetting(which, property);
}

function renderBlockSetting(which, property) {
    /**
    * Renders a setting of a block on screen
    * @param which desired block
    * @param property desired property / setting
    */

    var whichHTML = getBlock(which, false);
    var whichJS = getBlock(which, true);

    var value = getBlockSetting(which, property);

    var styleAttributes = {
        "h": "height",
        "w": "width",
        "y": "top",
        "x": "left",
        "f-c": "color",
        "f-s": "font-size"
    };

    if(Object.keys(styleAttributes).includes(property)) { // If it's a CSS thing
        if(property == "x" || property == "y") {
            // Negative value means calculate from right:
            if(property == "x") {
                if(value.charAt(0) == "-") {
                    whichHTML.style.left = "";
                    whichHTML.style.right = value.replace("-","");
                } else {
                    whichHTML.style.left = value;
                    whichHTML.style.right = "";
                }
            } else if(property == "y") {
                if(value.charAt(0) == "-") {
                    whichHTML.style.top = "";
                    whichHTML.style.bottom = value.replace("-","");
                } else {
                    whichHTML.style.top = value;
                    whichHTML.style.bottom = "";
                }
            }
        } else {
            whichHTML.style[styleAttributes[property]] = value; // Update on screen
        }
        
    } else {
        // Update on screen
        whichHTML[property] = value;
        whichHTML.setAttribute(property, value); // Update on screen
    }
}

function registerTicker(which) {
    /**
    * registers a function to run once every tick
    * @param {function} which desired function in this format: nameOfFunction
    */

    session.tickFunctionArray.push(which);
}

function registerJSRender(name, which) {
    /**
    * registers a JavaScript function as render (Similar to <render> types in HTML templates)
    * @param {string} name name the desired render
    * @param {function} which desired function in this format: nameOfFunction
    */
    session.jsRenderArray[name] = which;
}

function getBlock(which, htmlorconfig = false) {
    /**
    * Returns a block
    * @param which desired block
    * @param {boolean} htmlorconfig return HTML element or config object of desired block? false = html, true = js
    * @returns desired block
    */

    if(htmlorconfig == false) { // HTML<>
        if(typeof(which) == "object") {
        } else {
            which = document.getElementById(which);
        }
    } else if(htmlorconfig == true) { // config.myWatch[which]{}
        if(typeof(which) == "object") {
            which = which.getAttribute("id");
        } else { // Assume id
        }
        which = config.myWatchface[which];
    }

    return which;
}

function getBlockByChild(which, htmlorconfig) {
    /**
    * Returns a block by using a child element
    * @param which a child of desired block
    * @param htmlorconfig return HTML element or config object of desired block? false = html, true = js
    * @returns desired block
    */

    if(!which) {
        return;
    }
    if(which.id && typeof(+which.id) == "number" && !isNaN(+which.id)) {
        return getBlock(which, htmlorconfig);
    } else {
        return getBlockByChild(which.parentElement, htmlorconfig);
    }
}

function getBlocksByType(type, htmlorconfig) {
    /**
    * Returns all blocks of desired type
    * @param {string} type desired block type
    * @param {boolean} htmlorconfig return HTML element or config object of desired block? false = html, true = js
    * @returns {array} blocks of desired type
    */

    var result = [];
    for(myBlock of document.getElementsByClassName("block")) {
        if(myBlock.getAttribute("type").includes(type)) {
            result.push(getBlock(myBlock, htmlorconfig));
        }
    }
    return result;
}

function getAvailableBlocks() {
    session.availableBlocks = [];
    for(var i = 0; e.templates.length > i; i++) {
        session.availableBlocks.push(e.templates[i].id);
    }
}

function returnValue(which) {
    /**
    * Returns the calculated value of a block
    * @param which
    * @returns calculated value
    */

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
        if(session.jsRenderArray[which] == undefined) {
            return ""; // Don't return "undefined" but instead return empty string (Looks much better)
        }
    }
    // return "<error>"+ which + " not found in available blocks</error>";
}

function getTemplateSettings(which) {
    /**
    * Returns settings of desired template
    * @param which desired template
    * @returns {String} innerHTML of <settings> of desired template
    */

    which = getBlock(which);
    var result = "";
    var inputString = which.innerHTML;

    if(inputString.includes("<settings") && inputString.includes("</settings>")) {
        // result = "<settings";
        result += inputString.split("<settings>")[1];
        result = result.split("</settings>")[0];
        // result += "</settings>";
    } else {
        result = "";
    }

    return result;
}


function loadScriptFile(path, onload) {
    /**
    * Registers a .js Script file to be loaded
    * @param {string} path path of desired Script file
    * @param onload gets executed once script file has been loaded
    */

    var myNewElement = document.createElement("script");
    myNewElement.src = path;
    if(onload) {
        myNewElement.setAttribute("onload",onload);
    }
    document.body.append(myNewElement);
}

function loadCSSFile(path) {
    /**
    * Registers a .css file to be loaded
    * @param {string} path path of desired .css stylesheet file
    */

    var myNewElement = document.createElement("link");
    myNewElement.href = path;
    myNewElement.rel = "stylesheet";
    myNewElement.type = "text/css";
    document.head.append(myNewElement);
}

function loadHTMLTemplate(path, onload) {
    /**
    * Registers a .html file to get its templates loaded
    * @param {string} path path of desired html template file
    * @param onload gets executed once the html file has been loaded
    * @requires appendHTMLTemplateFromIframe
    */

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
    /**
    * Appends a <template> to index.html
    * Internal function; Required by loadHTMLTemplate
    * @param which
    * @param belongsToModule
    */

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
    /**
    * Checks if desired block is selected
    * @param which desired block
    * @returns {boolean} is it the selected block?
    */

    return session.selectedBlock == which; // Returns true or false
}

function isChildOfSelectedBlock(which) {
    /**
    * Checks if desired element is child of selected block
    * @param which desired element
    * @returns {boolean} is it a child of selected block?
    */

    if(which.classList.contains("selected")) {
        return true;
    }
    if(which.parentElement) {
        if(isChildOfSelectedBlock(which.parentElement)) { // Call function again unless there's no parentElement anymore
            return true;
        }
    }
    return false;
}

function selectBlock(which) {
    /** 
    * Selects a block
    * @param which desired block
    */

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
    /**
    * Initializes all blocks; Might run after initial initialisation
    */

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
        renderBlockSetting(mySpawnedBlock, "x");
        renderBlockSetting(mySpawnedBlock, "y");
        renderBlockSetting(mySpawnedBlock, "w");
        renderBlockSetting(mySpawnedBlock, "h");
        renderBlockSetting(mySpawnedBlock, "f-c");
        renderBlockSetting(mySpawnedBlock, "f-s");

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
    /**
    * Resets the clock and deletes all data
    */
    config = {};
    localStorage.clear();
    window.location.reload();
}
