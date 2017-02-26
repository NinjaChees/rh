/**
 * Created by Yuri on 26.05.2015.
 */

// rhIO contains in/out functions for rhParam class
function rhIO() {

    // returns value of 'rh'(:rhParam) using field name 'param'
    this.getParam = function (rh, param) {
        return rh[param];
    };

    // returns string of rh[param] for print out
    this.getParamString = function (rh, param) {
        switch (param) {
            case "time":
                return ( rh[param].getUTCHours() + ":" + rh[param].getMinutes() + ":" + (rh[param].getSeconds() ? rh[param].getSeconds() : "00" ) );
                break;
            case "distanceKM":
                return rh[param].toFixed(1);
                break;
            case "distanceMiles":
                return rh[param].toFixed(1);
                break;
            case "paceKM":
                return rh[param].getMinutes() + ":" + ( rh[param].getSeconds() > 9 ? rh[param].getSeconds() : "0" + rh[param].getSeconds());
                break;
            case "paceMiles":
                return rh[param].getMinutes() + ":" + ( rh[param].getSeconds() > 9 ? rh[param].getSeconds() : "0" + rh[param].getSeconds());
                break;
            case "speedKM":
                return myRound2(rh[param]);
                break;
            case "speedMiles":
                return myRound2(rh[param]);
                break;
            case "VOmax":
                return rh[param].toFixed(1);
                break;
            default :
                return undefined;
        }
    };

    // setting parameter from string
    this.setParamString = function (rh, param) {
        switch (param) {
            case "distanceKM":
            case "distanceMiles":
            case "speedKM":
            case "speedMiles":
            case "VOmax":
                rh[param] = +document.getElementById(param + "Input").value;
                break;
            case "time":
            case "paceKM":
            case "paceMiles":
                rh[param] = timeParse(document.getElementById(param + "Input").value);
            default:
                ;
        };

    };
};