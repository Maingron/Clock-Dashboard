/**
 * @module core-edit
 */

/**
* Returns a menu with available blocks / templates
* @returns {string} menu with available blocks
*/
function buildAvailableBlocksMenu() {
    var result = [];
    result += "<select>";
    result += "\<optgroup hidden\>";
    var myColor, myName;

    for(myItem of session.availableBlocks) {
        if(myItem.split("/")[0] != lastItemModule) {
            myColor = meta[myItem.split("/")?.[0]]?.color ?? "";
            myName = meta[myItem.split("/")?.[0]]?.name ?? myItem.split("/")[0];

            result += "\<option disabled\>\</option\>";
            result += "\</optgroup\>";
            result += "\<optgroup style='color:" + myColor + "' label='" + myName + "'>";
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
