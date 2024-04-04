let latitude = 52.5;
let longitude = 13.3;
let stationid = "";
let stationname = "";
let departureBoard = [];


let map;
let marker;

initialiseMap();

map.on('click', actualiseMarkerOnClick);

function initialiseMap() {
    /** Initialises the map */
    map = L.map('map').setView([latitude, longitude], 13);
    marker = L.marker([latitude, longitude]).addTo(map);;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

async function actualiseMarkerOnClick(clickPos) {
    if(marker)
        map.removeLayer(marker);
    latitude = clickPos.latlng.lat;
    longitude = clickPos.latlng.lng;
    marker = L.marker(clickPos.latlng).addTo(map)

    await coordinatesToStation();
    writeStoredStation();
}

function actualiseMarkerWithCoords() {
    if(marker)
        map.removeLayer(marker);
    marker = L.marker([latitude, longitude]).addTo(map)
}

async function noteStationByGeolocation(position) {
    /** Fetches the coordinates of the user and translates them to the next station */
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    await coordinatesToStation();
    writeStoredStation();
}

async function getStationByInput() {
    /** Takes the station from the input fields */
    let inputStationName = document.getElementById('stationname').value;
    let data;
    let APIURL = new URL("https://fahrinfo.vbb.de/restproxy/2.32/location.name");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("input", inputStationName);
    APIURL.searchParams.append("maxNo", 1);

    // Fetch the needed information from the API and transform it into a sorted array
    data = await fetchAPI(APIURL);
    if (data.stopLocationOrCoordLocation === undefined) {
        stationname = "";
        stationid = "";
    } else {
        stationname = data.stopLocationOrCoordLocation[0].StopLocation.name;
        stationid = data.stopLocationOrCoordLocation[0].StopLocation.id;
        latitude = data.stopLocationOrCoordLocation[0].StopLocation.lat;
        longitude = data.stopLocationOrCoordLocation[0].StopLocation.lon;
        actualiseMarkerWithCoords();
    }
    document.getElementById('stationname').value = ''
    writeStoredStation();
    getDepartureBoard();
}

async function coordinatesToStation() {
    /** Translates the coordinates to the next station */
    // Generate the URL for the API request
    let data;
    let APIURL = new URL("https://fahrinfo.vbb.de/restproxy/2.32/location.nearbystops");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("originCoordLat", latitude);
    APIURL.searchParams.append("originCoordLong", longitude);
    APIURL.searchParams.append("maxNo", 1);

    // Fetch the needed information from the API and transform it into a sorted array
    data = await fetchAPI(APIURL);
    console.log(data);
    if (data.stopLocationOrCoordLocation === undefined) {
        stationname = "";
        stationid = "";
    } else {
        stationname = data.stopLocationOrCoordLocation[0].StopLocation.name;
        stationid = data.stopLocationOrCoordLocation[0].StopLocation.id;
        latitude = data.stopLocationOrCoordLocation[0].StopLocation.lat;
        longitude = data.stopLocationOrCoordLocation[0].StopLocation.lon;
        console.log(latitude, longitude);
        actualiseMarkerWithCoords();
        
    }

    getDepartureBoard();
}

function writeStoredStation() {
    /** Writes the stored station to the output fields */
    document.getElementById('currentStation').textContent = stationname;
}


