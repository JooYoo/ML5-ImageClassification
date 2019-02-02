let mobilenet;
let classifier;
let video;
let label = '';
let ukeButton;
let whistleButton;
let trainButton;

function modelReady() {
     console.log('model is ready!!!');
}

function videoReady(){
    console.log('video is ready!!!');

}

function whileTraining(loss){ // 训练
    if(loss == null){
        console.log("Training Complete!"); // 训练结束以后输出显示在屏幕上
        classifier.classify(gotResult)
    }else{
        console.log(loss);
    }
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        // console.log(results);
        label = result;
        classifier.classify(gotResult);
    }
}

function setup() {
    createCanvas(640, 550);

    // 使用p5中的函数来获取视频信息
    // 通过callback函数让图片显示在画布中
    video = createCapture(VIDEO);
    video.hide();
    background(0);

    // 使用ml5自带的函数，载入机器学习模型MobileNet, 并在神经网络完成到feature步骤的时候把feature提取出来
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    // 得到提取出的feature以后添加自己的classification逻辑.
    // 传入视频内容，并把classification框架传入callback函数videoReady
    classifier = mobilenet.classification(video, videoReady);

    // Class 01
    // 创建按键, 当该按钮被点按以后ukulele被加入到该classifier框架
    ukeButton = createButton('medicine');
    ukeButton.mousePressed(function(){
        classifier.addImage('Halsschmerzen Medikament');
    });


    // Class 02 同上
    whistleButton = createButton('pen');
    whistleButton.mousePressed(function(){
        classifier.addImage('Whiteboard Marker');
    });

    // train：输入的图片准备好了，输出的标签也准备好了。retrain
    trainButton = createButton('train');
    trainButton.mousePressed(function(){
        classifier.train(whileTraining);
    });
}

function draw() { // put the video in the canvas and put the text on the bottom
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}