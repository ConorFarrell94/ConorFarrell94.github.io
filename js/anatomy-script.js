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
	var tableHtml = '<table id="resultsTable" style="width: 100%;">';
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

	// Initialize the DataTable plugin
	var table = $("#resultsTable").DataTable({
		responsive: true,
		searching: true,
		ordering: true,
		paging: true,
		deferRender: false,
		scrollY: 600,
		scrollCollapse: false,
		scroller: false,
		// dom: 'Qfrtip',
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
function userAction(selected) {
	let bodyPart = selected;
	console.log(bodyPart);

	let webhook_url =
		"https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/bodyPartSearch";

	let url = webhook_url + "?arg=" + bodyPart;

	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			genTable(data);
		});
}

(function ($) {
	"use strict";
	function isTouchEnabled() {
		return (
			"ontouchstart" in window ||
			navigator.MaxTouchPoints > 0 ||
			navigator.msMaxTouchPoints > 0
		);
	}

	$(document).ready(function () {
		$('path[id^="basic_"]').each(function (i, e) {
			addEvent($(e).attr("id"));
		});
	});

	function addEvent(id, relationId) {
		var _obj = $("#" + id);
		$("#basic-wrapper").css({ opacity: "1" });

		_obj.attr({ fill: "rgba(255, 0, 0, 0)", stroke: "rgba(255, 102, 102, 1)" });
		_obj.attr({ cursor: "default" });

		if (basic_config[id]["active"] === true) {
			if (isTouchEnabled()) {
				var touchmoved;
				_obj
					.on("touchend", function (e) {
						if (touchmoved !== true) {
							_obj.on("touchstart", function (e) {
								let touch = e.originalEvent.touches[0];
								let x = touch.pageX - 10,
									y = touch.pageY + -15;

								let $basicatip = $("#tip-basic");
								let basicanatomytipw = $basicatip.outerWidth(),
									basicanatomytiph = $basicatip.outerHeight();

								x =
									x + basicanatomytipw >
									$(document).scrollLeft() + $(window).width()
										? x - basicanatomytipw - 20 * 2
										: x;
								y =
									y + basicanatomytiph >
									$(document).scrollTop() + $(window).height()
										? $(document).scrollTop() +
										  $(window).height() -
										  basicanatomytiph -
										  10
										: y;

								if (basic_config[id]["target"] !== "none") {
									_obj.css({ fill: "rgba(255, 0, 0, 0.7)" });
								}
								$basicatip.show().html(basic_config[id]["hover"]);
								$basicatip.css({ left: x, top: y });
							});
							_obj.on("touchend", function () {
								_obj.css({ fill: "rgba(255, 0, 0, 0)" });
								if (basic_config[id]["target"] === "_blank") {
									let selected = basic_config[id]["hover"];
									userAction(selected);
								} else if (basic_config[id]["target"] === "_self") {
									let selected = basic_config[id]["hover"];
									userAction(selected);
								}
								$("#tip-basic").hide();
							});
						}
					})
					.on("touchmove", function (e) {
						touchmoved = true;
					})
					.on("touchstart", function () {
						touchmoved = false;
					});
			}
			_obj.attr({ cursor: "pointer" });

			_obj
				.on("mouseenter", function () {
					$("#tip-basic").show().html(basic_config[id]["hover"]);
					_obj.css({ fill: "rgba(255, 0, 0, 0.3)" });
				})
				.on("mouseleave", function () {
					$("#tip-basic").hide();
					_obj.css({ fill: "rgba(255, 0, 0, 0)" });
				});
			if (basic_config[id]["target"] !== "none") {
				_obj.on("mousedown", function () {
					_obj.css({ fill: "rgba(255, 0, 0, 0.7)" });
				});
			}
			_obj.on("mouseup", function () {
				_obj.css({ fill: "rgba(255, 0, 0, 0.3)" });
				if (basic_config[id]["target"] === "_blank") {
					let selected = basic_config[id]["hover"];
					userAction(selected);
				} else if (basic_config[id]["target"] === "_self") {
					let selected = basic_config[id]["hover"];
					userAction(selected);
				}
			});
			_obj.on("mousemove", function (e) {
				let x = e.pageX + 10,
					y = e.pageY + 15;

				let $abasic = $("#tip-basic");
				let basicanatomytipw = $abasic.outerWidth(),
					basicanatomytiph = $abasic.outerHeight();

				x =
					x + basicanatomytipw > $(document).scrollLeft() + $(window).width()
						? x - basicanatomytipw - 20 * 2
						: x;
				y =
					y + basicanatomytiph > $(document).scrollTop() + $(window).height()
						? $(document).scrollTop() +
						  $(window).height() -
						  basicanatomytiph -
						  10
						: y;

				$abasic.css({ left: x, top: y });
			});
		} else {
			_obj.hide();
		}
	}
})(jQuery);
