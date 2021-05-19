/*
function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

window.addEventListener("load", delay() {
    let loadScreen = document.getElementById("loadScreen");
    wait(5000); //waiting time in milisecounds
    loadScreen.classList.toggle("load-after");
})

*/


/*
const delay = ms => new Promise(res => setTimeout(res, ms));

async function waitingForLoad() { 
    window.addEventListener("load", delay());
    let loadScreen = document.getElementById("loadScreen");
    delay(5000); //waiting time in milisecounds
    loadScreen.classList.toggle("load-after");
}

waitingForLoad()
*/

function showPage() {
    let loadScreen = document.getElementById("loadScreen");
    loadScreen.classList.toggle("load-after");
}

window.addEventListener("load", showPage());

