let mobilenet;
let puffin;

function modelReady(){
    console.log('model is ready!!!');
    mobilenet.predict(puffin, gotResult);
}

function imageReady(){
    image(puffin,0,0,width,height);
}

function gotResult(error, results){
    if (error) {
        console.error(error);
    }else{
        console.log(results);
        let label = results[0].className;
        let prob = results[0].probability;
        fill(0);
        textSize(64);
        text(label, 10, height-100);
        createP(label);
        createP(prob);
    }
}

function setup(){
    createCanvas(640, 480);

    // 使用p5中的函数来载入图片
    // 通过callback函数让图片显示在画布中
    puffin = createImg('images/puffin.jpg', imageReady);
    puffin.hide();

    background(0);

    // 使用ml5自带的函数，载入机器学习模型MobileNet
    // 当该机器学习模型载入成功后调用callback函数
    mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}
