 

var name = sessionStorage.getItem("name");

document.getElementById("userName").innerHTML = name;

var totalDistance = 0.0;
var distanceLeft = 500.0;
var lastLat;
var lastLong;

Number.prototype.toRadians = function() {
	return this * Math.PI / 180;
}


function distance(latitude1, longitude1, latitude2, longitude2) {
    // R is the radius of the earth in kilometers
    var R = 6371;

    var deltaLatitude = (latitude2-latitude1).toRadians();
    var deltaLongitude = (longitude2-longitude1).toRadians();
    latitude1 = latitude1.toRadians(), latitude2 = latitude2.toRadians();

    var a = Math.sin(deltaLatitude/2) *
    Math.sin(deltaLatitude/2) +
    Math.cos(latitude1) *
    Math.cos(latitude2) *
    Math.sin(deltaLongitude/2) *
    Math.sin(deltaLongitude/2);

    var c = 2 * Math.atan2(Math.sqrt(a),
    	Math.sqrt(1-a));
    var d = R * c;
    return d;
}


function updateStatus(message) {
	document.getElementById("status").innerHTML = message;
}

function loadDemo() {
	if(navigator.geolocation) {
		updateStatus("HTML5 Geolocation is supported in your browser.");
		navigator.geolocation.watchPosition(updateLocation,
			handleLocationError,
			{maximumAge:10000});
	}
}

function updateLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var accuracy = position.coords.accuracy;
	var timestamp = position.timestamp;

	document.getElementById("accuracy").innerHTML ="Accuracy: " + accuracy;


    // sanity test... don't calculate distance if accuracy
    // value too large
    if (accuracy >= 500) {
    	updateStatus("Need more accurate values to calculate distance.");
    	return;
    }

    // calculate distance

    if ((lastLat != null) && (lastLong != null)) {
    	var currentDistance = distance(latitude, longitude, lastLat, lastLong);
    	//distanceLeft -= currentDistance*1000;
    	distanceLeft = 0;
    	if(distanceLeft<=0){
    		distanceLeft = 500.0;

 		jQuery.getScript("questions.js", function() {
 			
 		});
			  		
    	}
    	document.getElementById("currDist").innerHTML =
    	"Distance left: " + distanceLeft.toFixed(1) + " m";

    	totalDistance += currentDistance;

    	document.getElementById("totalDist").innerHTML =
    	"Total distance traveled: " + totalDistance.toFixed(3) + " km";
    }


    lastLat = latitude;
    lastLong = longitude;

    updateStatus("");
}

function handleLocationError(error) {
	switch(error.code)
	{
		case 0:
		updateStatus("There was an error while retrieving your location: " + error.message);
		break;
		case 1:
		updateStatus("The user prevented this page from retrieving a location.");
		break;
		case 2:
		updateStatus("The browser was unable to determine your location: " + error.message);
		break;
		case 3:
		updateStatus("The browser timed out before retrieving the location.");
		break;
	}
}