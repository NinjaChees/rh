/**
 * Created by Yuri on 26.05.2015.
 */

MILES_RATIO = 1.609;

function rhCalc() {
    this.calcSelector = ["time", "distanceKM"];
    this.modSelector = ["time", "distanceKM"];      // set order for selector with priority: time->distance->pace-<speed
    this.holdParam = [];
    this.init = function(rh) {
        // 50 minutes for 10 km
        rh.time = new Date(50 * 60 * 1000);
        rh.distance = 10000;
        // all other parameters we can calculate
        this.calcTimeDistance(rh);
        this.clearHoldParam();
    };

    this.calc = function(rh, callerId) {
        this.setCalcSelector(callerId);
        // temporary plug
        this.uglyCalc00(rh);
        // setting VOmax
        rh.VOmax = this.calcVOmax(rh);
    };

    this.calcTimeDistance = function(rh) {
        rh.distanceKM = rh.distance / 1000;
        rh.paceKM = new Date(rh.time.valueOf() / rh.distanceKM);
        rh.speedKM = rh.distanceKM / rh.time * 1000 * 60 * 60;   // conversion milliseconds to hours
        rh.distanceMiles = rh.distanceKM / MILES_RATIO;
        rh.paceMiles = new Date(rh.time.valueOf() / rh.distanceMiles);
        rh.speedMiles = rh.distanceMiles / rh.time * 1000 * 60 * 60;   // conversion milliseconds to hours
    };

    // here we use holdParam[], when some parameter was entered by user, we don't need to calculate it again
    this.calcTimeDistanceHold = function(rh) {
        if (!this.holdParam['distanceKM']) {
            rh.distanceKM = rh.distance / 1000;
        }
        if (!this.holdParam['paceKM']) {
            rh.paceKM = new Date(rh.time.valueOf() / rh.distanceKM);
        }
        if (!this.holdParam['speedKM']) {
            rh.speedKM = rh.distanceKM / rh.time * 1000 * 60 * 60;
        }   // conversion milliseconds to hours
        if (!this.holdParam['distanceMiles']) {
            rh.distanceMiles = rh.distanceKM / MILES_RATIO;
        }
        if (!this.holdParam['paceMiles']) {
            rh.paceMiles = new Date(rh.time.valueOf() / rh.distanceMiles);
        }
        if (!this.holdParam['speedMiles']) {
            rh.speedMiles = rh.distanceMiles / rh.time * 1000 * 60 * 60;
        }
    };

    this.setCalcSelector = function (newSelector) {
        // we add new selector to fifo, but speed and pace couldn't be in fifo at the same time
        if ( (newSelector !== this.calcSelector[0]) &&
            !togetherPaceSpeed( this.calcSelector[0], newSelector ) &&
            !togetherSimilar(this.calcSelector[0], newSelector)) {
            this.calcSelector.unshift(newSelector);      // insert new element to fifo
            this.calcSelector.pop();                     // pop last element from fifo
        }
        // when both selectors are pace and speed we just change pace <--> speed
        if (togetherPaceSpeed( this.calcSelector[0], newSelector ) ||
            togetherSimilar(this.calcSelector[0], newSelector)) {
            this.calcSelector[0] = newSelector;
        }
        this.setModSelector();      // set modSelector
        //console.log( "calcSel: " + this.calcSelector + "; modSel: " + this.modSelector );
    };

    this.setModSelector = function () {
        // put time to first place
        if (this.calcSelector[0] === "time" || this.calcSelector[1] === "time") {
            if (this.calcSelector[1] === "time") {
                this.modSelector[0] = this.calcSelector[1];
                this.modSelector[1] = this.calcSelector[0];
                return; // exit function
            }
            this.modSelector[0] = this.calcSelector[0];
            this.modSelector[1] = this.calcSelector[1];
            return;     // exit function
        }
        // put distance to first place (because there is no time)
        if ( (this.calcSelector[0].indexOf("distance") !== -1) || (this.calcSelector[1].indexOf("distance") !== -1) ) {
            if ((this.calcSelector[1].indexOf("distance") !== -1)) {
                this.modSelector[0] = this.calcSelector[1];
                this.modSelector[1] = this.calcSelector[0];
                return; // exit function
            }
            this.modSelector[0] = this.calcSelector[0];
            this.modSelector[1] = this.calcSelector[1];
        }
    };

    this.uglyCalc = function(rh) {
        // we have time
        if (this.modSelector[0] === "time") {
            switch (this.modSelector[1]) {
                case "distanceKM":
                    rh.distance = 1000 * rh.distanceKM; // convert kilometers to meters
                    break;
                case "distanceMiles":
                    rh.distance = 1000 * rh.distanceMiles * MILES_RATIO;
                    break;
                case "paceKM":
                    rh.distance = rh.time / rh.paceKM * 1000;
                    break;
                case "paceMiles":
                    rh.distance = rh.time / rh.paceMiles * 1000 * MILES_RATIO;
                    break;
                case "speedKM":
                    rh.distance = rh.speedKM / rh.time * 60 * 60 * 1000 * 1000;
                    break;
                case "speedMiles":
                    rh.distance = rh.speedMiles / rh.time * 60 * 60 * 1000 * 1000 * MILES_RATIO;
                    break;
                default:
                    console.log("WTF???");
            }
        }
        // we have some sort of distance
        if (this.modSelector[0].indexOf("distance") !== -1)    {
            // convert kilometers or miles to meters
            rh.distance = (this.modSelector[0] === "distanceKM") ? rh[this.modSelector[0]] * 1000 :
                rh[this.modSelector[0]] * 1000 * MILES_RATIO;
            //
            switch (this.modSelector[1]) {
                case "paceKM":
                    rh.time = new Date( Math.round(rh.paceKM * (rh.distance / 1000) ) );
                    break;
                case "paceMiles":
                    rh.time = new Date( Math.round(rh.paceMiles * (rh.distance / 1000) / MILES_RATIO) );
                    break;
                case "speedKM":
                    rh.time = new Date( Math.round(rh.distance / rh.speedKM * 60 * 60 ) );
                    break;
                case "speedMiles":
                    rh.time = new Date( Math.round(rh.distance / (rh.speedMiles * MILES_RATIO) * 60 * 60 ) );
                    break;
                default:
                    console.log("WTF???");
            }
        }
        // now we have time and distance, let's calculate
        this.calcTimeDistance(rh);
    }

    this.uglyCalc00 = function(rh) {
        // setting holdParameter
        this.holdParam[this.modSelector[0]] = true;
        this.holdParam[this.modSelector[1]] = true;
        // we have time
        if (this.modSelector[0] === "time") {
            switch (this.modSelector[1]) {
                case "distanceKM":
                    rh.distance = 1000 * rh.distanceKM; // convert kilometers to meters
                    break;
                case "distanceMiles":
                    rh.distance = 1000 * rh.distanceMiles * MILES_RATIO;
                    break;
                case "paceKM":
                    rh.distance = rh.time / rh.paceKM * 1000;
                    break;
                case "paceMiles":
                    rh.distance = rh.time / rh.paceMiles * 1000 * MILES_RATIO;
                    break;
                case "speedKM":
                    rh.distance = rh.speedKM / rh.time * 60 * 60 * 1000 * 1000;
                    break;
                case "speedMiles":
                    rh.distance = rh.speedMiles / rh.time * 60 * 60 * 1000 * 1000 * MILES_RATIO;
                    break;
                default:
                    console.log("WTF???");
            }
        }
        // we have some sort of distance
        if (this.modSelector[0].indexOf("distance") !== -1)    {
            // convert kilometers or miles to meters
            rh.distance = (this.modSelector[0] === "distanceKM") ? rh[this.modSelector[0]] * 1000 :
            rh[this.modSelector[0]] * 1000 * MILES_RATIO;
            switch (this.modSelector[1]) {
                case "paceKM":
                    rh.time = new Date( Math.round(rh.paceKM * (rh.distance / 1000) ) );
                    break;
                case "paceMiles":
                    rh.time = new Date( Math.round(rh.paceMiles * (rh.distance / 1000) / MILES_RATIO) );
                    break;
                case "speedKM":
                    rh.time = new Date( Math.round(rh.distance / rh.speedKM * 60 * 60 ) );
                    break;
                case "speedMiles":
                    rh.time = new Date( Math.round(rh.distance / (rh.speedMiles * MILES_RATIO) * 60 * 60 ) );
                    break;
                default:
                    console.log("WTF???");
            }
        }
        // console.log(this.holdParam);
        // now we have time and distance, let's calculate
        this.calcTimeDistanceHold(rh);
        this.clearHoldParam(); // clear holdParam after use
    };

    // if holdParam[x] is true we may calculate parameter x, if false parameter x was entered by user
    this.clearHoldParam = function() {
        this.holdParam['time'] = false;
        this.holdParam['distance'] = false;
        this.holdParam['distanceKM'] = false;
        this.holdParam['distanceMiles'] = false;
        this.holdParam['paceKM'] = false;
        this.holdParam['paceMiles'] = false;
        this.holdParam['speedKM'] = false;
        this.holdParam['speedMiles'] = false;
    }

    // Daniels and Gilbert Formula for VO2 Max:
    // http://www.had2know.com/health/vo2-max-calculator-racing-daniels-gilbert.html
    this.calcVOmax = function (rh) {
        var v = rh.speedKM * 1000 / 60,     // convert km/h --> m/min
            t = rh.time.getUTCHours() * 60 + rh.time.getUTCMinutes() +
            rh.time.getSeconds() / 60;
        return ( 0.000104*v*v + 0.182258*v - 4.6 ) /
            ( 0.2989558*Math.exp(-0.1932605*t) + 0.1894393*Math.exp(-0.012778*t) +0.8 ) ;
    }



}