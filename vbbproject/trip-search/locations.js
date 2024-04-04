let latitude1 = 52.5;
let longitude1 = 13.3;
let map1;
let marker1;

let latitude2 = 52;
let longitude2 = 13;
let map2;
let marker2;


let tripBoard = [];

initialiseMaps();

map1.on('click', actualiseMarker1OnClick);
map2.on('click', actualiseMarker2OnClick);

function initialiseMaps() {
    /** Initialises the maps */
    map1 = L.map('map1').setView([latitude1, longitude1], 13);
    marker1 = L.marker([latitude1, longitude1]).addTo(map1);;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map1);

    map2 = L.map('map2').setView([latitude2, longitude2], 13);
    marker2 = L.marker([latitude2, longitude2]).addTo(map2);;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map2); 
}

async function actualiseMarker1OnClick(clickPos) {
    if(marker1)
        map1.removeLayer(marker1);
    latitude1 = clickPos.latlng.lat;
    longitude1 = clickPos.latlng.lng;
    marker1 = L.marker(clickPos.latlng).addTo(map1)

    writeStoredLocations();
}

async function actualiseMarker2OnClick(clickPos) {
    if(marker2)
        map2.removeLayer(marker2);
    latitude2 = clickPos.latlng.lat;
    longitude2 = clickPos.latlng.lng;
    marker2 = L.marker(clickPos.latlng).addTo(map2)

    writeStoredLocations();
}

function actualiseMarker1WithCoords() {
    if(marker1)
        map1.removeLayer(marker1);
    marker1 = L.marker([latitude1, longitude1]).addTo(map1)
}

function actualiseMarker2WithCoords() {
    if(marker2)
        map2.removeLayer(marker2);
    marker2 = L.marker([latitude2, longitude2]).addTo(map2)
}

async function noteStartByGeolocation(position) {
    /** Fetches the coordinates of the user */
    latitude1 = position.coords.latitude;
    longitude1 = position.coords.longitude;

    writeStoredLocations();
    actualiseMarker1WithCoords();
}

async function noteDestinationByGeolocation(position) {
    /** Fetches the coordinates of the user */
    latitude2 = position.coords.latitude;
    longitude2 = position.coords.longitude;

    writeStoredLocations();
    actualiseMarker2WithCoords();
}

async function getStation1ByInput() {
    /** Takes the station from the input fields */
    let inputStationName = document.getElementById('stationname1').value;
    let data;
    let APIURL = new URL("https://fahrinfo.vbb.de/restproxy/2.32/location.name");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("input", inputStationName);
    APIURL.searchParams.append("maxNo", 1);

    // Fetch the needed information from the API
    data = await fetchAPI(APIURL);
    if (data.stopLocationOrCoordLocation !== undefined) {
        latitude1 = data.stopLocationOrCoordLocation[0].StopLocation.lat;
        longitude1 = data.stopLocationOrCoordLocation[0].StopLocation.lon;
        actualiseMarker1WithCoords();
    }
    writeStoredLocations();
    document.getElementById('stationname1').value = ''

}

async function getStation2ByInput() {
    /** Takes the station from the input fields */
    let inputStationName = document.getElementById('stationname2').value;
    let data;
    let APIURL = new URL("https://fahrinfo.vbb.de/restproxy/2.32/location.name");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("input", inputStationName);
    APIURL.searchParams.append("maxNo", 1);

    // Fetch the needed information from the API
    data = await fetchAPI(APIURL);
    if (data.stopLocationOrCoordLocation !== undefined) {
        latitude2 = data.stopLocationOrCoordLocation[0].StopLocation.lat;
        longitude2 = data.stopLocationOrCoordLocation[0].StopLocation.lon;
        actualiseMarker2WithCoords();
    }

    writeStoredLocations();
    document.getElementById('stationname2').value = ''
}

function writeStoredLocations() {
    /** Writes the stored station to the output fields */
    document.getElementById('startlocation').textContent = latitude1 + ", " + longitude1;
    document.getElementById('destinationlocation').textContent = latitude2 + ", " + longitude2;
}


