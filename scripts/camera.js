var amountOfCatImages = document.getElementById('amountOfCatImages');


// get stream from cam
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.srcObject = stream;
        video.play();
        console.log('video play!!!!')
    });
}

//take screenshot
function takeScreenshot() {
    let canvas = document.createElement('canvas');
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;

    let canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(
        video,
        0, 0,
        video.offsetWidth, video.offsetHeight
    );

    var container = document.getElementById('canvas-container');
    container.prepend(canvas);

    // count image number
    amountOfCatImages.innerText = Number(amountOfCatImages.innerText) + 1;
}