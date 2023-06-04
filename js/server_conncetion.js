"use strict";

let overlay = document.querySelector("#overlay");
let message = document.querySelector("#message");
let message_button;

let login_success = false;

async function fetch_handler(URL) {
    if (quiz_time !== true) {
        display_message("Contacting Server ...", "CLOSE");
    }

    let response = await fetch(URL);

    remove_message();


    if (response.status === 418) {
        display_message("The server thinks it's not a teapot!", "CLOSE");
    } else if (response.status === 409) {
        display_message("Sorry, the name is taken. Please try with another one", "CLOSE");
    } else if (
        (response.status === 404 && login_page === true) ||
        (response.status === 400 && login_page === true)

    ) {
        let text = document.querySelector("#text");
        text.textContent = "Wrong username or password.";
        text.classList.add("wrong_cred");



    } else if (response.status === 200 && reg_page === true) {
        display_message("Registration Complete. Proced to login.", "CLOSE");
    } else if (response.status === 200 && login_page === true) {


        login_success = true;

    }


    return response;

}

function display_message(message_text, close_message_text) {
    overlay.classList.add("overlay");

    message.classList.add("message");
    message.textContent = message_text;

    if (message_text === "Contacting Server..." || message_text === "Getting random image ...") {
        return;
    }

    message_button = document.createElement("button");
    message_button.textContent = close_message_text;
    message_button.classList.add("close_button");
    message.appendChild(message_button);

    message_button.addEventListener("click", button_clicked);

    if (message_text === "Correct!") {
        message.style.backgroundColor = "#caf1de";

    } else {
        message.style.backgroundColor = " #f7d5e9";

    }

    function button_clicked(event) {
        if (quiz_time === true) {
            remove_message();

            let current_login = JSON.parse(localStorage.getItem("credentials"));
            display_quiz_page(current_login.user_name);
        } else {
            remove_message();

        }
    }

}

function remove_message() {
    overlay.classList.remove("overlay");

    message.innerHTML = "";
    message.classList.remove("message");


}


