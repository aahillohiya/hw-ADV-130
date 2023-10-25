song = "";
song1 = "";
right_wrist_X = "";
left_wrist_X = "";
right_wrist_Y = "";
left_wrist_Y = "";
Score_Left_Wrist = 0;
Song_status = "";

function preload() {
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}


function draw() {
    image(video,0,0,500,500);

    Song_status = "";

    fill("red");
    stroke("red");

    if (Score_Left_Wrist > 0.2) {
        circle(left_wrist_X,left_wrist_Y,20);
        song2.stop();
        if (Song_status = false) {
            song1.play();
            document.getElementById("button").innerHTML = "Song Name :-> Song-1" ;
        }
    }

    Song_status = "";

    if (Score_Left_Wrist > 0.2) {
        circle(right_wrist_X,right_wrist_Y,20);
        song1.stop();
        if (Song_status = false) {
            song2.play();
            document.getElementById("button").innerHTML = "Song Name :-> Song-2" ;
        }
    }


}

function SONG_NAME() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model is Loaded");    
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        right_wrist_X = results[0].pose.rightWrist.x ; 
        right_wrist_Y = results[0].pose.rightWrist.y ;
        left_wrist_X = results[0].pose.leftWrist.x ;
        left_wrist_Y = results[0].pose.leftWrist.y ;

        Score_Left_Wrist = results[0].pose.keypoints[9].score ; 

        console.log("Right Wrist X",right_wrist_X,"Right Wrist Y",right_wrist_Y,"Left Wrist X",left_wrist_X,"Left Wrist Y",left_wrist_Y);
}
}
