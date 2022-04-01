loadHTMLTemplate("modules/time-display/templates.html");

registerJSRender("ms", time_display_ms);
registerJSRender("seconds", time_display_seconds);
registerJSRender("minutes", time_display_minutes);
registerJSRender("hours", time_display_hours);

function time_display_ms() {
    return time.getMilliseconds();
}

function time_display_seconds() {
    return fillEmptyChars(time.getSeconds(), 2);
}

function time_display_minutes() {
    return fillEmptyChars(time.getMinutes(), 2);
}

function time_display_hours() {
    return fillEmptyChars(time.getHours(), 2);
}