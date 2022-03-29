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
                    "x": "700px",
                    "y": "200px",
                    "type": "supposedtickscounter"
                },
                {
                    "x": "800px",
                    "y": "200px",
                    "type": "tickpercentage"
                }
            ]
        }
        saveConfig(); // Save config after generating it
    }
}
