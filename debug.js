function tickDebug() {
    e.tickcounter.innerHTML++;
    e.supposedtickscounter.innerHTML = Math.round( 1 + ((time.getTime() - session.starttime) / 1000 * config.tps));
    e.tickpercentage.innerHTML = Math.round((e.tickcounter.innerHTML / e.supposedtickscounter.innerHTML) * 10000) / 100;
}