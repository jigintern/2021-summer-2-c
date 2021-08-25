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