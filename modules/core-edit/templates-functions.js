
/**
* Returns a menu with available blocks / templates
* @returns {string} menu with available blocks
*/
function buildAvailableBlocksMenu() {
    var result = [];
    result += "<select>";
    result += "\<optgroup hidden\>";
    for(myItem of session.availableBlocks) {
        var myColor = "";

        if(meta[myItem.split("/")[0]]) {
            myColor = meta[myItem.split("/")[0]].color;
        }

        if(myItem.split("/")[0] != lastItemModule) {
            result += "\<option disabled\>\</option\>";
            result += "\</optgroup\>";
            result += "\<optgroup style='color:" + myColor + "' label='" + myItem.split("/")[0] + "'>";
        }

        if(document.getElementById(myItem).getAttribute("internal") != "internal" || config.allowinternalblockscreation) {
            result += "\<option value="+myItem+"\>";
            if(document.getElementById(myItem).getAttribute("internal") == "internal") {
                result += "[in] ";
            }
            result += myItem.split("/")[1];
            result += "\</option\>";
            result += "\n";
        }

        var lastItemModule = myItem.split("/")[0];
    }
    result += "</select>";
    return result;
}
