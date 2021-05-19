function capture() { //THIS FUNCTION GENERATES THE FILE, BUT ALSO SHOWS THE FINAL EFFECT
    html2canvas(document.querySelector("#mainContainer")).then(canvas => { //SYNTAX PROVIDED BY HTML2CANVAS DEVELOPER
    let newWindow = document.getElementById("papercut");
    newWindow.classList.toggle("papercut_after");
    document.getElementById("papercutTableFacade1").innerHTML = '<img class="papercutImg" src="' + canvas.toDataURL("image/jpeg", 0.7) + '">';
    document.getElementById("papercutTableFacade2").innerHTML = '<img class="papercutImg" src="' + canvas.toDataURL("image/jpeg", 0.7) + '">';
    document.getElementById("papercutTableFacade3").innerHTML = '<img class="papercutImg" src="' + canvas.toDataURL("image/jpeg", 0.7) + '">';
    document.getElementById("papercutTableFacade4").innerHTML = '<img class="papercutImg" src="' + canvas.toDataURL("image/jpeg", 0.7) + '">';
    });
}

function saveBase64AsFile() { //DYNAMICALLY ADD AN ANCHOR ELEMENT, SO THE DOWNLOAD CAN BE EMULATED
    let link = document.createElement("a");

    html2canvas(document.querySelector("#papercutTable")).then(canvas => {
    const capture = canvas.toDataURL("image/jpeg");

    link.setAttribute("href", capture);
    link.setAttribute("download", "prl.jpg");
    link.click();
    });
}

function closePapercut() { //CLOSE THE GENERATED EFFECT IF YOU WANTTO CHANGE SOMETHING
    let newWindow = document.getElementById("papercut");
    newWindow.classList.toggle("papercut_after");
}