// person constructor
function Person(name, dob) {
    this.name = name;
    // this.age = age;
    this.birthday = new Date(dob);
    this.calculateAge = function () {
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
}

// const chad = new Person("Chad", "03-09-1984");
// const joe = new Person("Joe", 23)

// strings

const name1 = "Jeff";
const name2 = new String("Jeff");


// name2.foo = "bar";

// numbers
const num1 = 5;
const num2 = new Number(5);

// boolean
const boo1 = true;
const boo2 = new Boolean(true)

// function
const getSum1 = function (x, y) {
    return x + y;
    r
}

const getSum2 = new Function("x", "y", "return 1 +1 ")

// object
const john = { name: "John" }
const john1 = new Object({ name: "John" })

// arrays
const arr1 = [1, 2, 3, 4,]
const arr2 = new Array(1, 2, 3, 4)

// reg expression
const re1 = /\w+/;
const re2 = new RegExp("\\w+")

//prototypes ***** Object.prototype

function Person(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
    this.calculateAge = function () {
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
}


const john = new Person("John", "Doe", "8-12-90")
const mary = new Person("Mary", "Johnson", "3-12-80")