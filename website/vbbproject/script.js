let closestStations = {};

function actualiseInfos() {
    /** Actualises all the informations */
    getNextStations();
}

async function fetchAPI(url) {
    /** Fetches the information from the given URL and return the response */
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function getNextStations() {
    /** Gets the next stations with their distances from the API */

    // Generate the URL for the API request
    let data;
    let APIURL = new URL("https://vbb.demo.hafas.de/fahrinfo/restproxy/2.32/location.nearbystops");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("originCoordLat", latitude);
    APIURL.searchParams.append("originCoordLong", longitude);
    APIURL.searchParams.append("maxNo", "5");

    // Fetch the needed information from the API and transform it into a sorted array
    // Fetch the needed information from the API and transform it into a sorted array
    data = await fetchAPI(APIURL);
    closestStations = data.stopLocationOrCoordLocation.map(location => {
        return [location.StopLocation.name, location.StopLocation.dist];
    });
    closestStations.sort((a, b) => a[1] - b[1]);
    console.log(closestStations);
    updateNextStationsTable();
    
}

function updateNextStationsTable() {
    let tableBody = document.getElementById('tableBody');
    let row;
    let cell;
    tableBody.innerHTML = '';

    for (let i = 0; i < closestStations.length; i++) {
        row = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            cell = document.createElement('td');
            cell.textContent = closestStations[i][j];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
}

