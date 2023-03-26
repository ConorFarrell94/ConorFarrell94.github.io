function makeMap() {
	var pinData = [];
	var markersLayer = new L.LayerGroup();
	var polygonsLayer;
	var circleslayer;
	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/locationDemo";
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

	var checkbox1 = document.getElementById("flexRadioDefault1");
	var checkbox2 = document.getElementById("flexRadioDefault2");

	// Add onchange event to checkbox 1
	checkbox1.addEventListener("change", function () {
		// Remove the existing layers
		if (circleslayer) {
			map.removeLayer(circleslayer);
		}
		if (polygonsLayer) {
			map.removeLayer(polygonsLayer);
		}
		markersLayer.clearLayers();
		map.off("click");
		if (document.getElementById("flexRadioDefault1").checked) {
			markersLayer.clearLayers();
			markersLayer.addTo(map);

			// markersLayer.clearLayers();
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
			map.removeLayer(circleslayer);
			markersLayer.clearLayers();
			map.off("click");
		}
	});

	// Add onchange event to checkbox 2
	checkbox2.addEventListener("change", function () {
		// Remove the existing layers
		if (polygonsLayer) {
			map.removeLayer(polygonsLayer);
		}
		if (circleslayer) {
			map.removeLayer(circleslayer);
		}
		markersLayer.clearLayers();
		map.off("click");
		if (document.getElementById("flexRadioDefault2").checked) {
			markersLayer.clearLayers();
			markersLayer.addTo(map);

			var polygonCoords = [];
			polygonsLayer = new L.LayerGroup();
			var numPoints = 0;

			function onMapClick(e) {
				numPoints++;
				polygonCoords.push([e.latlng.lat, e.latlng.lng]);

				if (numPoints === 1) {
					L.popup()
						.setLatLng(e.latlng)
						.setContent("Click two more points to make a triangle.")
						.openOn(map);
				} else if (numPoints === 2) {
					L.popup()
						.setLatLng(e.latlng)
						.setContent("Click one more point to complete the triangle.")
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
			markersLayer.clearLayers();
			map.removeLayer(polygonsLayer);
			map.off("click");
		}
	});

	// Add onclick event to reset button
	var resetBtn = document.getElementById("resetBtn");
	resetBtn.addEventListener("click", function () {
		document.getElementById("flexRadioDefault1").checked = false;
		document.getElementById("flexRadioDefault2").checked = false;
		var range = document.getElementById("myRange");
		range.value = 15;
		update();

		// Remove all layers from the map
		map.eachLayer(function (layer) {
			map.removeLayer(layer);
		});

		// Clear any event listeners associated with the map
		map.off();

		// Remove any controls from the map
		map.removeControl(map.zoomControl);

		// Reset the map's view to its initial state
		map.setView([53.1424, -7.6921], 6);

		// Add the OpenStreetMap tiles to the map
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);
	});
	update();
}

function update() {
	let x = document.getElementById("myRange").value;
	document.getElementById("range").innerText = x + "km";
}
