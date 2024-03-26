let latitude = 52.5;
let longitude = 13.3;
let stationid = "";
let stationname = "";

let map;
let marker;

initialiseMap();

map.on('click', actualiseMarker);

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

async function actualiseMarker(e) {
    if(marker)
        map.removeLayer(marker);
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;
    marker = L.marker(e.latlng).addTo(map)

    await coordinatesToStation();
    console.log(latitude, longitude);
    console.log(stationname);
    writeStoredStation();
}

function noteStationByGeolocation(position) {
    /** Fetches the coordinates of the user and translates them to the next station */
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    coordinatesToStation();
    writeStoredStation();
}

function getStationByInput() {
    /** Takes the station from the input fields */
}

async function coordinatesToStation() {
    /** Translates the coordinates to the next station */
    // Generate the URL for the API request
    let data;
    let APIURL = new URL("https://vbb.demo.hafas.de/fahrinfo/restproxy/2.32/location.nearbystops");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("originCoordLat", latitude);
    APIURL.searchParams.append("originCoordLong", longitude);
    APIURL.searchParams.append("maxNo", 1);

    // Fetch the needed information from the API and transform it into a sorted array
    data = await fetchAPI(APIURL);
    if (data.stopLocationOrCoordLocation === undefined) {
        stationname = "";
        stationid = "";
    } else {
        stationname = data.stopLocationOrCoordLocation[0].StopLocation.name;
        stationid = data.stopLocationOrCoordLocation[0].StopLocation.id;
    }
}

function writeStoredStation() {
    /** Writes the stored station to the output fields */
    document.getElementById('currentStation').textContent = stationname;
}







