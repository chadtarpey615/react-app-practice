import { http } from "./http"
import { ui } from "./ui"

// get post om dom load
document.addEventListener("DOMContentLoaded", getPosts);


// listen for add posts
document.querySelector(".post-submit").addEventListener("click", submitPost);

//listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

// listen for cancel
document.querySelector(".card-form").addEventListener("click", cancelEdit);


function getPosts() {
    http.get("http://localhost:3000/posts")
        .then(data => ui.showPosts(data))
        .catch(error => console(error))
}

//submit post
function submitPost() {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const id = document.querySelector("#id").value;

    const data = {
        title,
        body
    }
    // validate input
    if (title === "" || body === "") {
        ui.showAlert("Please fill in all fields", "alert alert-danger")
    } else {

        if (id === "") {

            // create post
            http.post("http://localhost:3000/posts", data)
                .then(data => {
                    ui.showAlert("Post added", "alert alert-success");
                    ui.clearFields();
                    getPosts();
                })
                .catch(error => console.log(err))
        } else {
            // update the post not create
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert("Post updated", "alert alert-success");
                    ui.changeFormState("add")
                    getPosts();
                })
                .catch(error => console.log(err))
        }



    }


}

// delete post 
function deletePost(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains("delete")) {
        const id = e.target.parentElement.dataset.id;
        if (confirm("are you sure?")) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert("Post removed", "alert alert-success");
                    getPosts();
                })
                .catch(err => console.log(err))
        }
    }
}

// enable edit state
function enableEdit(e) {
    if (e.target.parentElement.classList.contains("edit")) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText;
        const body = e.target.parentElement.parentElement.previousElementSibling.innerText;
        // console.log(e.target.parentElement.previousElementSibling)
        const data = {
            id,
            title,
            body
        }

        // fill the form with the current post
        ui.fillForm(data);

    }
    e.preventDefault();
}

// cancel edit state 
function cancelEdit(e) {
    if (e.target.classList.contains("post-cancel")) {
        ui.changeFormState("add")

    }
    e.preventDefault();
}