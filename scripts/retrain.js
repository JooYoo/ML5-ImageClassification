
var video = document.getElementById('video');
var videoStatus = document.getElementById('videoStatus');
var loading = document.getElementById('loading');
var blueButton = document.getElementById('blueButton');
var redButton = document.getElementById('redButton');
var blackButton = document.getElementById('blackButton');
var train = document.getElementById('train');
var loss = document.getElementById('loss');
var result = document.getElementById('result');
var predict = document.getElementById('predict');

// A variable to store the total loss
let totalLoss = 0;

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
    video.play();
  });
}

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', { numClasses: 3 }, function () {
  loading.innerText = 'Model loaded!';
});

// Create a new classifier using those features
const classifier = featureExtractor.classification( video, function () {
  videoStatus.innerText = 'Video ready!';
});


// BLUE_btn:  
// press to add current frame with a label of blue to the classifier
blueButton.onclick = function () {
  classifier.addImage('blue');
}

// RED_btn:
// press to add current frame with a label of red to the classifier
redButton.onclick = function () {
  classifier.addImage('red');
}

// BLACK_btn:
// press to add current frame with a label of black to the classifier
blackButton.onclick = function () {
  classifier.addImage('black');
}


// TRAIN_btn: 
// train the classifier with all the given images
train.onclick = function () {
  classifier.train(function (lossValue) {
    if (lossValue) {
      console.log(lossValue);
      totalLoss = lossValue;
      loss.innerHTML = 'Loss: ' + totalLoss;
    } else {
      loss.innerHTML = 'Done Training! Final Loss: ' + totalLoss;
    }
  });
}

// Predict the current frame.
function predict() {
  classifier.predict(gotResults);
}

// Start predicting when the predict button is clicked
predict.onclick = function () {
  classifier.classify(gotResults);
  console.log()
}

// Show the results
function gotResults(err, data) {
  // Display any error
  if (err) {
    console.error(err);
  }
  result.innerText = data;

  classifier.classify(gotResults);
}

