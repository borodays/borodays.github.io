function getMinute() {
    let min = document.getElementById("minute");
    let currentDate = new Date();
    let currentMins = currentDate.getMinutes();
    min.innerText = currentMins;
}

function alertMessage(){
    alert("Enjoy the performance!");
}

function remove() {
    let toRemove = document.getElementById("removable");
    toRemove.style.display = "none";
}

var userArray = []
function addToArray(){
    var currentInput = document.getElementById("inputText").value;
    userArray.push(currentInput);
    document.getElementById("inputText").value = "";
    console.log(userArray);
}

function parseArray(array){
    outputArray = array.sort();
    console.log(outputArray);
    return outputArray;
}

function sortArray(){
    var resultArray = parseArray(userArray);
    var userOutput = document.getElementById("outputRow");
    for (i in resultArray){
        var newLI = document.createElement("li");
        newLI.innerText = resultArray[i];
        userOutput.appendChild(newLI);
    }
}

function wikiAPI(){
    var searchTerm = document.getElementById("searchTerm").value;
    var connect = new XMLHttpRequest();
    var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=20&gsrsearch=" + searchTerm;
    connect.open("GET", url);
    connect.onload = function () {
        var wikiObject = JSON.parse(this.response);
        var pages = wikiObject.query.pages;
        for (var i in pages) {
            var newLink = document.createElement("a");
            var link = "https://en.wikipedia.org/?curid=";
            newLink.setAttribute("class", "stretched-link d-block");
            newLink.setAttribute("href", link + pages[i].pageid);
            newLink.innerText = pages[i].title;
            document.getElementById("wiki").appendChild(newLink);
        }
    }
    connect.send();
    //Use pageid property in JSON file
}
function mapLoad(){
    //Define the lat lon coordinate
    var coords = [
        ["Bolshoi Theater<br>Home of Bolshoi Ballet", 55.7601, 37.6186],
        ["Mariinsky Theater<br>Home of Mariinsky Ballet", 59.9256, 30.2960],
        ["Royal Opera House<br>Home of Royal Ballet", 51.5129, -0.1222],
        ["Palais Garnier<br>Home of Paris Opera Ballet", 48.8720, 2.3316],
        ["Lincoln Center<br> Home of American Ballet Theatre<br>and New York City Ballet", 40.7725, -73.985],
        ["Kennedy Center", 38.8959, -77.0577]
    ];
    //var bolshoi = [55.7601, 37.6186];
    //var mariinsky = [59.9256, 30.2960];
    //var royalOpera = [51.5129, -0.1222];
    //var parisOpera = [48.8720, 2.3316];
    //var lincolnCenter = [40.7725, -73.985];
    //var kennedyCenter = [38.8958, -77.0577];
    var xsum = 0;
    for(i in coords){
        xsum += coords[i][1];
    }
    var ysum = 0;
    for(i in coords){
        ysum += coords[i][2];
    }
    var count = coords.length;
    var xavg = xsum / count;
    var yavg = ysum / count;

    var midpoint = [xavg, yavg];
  
    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  
    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
  
    var map = L.map('map', {
      center: midpoint,
      zoom: 3,
      layers: [streets]
    });
  
    var baseLayers = {
      "Grayscale": grayscale,
      "Streets": streets
    };
  
    L.control.layers(baseLayers).addTo(map);
  
    for (var i = 0; i < coords.length; i++) {
        marker = new L.marker([coords[i][1],coords[i][2]])
            .bindPopup(coords[i][0])
            .addTo(map);
    }
  
  
  
    //Click event
    var popup = L.popup();
  
    function onMapClick(e) {
      popup
      .setLatLng(e.bolshoi)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
    }
    map.on('click', onMapClick);
  }

  var parentElement = document.getElementById("ochreTableBody");
  var url = "http://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300";

  function loadXML(){
        XMLrequest(url);
        console.log("loadXLM -- ok");
  }
  function XMLrequest(link){
      var connect = new XMLHttpRequest();
      connect.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200){
              listTexts(this.responseXML);
          };
      };
      connect.open('GET', link, true);
      connect.send();
      console.log("XML request -- ok");
  }
  function listTexts(sourceXML){
      document.getElementById("projectTitle").innerText = sourceXML.getElementsByTagName("metadata")[0].children[1].innerHTML;
      document.getElementById("setTitle").innerText = sourceXML.getElementsByTagName("set")[0].children[3].children[0].innerHTML;
      document.getElementById("setDescription").innerText = sourceXML.getElementsByTagName("set")[0].children[4].innerHTML;
      var licenseText = document.getElementById("license");
      licenseText.innerText = sourceXML.getElementsByTagName("availability")[0].children[0].innerHTML;
      licenseText.setAttribute("href", sourceXML.getElementsByTagName("availability")[0].children[0].attributes[0].nodeValue);

      console.log(sourceXML);
      var textList = sourceXML.getElementsByTagName("text");
      console.log(textList);
      for(i = 0; i < textList.length; i++){
          var tr = document.createElement("tr");
          tr.setAttribute("class", "ochreTableRows");
          tr.setAttribute("id", "row_"+i);
          document.getElementById("ochreTableBody").appendChild(tr);

          var td = document.createElement("td");
          td.setAttribute("id", "td_name_"+i);
          td.textContent = textList[i].children[0].children[0].innerHTML;
          document.getElementById("row_"+i).appendChild(td);
          var td2 = document.createElement("td");
          td2.setAttribute("id", "td_desc_"+i);
          td2.textContent = textList[i].children[3].innerHTML;
          document.getElementById("row_"+i).appendChild(td2);
      }
  }