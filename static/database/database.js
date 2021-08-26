 //<div id="r"></div>
function getCSV() {
    var req = new XMLHttpRequest();
    req.open('get', '../sabaesafe.csv', true);
    req.send(null);
    req.onload = function() {
      setCSV(req.responseText);
    };
  }
  function setCSV(str) {
    var data = [];
    var dataArr;
    var r = document.getElementById('r');
    var tmp = str.split('\n');
    tmp.forEach(x => {
      dataArr = x.split(',');
      if (dataArr[0]) {
        data.push(dataArr.map(x => x.trim()));
      }
    });
    var t = '<dl>';
    data.forEach(x => {
      t += `<dt>${x[0]}</dt>`;
    });
    t += '</dl>';
    r.innerHTML = t;
  }
  getCSV();