"use strict";

let quiz_time = false;

function display_quiz_page(username) {
    quiz_time = true;
    main_content.innerHTML = "";
    background.style.backgroundColor = "#d2ebe9";

    let username_display = document.createElement("div");
    main_content.appendChild(username_display);
    username_display.classList.add("username_display");
    username_display.innerHTML = `<p>${username}</p>`;

    let logout_button = document.createElement("button");
    username_display.appendChild(logout_button);
    logout_button.classList.add("logout_button");
    logout_button.textContent = "logout";
    logout_button.addEventListener("click", local_storage_remove_credentials);

    function local_storage_remove_credentials(event) {
        localStorage.removeItem("credentials");
        location.reload();
    }

    quiz_handler();
}

function quiz_handler() {
    let dog_image = document.createElement("img");
    main_content.appendChild(dog_image);
    dog_image.setAttribute("src", "media/logo.png");
    dog_image.classList.add("dog_image");

    display_message("Getting random image...");

    question_handler();

    async function question_handler() {
        let correct_breed = random_number();
        let prefix = get_image_prefix(ALL_BREEDS[correct_breed].url);
        let response = await fetch_handler(prefix);
        let resource = await response.json();

        console.log(response);

        dog_image.setAttribute("src", resource.message);

        let options = document.createElement("div");
        options.classList.add("options");
        main_content.appendChild(options);

        let options_array = [];
        options_array.push(correct_breed);

        for (let i = 0; options_array.length < 4; i++) {
            let random_breed = random_number();

            if (options_array.includes(random_breed)) {
                continue;
            }

            options_array.push(random_breed);
            create_option(random_breed);
        }


        create_option(correct_breed);

        function create_option(random_or_correct) {
            let option_button = document.createElement("button");
            option_button.classList.add("option");
            options.appendChild(option_button);
            option_button.textContent = `${ALL_BREEDS[random_or_correct].name}`;
            option_button.style.order = random_number();

            if (random_or_correct === correct_breed) {
                option_button.addEventListener("click", () => display_message("Correct!", "ONE MORE"));
            } else {
                option_button.addEventListener("click", () => display_message("Wrong! Try again!", "ONE MORE"));
            }
        }
    }
}

function random_number() {
    return Math.floor(Math.random() * ALL_BREEDS.length);
}
