// init github class
const github = new GitHub;

// init ui class

const ui = new UI;
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
                if (data.profile.message === "Not Found") {
                    //show alert

                } else {
                    // show profile
                    ui.showProfile(data.profile);
                }
            })
    } else {
        // clear profile
    }
})