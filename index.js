function on_click() {
    let state = document.getElementById("button_logo")

    if (state.className === "fas fa-forward forward_icon") {
        state.className = "fas fa-pause pause_icon"
        document.getElementById("listen").innerHTML = "Listening ..."
    } else if (state.className === "fas fa-pause pause_icon") {
        state.className = "fas fa-forward forward_icon"
        document.getElementById("listen").innerHTML = "Listen"

        //call fn to start listening
    }


}


