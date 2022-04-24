meta["time-display"] = {
    "color": "green",
    "name": "Time Display"
}

loadHTMLTemplate("modules/time-display/templates.html");

registerJSRender("ms", time_display_ms);
registerJSRender("seconds", time_display_seconds);
registerJSRender("minutes", time_display_minutes);
registerJSRender("hours", time_display_hours);

function time_display_ms() {
    /**
    * Return current millisecond
    * @returns {number|string} current millisecond
    */

    return time.getMilliseconds();
}

function time_display_seconds() {
    /**
    * Returns current second
    * @returns {string} current second
    */

    return fillEmptyChars(time.getSeconds(), 2);
}

function time_display_minutes() {
    /**
    * Returns current minute
    * @returns {string} current minute
    */

    return fillEmptyChars(time.getMinutes(), 2);
}

function time_display_hours() {
    /**
    * Returns hour
    * @returns {string} current hour
    */

    return fillEmptyChars(time.getHours(), 2);
}
