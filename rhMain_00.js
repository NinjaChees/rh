/**
 * Created by Yuri on 26.05.2015.
 */

var myRH = new rhParam();
var myIO = new rhIO();
var myCalc = new rhCalc();

myCalc.init( myRH );

//document.getElementById("distanceKM").innerHTML = "10";
//document.getElementById("distanceKMInput").value = "10";
//console.log( myIO.getParamString(myRH, "distanceKM") );
//printRH("distanceKM");


// runRH starts the action
// callerId is a name of recently changed value
function runRH(callerId) {
    callerId = callerId.slice(0, -5); // remove "Input" from caller ID
    myIO.setParamString(myRH, callerId);
    myCalc.calc(myRH, callerId);
    printRH();
};

function printRH(callerId) {
    for (var key in myRH) {
        if (key === "distance") continue;       // because we have distanceKM and distanceMiles fields in html
        document.getElementById(key).innerHTML = myIO.getParamString(myRH, key);
        if (key != callerId) {
            document.getElementById(key + "Input").value = document.getElementById(key).innerHTML;
        }
    }
};

