function genTable(results) {
	// Create the table and add it to the page
	var tableHtml =
		'<table id="resultsTable" style="width: 100%;table-layout:fixed:border-collapse: collapse;">';
	tableHtml += "<thead><tr>";
	tableHtml += "<th>Name</th>";
	tableHtml += "<th>Surname</th>";
	tableHtml += "<th>Unit</th>";
	tableHtml += "<th>Rank</th>";
	tableHtml += "<th>Age</th>";
	tableHtml += "<th>MOP Reference</th>";
	tableHtml += "<th>Service Number</th>";
	tableHtml += "<th>Reason</th>";
	tableHtml += "<th>Diagnosis 1</th>";
	tableHtml += "<th>Diagnosis 2</th>";
	tableHtml += "<th>Date In</th>";
	tableHtml += "<th>Date Out</th>";
	tableHtml += "<th>Duration</th>";
	tableHtml += "<th>Religion</th>";
	tableHtml += "<th>NOK</th>";
	tableHtml += "<th>Address</th>";
	tableHtml += "<th>County</th>";
	tableHtml += "<th>Remarks 1</th>";
	tableHtml += "<th>Remarks 2</th>";
	tableHtml += "<th>Doctor</th>";
	tableHtml += "</tr></thead>";
	tableHtml += "<tbody>";
	for (let i = 0; i < results.length; i++) {
		tableHtml += "<tr>";
		tableHtml += `<td>${results[i].NAME}</td>`;
		tableHtml += `<td>${results[i].SURNAME}</td>`;
		tableHtml += `<td>${results[i].UNIT}</td>`;
		tableHtml += `<td>${results[i].RANK}</td>`;
		tableHtml += `<td>${results[i].AGE}</td>`;
		tableHtml += `<td>${results[i].MOP_REFERENCE}</td>`;
		tableHtml += `<td>${results[i].SERVICE_NUMBER}</td>`;
		tableHtml += `<td>${results[i].REASON}</td>`;
		tableHtml += `<td>${results[i].DIAGNOSIS_1}</td>`;
		tableHtml += `<td>${results[i].DIAGNOSIS_2}</td>`;
		tableHtml += `<td>${results[i].DATE_IN}</td>`;
		tableHtml += `<td>${results[i].DATE_OUT}</td>`;
		tableHtml += `<td>${results[i].DURATION}</td>`;
		tableHtml += `<td>${results[i].RELIGION}</td>`;
		tableHtml += `<td>${results[i].NOK}</td>`;
		tableHtml += `<td>${results[i].ADDRESS}</td>`;
		tableHtml += `<td>${results[i].COUNTY}</td>`;
		tableHtml += `<td>${results[i].REMARKS_1}</td>`;
		tableHtml += `<td>${results[i].REMARKS_2}</td>`;
		tableHtml += `<td>${results[i].DOCTOR}</td>`;
		tableHtml += "</tr>";
	}
	tableHtml += "</tbody></table>";

	$("#resultsTableContainer").html(tableHtml);

	// Initialize the DataTable plugin
	$("#resultsTable").DataTable({
		searching: false,
		ordering: false,
		paging: true,
	});
}

function userAction() {
	let name = document.getElementById("nameInput").value.toUpperCase();
	let surname = document.getElementById("surnameInput").value.toUpperCase();
	let county = document.getElementById("countyInput").value.toUpperCase();

	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/multiArgSearch";

	let url =
		webhook_url + "?arg1=" + name + "&arg2=" + surname + "&arg3=" + county;
	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data);
			// document.getElementById("results").innerHTML =
			//     "<pre>" +
			//     JSON.stringify(data, undefined, 2)
			//         .replace(/[&\\\#,+()$~%.'"*?<>{}]/g, "")
			//         .replace(/[\[\]']+/g, "") +
			//     "</pre>";
			// console.log(data);
			// if (data.length == 0) {
			//     document.getElementById("results").innerHTML = "No results";
			// }
			// if (data.length == 0) {
			//     console.log("No results");
			// }
			genTable(data);
		})
		.catch(function (err) {
			console.log(err);
		});
	// document.getElementById("myInput").value = "";
}
