
let webhook_url =
"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/locationDemo";

var geocodes = []
fetch(webhook_url)
.then(function (response) {
	return response.json();
})
.then(function (data) {
	// JSON.stringify(data, undefined, 2)
	// 	.replace(/[&\\\#,+()$~%.'"*?<>{}]/g, "")
	// 	.replace(/[\[\]']+/g, "")

	// console.log(data[1]);
	// for(x in data[1]) {
	// 	console.log(x)
	// }

	for (var i = 0; i < data.length; i ++ ) {
		let latitude = data[i].Latitude;
		// console.log(latitude);

		let longitude = data[i].Longitude;
		// console.log(longitude);
		geopin = [latitude, longitude ]
		geocodes.push(geopin)
	}

	console.log(geocodes);
	setPins(geocodes);
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

function setPins(geocodes) {
	geocodes.forEach(function (geocode) {
		L.marker(geocode).addTo(map);
	});
}

