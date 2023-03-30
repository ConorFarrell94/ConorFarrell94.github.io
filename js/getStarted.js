function addToggleBtns() {
	const container = document.getElementById("toggleBtns");
	container.innerHTML = `
	<p>Toggle column display</p>
	<button class="toggle-vis" data-column="0">Name</button>
	<button class="toggle-vis" data-column="1">Surname</button>
	<button class="toggle-vis" data-column="2">Reason</button>
	<button class="toggle-vis" data-column="3">County</button>
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
	var tableHtml = '<table id="resultsTable" style="width: 100%" onmousedown="return false" onselectstart="return false">';
	tableHtml += "<thead><tr>";
	tableHtml += "<th>Name</th>";
	tableHtml += "<th>Surname</th>";
	tableHtml += "<th>Reason</th>";
	tableHtml += "<th>County</th>";
	tableHtml += "</tr></thead>";
	tableHtml += "<tbody>";
	for (let i = 0; i < results.length; i++) {
		tableHtml += "<tr>";
		tableHtml += `<td>${results[i].NAME}</td>`;
		tableHtml += `<td>${results[i].SURNAME}</td>`;
		tableHtml += `<td>${results[i].REASON}</td>`;
		tableHtml += `<td>${results[i].ADDRESS}</td>`;
		tableHtml += "</tr>";
	}
	tableHtml += "</tbody></table>";

	$("#resultsTableContainer").html(tableHtml);

	// Initialize the DataTable plugin
	var table = $("#resultsTable").DataTable({
		responsive: true,
		searching: true,
		ordering: true,
		paging: true,
		fixedHeader: true,
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
	let searchString = document.getElementById("nameSearchInput").value;
	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/NameSearchWebhook";
	let url = webhook_url + "?arg=" + searchString;
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
	document.getElementById("nameSearchInput").value = "";
}

function validateForm() {
	var inputField = document.getElementById("nameSearchInput");
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
