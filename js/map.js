let webhook_url =
	"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/locationDemo";

var geocodes = [];
fetch(webhook_url)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
		// JSON.stringify(data, undefined, 2)
		// 	.replace(/[&\\\#,+()$~%.'"*?<>{}]/g, "")
		// 	.replace(/[\[\]']+/g, "")

		// console.log(data[1]);
		// for(x in data[1]) {
		// 	console.log(x)
		// }

		for (var i = 0; i < data.length; i++) {
			let latitude = data[i].LATITUDE;
			// console.log(latitude);

			let longitude = data[i].LONGITUDE;
			// console.log(longitude);
			geopin = [latitude, longitude];
			// L.marker(geopin).addTo(map);
			if (latitude != null && longitude != null) {
				geocodes.push(geopin);
			}
		}

		// console.log(geocodes);
		// setPins(geocodes);
	})
	.catch(function (err) {
		console.log(err);
	});

// Initialize the map and set its options
var map = L.map("map").setView([53.1424, -7.6921], 6); // Coords for Ireland
// Add the OpenStreetMap tiles to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function update() {
	let x = document.getElementById("myRange").value;

	document.getElementById("range").innerText = x + "km";
}

var clickCircle;
var markersLayer = new L.LayerGroup();
function onMapClick(e) {
	var range = document.getElementById("myRange").value * 1000;
	markersLayer.clearLayers();
	markersLayer.addTo(map);
	if (clickCircle != undefined) {
		map.removeLayer(clickCircle);
	}
	clickCircle = L.circle(e.latlng, range, {
		color: "#ff3b6b",
		fillOpacity: 0.3,
		opacity: 1,
	}).addTo(map);
	geocodes.forEach(async (geocode) => {
		latlng_a = new L.LatLng(geocode[0], geocode[1]);
		if (latlng_a.distanceTo(e.latlng) < range) {
			marker = L.marker(latlng_a);
			markersLayer.addLayer(marker);
		}
	});
}
map.on("click", onMapClick);

// map.on('click', function(e){
// 	var coord = e.latlng;
// 	var lat = coord.lat;
// 	var lng = coord.lng;
// 	console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
// 	L.circle([lat, lng], {radius: 20000}).addTo(map);
// 	});
// function setPins(geocodes) {
// 	geocodes.forEach(function (geocode) {
// 		L.marker(geocode).addTo(map);
// 	});
// }
