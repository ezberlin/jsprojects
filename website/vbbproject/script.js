async function fetchAPI(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getNextStation() {
    let data;
    let APIURL = new URL("https://vbb.demo.hafas.de/fahrinfo/restproxy/2.32/location.nearbystops");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("originCoordLat", latitude);
    APIURL.searchParams.append("originCoordLong", longitude);
    APIURL.searchParams.append("maxNo", "1");

    data = await fetchAPI(APIURL);

    let stationName = data.stopLocationOrCoordLocation[0].StopLocation.name;
    console.log(stationName);
    
}

function actualiseInfos() {
    /** Actualises the informations */
    getNextStation();
}





