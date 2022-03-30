loadHTMLTemplate("modules/edit-extras/edit-extras.html")
loadCSSFile("modules/edit-extras/edit-extras.css")

function buildAvailableBlocksMenu() {
    var result = [];
    result += "<select>";
    for(myItem of session.availableBlocks) {
        result += "\<option value="+myItem+"\>";
        result += myItem;
        result += "\</option\>";
        result += "\n";
    }
    result += "</select>";
    return result;
}