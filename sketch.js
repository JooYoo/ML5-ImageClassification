let mobilenet;
let video;
let label = '';

function modelReady() {
    //  console.log('model is ready!!!');
    mobilenet.predict(gotResult);
}



function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        // console.log(results);
        label = results[0].className;
        mobilenet.predict(gotResult);
    }
}

function setup() {
    createCanvas(640, 550);

    // 使用p5中的函数来获取视频信息
    // 通过callback函数让图片显示在画布中
    video = createCapture(VIDEO);
    video.hide();
    background(0);

    // 使用ml5自带的函数，载入机器学习模型MobileNet
    // 当该机器学习模型载入成功后调用callback函数
    mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() { // put the video in the canvas and put the text on the bottom
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}