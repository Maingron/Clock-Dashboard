meta["core-settings"] = {
    "color": "lightgray",
    "name": "Settings"
}

loadHTMLTemplate("modules/core-settings/templates.html");
loadCSSFile("modules/core-settings/style.css");

function updateSettings() {
    /**
    * Updates the values of the displayed settings
    */

    // TODO get the settings by className instead of ID to be more extensible

    if(config.allowinternalblockscreation) {
        document.getElementById("setting-internalblocks").setAttribute("checked", "checked");
    }
    if(config.debug) {
        document.getElementById("setting-debug").setAttribute("checked", "checked");
    }
    document.getElementById("setting-tps").setAttribute("value", getConfigEntry("tps"));
    document.getElementById("setting-gridx").setAttribute("value", getConfigEntry("gridX"));
    document.getElementById("setting-enabled_modules").innerHTML = settings_loadModulesList();
    document.getElementById("setting-disabled_modules").innerHTML = settings_loadUnloadmodulesList();
    document.getElementById("setting-themecolor").setAttribute("value", getConfigEntry("themecolor"));

    if(getConfigEntry("bodyBackgroundImageEnable") == true) {
        document.getElementById("setting-bodyBackgroundImageEnable").setAttribute("checked", "checked");
    }
    document.getElementById("setting-bodyBackgroundColor").setAttribute("value", getConfigEntry("bodyBackground"));

}

function setBackgroundImage(which) {
    /**
    * Sets the background image setting to desired value
    * @param which desired image
    */

    var myReader = new FileReader();
    myReader.readAsDataURL(which.files[0]);

    myReader.onload = function() {
        setConfigEntry("bodyBackgroundImage", "url("+myReader.result+")");
        document.body.style.backgroundImage = getConfigEntry("bodyBackgroundImage");
        if(getConfigEntry('bodyBackgroundImageEnable') == false) {
            document.getElementById("setting-bodyBackgroundImageEnable").setAttribute("checked", "checked");
            settings_toggleBackgroundImage();
        }
        saveConfig();
    }
}


function settings_importConfig(which) {
    /**
    * Imports configuration from a file
    * ! Resets clock and applies new config
    * @param which file containing configuration
    */

    var myReader = new FileReader();
    myReader.readAsText(which.files[0]);
    document.body.style.display = "none";

    myReader.onload = function() {
        config = JSON.parse(myReader.result);
        saveConfig();
        window.location.reload();
    }
}

function settings_toggleBackgroundImage() {
    /**
    * Toggles if background image should be used
    */

    setConfigEntry('bodyBackgroundImageEnable', !getConfigEntry('bodyBackgroundImageEnable'));
    if(getConfigEntry("bodyBackgroundImageEnable") == true) {
        document.body.style.backgroundImage = config.bodyBackgroundImage;
    } else {
        document.body.style.backgroundImage = "unset";
    }
}

function settings_loadModulesList() {
    /**
    * Loads the list of modules
    * @returns {String} Menu of modules
    */

    var result = "";

    for(var i = 0; i < config.loadmodules.length; i++) {
        var myColor = "";
        var myName = config.loadmodules[i];
        if(config.loadmodules[i].split("/")[1] && meta[config.loadmodules[i].split("/")[1]]) {
            if(meta[config.loadmodules[i].split("/")[1]].color) {
                myColor = meta[config.loadmodules[i].split("/")[1]].color;
            }
            if(meta[config.loadmodules[i].split("/")[1]].name) {
                myName = meta[config.loadmodules[i].split("/")[1]].name;
            }
        }
        result += "<option style='color:"+myColor+"' ondblclick='settings_enDisModule(this.value, \"disable\")' title=\"" + config.loadmodules[i] + "\" value='"+config.loadmodules[i]+"'>" + myName + "</option>";
    }
    if(result == "") {
        result = "<option disabled style='opacity:.5'>none</option>";
    }
    return result;
}

function settings_loadUnloadmodulesList() {
    /**
    * Loads the list of unloaded modules
    * @returns {String} Menu of unloaded modules
    */

    var result = "";
    for(var i = 0; i < config.unloadmodules.length; i++) {
        result += "<option ondblclick='settings_enDisModule(this.value, \"enable\")' value='"+config.unloadmodules[i]+"'>" + config.unloadmodules[i] + "</option>";
    }
    if(result == "") {
        result = "<option disabled style='opacity:.5'>none</option>";
    }
    return result;
}

function settings_enDisModule(which, enDisDel, refresh=true) {
    /**
    * Enables, disables or deletes a module
    * @param which desired module
    * @param {number} enDisDel 1 = enable module; 2 = disable module; 3 = delete module
    * @param {boolean} refresh reload page afterwards?
    */

    if(enDisDel == "enable" || enDisDel == "disable") { // Delete entry beforehand to avoid duplication
        settings_enDisModule(which, "delete", false);
    }
    if(enDisDel == "enable") { // Enable
        if(!config.loadmodules.includes(which)) {
            config.loadmodules.push(which);
        }

    } else if(enDisDel == "disable") { // Disable
        if(!config.unloadmodules.includes(which)) {
            config.unloadmodules.push(which);
        }

    } else if(enDisDel == "delete") { // Delete
        if(config.loadmodules.includes(which)) {
            config.loadmodules.splice(config.loadmodules.indexOf(which), 1);
        } else if(config.unloadmodules.includes(which)) {
            config.unloadmodules.splice(config.unloadmodules.indexOf(which), 1);
        }
    }
    saveConfig();
    if(refresh) {
        window.location.reload();
    }
}

function setConfigEntry(which, value) {
    /**
    * Sets value of desired config entry
    * @param which desired config entry
    * @param value desired value
    */

    config[which] = value;
    saveConfig();
}

function getConfigEntry(which) {
    /**
    * Returns the value of desired config entry
    * @param {string} which desired config entry
    * @returns value of desired config entry
    */

    return config[which];
}
