function findLocation(){

	var query = $('#location').val();;

	//The query needs to be encoded for URLs - ie replaces spaces with %20's
 	var encodedQuery = encodeURIComponent(query);
	var endpoint = 'http://api.opencagedata.com/geocode/v1/json?q=';
	var api_key = '614bd81902a73f0d3f6db088fdab4f68';

 	// Now we can construct the url
	var url = endpoint + encodedQuery + '&key=' + api_key;
	// https://api.opencagedata.com/geocode/v1/json?q=Wellington,+New%20Zealand&key=614bd81902a73f0d3f6db088fdab4f68&pretty=1
	// It should look like that - try opening that in your browser

	// Now we can use Jquery to make a GET request
		$.get(url, function(data) {
		// Check your browser javascript console to look through the data
		console.log(data);

		$('#address').text('Address: ' + data.results[0].formatted);



		var Longitude = data.results[0].geometry.lng;
		var Lattitude =	data.results[0].geometry.lat;
		var Sunrise = convertTimestamp(data.results[0].annotations.sun.rise.apparent);
		var Sunset = convertTimestamp(data.results[0].annotations.sun.set.apparent);
		$('#rise').text('Sunrise: ' + Sunrise);
		$('#set').text('Sunset: ' + Sunset);
		$('#lat').text('Lattitude: ' + Lattitude);
		$('#lng').text('Longitude: ' + Longitude);
		displayMap(Lattitude, Longitude);

	});

	function convertTimestamp(timestamp) {
	  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
			yyyy = d.getFullYear(),
			mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
			dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
			hh = d.getHours(),
			h = hh,
			min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
			ampm = 'AM',
			time;

		if (hh > 12) {
			h = hh - 12;
			ampm = 'PM';
		} else if (hh === 12) {
			h = 12;
			ampm = 'PM';
		} else if (hh == 0) {
			h = 12;
		}

		// ie: 2013-02-18, 8:35 AM
		time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

		return time;

	}
}

function displayMap(Lattitude, Longitude) {
	var mapCanvas = document.getElementById("map");
	var mapOptions = {
		center: new google.maps.LatLng(Lattitude, Longitude),
		zoom: 12
	};
	var map = new google.maps.Map(mapCanvas, mapOptions);
}
