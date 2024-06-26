
/**
 * Saves the configuration to localStorage
 */
function saveConfig() {
    localStorage.setItem("clockConfig", JSON.stringify(config));
}


/**
 * Loads the configuration from localStorage OR generates it and triggers saveConfig()
 */
function loadConfig() {
    if(localStorage.getItem("clockConfig")) {
        config = JSON.parse(localStorage.getItem("clockConfig"));
    } else {
        // Generate Config
        config = { // Initial configuration
            "tps": 20,
            "debug": true,
            "edit_mode": true,
            "bodyBackgroundImage": "url()",
            "bodyBackgroundImageEnable": false,
            "one_rem": "32px",
            "gridCols": 10,
            "gridLines": 8,
            "themecolor": "#777777",
            "loadmodules": [
                "modules/core-settings/module.js",
                "modules/core-edit/module.js",
                "modules/string-functions/module.js",
                "modules/time-display/module.js",
                "modules/date-display/init.js",
                "modules/custom-text/module.js",
                "modules/timer/module.js",
                "modules/notes/module.js"
            ],
            "unloadmodules": [
                "modules/test/init.js",
                "modules/core-tps/module.js",
                "modules/core-debug/module.js"
            ],
            "myWatchface": [
                {
                    "x": -1,
                    "y": 0,
                    "w": 2,
                    "h": 1,
                    "f-s": "1em",
                    "f-lh": "1",
                    "align": "top right",
                    "type": "core-edit/top-right-menu",
                    "editable": false
                },
                {
                    "x": -1,
                    "y": 1,
                    "w": 2,
                    "h": 1,
                    "f-s": "1em",
                    "f-lh": "1",
                    "align": "top right",
                    "type": "core-edit/createblock",
                    "class": "hide display-edit",
                    "editable": false
                },
                {
                    "x": 0,
                    "y": 1,
                    "w": 10,
                    "h": 7,
                    "f-s": "1em",
                    "f-lh": "1",
                    "align": "top left",
                    "type": "core-settings/settings",
                    "class": "hide",
                    "editable": false
                },
                {
                    "x": 0,
                    "y": 0,
                    "w": 10,
                    "h": 1,
                    "align": "top left",
                    "type": "core-settings/settings-out",
                    "class": "hide",
                    "editable": false
                },
                {
                    "x": 1,
                    "y": 1,
                    "w": 1,
                    "h": 1,
                    "f-s": "1em",
                    "f-lh": "1",
                    "align": "middle center",
                    "type": "time-display/fullclock"
                }
            ]
        }
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) { // if darkmode
            config.bodyBackground = "#000000";
        } else {
            config.bodyBackground = "#dddddd";
        }

        saveConfig(); // Save config after generating it
    }
}
