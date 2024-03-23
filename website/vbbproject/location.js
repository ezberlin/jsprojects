let latitude = 0;
let longitude = 0;
writeStoredCoordinates();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(notePositionByGeolocation);
}

function notePositionByGeolocation(position) {
    /** Fetches the coordinates of the user */

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    writeStoredCoordinates();
}

function getCoordinatesByInput() {
    /** Takes the coordinates from the input fields */

    latitude = document.getElementById('latitude').value;
    longitude = document.getElementById('longitude').value;
    console.log(latitude);
    console.log(longitude);
    writeStoredCoordinates();
    actualiseInfos();
}

function writeStoredCoordinates() {
    /** Writes the stored coordinates to the input fields */

    document.getElementById('currentLatitude').textContent = latitude;
    document.getElementById('currentLongitude').textContent = longitude;
}

