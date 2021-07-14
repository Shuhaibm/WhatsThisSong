function on_click() {
    let state = document.getElementById("button_logo")
    let paused = "fas fa-forward forward_icon"
    let listening = "fas fa-pause pause_icon"

    if (state.className === paused) {
        listen()
    } else if (state.className === listening) {
        pause()
    }
}



function get_audio() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const allAudio = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                allAudio.push(event.data);
            });


            mediaRecorder.addEventListener("stop", () => {
                const finalAudio = new Blob(allAudio);
                const audioUrl = URL.createObjectURL(finalAudio);
                const audio = new Audio(audioUrl);

                audio.play();
                pause()

                //Call API from here

            });

            setTimeout(() => {
                mediaRecorder.stop();
            }, 3000); //FIND GOOD TIME TO USE

        });

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