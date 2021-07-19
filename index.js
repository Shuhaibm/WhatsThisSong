function on_click() {
    let state = document.getElementById("button_logo")
    let paused = "fas fa-forward forward_icon"
    let listening = "fas fa-pause pause_icon"

    if (state.className === paused) {
        listen()
    } else if (state.className === listening) {
        //do nothing for now... pause()
    }
}



function get_audio() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            let allAudio = [];

            // let state = document.getElementById("button_logo")
            // let paused = "fas fa-forward forward_icon"
            // let listening = "fas fa-pause pause_icon"

            // button.addEventListener("click", (ev) => {
            //     if (state.className === paused) {
            //         mediaRecorder.start()
            //     } else if (state.className === listening) {
            //         mediaRecorder.stop()
            //     }
            // })

            mediaRecorder.addEventListener("dataavailable", event => {
                allAudio.push(event.data);
            });


            mediaRecorder.addEventListener("stop", () => {
                var finalAudio = new Blob(allAudio, { 'type': 'audio/wav' });
                var audioUrl = URL.createObjectURL(finalAudio);

                const audio = new Audio(audioUrl);

                audio.play();
                pause()

                //Call API from here
                Api_Call(finalAudio)

            });

            setTimeout(() => {
                mediaRecorder.stop();
            }, 10000); //FIND GOOD TIME TO USE
        });
}

function Api_Call(audio) {

    const data = new FormData();
    data.append("file", audio);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            processJson(JSON.parse(this.responseText))
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



function processJson(jsonInput) {
    let songTitle = jsonInput.track.title;
    let appleMusicURL = jsonInput.track.hub.options.actions.uri;
    let subtitle = jsonInput.track.subtitle;
    let spotifyLink = track.hub.providers.actions.uri

    console.log("Your song is" + jsonInput.track.title + " , by" + subtitle)
}