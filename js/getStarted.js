function userAction() {
    let searchString = document.getElementById("myInput").value;
    let txt = "";
    console.log(searchString);

    let webhook_url =
        "https://eu-west-1.aws.data.mongodb-api.com/app/fyp-bffpf/endpoint/NameSearchWebhook";

    let url = webhook_url + "?arg=" + searchString;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
    document.getElementById("myInput").value = "";
}