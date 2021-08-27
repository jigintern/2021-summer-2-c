let stamp = localStorage.stamp;
if (stamp == undefined) {
    stamp = 0;
}
stamp = Number(stamp);
for (let i = 1; i <= stamp; i++) {
    stamps.innerHTML += `<img src = ".../data/${i}.jpg">`;
}