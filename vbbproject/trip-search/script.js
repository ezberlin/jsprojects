let tripPlanner;

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

async function getTripPlanner() {
    /** Gets the trip from the API */

    // Generate the URL for the API request
    actualiseTime();
    let data;
    let APIURL = new URL("https://fahrinfo.vbb.de/restproxy/2.32/trip");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("originCoordLat", latitude1);
    APIURL.searchParams.append("originCoordLong", longitude1);
    APIURL.searchParams.append("destCoordLat", latitude2);
    APIURL.searchParams.append("destCoordLong", longitude2);
    APIURL.searchParams.append("date", date);
    APIURL.searchParams.append("time", time);

    // Fetch the needed information from the API and transform it into a sorted array
    data = await fetchAPI(APIURL);
    if (data.Trip === undefined) {
        tripPlanner = [];
    } else {
        tripPlanner = data.Trip[0].LegList.Leg.map(leg => {
            return [leg.Origin.rtTime ? leg.Origin.rtTime : leg.Origin.time, leg.name, leg.direction, leg.Destination.name, leg.Origin.track];
        });
        tripPlanner.push([
            data.Trip[0].LegList.Leg[data.Trip[0].LegList.Leg.length - 1].Destination.rtTime 
                ? data.Trip[0].LegList.Leg[data.Trip[0].LegList.Leg.length - 1].Destination.rtTime 
                : data.Trip[0].LegList.Leg[data.Trip[0].LegList.Leg.length - 1].Destination.time, 
            "Ankunft", "", "", ""
        ]);
    }
    updateTripPlanner();
    
}

function updateTripPlanner() {
    let tableBody = document.getElementById('tableBody');
    let row;
    let cell;
    tableBody.innerHTML = '';

    for (let i = 0; i < tripPlanner.length; i++) {
        row = document.createElement('tr');
        for (var j = 0; j < tripPlanner[i].length; j++) {
            cell = document.createElement('td');
            cell.textContent = tripPlanner[i][j];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
}