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
        icon: {
            fillColor: "#0033FF",
            fillOpacity: 0.8,
            path: google.maps.SymbolPath.CIRCLE,
            scale: 16,
            strokeColor: "#0C0100",
            strokeWeight: 1.0
        },
        label: {
            text: '駅',
            color: '#FFFFFF',
            fontSize: '20px'
        }
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: {
                    fillColor: "#FF2A00",
                    fillOpacity: 0.8,
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 10,
                    strokeColor: "#0C0100",
                    strokeWeight: 1.0
                },
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

    for (const d of data) {
        var X = Number(d["経度"]);
        console.log("X", X);
        var Y = Number(d["緯度"]);
        console.log("Y", Y);
        var sabaesafe = { lat: Y, lng: X };
        var safemarker = new google.maps.Marker({
            position: sabaesafe,
            map: map,
        });
        google.maps.event.addListener(safemarker, 'click', () => {
          location.href = "setumei/setumei.html?kouzui="+d["洪水"]+"&doseki="+d["崖崩れ、土石流及び地滑り"]+"&jishin="+d["地震"]+"&kaji="+d["大規模な火事"]+"&hanran="+d["内水氾濫"];
        });
    }
}
