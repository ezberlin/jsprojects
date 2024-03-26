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