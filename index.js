"use strict";

const loging_reg_prefix = "https://teaching.maumt.se/apis/access/";

function get_image_prefix(breed_url) {
    const URL = `https://dog.ceo/api/breed/${breed_url}/images/random`;
    return URL;
}

const current_login = JSON.parse(localStorage.getItem("credentials"));

if (current_login !== null) {
    display_quiz_page(current_login.userName);
} else {
    display_login_or_reg_page(type_login, login_text, change_type_login_text);
}