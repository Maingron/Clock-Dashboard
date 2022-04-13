function saveConfig() { // Saves the configuration to localStorage
    localStorage.setItem("clockConfig", JSON.stringify(config));
}

function loadConfig() { // Loads the configuration from localStorage OR generates it and triggers saveConfig()
    if(localStorage.getItem("clockConfig")) {
        config = JSON.parse(localStorage.getItem("clockConfig"));
    } else {
        // Generate Config
        config = { // Initial configuration
            "tps": "10",
            "debug": true,
            "edit_mode": true,
            "bodyBackground": "#000",
            "one_rem": "32px",
            "gridX": "10",
            "gridY": "10",
            "loadmodules": [
                "modules/core-settings/module.js",
                "modules/core-edit/module.js",
                "modules/string-functions/module.js",
                "modules/time-display/module.js",
                "modules/date-display/init.js",
                "modules/custom-text/module.js"
            ],
            "unloadmodules": [
                "modules/test/init.js",
                "modules/core-tps/module.js",
                "modules/core-debug/module.js"
            ],
            "myWatchface": [
                {
                    "x": "-0",
                    "y": "0",
                    "w": "auto",
                    "h": "auto",
                    "type": "core-edit/top-right-menu",
                    "editable": false
                },
                {
                    "x": "-0",
                    "y": "2rem",
                    "w": "auto",
                    "h": "auto",
                    "type": "core-edit/createblock",
                    "class": "hide display-edit",
                    "editable": false
                },
                {
                    "x": "2rem",
                    "y": "2rem",
                    "w": "auto",
                    "h": "auto",
                    "type": "time-display/fullclock"
                }
            ]
        }
        saveConfig(); // Save config after generating it
    }
}
