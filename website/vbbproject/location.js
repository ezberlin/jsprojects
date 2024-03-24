let latitude = 52.5;
let longitude = 13.3;

actualiseInfos();
writeStoredCoordinates();

var map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 7,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

var marker;
map.on('click', function(e) {
    if(marker)
        map.removeLayer(marker);
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;
    actualiseInfos();
    writeStoredCoordinates();
    marker = L.marker(e.latlng).addTo(map);
});

function notePositionByGeolocation(position) {
    /** Fetches the coordinates of the user */

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    actualiseInfos();
    writeStoredCoordinates();

    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
}

function getCoordinatesByInput() {
    /** Takes the coordinates from the input fields */

    latitude = document.getElementById('latitude').value;
    longitude = document.getElementById('longitude').value;
    actualiseInfos();
    writeStoredCoordinates();

    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
    
}

function writeStoredCoordinates() {
    /** Writes the stored coordinates to the input fields */

    document.getElementById('currentLatitude').textContent = latitude;
    document.getElementById('currentLongitude').textContent = longitude;
}






