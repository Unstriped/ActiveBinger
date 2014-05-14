var helper = new CBHelper("activebinger", "0f3a3714db9f1a05a722b27a4782a0bc", new GenericHelper());
// use the md5 library provided to set the password
helper.setPassword(hex_md5("StefanBinger"));

//Fetch username and score

var name = sessionStorage.getItem("name");

document.getElementById("userName").innerHTML = name;

var searchCondition = { };
var totPoints;
var password;

function updatePoints(){
    helper.searchDocuments(searchCondition,"users", function(resp) {
    for( I in resp.outputData){
        var oneUser = resp.outputData[I];

        if(name == oneUser.name){
           totPoints = oneUser.totPoints;
           document.getElementById("pointCounter").innerHTML = "Score: " + totPoints;
           password = oneUser.password;

        }
    }

            
});

}



//Handle geo-tracking


var totalDistance = 0.0;
var distanceLeft = 25.0;
var lastLat;
var lastLong;
//var inQuestion = false;
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

function loadGeo() {
	if(navigator.geolocation) {
		updateStatus("HTML5 Geolocation is supported in your browser.");
		id= navigator.geolocation.watchPosition(updateLocation,
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


    // don't calculate distance if accuracy
    // value too large
    if (accuracy >= 500) {
    	updateStatus("Need more accurate values to calculate distance.");
    	return;
    }

    // calculate distance
       if ((lastLat != null) && (lastLong != null)) {
    	var currentDistance = distance(latitude, longitude, lastLat, lastLong);
 
       distanceLeft -= currentDistance*1000;
       //distanceLeft = 0;
      // var currentDistance = distanceLeft;
    	if(distanceLeft<=0){
	       //inQuestion = true;
           navigator.geolocation.clearWatch(id);
 		 $.getScript("questions.js") 
            .done(function() {
 			    distanceLeft = 25.0;
                
                //inQuestion = false;
 		     })
            .fail(function() {
                alert("ERROR! WARNING WARNING");
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