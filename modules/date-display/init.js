loadHTMLTemplate("modules/date-display/mytemplate.html");

function getDayOfWeekString(which) {
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