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
        "tickcount": 0
    }


    e.renders = document.getElementsByTagName("render");

    for(var i = 0; e.renders.length > i; i++) {
        var myRender = e.renders[i];
        if(myRender.getAttribute("type") == "js/register-ticking") {
            setInterval(function() {
                myRender.innerHTML;
            }, 1000 / 111);
            myRender.outerHTML = "";
        }
    }

    e.qs_root.style.setProperty("--one_rem", config.one_rem);

    session.one_rem = e.one_rem.offsetHeight;


    getAvailableBlocks();
    spawnBlocksFromConfig();

    e.blocks = document.getElementsByClassName("block");

    setBlockPositions();
}

function reset() {
    config = {};
    localStorage.clear();
    window.location.reload();
}

function getAvailableBlocks() {
    for(var i = 0; e.templates.length > i; i++) {
        session.availableBlocks.push(e.templates[i].id);
    }
}