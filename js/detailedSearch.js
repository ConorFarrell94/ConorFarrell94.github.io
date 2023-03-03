function addToggleBtns() {
	const container = document.getElementById("toggleBtns");
	container.innerHTML = `
		Toggle column:
		<div class="buttons-row">
		<button class="toggle-vis" data-column="0">Name</button>
		<button class="toggle-vis" data-column="1">Surname</button>
		<button class="toggle-vis" data-column="2">Unit</button>
		<button class="toggle-vis" data-column="3">Rank</button>
		<button class="toggle-vis" data-column="4">Age</button>

		<button class="toggle-vis" data-column="5">MOP Reference</button>
		<button class="toggle-vis" data-column="6">Service Number</button>
		<button class="toggle-vis" data-column="7">Reason</button>
		<button class="toggle-vis" data-column="8">Diagnosis 1</button>
		<button class="toggle-vis" data-column="9">Diagnosis 2</button>
	 	</div>
	  	<div class="buttons-row">
		<button class="toggle-vis" data-column="10">Date In</button>
		<button class="toggle-vis" data-column="11">Date Out</button>
		<button class="toggle-vis" data-column="12">Duration</button>
		<button class="toggle-vis" data-column="13">Religion</button>
		<button class="toggle-vis" data-column="14">NOK</button>

		<button class="toggle-vis" data-column="15">Address</button>
		<button class="toggle-vis" data-column="16">County</button>
		<button class="toggle-vis" data-column="17">Remarks 1</button>
		<button class="toggle-vis" data-column="18">Remarks 2</button>
		<button class="toggle-vis" data-column="19">Doctor</button>
	  	</div>

		`;
}

function replaceUndefined() {
	const table = document.getElementById("resultsTable");
	const cells = table.getElementsByTagName("td");
	[...cells].forEach((cell) => {
		if (
			cell.innerHTML === "undefined" ||
			cell.innerHTML === "null" ||
			cell.innerHTML === ""
		) {
			cell.innerHTML = "No data available";
		}
	});
	const paginateButtons = document.querySelectorAll(".paginate_button");
	paginateButtons.forEach((button) => {
		button.addEventListener("click", replaceUndefined);
	});
}
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
		0;
		tableHtml += `<td>${results[i].SURNAME}</td>`;
		1;
		tableHtml += `<td>${results[i].UNIT}</td>`;
		2;
		tableHtml += `<td>${results[i].RANK}</td>`;
		3;
		tableHtml += `<td>${results[i].AGE}</td>`;
		4;
		tableHtml += `<td>${results[i].MOP_REFERENCE}</td>`;
		5;
		tableHtml += `<td>${results[i].SERVICE_NUMBER}</td>`;
		6;
		tableHtml += `<td>${results[i].REASON}</td>`;
		7;
		tableHtml += `<td>${results[i].DIAGNOSIS_1}</td>`;
		8;
		tableHtml += `<td>${results[i].DIAGNOSIS_2}</td>`;
		9;
		tableHtml += `<td>${results[i].DATE_IN}</td>`;
		10;
		tableHtml += `<td>${results[i].DATE_OUT}</td>`;
		11;
		tableHtml += `<td>${results[i].DURATION}</td>`;
		12;
		tableHtml += `<td>${results[i].RELIGION}</td>`;
		13;
		tableHtml += `<td>${results[i].NOK}</td>`;
		14;
		tableHtml += `<td>${results[i].ADDRESS}</td>`;
		15;
		tableHtml += `<td>${results[i].COUNTY}</td>`;
		16;
		tableHtml += `<td>${results[i].REMARKS_1}</td>`;
		17;
		tableHtml += `<td>${results[i].REMARKS_2}</td>`;
		18;
		tableHtml += `<td>${results[i].DOCTOR}</td>`;
		tableHtml += "</tr>";
	}
	tableHtml += "</tbody></table>";

	$("#resultsTableContainer").html(tableHtml);

	// Initialize the DataTable plugin
	var table = $("#resultsTable").DataTable({
		searching: true,
		ordering: false,
		// scrollY: '200px',
		scrollX: "200px",
		scrollCollapse: true,
		paging: true,
	});
	replaceUndefined();
	const paginateButtons = document.querySelectorAll(".paginate_button");
	paginateButtons.forEach((button) => {
		button.addEventListener("click", replaceUndefined);
	});
	const rowLimit = document.getElementById("resultsTable_length");
	rowLimit.addEventListener("click", replaceUndefined);
	$("button.toggle-vis").on("click", function (e) {
		e.preventDefault();
		this.classList.toggle("active");
		// Get the column API object
		var column = table.column($(this).attr("data-column"));
		// Toggle the visibility
		column.visible(!column.visible());
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
			addToggleBtns();

			genTable(data);
		})
		.catch(function (err) {
			console.log(err);
		});
}
