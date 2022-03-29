// We will init some things only once when loading the page:

var config = {};
var time = new Date(); // We will update this later in tick()
var session = {};

init();

function init() { // Initialize
    loadConfig();


    var elements = element = e = {
        "blockContainer": document.getElementById("block-container"),
        "results": document.getElementById("results")
    }

    session = {
        "starttime": time.getTime()
    }

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
            "myWatchface": [
                {
                    "x": "100px",
                    "y": "200px",
                    "type": "seconds"
                },
                {
                    "x": "200px",
                    "y": "300px",
                    "inner": "minutes"
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