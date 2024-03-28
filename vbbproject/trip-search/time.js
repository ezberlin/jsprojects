let datetime;
let date;
let time;

function actualiseTime() {
    datetime = document.getElementById("datetime").value; 
    [date, time] = datetime.split("T");
}