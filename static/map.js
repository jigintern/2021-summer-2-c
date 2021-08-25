import { CSV } from "https://js.sabae.cc/CSV.js";

window.init = async () => {
    var sabae = { lat: 35.943056, lng: 136.188889 };
    var map = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 15,
            center: sabae,
        });
    var marker = new google.maps.Marker({
        position: sabae,
        map: map,
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: map
            });
            map.setZoom(15);
            map.setCenter(pos);
        });
    }
    else {
        alert("Err！");
    }

    const data = CSV.toJSON(await CSV.fetch("sabaesafe.csv"));
    console.log(data);

    let array = [[35.94243193, 136.1859739],
    [35.953064, 136.184382],
    [35.939483, 136.199131],
    [35.971811, 136.178243]];

    for (let n = 0; n < 4; n++) {
        var X = array[n][0];
        var Y = array[n][1];
        var sabaesafe = { lat: X, lng: Y };
        var safemarker = new google.maps.Marker({
            position: sabaesafe,
            map: map,
        });
    }
}