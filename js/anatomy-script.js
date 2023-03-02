(function ($) {
	"use strict";

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
				data.map(function (data) {
					delete data._id;
					delete data.LATITUDE;
					delete data.LONGITUDE;
					return data;
				});
				// console.log(data);
				document.getElementById("json-data").innerHTML =
					"<pre>" +
					JSON.stringify(data, undefined, 2)
						.replace(/[&\\\#,+()$~%.'"*?<>{}]/g, "")
						.replace(/[\[\]']+/g, "") +
					"</pre>";
				console.log(data);
				if (data.length == 0) {
					document.getElementById("results").innerHTML = "No results";
				}
			})
			.catch(function (err) {
				console.log(err);
			});
		// document.getElementById("myInput").value = "";
	}

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
									// console.log(basic_config[id]["hover"]);
									let selected = basic_config[id]["hover"];
									userAction(selected);
								} else if (basic_config[id]["target"] === "_self") {
									// console.log(basic_config[id]["hover"]);
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
					// window.open(basic_config[id]['url']);
					// console.log(basic_config[id]["hover"]);
					let selected = basic_config[id]["hover"];
					userAction(selected);
				} else if (basic_config[id]["target"] === "_self") {
					// window.parent.location.href = basic_config[id]['url'];
					// console.log(basic_config[id]["hover"]);
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
