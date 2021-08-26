kouzui = (new URLSearchParams(location.search).get("kouzui"));
doseki = (new URLSearchParams(location.search).get("doseki"));
jishin = (new URLSearchParams(location.search).get("jishin"));
kaji = (new URLSearchParams(location.search).get("kaji"));
hanran = (new URLSearchParams(location.search).get("hanran"));


if (kouzui != 1){
    let childnode = document.getElementById("pic0");
    childnode.remove();
}
if (doseki != 1){
    let childnode = document.getElementById("pic1");
    childnode.remove();
}
if (jishin != 1){
    let childnode = document.getElementById("pic2");
    childnode.remove();
}
if (kaji != 1){
    let childnode = document.getElementById("pic3");
    childnode.remove();
}
if (hanran != 1){
    let childnode = document.getElementById("pic4");
    childnode.remove();
}

