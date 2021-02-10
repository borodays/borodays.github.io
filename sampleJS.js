function getMinute() {
    let min = document.getElementById("minute");
    let currentDate = new Date();
    let currentMins = currentDate.getMinutes();
    min.innerText = currentMins;
}

function remove() {
    let toRemove = document.getElementById("removable");
    toRemove.style.display = "none";
}