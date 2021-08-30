// init github class
const github = new GitHub;

// Search Input

const searchUser = document.getElementById("searchUser");

// search input event listener
searchUser.addEventListener("keyup", e => {
    //get input text
    const userText = e.target.value;

    if (userText !== "") {
        // make http call
        github.getUser(userText)
            .then(data => {
                console.log(data)
            })
    }
})