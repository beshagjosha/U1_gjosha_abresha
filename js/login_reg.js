"use strict";

let type_login = "LOGIN";
let login_text = "Let the magic begin!";
let change_type_login_text = "New to this? Register NOW for FREE";

let type_register = "REGISTER";
let register_text = "Ready when you are...";
let change_type_register_text = "already have an account? go to login";

let background = document.querySelector("main");
let main_content = document.querySelector("section");

let login_page;
let reg_page;

function create_login_or_reg_page(type, text, change_type_text) {
    main_content.innerHTML = "";


    // Skapa h1 element
    const h1 = document.createElement("h1");
    h1.textContent = type;

    // skapa input div
    const inputField = document.createElement("div");
    inputField.id = "input_field";

    //skapa username paragraf
    const userNameParagraph = document.createElement("p");
    userNameParagraph.className = "login_cred";
    userNameParagraph.id = "username";
    userNameParagraph.textContent = "Username:";

    // skapa username input
    const userNameInput = document.createElement("input");
    userNameInput.name = "username";

    //skapa lösenord paragraf
    const passwordParagraph = document.createElement("p");
    passwordParagraph.className = "login_cred";
    passwordParagraph.id = "password";
    passwordParagraph.textContent = "Password:";

    //skapa lösenord input
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";


    //Appenda username och password elemnten till input field
    inputField.appendChild(userNameParagraph);
    inputField.appendChild(userNameInput);
    inputField.appendChild(passwordParagraph);
    inputField.appendChild(passwordInput);

    // skapa text paragraf
    const textParagraph = document.createElement("p");
    textParagraph.id = "text";
    textParagraph.textContent = text;

    // skapa knapp
    const button = document.createElement("button");
    button.textContent = type;

    //skapa bytes type div
    const changeTypeDiv = document.createElement("div");
    changeTypeDiv.id = "change_type";

    //skapa bytes type paragraf
    const changeTypeParagraph = document.createElement("p");
    changeTypeParagraph.id = "change_type_text";
    changeTypeParagraph.textContent = change_type_text;

    // appenda bytes type paragrafen till type div
    changeTypeDiv.appendChild(changeTypeParagraph);


    //appenda elementen till main content
    main_content.appendChild(h1);
    main_content.appendChild(inputField);
    main_content.appendChild(textParagraph);
    main_content.appendChild(button);
    main_content.appendChild(changeTypeDiv);

    if (type === type_register) {
        background.style.backgroundColor = "#f6e1e1";
        reg_page = true;
        login_page = false;
    } else {
        background.style.backgroundColor = "#a4d4ae";
        reg_page = false;
        login_page = true;
    }
}

function display_login_or_reg_page(type, text, change_type_text) {
    create_login_or_reg_page(type, text, change_type_text);

    const action_button = document.querySelector("button");
    action_button.addEventListener("click", input_handler);

    const change_type_button = document.querySelector("#change_type_text");
    change_type_button.addEventListener("click", change_type);

    function change_type() {
        if (type === type_login) {
            display_login_or_reg_page(type_register, register_text, change_type_register_text);
        } else if (type === type_register) {
            display_login_or_reg_page(type_login, login_text, change_type_login_text);
        }
    }

    function input_handler(event) {
        const username_input = document.querySelector("input[name='username']").value;
        const password_input = document.querySelector("input[name='password']").value;

        if (type === type_login) {
            const GET_request = new Request(`${loging_reg_prefix}?action=check_credentials&user_name=${username_input}&password=${password_input}`);
            login_handler();

            async function login_handler() {
                await fetch_handler(GET_request);

                if (login_success === true) {
                    local_storage_save_credentials(username_input);

                    function local_storage_save_credentials(username) {
                        let credentials = {
                            user_name: username,
                        };
                        let saved_credentails_stringified = JSON.stringify(credentials);
                        localStorage.setItem("credentials", saved_credentails_stringified);
                    }

                    display_quiz_page(username_input);
                }
            }
        } else if (type === type_register) {
            const body_post = {
                action: "register",
                user_name: username_input,
                password: password_input,
            };

            const options = {
                method: "POST",
                body: JSON.stringify(body_post),
                headers: { "Content-type": "application/json;" },
            };

            const POST_request = new Request(loging_reg_prefix, options);
            fetch_handler(POST_request);
        }
    }



}