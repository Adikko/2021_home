function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function appendRandomPicture() {
    imgSrc = '<img src="./images/windows/' + getRandomInt(1, 38) + '.png"></img>' //INCREASE THE SECOUND ARGUMENT WHEN ADDING NEW PNG FILES!
    return imgSrc
}