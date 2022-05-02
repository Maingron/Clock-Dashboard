/**
 * @module time-display
 * @package
 */

meta["time-display"] = {
    "color": "green",
    "name": "Time Display"
}

loadHTMLTemplate("modules/time-display/templates.html");

registerJSRender("ms", time_display_ms);
registerJSRender("seconds", time_display_seconds);
registerJSRender("minutes", time_display_minutes);
registerJSRender("hours", time_display_hours);


/**
* Returns current millisecond
* @returns {number|string} current millisecond
*/
function time_display_ms() {
    return time.getMilliseconds();
}


/**
* Returns current second
* @returns {string} current second
*/
function time_display_seconds() {
    return fillEmptyChars(time.getSeconds(), 2);
}


/**
* Returns current minute
* @returns {string} current minute
*/
function time_display_minutes() {
    return fillEmptyChars(time.getMinutes(), 2);
}


/**
* Returns current hour
* @returns {string} current hour
*/
function time_display_hours() {
    return fillEmptyChars(time.getHours(), 2);
}
