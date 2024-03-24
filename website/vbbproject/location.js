let latitude = 52.5;
let longitude = 13.3;
actualiseInfos();
writeStoredCoordinates();

function notePositionByGeolocation(position) {
    /** Fetches the coordinates of the user */

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    actualiseInfos();
    writeStoredCoordinates();
}

function getCoordinatesByInput() {
    /** Takes the coordinates from the input fields */

    latitude = document.getElementById('latitude').value;
    longitude = document.getElementById('longitude').value;
    console.log(latitude);
    console.log(longitude);
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

