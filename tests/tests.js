function test1() {
	let results1 = document.getElementById("results1");

	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/wildcardSearch";
	let url = webhook_url + "?arg1=" + "JOHN";

	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// check if data is an array that is not empty
			if (Array.isArray(data) && data.length) {
				results1.innerHTML +=
					"Results found: " +
					data.length +
					"<br>" +
					"Test Passed | Type is array & not empty";
			} else {
				results1.innerHTML += "Test Failed";
			}
			console.log(data);
		})
		.catch(function (err) {
			console.log(err);
		});
}

function test2() {
	let results2 = document.getElementById("results2");
	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/bodyPartSearch";

	let url = webhook_url + "?arg=" + "ABDOMEN";

	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// check if data is an array that is not empty
			if (Array.isArray(data) && data.length) {
				results2.innerHTML +=
					"Results found: " +
					data.length +
					"<br>" +
					"Test Passed | Type is array & not empty";
			} else {
				results2.innerHTML += "Test Failed";
			}
			console.log(data);
		})
		.catch(function (err) {
			console.log(err);
		});
}

function test3() {
	let results3 = document.getElementById("results3");
	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/locationDemo";

	fetch(webhook_url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// check if data is an array that is not empty
			if (Array.isArray(data) && data.length) {
				results3.innerHTML +=
					"Results found: " +
					data.length +
					"<br>" +
					"Test Passed | Type is array & not empty";
			} else {
				results3.innerHTML += "Test Failed";
			}
			console.log(data);
		})
		.catch(function (err) {
			console.log(err);
		});
}
