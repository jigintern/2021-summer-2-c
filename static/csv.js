const outputElement = document.getElementById('safe_list');

function getCsvData(dataPath) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', (event) => {
        const response = event.target.responseText;
        convertArray(response);
    });
    request.open('GET', dataPath, true);
    request.send();
}

function convertArray(data) {
    const dataArray = [];
    const dataString = data.split('\n');
    for (let i = 0; i < dataString.length; i++) {
        if (i == 0) {
            continue;
        }
        const column = dataString[i].split(',');
        dataArray[i] = [column[12], column[13]];
    }
    console.log(dataArray);
    outputElement.innerHTML = dataArray;
}

getCsvData('sabaesafe.csv');
convertArray('sabaesafe.csv');


//円範囲内判定
/*
34.7037896,135.1942838


boolean uploadFlg=false;
int dis;
dis=sqrt((position.coords.latitude-X)^2)+(position.coords.longitude-Y)^2);
if()
*/