function addToggleBtns() {
	const container = document.getElementById("toggleBtns");
	container.innerHTML = `
		<br/>
		<p style="text-align: center;">
		  On smaller screens, you may need to click the <img src="./img/moreRowInfo.png" alt="Expand Row" width="20" height="20"/> icon to expand a table row and view additional data.
		</p>
		<p style="text-align: center;">
		You can save the current table to a format of your choice with the buttons below as well as toggle the display of columns.
		</p>

		<h6 style="text-align: center;">Toggle column:</h6>
		<div class="buttons-row">
		<button class="toggle-vis" data-column="0">Name</button>
		<button class="toggle-vis" data-column="1">Surname</button>
		<button class="toggle-vis" data-column="2">Unit</button>
		<button class="toggle-vis" data-column="3">Rank</button>
		<button class="toggle-vis" data-column="4">Age</button>

		<button class="toggle-vis" data-column="5">Date In</button>
		<button class="toggle-vis" data-column="6">Date Out</button>
		<button class="toggle-vis" data-column="7">Duration</button>
		<button class="toggle-vis" data-column="8">Diagnosis 1</button>
		<button class="toggle-vis" data-column="9">Diagnosis 2</button>
	 	</div>
	  	<div class="buttons-row">
		<button class="toggle-vis" data-column="10">MOP Reference</button>
		<button class="toggle-vis" data-column="11">Service Number</button>
		<button class="toggle-vis" data-column="12">Reason</button>
		<button class="toggle-vis" data-column="13">Religion</button>
		<button class="toggle-vis" data-column="14">NOK</button>

		<button class="toggle-vis" data-column="15">Address</button>
		<button class="toggle-vis" data-column="16">County</button>
		<button class="toggle-vis" data-column="17">Remarks 1</button>
		<button class="toggle-vis" data-column="18">Remarks 2</button>
		<button class="toggle-vis" data-column="19">Doctor</button>
	  	</div>

		<br/>
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
		'<table id="resultsTable" style="width: 100%;text-align: center">';
	tableHtml += "<thead><tr>";
	tableHtml += "<th>Name</th>";
	tableHtml += "<th>Surname</th>";
	tableHtml += "<th>Unit</th>";
	tableHtml += "<th>Rank</th>";
	tableHtml += "<th>Age</th>";
	tableHtml += "<th>Date In</th>";
	tableHtml += "<th>Date Out</th>";
	tableHtml += "<th>Duration</th>";
	tableHtml += "<th>MOP Reference</th>";
	tableHtml += "<th>Service Number</th>";
	tableHtml += "<th>Reason</th>";
	tableHtml += "<th>Diagnosis 1</th>";
	tableHtml += "<th>Diagnosis 2</th>";
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
		tableHtml += `<td>${results[i].DATE_IN}</td>`;
		tableHtml += `<td>${results[i].DATE_OUT}</td>`;
		tableHtml += `<td>${results[i].DURATION}</td>`;
		tableHtml += `<td>${results[i].MOP_REFERENCE}</td>`;
		tableHtml += `<td>${results[i].SERVICE_NUMBER}</td>`;
		tableHtml += `<td>${results[i].REASON}</td>`;
		tableHtml += `<td>${results[i].DIAGNOSIS_1}</td>`;
		tableHtml += `<td>${results[i].DIAGNOSIS_2}</td>`;
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
	$.fn.dataTable.moment = function (format, locale) {
		var types = $.fn.dataTable.ext.type;

		// Add type detection
		types.detect.unshift(function (d) {
			return moment(d, format, locale, true).isValid()
				? "moment-" + format
				: null;
		});

		// Add sorting method - use an integer for the sorting
		types.order["moment-" + format + "-pre"] = function (d) {
			return moment(d, format, locale, true).unix();
		};
	};

	// Configure DataTables to use moment.js for date handling
	$.fn.dataTable.moment("DD/MM/YYYY");

	// Initialize the DataTable plugin
	var table = $("#resultsTable").DataTable({
		responsive: true,
		searching: true,
		ordering: true,
		paging: true,
		fixedHeader: true,
		dom: "BQlfrtip",
		buttons: [ 
            'excel','print'
        ],
		deferRender: true,
		scrollY: 900,
		scrollCollapse: true,
		// scroller: true,
		lengthMenu: [
			[10, 25, 50, -1],
			[10, 25, 50, "All"],
		],
		pageLength: 10,
		columnDefs: [
			{ type: "num", targets: 4 },
			{ type: "num", targets: 7 },
		],
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
	let wildcardSearch = document
		.getElementById("wildcardSearch")
		.value.toUpperCase();

	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/wildcardSearch";
	let url = webhook_url + "?arg1=" + wildcardSearch;

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

function validateForm() {
	var inputField = document.getElementById("wildcardSearch");
	var searchMessage = document.getElementById("searchMessage");

	if (inputField.value == "") {
		inputField.classList.add("required");
		searchMessage.innerHTML = "Why didn't you enter anything?";
		searchMessage.style.display = "block";
		setTimeout(function () {
			// Remove required class and clear validation message after 5 seconds
			inputField.classList.remove("required");
			searchMessage.innerHTML = "";
			searchMessage.style.display = "none";
		}, 5000);
		return false;
	} else {
		inputField.classList.remove("required");
		searchMessage.innerHTML = "";
		searchMessage.style.display = "none";
		return true;
	}
}
