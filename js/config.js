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
            "edit_mode": true,
            "one_rem": "32px",
            "loadmodules": [
                "modules/date-display/init.js",
                "modules/test/init.js",
                "modules/edit-extras/init.js"
            ],
            "myWatchface": [
                {
                    "x": "-0",
                    "y": "0",
                    "type": "top-right-menu"
                },
                {
                    "x": "-0",
                    "y": "40%",
                    "type": "createblock"
                }
            ]
        }
        saveConfig(); // Save config after generating it
    }
}
