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

async function getDepartureBoard() {
    /** Gets the departure board (times, trains, directions, tracks) from the API */

    // Generate the URL for the API request
    let data;
    let APIURL = new URL("https://vbb.demo.hafas.de/fahrinfo/restproxy/2.32/departureBoard");
    APIURL.searchParams.append("format", "json");
    APIURL.searchParams.append("accessId", ACCESSID);
    APIURL.searchParams.append("id", stationid);
    APIURL.searchParams.append("maxJourneys", 20);

    // Fetch the needed information from the API and transform it into a sorted array
    data = await fetchAPI(APIURL);
    if (data.Departure === undefined) {
        departureBoard = [];
    } else {
        departureBoard = data.Departure.map(departure => {
            let time = departure.rtTime ? departure.rtTime : departure.time;
            return [time, departure.name, departure.direction, departure.track];
        });
    }
    departureBoard.sort((a, b) => {
        const timeA = new Date(`2000-01-01T${a[0]}`);
        const timeB = new Date(`2000-01-01T${b[0]}`);
        return timeA - timeB;
    });
    updateDepartureBoard();
    
}

function updateDepartureBoard() {
    let tableBody = document.getElementById('tableBody');
    let row;
    let cell;
    tableBody.innerHTML = '';

    for (let i = 0; i < departureBoard.length; i++) {
        row = document.createElement('tr');
        for (var j = 0; j < departureBoard[i].length; j++) {
            cell = document.createElement('td');
            cell.textContent = departureBoard[i][j];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
}