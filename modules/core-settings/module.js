meta["core-settings"] = {
    "color": "lightgray",
    "name": "Settings"
}

loadHTMLTemplate("modules/core-settings/templates.html");
loadCSSFile("modules/core-settings/style.css");

function updateSettings() {
    // TODO document.getElementById("setting-debug").setAttribute("checked","checked");
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
    setConfigEntry('bodyBackgroundImageEnable', !getConfigEntry('bodyBackgroundImageEnable'));
    if(getConfigEntry("bodyBackgroundImageEnable") == true) {
        document.body.style.backgroundImage = config.bodyBackgroundImage;
    } else {
        document.body.style.backgroundImage = "unset";
    }
}

function settings_loadModulesList() {
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
    // enable, disable, delete
    if(enDisDel == "enable" || enDisDel == "disable") { // Delete entry beforehand to avoid duplication
        settings_enDisModule(which, "delete", false);
    }
    if(enDisDel == "enable") { //, Enable
        if(!config.loadmodules.includes(which)) {
            config.loadmodules.push(which);
        }

    } else if(enDisDel == "disable") { //, Disable
        if(!config.unloadmodules.includes(which)) {
            config.unloadmodules.push(which);
        }

    } else if(enDisDel == "delete") { //, Delete
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
    config[which] = value;
    saveConfig();
}

function getConfigEntry(which) {
    return config[which];
}
