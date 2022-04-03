loadHTMLTemplate("modules/date-display/mytemplate.html");

registerJSRender("day", getDay);
registerJSRender("month", getMonth);
registerJSRender("year", getYear);

registerJSRender("dayOfWeek", getDayOfWeek);
registerJSRender("dayOfWeekString", getDayOfWeekString);

function getDay() {
    return fillEmptyChars((time.getDate()), 2);
}

function getMonth() {
    return fillEmptyChars((time.getMonth() + 1), 2);
}

function getYear() {
    return time.getFullYear();
}

function getDayOfWeek() {
    return fillEmptyChars(time.getDay(), 2);
}

function getDayOfWeekString() {
    var which = getDayOfWeek();
    switch(which) {
        case "01":
            return "Monday"
        case "02":
            return "Tuesday"
        case "03":
            return "Wednesday"
        case "04":
            return "Thursday"
        case "05":
            return "Friday"
        case "06":
            return "Saturday"
        case "00":
            return "Sunday"
        default:
            return which + " not found. Maybe it's Monday?" // Error if day not found
    }
}