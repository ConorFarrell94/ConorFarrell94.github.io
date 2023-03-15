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

var circleslayer;

function clickCircle(e) {
	markersLayer.clearLayers();
	markersLayer.addTo(map);

	// Remove the existing circles layer
	if (circleslayer) {
		map.removeLayer(circleslayer);
	}
	if (document.getElementById("checkbox1").checked) {
		markersLayer.clearLayers();
		circleslayer = new L.LayerGroup();
		function onMapClick(e) {
			var range = document.getElementById("myRange").value * 1000;
			if (e && e.latlng) {
				// clickCircle = L.circle(e.latlng, range, {
				// 	color: "#ff3b6b",
				// 	fillOpacity: 0.3,
				// 	opacity: 1,
				// }).addTo(map);

				var circle = L.circle(e.latlng, range, {
					color: "#ff3b6b",
					fillOpacity: 0.3,
					opacity: 1,
				});
				circleslayer.addLayer(circle);
				circleslayer.addTo(map);

				pinData.forEach((pin) => {
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
		}

		map.on("click", onMapClick);
	} else {
		map.off("click");
	}
}

var polygonsLayer;

function clickPolygon(e) {
	markersLayer.clearLayers();
	markersLayer.addTo(map);

	// Remove the existing polygons layer
	if (polygonsLayer) {
		map.removeLayer(polygonsLayer);
	}

	if (document.getElementById("checkbox2").checked) {
		var polygonCoords = [];
		polygonsLayer = new L.LayerGroup();
		var numPoints = 0;

		function onMapClick(e) {
			numPoints++;
			polygonCoords.push([e.latlng.lat, e.latlng.lng]);

			if (numPoints === 1) {
				L.popup()
					.setLatLng(e.latlng)
					.setContent("Click two more points to make a polygon.")
					.openOn(map);
			} else if (numPoints === 2) {
				L.popup()
					.setLatLng(e.latlng)
					.setContent("Click one more point to complete the polygon.")
					.openOn(map);
			} else if (numPoints === 3) {
				var polygon = L.polygon(polygonCoords, {
					color: "#36A8E0",
					fillOpacity: 0.3,
					opacity: 1,
				});
				polygonsLayer.addLayer(polygon);
				polygonsLayer.addTo(map);
				polygonCoords = [];
				numPoints = 0;

				pinData.forEach((pin) => {
					var latlng = L.latLng(pin[4], pin[5]);
					var polygonGeoJSON = polygon.toGeoJSON();
					var pinGeoJSON = {
						type: "Feature",
						properties: {},
						geometry: {
							type: "Point",
							coordinates: [pin[5], pin[4]],
						},
					};
					if (turf.booleanPointInPolygon(pinGeoJSON, polygonGeoJSON)) {
						var marker = L.marker(latlng);
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
		}

		map.on("click", onMapClick);
	} else {
		map.off("click");
	}
}

map.on("click", clickPolygon);

function clearMap() {
	map.eachLayer(function (layer) {
		map.removeLayer(layer);
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);
	});
}
