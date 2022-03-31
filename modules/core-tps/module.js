loadHTMLTemplate("modules/core-tps/templates.html");

function getSupposedTickcount() {
    return Math.round((time.getTime() - session.starttime) / 1000 * config.tps);
}

function getTickcountPercentage() {
    return Math.round((session.tickcount / getSupposedTickcount()) * 10000) / 100
}