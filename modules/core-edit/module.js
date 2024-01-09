/**
 * @module core-edit
*/

meta["core-edit"] = {
    "color": "orange",
    "name": "Edit"
}

loadScriptFile("modules/core-edit/templates-functions.js");

loadHTMLTemplate("modules/core-edit/templates.html",
    'loadScriptFile("modules/core-edit/functions.js", "initEdit()")');


if(config.edit_mode) {
    var myMovingBlockOffsetX;
    var myMovingBlockOffsetY;

    loadCSSFile("modules/core-edit/style.min.css");
}


/**
*
*/
function initEditRegisterJSRenderers() {
    registerJSRender("buildAvailableBlocksMenu",buildAvailableBlocksMenu);
}
