function on_click() {
    let state = document.getElementById("button_logo")
    let paused = "fas fa-forward forward_icon"
    let listening = "fas fa-pause pause_icon"

    if (state.className === paused) {
        listen()
    } else if (state.className === listening) {
        //pause()
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
                const finalAudio = new Blob(allAudio, { 'type': 'audio/mp4;' });
                const audioUrl = URL.createObjectURL(finalAudio);
                console.log(audioUrl);

                audioElem = document.getElementById("audio");
                audioElem.src = audioUrl;

                const audio = new Audio(audioUrl);

                audio.play();
                pause()

                //Call API from here
                AudD_Call(audioUrl)
            });

            setTimeout(() => {
                mediaRecorder.stop();
            }, 5000); //FIND GOOD TIME TO USE
        });
}

function AudD_Call(audioUrl) {

    var data = {
        'api_token': '0407c995d24d78e57e6f7b80a48606bd',
        'url': audioUrl,
        'return': 'apple_music,spotify',
    };

    console.log(audioUrl)



    // var request = new XMLHttpRequest();

    // request.open('POST', "https://api.audd.io/", data);

    // request.send()

    // request.onload = () => {

    //     console.log(request.response);
    // }




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