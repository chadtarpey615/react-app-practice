// define ui vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")


// load all event listeners
loadEventListeners();

function loadEventListeners() {
    // dom load event 
    document.addEventListener("DOMContentLoaded", getTasks)
    // add task event
    form.addEventListener("submit", addTask)
    // remove task event
    taskList.addEventListener("click", removeTask)
    // clear all task
    clearBtn.addEventListener("click", clearTasks)
    // filter tasks event
    filter.addEventListener("keyup", filterTasks)
}

// get tasks from local
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement("li");
        // add class
        li.className = "collection-item"
        // create text node and append to li
        li.appendChild(document.createTextNode(task))
        // create new Link
        const link = document.createElement("a")
        //add class
        link.className = "delete-item secondary-content"
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        console.log(li)
        // append the link to li
        li.appendChild(link)
        // append li to ul
        taskList.appendChild(li)

    })
}

// add task 
function addTask(e) {
    e.preventDefault();

    if (taskInput.value === "") {
        alert("add task")
    }

    // create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item"
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // create new Link
    const link = document.createElement("a")
    //add class
    link.className = "delete-item secondary-content"
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    console.log(li)
    // append the link to li
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)

    // store in local;
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = "";


}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// remove task 
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("are you sure")) {
            e.target.parentElement.parentElement.remove();
            // remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }

    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


// clear all task 
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    //clear from ls
    clearTasksFromLocalStorage();
}


function clearTasksFromLocalStorage() {
    localStorage.clear();
}


function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";

        }
    })
}