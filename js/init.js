// We will init some things only once when loading the page:

var config = {};
var time = new Date(); // We will update this later in tick()
var session = {};
var elements = element = e = {};

init();

function init() { // Initialize
    loadConfig();

    elements = element = e = {
        "blockContainer": document.getElementById("block-container"),
        "results": document.getElementById("results"),
        "one_rem": document.getElementById("one_rem"),
        "qs_root": document.querySelector(":root"),
        "templates": document.getElementsByTagName("template")
    }

    session = {
        "starttime": time.getTime(),
        "blocknr": 0, // Block with highest id
        "availableBlocks": [],
        "tickFunctionArray": [],
        "tickcount": 0,
    }

    e.blocks = [];

    if(config.edit_mode) {
        loadScriptFile("js/edit/functions-edit.js");
        loadScriptFile("js/edit/mode-edit.js");
        loadCSSFile("css/edit/mode-edit.css");
    }

    if(config.debug) {
        loadScriptFile("js/debug/debug.js");
    }

    for(myItem_loadMods of config.loadmodules) {
        loadScriptFile(myItem_loadMods);
    }

    e.renders = document.getElementsByTagName("render");

    e.qs_root.style.setProperty("--one_rem", config.one_rem);
    // document.querySelector("body").style.fontSize = vaer
    session.one_rem = e.one_rem.offsetHeight;

    getAvailableBlocks();

    for(myItem of config.myWatchface) {
        var mySpawnedBlock = spawnBlock(myItem);
        setBlockPosition(mySpawnedBlock);
        e.blocks.push(mySpawnedBlock);
    }

    initEventListeners(); // -> eventlisterners.js

}
