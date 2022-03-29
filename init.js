// We will init some things only once when loading the page:

var config = {};
var time = new Date(); // We will update this later in tick()
var session = {};

init();

function init() { // Initialize
    loadConfig();


    var elements = element = e = {
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

    console.log(document.getElementsByTagName("render"));

    for(var i = 0; e.renders.length > i; i++) {
        var myRender = e.renders[i];
        if(myRender.getAttribute("type") == "js/register-ticking") {
            setInterval(function() {
                myRender.innerHTML;
                console.log("hi");
            }, 1000 / 111);
            myRender.outerHTML = "";
        }
        console.log(myRender.getAttribute("type"));
    }

    e.qs_root.style.setProperty("--one_rem", config.one_rem);

    session.one_rem = e.one_rem.offsetHeight;


    getAvailableBlocks();

    if(config.debug) {
        e.debug = document.getElementById("debug");
        e.tickcounter = document.getElementById("tickcounter");
        e.supposedtickscounter = document.getElementById("supposedtickscounter");
        e.tickpercentage = document.getElementById("tickpercentage");
    }
}


function saveConfig() { // Saves the configuration to localStorage
    localStorage.setItem("clockConfig", JSON.stringify(config));
}

function loadConfig() { // Loads the configuration from localStorage OR generates it and triggers saveConfig()
    if(localStorage.getItem("clockConfig")) {
        config = JSON.parse(localStorage.getItem("clockConfig"));
    } else {
        // Generate Config
        config = { // Initial configuration
            "tps": "2",
            "debug": true,
            "one_rem": "24px",
            "myWatchface": [
                {
                    "x": "10px",
                    "y": "500px",
                    "type": "createblock"
                },
                {
                    "x": "100px",
                    "y": "200px",
                    "type": "seconds"
                },
                {
                    "x": "200px",
                    "y": "300px",
                    "type": "minutes"
                },
                {
                    "x": "400px",
                    "y": "100px",
                    "type": "reset"
                },
                {
                    "x": "500px",
                    "y": "200px",
                    "type": "tickcounter"
                },
                {
                    "x": "600px",
                    "y": "200px",
                    "type": "tickcounter"
                },
                {
                    "x": "700px",
                    "y": "200px",
                    "type": "tickcounter"
                }

            ]
        }
        saveConfig(); // Save config after generating it
    }
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