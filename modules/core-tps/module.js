meta["core-tps"] = {
    "color": "fuchsia",
    "name": "TPS Display"
}

loadHTMLTemplate("modules/core-tps/templates.html");


/**
* Returns ticks elapsed since last reload
* @returns {number} elapsed ticks
*/
function getTickcount() {
    return session.tickcount;
}


/**
* Returns expected amount of ticks since last reload
* @returns {number} amout of expected (max) ticks
*/
function getSupposedTickcount() {
    return Math.round((time.getTime() - session.starttime) / 1000 * config.tps);
}


/**
* Returns percentage of actual/expected ticks
* @returns {number} percentage of actual/expected ticks
*/
function getTickcountPercentage() {
    return Math.round((session.tickcount / getSupposedTickcount()) * 10000) / 100;
}


registerJSRender("tickcounter", getTickcount);
registerJSRender("supposedtickscounter", getSupposedTickcount);
registerJSRender("tickpercentage", getTickcountPercentage);
