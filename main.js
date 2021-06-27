Webcam.set({
width: 300,
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

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

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

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0] == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if(results[0] == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128546;";
        }
        if(results[0] == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if(results[1] == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if(results[1] == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        }
        if(results[1] == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}
