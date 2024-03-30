/**
* Spawns an already existing block
* @param {object} attributes attributes of the block
* @returns New Block
*/
function spawnBlock(attributes) {
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


/**
* Sets the a setting of a block
* @param which desired block
* @param {string} property desired property / setting
* @param value desired value
*/
function setBlockSetting(which, property, value) {
    var whichHTML = getBlock(which, false);
    var whichJS = getBlock(which, true);

    // Update config entry
    whichJS[property] = value;

    saveConfig();

    renderBlockSetting(which, property);
}


/**
* Returns a setting of a block
* @param which desired block
* @param {string} property desired property / setting
* @returns value of desired property
*/
function getBlockSetting(which, property) {
    return getBlock(which, true)?.[property] ?? ""; // TODO: Improve error handling
}


/**
* Deletes a setting of a block
* @param which desired block
* @param property desired property / setting
*/
function removeBlockSetting(which, property) {
    var whichHTML = getBlock(which, false);
    var whichJS = getBlock(which, true);
    if(whichJS?.[property]) {
        delete whichJS[property];
        whichHTML.removeAttribute(property);
    }

    saveConfig();

    renderBlockSetting(which, property);
}


/**
* Renders a setting of a block on screen
* @param which desired block
* @param {string} property desired property / setting
*/
function renderBlockSetting(which, property) {
    var whichHTML = getBlock(which, false);
    var whichJS = getBlock(which, true);

    var value = getBlockSetting(which, property);

    var styleAttributes = {
        "h": "height",
        "w": "width",
        "y": "top",
        "x": "left",
        "f-lh": "line-height",
        "f-c": "color",
        "f-s": "font-size"
    };

    if(Object.keys(styleAttributes).includes(property)) { // If it's a CSS thing
        if(property == "x" || property == "y") {
            // Negative value means calculate from right:
            if(property == "x") {
                if(value < 0) {
                    whichHTML.style.left = "";
                    whichHTML.style.right = Math.abs((value + 1) * (100 / config.gridCols)) + "%";
                } else {
                    whichHTML.style.left = +value * (100 / config.gridCols) + "%";
                    whichHTML.style.right = "";
                }
            } else if(property == "y") {
                if(value < 0) {
                    whichHTML.style.top = "";
                    whichHTML.style.bottom = Math.abs((value + 1) * (100 / config.gridLines)) + "%";
                } else {
                    whichHTML.style.top = +value * (100 / config.gridLines) + "%";
                    whichHTML.style.bottom = "";
                }
            }
        } else if(property == "w" || property == "h") {
            switch(value) {
                case "auto":
                case "100vw":
                case "100vh":
                case "100%":
                    whichHTML.style[styleAttributes[property]] = value;
                    break;
                default:
                    if(property == "w") {
                        whichHTML.style.width = +value * (100 / config.gridCols) + "%";
                    } else if(property == "h") {
                        whichHTML.style.height = +value * (100 / config.gridLines) + "%";
                    }
                    break;
            }
        } else {
            whichHTML.style[styleAttributes[property]] = value; // Update on screen
        }
    } else if(property == "align") {
        if(value.indexOf("left") > -1) {
            whichHTML.style.justifyContent = "left";
        }
        if(value.indexOf("center") > -1) {
            whichHTML.style.justifyContent = "center";
        }
        if(value.indexOf("right") > -1) {
            whichHTML.style.justifyContent = "right";
        }

        if(value.indexOf("top") > -1) {
            whichHTML.style.alignItems = "start";
        }
        if(value.indexOf("middle") > -1) {
            whichHTML.style.alignItems = "center";
        }
        if(value.indexOf("bottom") > -1) {
            whichHTML.style.alignItems = "end";
        }
    } else {
        // Update on screen
        whichHTML[property] = value;
        whichHTML.setAttribute(property, value); // Update on screen
    }
}


/**
* registers a function to run once every tick
* @param {function} which desired function in this format: nameOfFunction
*/
function registerTicker(which) {
    session.tickFunctionArray.push(which);
}


/**
* registers a JavaScript function as render (Similar to <render> types in HTML templates)
* @param {string} name name the desired render
* @param {function} which desired function in this format: nameOfFunction
*/
function registerJSRender(name, which) {
    session.jsRenderArray[name] = which;
}


/**
* Returns a block
* @param which desired block
* @param {boolean} htmlorconfig return HTML element or config object of desired block? false = html, true = js
* @returns desired block
*/
function getBlock(which, htmlorconfig = false) {
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
        which = config?.myWatchface?.[which];
    }

    return which;
}


/**
* Returns a block by using a child element
* @param which a child of desired block
* @param htmlorconfig return HTML element or config object of desired block? false = html, true = js
* @returns desired block
*/
function getBlockByChild(which, htmlorconfig) {
    if(!which) {
        return;
    }
    if(which.id && typeof(+which.id) == "number" && !isNaN(+which.id)) {
        return getBlock(which, htmlorconfig);
    } else {
        return getBlockByChild(which.parentElement, htmlorconfig);
    }
}


/**
* Returns all blocks of desired type
* @param {string} type desired block type
* @param {boolean} htmlorconfig return HTML element or config object of desired block? false = html, true = js
* @returns {array} blocks of desired type
*/
function getBlocksByType(type, htmlorconfig) {
    var result = [];
    for(myBlock of document.getElementsByClassName("block")) {
        if(myBlock.getAttribute("type").includes(type)) {
            result.push(getBlock(myBlock, htmlorconfig));
        }
    }
    return result;
}


/**
* Gets all available blocks (System function)
*/
function getAvailableBlocks() {
    session.availableBlocks = [];
    for(var i = 0; e.templates.length > i; i++) {
        session.availableBlocks.push(e.templates[i].id);
    }
}


/**
* Returns the calculated value of a block
* @param which
* @returns calculated value
*/
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
        if(session.jsRenderArray[which] == undefined) {
            return ""; // Don't return "undefined" but instead return empty string (Looks much better)
        }
    }
    // return "<error>"+ which + " not found in available blocks</error>";
}


/**
* Returns settings of desired template
* @param which desired template
* @returns {String} innerHTML of <settings> of desired template
*/
function getTemplateSettings(which) {
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


/**
* Registers a .js Script file to be loaded
* @param {string} path path of desired Script file
* @param onload gets executed once script file has been loaded
*/
function loadScriptFile(path, onload) {
    var myNewElement = document.createElement("script");
    myNewElement.src = path;
    if(onload) {
        myNewElement.setAttribute("onload",onload);
    }
    document.body.append(myNewElement);
}


/**
* Registers a .css file to be loaded
* @param {string} path path of desired .css stylesheet file
*/
function loadCSSFile(path) {
    var myNewElement = document.createElement("link");
    myNewElement.href = path;
    myNewElement.rel = "stylesheet";
    myNewElement.type = "text/css";
    document.head.append(myNewElement);
}


/**
* Registers a .html file to get its templates loaded
* @param {string} path path of desired html template file
* @param onload gets executed once the html file has been loaded
* @requires appendHTMLTemplateFromIframe
*/
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


/**
* Appends a html template to index.html
* Internal function; Required by loadHTMLTemplate
* @param which
* @param belongsToModule
*/
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


/**
* Checks if desired block is selected
* @param which desired block
* @returns {boolean} is it the selected block?
*/
function isSelectedBlock(which) {
    return session.selectedBlock == which; // Returns true or false
}


/**
* Checks if desired element is child of selected block
* @param which desired element
* @returns {boolean} is it a child of selected block?
*/
function isChildOfSelectedBlock(which) {
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


/**
* Selects a block
* @param which desired block
*/
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


/**
* Initializes all blocks; Might run after initial initialisation
*/
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
        renderBlockSetting(mySpawnedBlock, "x");
        renderBlockSetting(mySpawnedBlock, "y");
        renderBlockSetting(mySpawnedBlock, "w");
        renderBlockSetting(mySpawnedBlock, "h");
        renderBlockSetting(mySpawnedBlock, "f-c");
        renderBlockSetting(mySpawnedBlock, "f-s");
        renderBlockSetting(mySpawnedBlock, "f-lh");
        renderBlockSetting(mySpawnedBlock, "align");

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


/**
* Resets the clock and deletes all data
* !Resets the clock
*/
function reset() {

    config = {};
    localStorage.clear();
    window.location.reload();
}
