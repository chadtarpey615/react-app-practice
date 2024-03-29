class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");
        //create tr element
        const row = document.createElement("tr");

        // insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row)
    }

    showAlert(message, className) {
        const div = document.createElement("div");
        // add classes
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));
        // get parent 
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        // timeout after three secs
        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 3000)
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
            console.log("hit")
        }
    }

    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}


// create event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
    // get form values
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value

    const book = new Book(title, author, isbn);

    // instantiate UI
    const ui = new UI()

    console.log(ui)

    // validate 
    if (title === "" || author === "" || isbn === "") {
        // error alert 
        ui.showAlert("Please fill in all fields", "error")
        // console.log("object")
    } else {
        // add book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert("Book added", "success")

        // clear fields 
        ui.clearFields();
    }



    e.preventDefault();;
})

// event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert("Book removed", "success")
    e.preventDefault()
})