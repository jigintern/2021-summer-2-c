import { LeafletGSI } from "https://js.sabae.cc/LeafletGSI.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { getDistance } from "https://js.sabae.cc/getDistance.js";

onload = async () => {
  const map = await LeafletGSI.initMap("divmap");

  let kariX = 136.18598 + .0005;
  let kariY = 35.942432;

  const sabae = { lat: 35.943056, lng: 136.188889 };
  const kari = { lat: kariY, lng: kariX };
  map.setView([sabae.lat, sabae.lng], 15);

  const marker = L.marker([sabae.lat, sabae.lng], {
    icon: L.spriteIcon("green"),
  }); // 駅
  marker.addTo(map);

  const karimarker = L.marker([kari.lat, kari.lng], {
    icon: L.spriteIcon("red"),
    draggable: true,
  }); // 仮
  karimarker.addTo(map);

  karimarker.on("dragend", (e) => {
    const ll = e.target.getLatLng();
    latitude.value = ll.lat;
    longitude.value = ll.lng;
    kariY = ll.lat;
    kariX = ll.lng;
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const marker = L.marker([pos.lat, pos.lng], {
        icon: L.spriteIcon("yellow"),
      }); // 現在位置 google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      marker.addTo(map);
      map.panTo([pos.lat, pos.lng], 15);
    });
  } else {
    alert("Err！");
  }

  const data = CSV.toJSON(await CSV.fetch("sabaesafe.csv"));
  console.log(data);

  for (const d of data) {
    const X = Number(d["経度"]);
    console.log("X", X);
    const Y = Number(d["緯度"]);
    console.log("Y", Y);
    const opt = {};
    const safemarker = L.marker([Y, X], opt);
    safemarker.addTo(map);

    safemarker.on("click", () => {
      const dis = getDistance(kariY, kariX, Y, X); //km
      let uploadFlg = false;
      if (dis <= 0.01) {
        uploadFlg = true;
      }
      console.log(uploadFlg);
      console.log(X);
      console.log(Y);
      if (uploadFlg) {
        location.href = "setumei/setumei.html?kouzui=" + d["洪水"] + "&doseki=" +
          d["崖崩れ、土石流及び地滑り"] + "&jishin=" + d["地震"] + "&kaji=" + d["大規模な火事"] +
          "&hanran=" + d["内水氾濫"];
      }
    });
  }
};
