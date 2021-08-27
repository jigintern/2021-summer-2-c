let photo = localStorage.photo;
if (photo == undefined) {
    photo = 0;
}
photo = Number(photo);
for (let i = 1; i <= photo; i++) {
    photo.innerHTML += `<img src = ".../data/${i}.jpg">`;
}