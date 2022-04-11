meta["core-edit"] = {
    "color": "orange",
    "name": "Edit"
}

loadHTMLTemplate("modules/core-edit/templates.html",
    'loadScriptFile("modules/core-edit/functions.js", "initEdit()")');


var myMovingBlockOffsetX;
var myMovingBlockOffsetY;


if(config.edit_mode) {
    loadCSSFile("modules/core-edit/style.css");
}

function initEditRegisterJSRenderers() {
    registerJSRender("buildAvailableBlocksMenu",buildAvailableBlocksMenu);
}
