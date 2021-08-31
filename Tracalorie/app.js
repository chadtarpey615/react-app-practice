// Storage Controller

// Item Controller
const itemCtrl = (function () {
    // item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories
    }

    //data structure / state
    const data = {
        items: [
            // { id: 0, name: "Steak Dinner", calories: 1200 },
            // { id: 1, name: "Cookie", calories: 400 },
            // { id: 2, name: "Eggs", calories: 300 }
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // create id
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // calories to number
            calories = parseInt(calories)

            // create new item
            newItem = new Item(ID, name, calories);

            // add to items array
            data.items.push(newItem);

            return newItem;
        },

        getItemById: function (id) {
            let found = null;

            // lop through the items
            data.items.forEach(function (item) {
                if (item.id === id) {
                    found = item;
                }
            })
            return found;
        },

        updateItem: function (name, calories) {
            // calories to number
            calories = parseInt(calories)

            let found = null;

            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item
                }
            });
            return found
        },

        setCurrentItem: function (item) {
            data.currentItem = item;
        },

        getCurrentItem: function () {
            return data.currentItem;
        },

        getTotalCalories: function () {
            let total = 0;

            data.items.forEach(function (item) {
                total += item.calories
            });
            // set total cal in data structure
            data.totalCalories = total
            //return 
            return data.totalCalories;
        },

        logData: function () {
            return data
        }
    }
})();



// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: "#item-list",
        listItems: "#item-list li",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        totalCalories: ".total-calories",

    }

    // public methods
    return {
        populateItemList: function (items) {
            let html = "";
            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories}Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            });

            // insert list items 
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value

            }
        },

        addListItem: function (item) {
            // show list 
            document.querySelector(UISelectors.itemList).getElementsByClassName.display = "block";
            // create li element
            const li = document.createElement("li");
            // add class
            li.className = "collection-item";
            // add id
            li.id = `item-${item.id}`

            // add html
            li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories}Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;

            // insert item 
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li)
        },

        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // cant use a forEach on a node list so turn node list into an array
            listItems = Array.from(listItems);

            listItems.forEach(function (listItem) {
                const itemId = listItem.getAttribute("id");

                if (itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
                }
            })
            UICtrl.clearInput();
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },

        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value = itemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = itemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();

        },

        hideList: function () {
            // document.querySelector(UISelectors.itemList).style.display = "none";
        },

        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories
        },

        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },

        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },

        getSelectors: function () {
            return UISelectors;
        }
    }
})();


// app Controller

const App = (function (itemCtrl, UICtrl) {
    // load events listeners
    const loadEventListeners = function () {
        // get ui selectors
        const UISelectors = UICtrl.getSelectors();

        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit)

        // edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick)

        // update item event 
        document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit)

        //disable submit on enter
        document.addEventListener("keypress", function (e) {
            if (e.keycode === 13 || e.which === 13) {
                e.preventDefault();
                return false
            }
        })

    }



    // add item submit
    const itemAddSubmit = function (e) {

        // get form input from ui controller
        const input = UICtrl.getItemInput();

        // check for name and calories input
        if (input.name !== "" && input.calories !== "") {

            const newItem = itemCtrl.addItem(input.name, input.calories);

            // add item to ui list
            UICtrl.addListItem(newItem);

            // get total calories
            const totalCalories = itemCtrl.getTotalCalories();
            //add total calories to the ui
            UICtrl.showTotalCalories(totalCalories)

            // clear input fields
            UICtrl.clearInput();
        }

        e.preventDefault();

    }

    // Click edit icon
    const itemEditClick = function (e) {
        if (e.target.classList.contains("edit-item")) {
            // get list item id
            const listId = e.target.parentNode.parentNode.id

            // break into an array
            const listIdArr = listId.split("-");

            // get actual id
            const id = parseInt(listIdArr[1])

            // get item 
            const itemToEdit = itemCtrl.getItemById(id);

            // set that current edit item
            itemCtrl.setCurrentItem(itemToEdit)

            // add item to form 
            UICtrl.addItemToForm();
        }
        e.preventDefault();

    }

    // update item submit
    const itemUpdateSubmit = function (e) {
        // get item input
        const input = UICtrl.getItemInput();

        // update item
        const updatedItem = itemCtrl.updateItem(input.name, input.calories);

        // update ui
        UICtrl.updateListItem(updatedItem)

        // get total calories
        const totalCalories = itemCtrl.getTotalCalories();
        //add total calories to the ui
        UICtrl.showTotalCalories(totalCalories)

        e.preventDefault();
    }

    // public methods
    return {
        init: function () {
            // clear edit state 
            UICtrl.clearEditState();
            // fetch items from data structure
            const items = itemCtrl.getItems();

            // check if any items 
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // populate list with items
                UICtrl.populateItemList(items)
            }

            // get total calories
            const totalCalories = itemCtrl.getTotalCalories();
            //add total calories to the ui
            UICtrl.showTotalCalories(totalCalories)



            // load event listeners
            loadEventListeners();

        }
    }
})(itemCtrl, UICtrl);



// init app
App.init();