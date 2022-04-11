meta["settings"] = {
    "color": "#888888"
}


function updateSettings() {
    document.getElementById("setting-debug").setAttribute("checked","checked");
    document.getElementById("setting-tps").setAttribute("value", config.tps);
}

function setBackgroundImage(which) {
    var myReader = new FileReader();
    myReader.readAsDataURL(which.files[0]);

    myReader.onload = function() {
        config.bodyBackground = "url("+myReader.result+")";
        document.body.style.backgroundImage = "url("+myReader.result + ")";
        saveConfig();
    }
}


loadHTMLTemplate("modules/core-settings/templates.html");
