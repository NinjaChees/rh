/**
 * Created by Yuri on 26.05.2015.
 */

// some initial states for rhParam object
function rhParam() {
    // 50 minutes for 10 km
    this.time = new Date(50 * 60 * 1000);
    this.distance = 10000;
    this.distanceKM = 10;
    // next parameters we can calculate
    this.distanceMiles = 0;
    this.paceKM = 0;
    this.paceMiles = 0;
    this.speedKM = 0;
    this.speedMiles  = 0;
    this.VOmax = 0;
};
