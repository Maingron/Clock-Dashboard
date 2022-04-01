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
    return time.getDay();
}

function getDayOfWeekString() {
    var which = getDayOfWeek();
    switch(which) {
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        case 0:
            return "Sunday"
        default:
            return which + " not found. Maybe it's Monday?" // Error if day not found
    }
}