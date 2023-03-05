let webhook_url =
	"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/locationDemo";

var pinData = [];

var clickCircle;
var markersLayer = new L.LayerGroup();

fetch(webhook_url)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		for (var i = 0; i < data.length; i++) {
			let name = data[i].NAME;
			let surname = data[i].SURNAME;
			let unit = data[i].UNIT;
			let rank = data[i].RANK;
			let latitude = data[i].LATITUDE;
			let longitude = data[i].LONGITUDE;

			pin = [name, surname, unit, rank, latitude, longitude];

			if (latitude != null && longitude != null) {
				pinData.push(pin);
			}
		}
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

function onPinClick(e) {
	alert(pin);
}
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
	pinData.forEach(async (pin) => {
		latlng_a = new L.LatLng(pin[4], pin[5]);
		if (latlng_a.distanceTo(e.latlng) < range) {
			marker = L.marker(latlng_a);
			marker
				.bindPopup(
					"NAME : " +
						pin[0] +
						"<br> SURNAME : " +
						pin[1] +
						"<br> UNIT : " +
						pin[2] +
						"<br> RANK : " +
						pin[3]
				)
				.openPopup();
			markersLayer.addLayer(marker);
		}
	});
}
map.on("click", onMapClick);
