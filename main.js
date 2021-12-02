predicition1="";
predicition2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90

});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="capture_img">';
    });
}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QaIVMLwUb/model.json",modelloaded);

function modelloaded(){
console.log("modelloaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is"+predicition1;
    speak_data_2="and the second prediction is"+predicition2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}

function check(){
    img=document.getElementById("capture_img");
    classifier.classify(img,gotresults);  
}

function gotresults(error,results){
if (error){
    console.error(error);
}
else {
    console.log(results);
    document.getElementById("resultname").innerHTML=results[0].label;
    document.getElementById("resultname2").innerHTML=results[1].label;
    predicition1=results[0].label;
    predicition2=results[1].label;
    speak();

    if(results[0].label=="Happy"){
        document.getElementById("resultemoji").innerHTML="&#128522;";

    }
    if(results[0].label=="Sad"){
        document.getElementById("resultemoji").innerHTML="&#128532;";

    }
    if(results[0].label=="Angry"){
        document.getElementById("resultemoji").innerHTML="&#128548;";

    }

    
    if(results[1].label=="Happy"){
        document.getElementById("resultemoji2").innerHTML="&#128522;";

    }
    if(results[1].label=="Sad"){
        document.getElementById("resultemoji2").innerHTML="&#128532;";

    }
    if(results[1].label=="Angry"){
        document.getElementById("resultemoji2").innerHTML="&#128548;";

    }
}
}