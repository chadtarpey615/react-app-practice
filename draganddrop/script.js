const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
    "Jeff Bezos",
    "Bill Gates",
    "Warren Buffett",
    "Bernard Arnault",
    "Carlos Slim Helu",
    "Amanico Ortega",
    "Larry Ellison",
    "Mark Zuckerberg",
    "Michael Bloomberg",
    "Larry Page"
]

// store the list items
const listItems = []

let dragStartIndex;

createList();

// insert list items into dom


function createList() {
    [...richestPeople]
        .forEach((person, index) => {
            const listItem = document.createElement("li");

            listItem.setAttribute("data-index", index)

            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa fa-trash></i>
        </div>
        `;

            listItems.push(listItem)

            draggable_list.appendChild(listItem)
        })
}