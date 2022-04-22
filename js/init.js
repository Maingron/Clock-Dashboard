// We will init some things only once when loading the page:

var config = {};
var time = new Date(); // We will update this later in tick()
var session = {};
var elements = element = e = {};
var meta = {};

init();

function init() { // Initialize
    loadConfig();

    document.body.style.background = config.bodyBackground;

    document.documentElement.style.setProperty("--themecolor", config.themecolor);

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

    session.jsRenderArray = {};


    e.blocks = [];

    for(myItem_loadMods of config.loadmodules) {
        loadScriptFile(myItem_loadMods);
    }

    e.qs_root.style.setProperty("--one_rem", config.one_rem);
    // document.querySelector("body").style.fontSize = vaer
    session.one_rem = e.one_rem.offsetHeight;

    initBlocks();


    initEventListeners(); // -> eventlisterners.js

    if(config.tps != 0) { // Set tick interval
        setInterval(function() {
            tick();
        }, 1000 / config.tps);

        tick(); // Initial tick
    }
}