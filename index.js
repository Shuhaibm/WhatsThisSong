function on_click() {
    let state = document.getElementById("button_logo")
    let paused = "fas fa-forward forward_icon"
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

                //audio.play();
                analyzing();

                Api_Call(finalAudio);
            });

            setTimeout(() => {
                mediaRecorder.stop();
            }, 5000);
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

function analyzing() {
    let state = document.getElementById("button_logo")
    let paused = "fas fa-forward forward_icon"

    //  document.getElementById("button").style.display = 'inline';
    //    document.getElementById("loading").style.display = 'none';

    document.getElementById("listen").innerHTML = "Analyzing..."

}

function listen() {

    let state = document.getElementById("button_logo")
    let listening = "fas fa-pause pause_icon"

    state.className = listening
    document.getElementById("listen").innerHTML = "Listening . . ."

    get_audio()

}

function showResults(jsonInput) {
    document.getElementById("container").style.display = 'none';
    document.getElementById("result").style.display = 'inline';

    let songTitle = jsonInput.track.title;
    let subtitle = jsonInput.track.subtitle;
    let appleLink = jsonInput.track.apple_music_url;
    let spotifyLink = jsonInput.track.hub.providers[0].actions[0].uri;

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