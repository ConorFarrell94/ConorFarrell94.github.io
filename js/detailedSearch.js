function userAction() {
    let name = document.getElementById("nameInput").value.toUpperCase();
    let surname = document.getElementById("surnameInput").value.toUpperCase();
    let county = document.getElementById("countyInput").value.toUpperCase();

    let webhook_url =
        "https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/multiArgSearch";

    let url = webhook_url + "?arg1=" + name + "&arg2=" + surname + "&arg3=" + county;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            document.getElementById("results").innerHTML =
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