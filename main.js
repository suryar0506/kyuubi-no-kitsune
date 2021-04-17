Webcam.set({
width: 350,
height: 300,
img_format: 'png',
png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TJcZlyGLs/model.json',modelLoaded);

function modelLoaded(){
    console.log("The model is loaded.")
}

function speak (){
    synth = window.speechSynthesis;
    speak_data_1 = "The first guess is " + prediction_1;
    speak_data_2 = "My second guess is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
