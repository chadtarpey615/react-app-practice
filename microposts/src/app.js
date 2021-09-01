import { http } from "./http"
import { ui } from "./ui"

// get post om dom load
document.addEventListener("DOMContentLoaded", getPosts);


// listen for add posts
document.querySelector(".post-submit").addEventListener("click", submitPost);


function getPosts() {
    http.get("http://localhost:3000/posts")
        .then(data => ui.showPosts(data))
        .catch(error => console(error))
}

//submit post
function submitPost() {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;

    const data = {
        title,
        body
    }

    // create post
    http.post("http://localhost:3000/posts", data)
        .then(data => {
            ui.showAlert("Post added", "alert alert-success");
            ui.clearFields();
            getPosts();
        })
        .catch(error => console.log(err))
}