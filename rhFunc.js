/**
 * Created by Yuri on 27.05.2015.
 */

// helpful functions


// parses hh:mm:ss or h:mm:ss or mm:ss or m:ss to a Date object
// !!! NEED TO IMPROVE THIS FUNCTION 111
function timeParse(timeString) {
    if ( timeString === undefined ) {
        return;
    }
    var hours = 0,
        minutes = 0,
        seconds = 0;
    var i = timeString.length;
    // m:ss
    if (i === 4) {
        seconds = + ( timeString[2] + timeString[3] );
        minutes = + ( timeString[0] );
    };
    // mm:ss
    if (i === 5) {
        seconds = + ( timeString[3] + timeString[4] );
        minutes = + ( timeString[0] + timeString[1]);
    };
    // h:mm:ss
    if (i === 7) {
        seconds = + ( timeString[5] + timeString[6] );
        minutes = + ( timeString[2] + timeString[3] );
        hours = + ( timeString[0] )
    };
    // hh:mm:ss
    if (i === 8) {
        seconds = + ( timeString[6] + timeString[7] );
        minutes = + ( timeString[3] + timeString[4] );
        hours = + ( timeString[0] + timeString[1] );
    };

    var someTime = new Date(0);
    someTime.setUTCHours(hours, minutes, seconds);
    return ( someTime );
}

// true if string1 and string2 are pace and speed
function togetherPaceSpeed(string1, string2) {
    var str = (string1+string2).toLocaleLowerCase();
    // checking pace and speed not in one moment
    return ( (str.indexOf("pace") !== -1) && (str.indexOf("speed") !== -1) );
};

// true id dastanceKM and distanceMiles at the same time
// also the same for pace and speed
function togetherSimilar(string1, string2) {
    var str = (string1+string2).toLocaleLowerCase();
    // checking similar strings, f.e. paceKM and PaceMiles
    if (numbSubsString(str, "distance") > 1 ) {
        return true;
    };
    if (numbSubsString(str, "pace") > 1 ) {
        return true;
    };
    if (numbSubsString(str, "speed") > 1 ) {
        return true;
    };
    return false;
};

// returns number of substrings in string
function numbSubsString(str, sub) {
    var num = 0,
        pos = -1;
    while ((pos = str.indexOf(sub, pos + 1)) != -1) {
        num++;
    }
    return num;
};

//round function
function myRound2(num) {
    return  Math.round(num * 100) / 100;
};

function timeToString(sec) {
    var someTime = new Date(sec * 1000);
    return someTime.getUTCHours() + ":" +
    ( someTime.getMinutes() > 9 ? someTime.getMinutes() : "0" + someTime.getMinutes() ) + ":" +
    ( someTime.getSeconds() > 9 ? someTime.getSeconds() : "0" + someTime.getSeconds() ) ;
}