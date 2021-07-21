function on_click() {
    let state = document.getElementById("button_logo")
    let paused = "fas fa-forward forward_icon"
    let listening = "fas fa-pause pause_icon"

    loading()

    if (state.className === paused) {
        listen()
    }
}



async function get_audio() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            let allAudio = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                allAudio.push(event.data);
            });


            mediaRecorder.addEventListener("stop", () => {
                var finalAudio = new Blob(allAudio, { 'type': 'audio/wav' });
                var audioUrl = URL.createObjectURL(finalAudio);

                const audio = new Audio(audioUrl);

                audio.play();
                pause();
                //loading()   
                //Call API from here

                Api_Call(finalAudio);

            });

            setTimeout(() => {
                mediaRecorder.stop();
            }, 10000); //FIND GOOD TIME TO USE UPDATE
        });
}

function Api_Call(audio) {

    const data = new FormData();
    data.append("file", audio);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            showResults(JSON.parse(this.responseText));
            console.log(this.responseText)
        }
    });

    xhr.open("POST", "https://shazam-core.p.rapidapi.com/v1/tracks/recognize");
    xhr.setRequestHeader("x-rapidapi-key", "eaaea44986mshb7435c2f9d09958p1d81e1jsn2b682f492140");
    xhr.setRequestHeader("x-rapidapi-host", "shazam-core.p.rapidapi.com");

    xhr.send(data);
}







function pause() {
    let state = document.getElementById("button_logo")
    let paused = "fas fa-forward forward_icon"

    document.getElementById("button").style.display = 'inline';
    document.getElementById("loading").style.display = 'none';

    state.className = paused
    document.getElementById("listen").innerHTML = "Start Listening"

}

function listen() {

    let state = document.getElementById("button_logo")
    let listening = "fas fa-pause pause_icon"

    state.className = listening
    document.getElementById("listen").innerHTML = "Listening . . ."

    get_audio()

}



function showResults(jsonInput) {
    console.log(jsonInput)
    document.getElementById("container").style.display = 'none';
    document.getElementById("result").style.display = 'inline';

    let songTitle = jsonInput.track.title;
    let subtitle = jsonInput.track.subtitle;
    let appleLink = jsonInput.track.apple_music_url;
    let spotifyLink = jsonInput.track.hub.providers[0].actions[0].uri;

    console.log(appleLink)
    // let songTitle = "2040";
    // let subtitle = "le bebe";
    // let appleLink = "https://music.apple.com/gb/album/2040/1569712089?i=1569712093&ign-itscg=30201&ign-itsct=Shazam_ios&mttn3pid=a_custom_779816081798873874&mttnagencyid=769459046716559743&mttnsiteid=125115&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973";
    // let spotifyLink = "spotify:search:Voice%20of%20the%20Heroes%20Lil%20Baby"


    document.getElementById("songname2").innerHTML = songTitle;
    document.getElementById("subtitle").innerHTML = "By " + subtitle;

    document.getElementById("button_spotify").onclick = function () {
        location.href = spotifyLink;
    };
    document.getElementById("button_apple").onclick = function () {
        location.href = appleLink;
    };




}




function loading() {
    document.getElementById("button").style.display = 'none';
    document.getElementById("loading").style.display = 'inline';
}