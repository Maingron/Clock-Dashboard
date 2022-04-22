session.darkmode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if(session.darkmode == true) {
    document.querySelector("html").classList.add("dark");
} else {
    document.querySelector("html").classList.add("light");
}
