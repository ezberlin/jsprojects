let latitude = 52.5;
let longitude = 13.3;

actualiseInfos();
writeStoredCoordinates();
actualiseMap();

function notePositionByGeolocation(position) {
    /** Fetches the coordinates of the user */

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    actualiseInfos();
    writeStoredCoordinates();
    actualiseMap();
}

function getCoordinatesByInput() {
    /** Takes the coordinates from the input fields */

    latitude = document.getElementById('latitude').value;
    longitude = document.getElementById('longitude').value;
    actualiseInfos();
    writeStoredCoordinates();
    actualiseMap();

    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
    
}

function writeStoredCoordinates() {
    /** Writes the stored coordinates to the input fields */

    document.getElementById('currentLatitude').textContent = latitude;
    document.getElementById('currentLongitude').textContent = longitude;
}

function actualiseMap() {
    var map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}



