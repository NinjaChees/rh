/**
 * Created by Yuri on 08.06.2015.
 */
$(function() {
    // slider Time 'constructor'
    $( "#sliderTime" ).slider({
        range: "max",
        min: 1,
        max: 54000,
        value: 600,
        slide: function( event, ui ) {
               $( "#sliderTimeLabel" ).val( timeToString(ui.value) );
        }
    });
    // slider Distance 'constructor'
    $( "#sliderDistance" ).slider({
        range: "max",
        min: 1,
        max: 1000,
        value: 100,
        slide: function( event, ui ) {
            $( "#sliderDistanceLabel" ).val( ui.value / 10);
        }
    });
    // slider Pace 'constructor'
    $( "#sliderPace" ).slider({
        range: "max",
        min: 60,
        max: 600,
        value: 300,
        slide: function( event, ui ) {
            $( "#sliderPaceLabel" ).val( timeToString(ui.value) );
        }
    });
    // slider Speed 'constructor'
    $( "#sliderSpeed" ).slider({
        range: "max",
        min: 1,
        max: 600,
        value: 120,
        slide: function( event, ui ) {
            $( "#sliderSpeedLabel" ).val( ui.value / 10);
        }
    });
    // initialization of sliders
    $( "#sliderTimeLabel" ).val( timeToString(+$( "#sliderTime" ).slider( "value" )) );
    $( "#sliderDistanceLabel" ).val( +$( "#sliderDistance" ).slider( "value" ) / 10);
    $( "#sliderPaceLabel" ).val( timeToString(+$( "#sliderPace" ).slider( "value" )) );
    $( "#sliderSpeedLabel" ).val( +$( "#sliderSpeed" ).slider( "value" ) / 10);
});

function setSliders() {
    $( "#sliderTime" ).slider({
        value: 600
    });
}